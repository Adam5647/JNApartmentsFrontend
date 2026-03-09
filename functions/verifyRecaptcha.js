const { onRequest } = require("firebase-functions/v2/https");

/**
 * Verify a reCAPTCHA Enterprise token
 */
exports.verifyRecaptcha = onRequest(
  { cors: true, timeoutSeconds: 10, region: "us-central1" },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    const { token, action, siteKey } = req.body || {};

    if (!token || !siteKey) {
      res.status(400).json({ error: "Missing token or siteKey" });
      return;
    }

    const projectId = "apartments-d0e9f";
    const apiKey = process.env.GOOGLE_CLOUD_API_KEY || "";

    if (!apiKey) {
      console.error("Missing GOOGLE_CLOUD_API_KEY environment variable");
      res.status(500).json({ error: "Server configuration error" });
      return;
    }

    try {
      // Call reCAPTCHA Enterprise API to assess the token
      const assessmentUrl = `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments?key=${apiKey}`;

      const assessmentResponse = await fetch(assessmentUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          event: {
            token,
            siteKey,
            expectedAction: action
          }
        })
      });

      if (!assessmentResponse.ok) {
        const errorText = await assessmentResponse.text();
        console.error(`reCAPTCHA API error: ${assessmentResponse.status}`, errorText);
        res.status(assessmentResponse.status).json({
          valid: false,
          error: `reCAPTCHA API error: ${assessmentResponse.statusText}`
        });
        return;
      }

      const assessmentData = await assessmentResponse.json();

      // Extract the risk score and verdict
      const riskAnalysis = assessmentData.riskAnalysis || {};
      const score = riskAnalysis.score || 0; // Score between 0 (high risk) and 1 (low risk)
      const reasons = riskAnalysis.reasons || [];

      // Determine if the assessment is valid
      // You can adjust this threshold based on your security needs
      const scoreThreshold = 0.5;
      const valid = score >= scoreThreshold;

      console.log(`reCAPTCHA assessment for action '${action}':`, {
        score,
        reasons,
        valid
      });

      res.json({
        valid,
        score,
        reasons,
        message: valid ? "Assessment passed" : "Assessment failed due to risk"
      });
    } catch (error) {
      console.error("reCAPTCHA verification error:", error);
      res.status(500).json({
        valid: false,
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  }
);
