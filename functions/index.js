const { onRequest } = require("firebase-functions/v2/https");
const verifyRecaptchaModule = require("./verifyRecaptcha");

// Simple HTTPS function proxy for Gemini API
exports.aiGenerate = onRequest({ cors: true, timeoutSeconds: 60, region: "us-central1" }, async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const apiKey = process.env.GOOGLE_AI_KEY || process.env.VITE_GOOGLE_API_KEY || '';
  const model = (process.env.GOOGLE_MODEL || 'gemini-2.0-flash').trim();
  const apiVersion = (process.env.GOOGLE_API_VERSION || 'v1').trim();

  if (!apiKey) {
    res.status(500).json({ error: 'Missing GOOGLE_AI_KEY environment variable' });
    return;
  }

  try {
    const { prompt, options } = req.body || {};
    const generationConfig = {
      temperature: options?.temperature ?? 0.4,
      maxOutputTokens: Math.min(Number(options?.maxOutputTokens ?? 256), 512)
    };
    const body = {
      contents: [{ role: 'user', parts: [{ text: `${options?.system ? options.system + "\n\n" : ''}${prompt}` }] }],
      generationConfig
    };

    const url = `https://generativelanguage.googleapis.com/${apiVersion}/models/${model}:generateContent?key=${apiKey}`;
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      res.status(resp.status).json(data);
      return;
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    res.json({ result: text });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

// Export the reCAPTCHA verification function
exports.verifyRecaptcha = verifyRecaptchaModule.verifyRecaptcha;
