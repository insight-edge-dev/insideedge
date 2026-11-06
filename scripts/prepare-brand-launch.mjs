import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

// Original generated photographs stay outside the public directory.
const sourceDirectory = process.argv[2];
if (!sourceDirectory) throw new Error("Pass the directory containing the original generated PNGs.");
const files = [
  {
    "id": "tea",
    "file": "exec-2e5c0a72-e9be-4fe1-bfa9-0a5652cbabca.png"
  },
  {
    "id": "coffee",
    "file": "exec-484753f7-44dd-4e86-ab52-5ecae05a8627.png"
  },
  {
    "id": "beauty-skincare",
    "file": "exec-348241af-1276-4d67-bcd0-55338d2f8001.png"
  },
  {
    "id": "masalas",
    "file": "exec-521a2360-b43e-4f42-8e9f-d4701ee98b9a.png"
  },
  {
    "id": "food-beverage",
    "file": "exec-5a2f5929-6885-4f8f-a1ec-a64938ccf1f5.png"
  },
  {
    "id": "fashion-lifestyle",
    "file": "exec-a902b73f-e5eb-4e50-b142-d47aaf6ff09b.png"
  },
  {
    "id": "organic-wellness",
    "file": "exec-d16efffc-0268-4c4d-b024-a4c7dd141fe5.png"
  },
  {
    "id": "cafes-hospitality",
    "file": "exec-a2961c2d-306c-432c-983e-439df8701597.png"
  }
];
const destination = path.resolve("public/images/brand-launch");
fs.mkdirSync(destination, { recursive: true });
for (const { id, file } of files) {
  const source = path.join(sourceDirectory, file);
  await sharp(source).resize(1536, 1024).webp({ quality: 83 }).toFile(path.join(destination, `${id}.webp`));
  await sharp(source).resize(800, 1000, { fit: "cover", position: "centre" }).webp({ quality: 81 }).toFile(path.join(destination, `${id}-mobile.webp`));
  console.log(id);
}
