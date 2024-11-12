import { getPlaiceholder } from "plaiceholder";
import fs from "node:fs";
import path from "node:path";

export async function getBase64(imagePath: string) {
  try {
    const file = fs.readFileSync(path.join(process.cwd(), "public", imagePath));
    const { base64 } = await getPlaiceholder(file);
    return base64;
  } catch (error) {
    console.error("Erreur lors de la génération du blur:", error);
    return null;
  }
} 