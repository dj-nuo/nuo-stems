import { IPC_TOPICS } from "@shared/ipcTopics";
import { isElectron } from "./envDetector";

import { useQuery } from "@tanstack/react-query";

export function useAppVersion() {
  return useQuery({
    queryKey: [IPC_TOPICS.appVersion],
    queryFn: async () => {
      // mock version for non-electron environments
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (!isElectron()) {
        return "0.0.0-browser";
      }
      const appVersion = window.electron.sendSync(IPC_TOPICS.appVersion);
      return appVersion;
    },
  });
}
