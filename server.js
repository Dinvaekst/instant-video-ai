import express from "express";
import cors from "cors";
import { exec } from "child_process";
import path from "path";
import fs from "fs";

const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));

const outDir = path.join(process.cwd(), "out");

app.use("/out", express.static(outDir));

function runCommand(command) {
  return new Promise((resolve, reject) => {
    console.log("Running:", command);

    exec(command, { maxBuffer: 1024 * 1024 * 20 }, (error, stdout, stderr) => {
      if (stdout) console.log(stdout);
      if (stderr) console.error(stderr);

      if (error) {
        reject({
          message: error.message,
          stderr
        });
        return;
      }

      resolve(stdout);
    });
  });
}

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Instant Video AI render backend running"
  });
});

app.post("/generate", async (req, res) => {
  try {
    const {
      topic = "Instant Answer AI",
      style = "TikTok"
    } = req.body || {};

    console.log("Generating video");
    console.log("Topic:", topic);
    console.log("Style:", style);

    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    const oldVideo = path.join(outDir, "video.mp4");

    if (fs.existsSync(oldVideo)) {
      fs.unlinkSync(oldVideo);
    }

    await runCommand("npm run make-voice");
    await runCommand("npm run download-videos");
    await runCommand("npm run render");

    const videoPath = path.join(outDir, "video.mp4");

    if (!fs.existsSync(videoPath)) {
      return res.status(500).json({
        success: false,
        error: "Video was not created"
      });
    }

    res.json({
      success: true,
      topic,
      style,
      videoUrl: `/out/video.mp4?t=${Date.now()}`
    });
  } catch (error) {
    console.error("Generate error:", error);

    res.status(500).json({
      success: false,
      error: "Render failed",
      details: error.stderr || error.message || "Unknown error"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Render backend running on port ${PORT}`);
});