export const IPC_TOPICS = {
  appVersion: "appVersion",
  getQueue: "getQueue",
  addFileToQueue: "addFileToQueue",
  clearQueue: "clearQueue",
  reorderQueue: "reorderQueue",
} as const;

export type IpcTopic = (typeof IPC_TOPICS)[keyof typeof IPC_TOPICS];
