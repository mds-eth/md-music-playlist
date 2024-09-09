import { v4 as uuidv4 } from "uuid";

export const formatDuration = (durationMs: number) => {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = ((durationMs % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds.padStart(2, "0")}`;
};

export const generateUUID = () => {
  return uuidv4();
};
