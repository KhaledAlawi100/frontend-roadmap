import type { Task } from "./task";

export type TaskState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: Task[] }
  | { status: "error"; message: string };


export interface AppConfig {
  appName: string;
  version?: string;
}
