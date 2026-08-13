import type {ApiError} from "../types/api";

export async function request<T>(
    url: string,
    options?: RequestInit
): Promise<T> {

    const response = await fetch(url, options);

    if(!response.ok){
        const apiError:ApiError = await createApiError(response);
        throw apiError;
    }

    if (response.status === 204) {
     return undefined as T;
  }

    return (await response.json()) as T;

}


async function createApiError(response: Response): Promise<ApiError> {

    try{
        const errorData:unknown = await response.json();
        if(isApiError(errorData)){
            return errorData;
        }
    }catch{


    }

    return {
        success: false,
        message: response.statusText,
        errors: {}
    }
}



function isApiError(value : unknown): value is ApiError {

    if(
        typeof value !== "object" ||
        value === null ||{}
    ){
        return false;
    }

    if(
        !("success" in value) ||
        !("message" in value) ||
        !("errors" in value)
    ){
        return false;
    }
    
    return value.success === false &&
        typeof value.message === "string" &&
        typeof value.errors === "object" &&
        value.errors !== null;

}