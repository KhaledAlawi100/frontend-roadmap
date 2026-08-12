import "./style.css";

import type {AppConfig} from "./types/app";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App root element was not found.");
}

const config: AppConfig = {
  appName: "Task Manager",
  version: "1.0.0"
};

app.innerHTML = `
  <main>
    <h1>${config.appName}</h1>
    <p>v${config.version}</p>
  </main>
`;

