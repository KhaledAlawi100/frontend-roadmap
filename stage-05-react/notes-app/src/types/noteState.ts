export type NoteState =
  | {
      status: "loading";
    }
  | {
      status: "success";
    }
  | {
      status: "empty";
    }
  | {
      status: "error";
      message: string;
    };
