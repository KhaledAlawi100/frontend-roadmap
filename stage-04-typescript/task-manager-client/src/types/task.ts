import type {ID} from "./common";
export type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED" ;

export interface Task {
  readonly id: ID;
  title: string;
  description?: string;
  completed: boolean;
  status: TaskStatus;
}
