import { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm, Fields, Files } from "formidable";
import { promises as fs } from "fs";
import { createClient } from "@supabase/supabase-js";
import { v4 } from "uuid";
import { prisma } from "@/server";

export const config = { api: { bodyParser: false } };

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const parseFormData = (
  req: NextApiRequest
): Promise<{ fields: Fields; files: Files }> =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: false });
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const parsedRequest = await parseFormData(req);

  const file = parsedRequest.files.file![0];

  try {
    const dataFile = await fs.readFile(file.filepath);

    if (!supabaseUrl || !supabaseKey) {
      res.status(500).json({ error: "Supabase credentials not found" });
      return;
    }
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get bucket intance
    const bucket = supabase.storage.from("uploads");

    const uniqueFileName = v4();

    console.log("==================UPLOADING FILE=========================");
    // Upload file
    const { data: uploadedFile, error } = await bucket.upload(
      uniqueFileName,
      dataFile,
      {
        cacheControl: "3600",
        upsert: false,
      }
    );

    if (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ error: error.message });
      return;
    }

    console.log({
      name: file.originalFilename,
      type: file.mimetype,
      path: uploadedFile.path,
    });
    console.log("==================FILE UPLOADED=========================");

    // Get public URL
    const { data } = bucket.getPublicUrl(uniqueFileName);

    const savedImage = await prisma.image.create({
      data: {
        original_name: file.originalFilename ?? "Unnamed file",
        new_name: uniqueFileName,
        size: file.size,
        mime_type: file.mimetype,
        url: data.publicUrl,
      },
    });

    res.status(200).json(savedImage);
  } catch (error: any) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: error.message });
  }

  res.end();
}
