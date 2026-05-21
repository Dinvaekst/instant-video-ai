import "dotenv/config";
import fs from "fs";
import path from "path";

const API_KEY = process.env.PEXELS_API_KEY;

if (!API_KEY) {
  console.error("Missing PEXELS_API_KEY in .env");
  process.exit(1);
}

const searches = [
  { query: "student laptop", name: "student.mp4" },
  { query: "person walking city", name: "walking.mp4" },
  { query: "office laptop work", name: "laptop.mp4" },
  { query: "students studying", name: "studying.mp4" },
  { query: "girl using laptop", name: "girl.mp4" },
  { query: "technology office", name: "office.mp4" },
  { query: "coding computer", name: "coding.mp4" },
  { query: "student classroom", name: "classroom.mp4" },
  { query: "city night", name: "city.mp4" },
  { query: "young entrepreneur", name: "entrepreneur.mp4" }
];

const outputDir = path.join(process.cwd(), "public", "videos");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function downloadVideo(query, filename) {
  console.log(`Searching: ${query}`);

  try {
    const res = await fetch(
      `https://api.pexels.com/videos/search?query=${encodeURIComponent(
        query
      )}&per_page=1&orientation=portrait`,
      {
        headers: {
          Authorization: API_KEY,
        },
      }
    );

    const data = await res.json();
    const video = data.videos?.[0];

    if (!video) {
      console.log(`No video found for ${query}`);
      return;
    }

    const file =
      video.video_files.find(
        (v) => v.quality === "hd" && v.width < 1200
      ) || video.video_files[0];

    if (!file?.link) {
      console.log(`No downloadable file for ${query}`);
      return;
    }

    console.log(`Downloading: ${filename}`);

    const videoRes = await fetch(file.link);
    const buffer = Buffer.from(await videoRes.arrayBuffer());

    const filePath = path.join(outputDir, filename);

    fs.writeFileSync(filePath, buffer);

    console.log(`Saved: ${filePath}`);
  } catch (err) {
    console.log(`Failed downloading ${query}`);
    console.log(err.message);
  }
}

async function main() {
  for (const item of searches) {
    await downloadVideo(item.query, item.name);
  }

  console.log("Done downloading videos.");
}

main();