import { promises as fs } from "fs";

export const base64Encoder = (
  file: File
): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

// Convert base64 to file and return it
export const base64Decoder = async (base64File: string): Promise<File> => {
  return new Promise((resolve, reject) => {
    const arr = base64File.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    resolve(new File([u8arr], `image.${mime?.split("/")[1]}`, { type: mime }));
    reject("Error");
  });
};

export const oneFileHandler = async ({
  file,
  validator,
  handledFile,
  onError,
}: {
  file: File | undefined;
  validator: (file: File) => string | null;
  handledFile: (base64File: string) => void;
  onError?: (error: any) => void;
}): Promise<void> => {
  if (!file) return;

  const error = validator(file);

  if (error == null) {
    const base64 = await base64Encoder(file!);
    base64 && handledFile(base64 as string);
  } else {
    onError && onError(error);
  }
};
