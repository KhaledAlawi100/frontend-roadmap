import type {ID} from "./common";
export interface User {
    readonly id: ID;
    name: string;
    email: string;
}