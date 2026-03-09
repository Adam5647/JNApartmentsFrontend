// Use direct REST calls to force the v1 endpoint and avoid SDK version defaults.
// Default to the current generally available, free-tier friendly model.
const normalizeModel = (model: string) => model.trim();

// Default to 2.0 models only.
const DEFAULT_MODEL = normalizeModel(import.meta.env.VITE_GOOGLE_MODEL || "gemini-2.0-flash");
const MODEL_FALLBACKS = [DEFAULT_MODEL];
const API_VERSION = (import.meta.env.VITE_GOOGLE_API_VERSION || "v1").trim();

type GenerateOptions = {
  system?: string;
  temperature?: number;
  maxOutputTokens?: number;
};

export async function generateAiText(prompt: string, options: GenerateOptions = {}) {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("Missing VITE_GOOGLE_API_KEY in .env");
  }

  const generationConfig = {
    temperature: options.temperature ?? 0.4,
    maxOutputTokens: options.maxOutputTokens ?? 256
  };

  const systemPrompt = options.system ? `${options.system}\n\n${prompt}` : prompt;
  const body = {
    contents: [{ role: "user", parts: [{ text: systemPrompt }] }],
    generationConfig
  };

  const resp = await fetch(
    `https://generativelanguage.googleapis.com/${API_VERSION}/models/${DEFAULT_MODEL}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }
  );

  if (!resp.ok) {
    const errText = await resp.text().catch(() => "");
    throw new Error(`Gemini API error: ${resp.status} ${resp.statusText} ${errText}`.trim());
  }

  const data = (await resp.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Empty response from Gemini API.");
  }

  return text.trim();
}