import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconUpload } from "@tabler/icons-react";
import { cn } from "~/lib/utils";

const AUDIO_EXTENSIONS = ".mp3, .wav, .flac, .alac, .m4a, .aac, .aiff";

export const DragAndDrop = ({
  onChange,
}: {
  onChange?: (files: File[]) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isWindowDragActive, setIsWindowDragActive] = useState(false);
  const [isDropZoneDragActive, setIsDropZoneDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneDragDepth = useRef(0);

  const handleFileChange = (newFiles: File[]) => {
    if (!newFiles.length) return;
    setFiles((previous) => [...previous, ...newFiles]);
    onChange?.(newFiles);
  };

  useEffect(() => {
    let dragCounter = 0;

    const handleDragEnter = (event: DragEvent) => {
      if (!event.dataTransfer) return;
      event.preventDefault();
      dragCounter += 1;
      setIsWindowDragActive(true);
    };

    const handleDragOver = (event: DragEvent) => {
      if (!event.dataTransfer) return;
      event.preventDefault();
      setIsWindowDragActive(true);
    };

    const handleDragLeave = (event: DragEvent) => {
      if (!event.dataTransfer) return;
      event.preventDefault();
      dragCounter = Math.max(0, dragCounter - 1);
      if (event.screenX === 0 && event.screenY === 0) {
        dragCounter = 0;
      }
      if (dragCounter === 0) {
        setIsWindowDragActive(false);
      }
    };

    const handleDrop = (event: DragEvent) => {
      if (!event.dataTransfer) return;
      event.preventDefault();

      if (event.defaultPrevented) {
        dragCounter = 0;
        setIsWindowDragActive(false);
        return;
      }

      const droppedFiles = Array.from(event.dataTransfer.files || []);
      dragCounter = 0;
      setIsWindowDragActive(false);

      if (droppedFiles.length) {
        handleFileChange(droppedFiles);
      }
    };

    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFilePicker();
    }
  };

  const handleDropZoneDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dropZoneDragDepth.current += 1;
    setIsDropZoneDragActive(true);
  };

  const handleDropZoneDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    setIsDropZoneDragActive(true);
  };

  const handleDropZoneDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dropZoneDragDepth.current = Math.max(0, dropZoneDragDepth.current - 1);

    if (dropZoneDragDepth.current === 0) {
      setIsDropZoneDragActive(false);
    }
  };

  const handleDropZoneDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files || []);

    dropZoneDragDepth.current = 0;
    setIsDropZoneDragActive(false);
    setIsWindowDragActive(false);

    if (droppedFiles.length) {
      handleFileChange(droppedFiles);
    }
  };

  return (
    <div className="relative w-full">
      <AnimatePresence>
        {isWindowDragActive && (
          <motion.div
            key="drop-overlay"
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(120,99,231,0.55)] backdrop-blur-md backdrop-saturate-125 dark:bg-[rgba(66,50,143,0.78)]"
            style={{
              backdropFilter: "blur(12px) saturate(120%)",
              WebkitBackdropFilter: "blur(12px) saturate(120%)",
            }}
            onDragOver={(event) => {
              event.preventDefault();
              event.dataTransfer.dropEffect = "copy";
            }}
            onDrop={(event) => {
              event.preventDefault();
              const droppedFiles = Array.from(event.dataTransfer.files || []);
              dropZoneDragDepth.current = 0;
              setIsDropZoneDragActive(false);
              setIsWindowDragActive(false);

              if (droppedFiles.length) {
                handleFileChange(droppedFiles);
              }
            }}
            onDragLeave={(event) => {
              event.preventDefault();
              if (event.screenX === 0 && event.screenY === 0) {
                return;
              }
              setIsWindowDragActive(false);
            }}
          >
            <motion.p
              initial={{ y: 6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 6, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="rounded-full bg-white/95 px-5 py-2.5 text-sm font-medium text-neutral-700 shadow-lg dark:bg-[rgba(41,32,89,0.92)] dark:text-violet-100"
            >
              <span className="font-semibold">Release</span> to add tracks
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        role="button"
        tabIndex={0}
        className={cn(
          "relative mt-4 flex h-48 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white text-neutral-700 transition-colors",
          "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-neutral-900 dark:text-neutral-200 dark:focus-visible:ring-offset-neutral-950",
          isDropZoneDragActive
            ? "border-indigo-400 bg-indigo-50/70 text-indigo-700 dark:border-indigo-300 dark:bg-indigo-500/10 dark:text-indigo-100"
            : "border-neutral-300 hover:bg-indigo-50/60 dark:border-neutral-600 dark:hover:bg-neutral-800/70"
        )}
        onClick={() => {
          openFilePicker();
        }}
        onKeyDown={handleKeyDown}
        onDragEnter={handleDropZoneDragEnter}
        onDragOver={handleDropZoneDragOver}
        onDragLeave={handleDropZoneDragLeave}
        onDrop={handleDropZoneDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(event) => {
            const selectedFiles = Array.from(event.target.files || []);
            handleFileChange(selectedFiles);
            // Reset the input so the same file can be selected again
            event.target.value = "";
          }}
        />
        <IconUpload className="mb-3 h-6 w-6 text-neutral-500 dark:text-neutral-300" />
        <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
          Click to select
        </p>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          or drag and drop
        </p>
        <p className="mt-4 text-xs text-neutral-400 dark:text-neutral-500">
          {AUDIO_EXTENSIONS}
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${file.lastModified}-${index}`}
              className="flex items-center justify-between rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
            >
              <span className="truncate text-neutral-700 dark:text-neutral-200">
                {file.name}
              </span>
              <span className="ml-3 shrink-0 text-xs text-neutral-500 dark:text-neutral-400">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
