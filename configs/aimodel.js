const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require('@google/generative-ai');
const fs = require('node:fs');
const mime = require('mime-types');

const apiKey = process.env.NEXT_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-pro-exp-03-25',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
  responseModalities: [],
  responseMimeType: 'application/json',
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: 'user',
      parts: [
        {
          text: 'Write a script to generate a 30 second video: Story of Roman Empire with an AI image prompt in Cartoon format for each scene and give me the output in JSOn format with imagePrompt and contentText as fields\n\n',
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: 'Here\'s a thinking process that could lead to the JSON output for the Roman Empire video script:\n\n1.  **Understand the Goal:** The user wants a script for a 30-second video about the story of the Roman Empire. The script needs to be broken down into scenes. Each scene requires:\n    *   `contentText`: The narration/text for that scene.\n    *   `imagePrompt`: An AI image generation prompt for a visual representing the scene, specifically in a "Cartoon format".\n    *   The final output must be in JSON format.\n\n2.  **Constraint Checklist & Confidence Score:**\n    *   30-second video? Yes. This implies a limited number of scenes and concise text.\n    *   Story of Roman Empire? Yes. Need to cover key phases/events.\n    *   AI image prompt per scene? Yes.\n    *   Cartoon format for images? Yes. This needs to be explicitly included in the prompts.\n    *   JSON output? Yes.\n    *   `imagePrompt` field? Yes.\n    *   `contentText` field? Yes.\n\n    Confidence Score: 5/5 - All constraints are clear and achievable.\n\n3.  **Outline the Roman Empire Story (for 30 seconds):** A 30-second video needs to be *very* concise. What are the absolute essential beats?\n    *   **Beginning:** Founding myth (Romulus & Remus) or early Republic.\n    *   **Expansion:** Legions, conquering territory.\n    *   **Peak:** Pax Romana, engineering (aqueducts, Colosseum).\n    *   **Key Figure:** Maybe Caesar or Augustus? (Keep it simple).\n    *   **Decline/Fall:** Internal strife, external pressures, eventual split/fall of the West.\n    *   **Legacy:** Lasting influence.\n\n4.  **Allocate Time/Scenes:** 30 seconds is roughly 5-7 scenes, maybe 4-6 seconds per scene. Let\'s aim for 6 scenes, about 5 seconds each.\n\n    *   Scene 1: Founding/Early Republic (5s)\n    *   Scene 2: Expansion/Legions (5s)\n    *   Scene 3: Engineering/Peak (5s)\n    *   Scene 4: Famous Leader (Caesar/Augustus) (5s)\n    *   Scene 5: Decline/Challenges (5s)\n    *   Scene 6: Fall & Legacy (5s)\n\n5.  **Draft `contentText` for Each Scene:** Keep it short and engaging.\n\n    *   Scene 1: "Legend says Rome was founded by twin brothers! It grew from a small city into a powerful Republic."\n    *   Scene 2: "Mighty legions marched, conquering lands across Europe, Africa, and Asia."\n    *   Scene 3: "Romans were master builders! Aqueducts brought water, and arenas like the Colosseum hosted grand shows."\n    *   Scene 4: "Leaders like Julius Caesar and Emperor Augustus shaped its destiny, creating a vast Empire."\n    *   Scene 5: "But challenges grew – internal conflicts and pressure from outside tribes weakened the Empire."\n    *   Scene 6: "Eventually, the Western Empire fell, but Rome\'s laws, language, and ideas echo through history."\n\n6.  **Develop `imagePrompt` for Each Scene (Cartoon Format):** Ensure prompts reflect the `contentText` and explicitly state "cartoon style".\n\n    *   Scene 1: `contentText`: Founding/Republic.\n        *   *Prompt Idea:* Romulus/Remus wolf, or early senators.\n        *   *Prompt:* "Cartoon style illustration of twin baby boys Romulus and Remus being cared for by a friendly she-wolf beside the Tiber river, simple background, vibrant colors." (Maybe simplify to just the Senate for easier visuals) -> Let\'s go with Senate for clarity: "Cartoon style depiction of Roman senators in togas debating inside a simple, classic Roman building, bright and clear illustration."\n    *   Scene 2: `contentText`: Legions/Conquest.\n        *   *Prompt Idea:* Marching soldiers.\n        *   *Prompt:* "Cute cartoon Roman legionaries with oversized helmets and shields marching in formation across a green landscape, bright sunny day, simple style."\n    *   Scene 3: `contentText`: Engineering/Peak.\n        *   *Prompt Idea:* Aqueduct or Colosseum. Colosseum is more iconic.\n        *   *Prompt:* "A grand Roman Colosseum depicted in a friendly cartoon style, perhaps with tiny cartoon spectators, under a blue sky. Focus on iconic architecture, simplified details." (Maybe add an aqueduct too?) -> Let\'s add it: "Friendly cartoon illustration of a magnificent Roman aqueduct stretching across a landscape towards a simplified cartoon Colosseum, bright colors, cheerful style."\n    *   Scene 4: `contentText`: Leader (Caesar/Augustus).\n        *   *Prompt Idea:* A cartoon emperor.\n        *   *Prompt:* "Cartoon caricature of a Roman Emperor (like Augustus) wearing a laurel wreath and toga, looking wise and benevolent, standing before a simplified Roman banner, clean lines, vibrant colors."\n    *   Scene 5: `contentText`: Decline/Challenges.\n        *   *Prompt Idea:* Cracks, worried Romans, maybe barbarians.\n        *   *Prompt:* "Cartoon scene showing a slightly crumbling Roman building facade with worried-looking cartoon Roman citizens nearby, maybe a stylized \'barbarian\' silhouette in the distance, slightly muted colors."\n    *   Scene 6: `contentText`: Fall & Legacy.\n        *   *Prompt Idea:* Ruin, but also a book/scroll representing legacy.\n        *   *Prompt:* "Cartoon illustration of majestic Roman ruins (like the Forum) overgrown with vines, but with a glowing scroll or book nearby symbolizing lasting knowledge and legacy, hopeful sunrise background."\n\n7.  **Structure as JSON:** Create the overall JSON structure (an array of objects) and populate it with the `imagePrompt` and `contentText` for each scene. Ensure correct syntax (quotes, commas, brackets).\n\n    ```json\n    [\n      {\n        "scene": 1,\n        "imagePrompt": "...",\n        "contentText": "..."\n      },\n      {\n        "scene": 2,\n        "imagePrompt": "...",\n        "contentText": "..."\n      },\n      // ... and so on for all 6 scenes\n    ]\n    ```\n\n8.  **Review and Refine:** Read through the JSON.\n    *   Does the story flow logically? Yes.\n    *   Is the `contentText` concise enough for ~5 seconds per scene? Yes.\n    *   Are the `imagePrompt`s descriptive and include "cartoon"? Yes.\n    *   Is the JSON format correct? Yes.\n    *   Does it meet all the user\'s requirements? Yes.\n\n    *Self-Correction Example during review:* Maybe the first prompt with Romulus/Remus is too complex or niche for a quick intro. Switching to the Senate makes it more clearly about *Roman governance* from the start. Also, combining the aqueduct and Colosseum in Scene 3 makes it more efficient. Ensure prompts use positive/neutral language where appropriate (e.g., "friendly", "cute", "majestic") to fit the cartoon style. Add scene numbers for clarity.\n\n9.  **Final Output Generation:** Present the validated JSON structure.',
        },
        {
          text: '```json\n[\n  {\n    "scene": 1,\n    "duration_seconds": 5,\n    "imagePrompt": "Cute cartoon illustration of twin baby boys Romulus and Remus being cared for by a friendly she-wolf beside a simple river, vibrant colors, sunny day, ancient Italy setting, simple background.",\n    "contentText": "Legend whispers Rome began with twin brothers raised by a wolf! From humble roots, a mighty city grew."\n  },\n  {\n    "scene": 2,\n    "duration_seconds": 5,\n    "imagePrompt": "Funny cartoon Roman legionaries with oversized helmets and shields marching determinedly in formation across a colorful map of Europe, simplified style, bright and clear illustration.",\n    "contentText": "Its powerful legions marched out, building roads and conquering vast lands across continents."\n  },\n  {\n    "scene": 3,\n    "duration_seconds": 5,\n    "imagePrompt": "Friendly cartoon illustration of a magnificent Roman aqueduct stretching across a green landscape towards a simplified cartoon Colosseum, cheerful style, blue sky.",\n    "contentText": "Romans were master builders! Creating amazing aqueducts for water and grand arenas like the Colosseum for entertainment."\n  },\n  {\n    "scene": 4,\n    "duration_seconds": 5,\n    "imagePrompt": "Cartoon caricature of a Roman Emperor, like Augustus, wearing a laurel wreath and toga, looking wise and perhaps a little proud, standing before a simple Roman banner, clean lines.",\n    "contentText": "Leaders like Julius Caesar and Emperor Augustus guided Rome, transforming it into a vast and powerful Empire."\n  },\n  {\n    "scene": 5,\n    "duration_seconds": 5,\n    "imagePrompt": "Cartoon scene showing a slightly crumbling Roman building facade with worried-looking cartoon Roman citizens, maybe stylized \'barbarian\' silhouettes peeking over distant hills, slightly muted colors.",\n    "contentText": "But over time, internal struggles and threats from outside tribes began to weaken the mighty Empire."\n  },\n  {\n    "scene": 6,\n    "duration_seconds": 5,\n    "imagePrompt": "Cartoon illustration of majestic Roman ruins (like the Forum columns) overgrown with vines, but with a glowing cartoon lightbulb or book nearby symbolizing lasting ideas, hopeful sunrise background.",\n    "contentText": "Though the Western Empire eventually fell, Rome\'s language, laws, and ideas shaped the world we know today!"\n  }\n]\n```',
        },
      ],
    },
  ],
});

const result = await chatSession.sendMessage('INSERT_INPUT_HERE');
// TODO: Following code needs to be updated for client-side apps.
const candidates = result.response.candidates;
for (
  let candidate_index = 0;
  candidate_index < candidates.length;
  candidate_index++
) {
  for (
    let part_index = 0;
    part_index < candidates[candidate_index].content.parts.length;
    part_index++
  ) {
    const part = candidates[candidate_index].content.parts[part_index];
    if (part.inlineData) {
      try {
        const filename = `output_${candidate_index}_${part_index}.${mime.extension(part.inlineData.mimeType)}`;
        fs.writeFileSync(filename, Buffer.from(part.inlineData.data, 'base64'));
        console.log(`Output written to: ${filename}`);
      } catch (err) {
        console.error(err);
      }
    }
  }
}
