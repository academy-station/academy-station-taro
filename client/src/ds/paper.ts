export interface Paper {
  _id?: string;
  openid: string;
  fileName: string; // ChooseFile.name
  fileTime: number; // ChooseFile.path
  fileSize: number; // ChooseFile.size
  submitTime: number;
  cloudPath?: string;
}
