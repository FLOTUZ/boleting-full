import { createClient } from "@supabase/supabase-js";
import { v4 } from "uuid";
import { prisma } from "@/server";
import { Image } from "@prisma/client";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

export async function supabaseUploadFile({
  file,
}: {
  file: File;
}): Promise<Image> {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase credentials not found");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const uniqueFileName = v4();
  const bucket = supabase.storage.from("uploads");
  console.log("==================UPLOADING FILE=========================");

  // Upload file
  const { data: uploadedFile, error } = await bucket.upload(
    uniqueFileName,
    file,
    {
      cacheControl: "3600",
      upsert: false,
    }
  );

  if (error) {
    console.error("Error uploading file:", error);
    throw new Error(error.message);
  }

  console.log({
    name: file.name,
    type: file.type,
    path: uploadedFile.path,
  });
  console.log("==================FILE UPLOADED=========================");

  // Get public URL
  const { data } = bucket.getPublicUrl(uniqueFileName);

  const savedImage = await prisma.image.create({
    data: {
      original_name: file.name ?? "Unnamed file",
      new_name: uniqueFileName,
      size: file.size,
      mime_type: file.type,
      url: data.publicUrl,
    },
  });

  return savedImage;
}
