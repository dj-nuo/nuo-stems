import { IPC_TOPICS } from "@shared/ipcTopics";
import { isElectron } from "./envDetector";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { QueueItem } from "@shared/sharedTypes";

export function useAppVersion() {
  return useQuery({
    queryKey: [IPC_TOPICS.appVersion],
    queryFn: getAppVersion,
  });

  async function getAppVersion() {
    if (!isElectron()) {
      // mock version for non-electron environments
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return "0.0.0-browser";
    }
    const appVersion = window.electron.sendSync(IPC_TOPICS.appVersion);
    return appVersion;
  }
}

export function useQueue() {
  return useQuery({
    queryKey: [IPC_TOPICS.getQueue],
    queryFn: getQueue,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });

  async function getQueue(): Promise<QueueItem[]> {
    if (!isElectron()) {
      // mock queue data for non-electron environments
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return [
        {
          id: "1",
          order: "1",
          progress: 100,
          picture: "/placeholder.jpg",
          fileExtension: "mp3",
          title: "Midnight Dreams",
          artist: "Luna Echo",
          duration: "3:42",
          output: "/output/midnight-dreams",
        },
        {
          id: "2",
          order: "2",
          progress: 75,
          picture: "/placeholder.jpg",
          fileExtension: "wav",
          title: "Neon Lights",
          artist: "Cyber Pulse",
          duration: "4:15",
          output: "/output/neon-lights",
        },
        {
          id: "3",
          order: "3",
          progress: 45,
          picture: "/placeholder.jpg",
          fileExtension: "flac",
          title: "Ocean Waves",
          artist: "Tidal Sound",
          duration: "5:23",
          output: "/output/ocean-waves",
        },
        {
          id: "4",
          order: "4",
          progress: 0,
          picture: "/placeholder.jpg",
          fileExtension: "aac",
          title: "Mountain High",
          artist: "Peak Vibes",
          duration: "3:58",
          output: "/output/mountain-high",
        },
        {
          id: "5",
          order: "5",
          progress: 90,
          picture: "/placeholder.jpg",
          fileExtension: "m4a",
          title: "Urban Rhythm",
          artist: "City Beats",
          duration: "4:07",
          output: "/output/urban-rhythm",
        },
      ];
    }
    const queue = window.electron.sendSync(IPC_TOPICS.getQueue);
    console.log(queue);
    return queue;
  }
}

export function useAddFileToQueue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFileToQueue,
    onSuccess: () => {
      // Invalidate and refetch the queue
      queryClient.invalidateQueries({ queryKey: [IPC_TOPICS.getQueue] });
    },
  });

  async function addFileToQueue(filePath: string) {
    if (!isElectron()) {
      // mock success for non-electron environments
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { success: true, message: "File added to queue (mock)" };
    }
    const result = window.electron.sendSync(
      IPC_TOPICS.addFileToQueue,
      filePath
    );
    return result;
  }
}

export function useClearQueue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearQueue,
    onSuccess: () => {
      // Invalidate and refetch the queue query
      queryClient.invalidateQueries({ queryKey: [IPC_TOPICS.getQueue] });
    },
  });

  async function clearQueue() {
    if (!isElectron()) {
      // mock success for non-electron environments
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { success: true, message: "Queue cleared (mock)" };
    }
    const result = window.electron.sendSync(IPC_TOPICS.clearQueue);
    return result;
  }
}

export function useReorderQueue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reorderQueue,
    onMutate: async (updatedQueue) => {
      // Optimistically update the cache immediately for smooth UI
      queryClient.setQueryData([IPC_TOPICS.getQueue], updatedQueue);
      // Don't return context for rollback since drag operations should be reliable
    },
    // No onSuccess/onError needed - optimistic update stays
  });

  async function reorderQueue(updatedQueue: QueueItem[]) {
    if (!isElectron()) {
      // mock success for non-electron environments
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { success: true, message: "Queue reordered (mock)" };
    }
    const result = window.electron.sendSync(
      IPC_TOPICS.reorderQueue,
      updatedQueue
    );
    return result;
  }
}
