export interface DriveItem {
  type: "folder" | "audio";
  id: string;
  name: string;
  alhan?: DriveItem[];
}
