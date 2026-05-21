import asyncio
import edge_tts
import os

TEXT = """
Students, listen up.

This Chrome extension can save you hours every week.

Instant Answer helps you summarize YouTube videos, understand webpages, create study notes, and get quick answers in seconds.

Instead of opening ten different tabs, you can get everything in one simple tool.

Use Quick mode for fast answers, Study mode for school help, and YouTube mode when you don’t have time to watch the full video.

If you study, work online, or create content, Instant Answer is built for you.

Try Instant Answer today and work smarter.
"""

VOICE = "en-US-AriaNeural"
OUTPUT = "public/audio/voice.mp3"

async def main():
    os.makedirs("public/audio", exist_ok=True)
    communicate = edge_tts.Communicate(TEXT, VOICE)
    await communicate.save(OUTPUT)
    print(f"Voiceover saved to {OUTPUT}")

asyncio.run(main())