export const IPC_TOPICS = {
  appVersion: "appVersion",
} as const;

export type IpcTopic = (typeof IPC_TOPICS)[keyof typeof IPC_TOPICS];
