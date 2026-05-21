import fs from "fs";

const ads = [
  {
    id: "ad1",
    hook: "Students are hiding this AI tool 👀",
    title: "Study faster with Instant Answer",
    caption: "Summarize YouTube, pages and notes in seconds."
  },
  {
    id: "ad2",
    hook: "This Chrome extension saves hours",
    title: "Stop wasting time online",
    caption: "Get clear answers directly inside Chrome."
  },
  {
    id: "ad3",
    hook: "Best AI tool for students?",
    title: "Quick. Study. YouTube. Page.",
    caption: "One extension for smarter work."
  }
];

fs.writeFileSync("data/ads.json", JSON.stringify(ads, null, 2));

console.log("Created 3 ad scripts in data/ads.json");