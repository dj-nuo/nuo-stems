import { IPC_TOPICS } from "@shared/ipcTopics";
import { isElectron } from "./envDetector";

export async function getAppVersion() {
  // mock version for non-electron environments
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!isElectron()) {
    return "0.0.0-browser";
  }

  const appVersion = window.electron.sendSync(IPC_TOPICS.appVersion);
  return appVersion;
}
