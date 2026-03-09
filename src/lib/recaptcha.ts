// src/lib/recaptcha.ts
// reCAPTCHA Enterprise utility functions

declare global {
  interface Window {
    grecaptcha?: {
      enterprise?: {
        execute: (siteKey: string, options: { action: string }) => Promise<string>;
      };
    };
  }
}

const RECAPTCHA_SCRIPT_ID = "recaptcha-script";
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_V3_KEY;

/**
 * Load the reCAPTCHA Enterprise JavaScript API
 */
export function loadRecaptcha(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Already loaded
    if (window.grecaptcha?.enterprise) {
      resolve();
      return;
    }

    // Already loading
    if (document.getElementById(RECAPTCHA_SCRIPT_ID)) {
      const checkInterval = setInterval(() => {
        if (window.grecaptcha?.enterprise) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
      return;
    }

    // Load script
    const script = document.createElement("script");
    script.id = RECAPTCHA_SCRIPT_ID;
    script.src = "https://www.google.com/recaptcha/enterprise.js";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.grecaptcha?.enterprise) {
        resolve();
      } else {
        reject(new Error("reCAPTCHA failed to load"));
      }
    };
    script.onerror = () => reject(new Error("Failed to load reCAPTCHA script"));
    document.head.appendChild(script);
  });
}

/**
 * Execute reCAPTCHA and get a token for the specified action
 */
export async function executeRecaptcha(action: string): Promise<string> {
  if (!RECAPTCHA_SITE_KEY) {
    console.warn("reCAPTCHA site key not configured; skipping reCAPTCHA");
    return "";
  }

  try {
    await loadRecaptcha();
    if (!window.grecaptcha?.enterprise) {
      throw new Error("reCAPTCHA not available");
    }
    const token = await window.grecaptcha.enterprise.execute(RECAPTCHA_SITE_KEY, {
      action
    });
    return token;
  } catch (error) {
    console.error("reCAPTCHA execution failed:", error);
    return "";
  }
}

/**
 * Verify a reCAPTCHA token on the backend
 */
export async function verifyRecaptchaToken(
  token: string,
  action: string
): Promise<{
  valid: boolean;
  score?: number;
  error?: string;
}> {
  if (!token) {
    return { valid: true }; // Skip if no token (site key not configured)
  }

  try {
    const response = await fetch("/.netlify/functions/verifyRecaptcha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, action, siteKey: RECAPTCHA_SITE_KEY })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        valid: false,
        error: errorData.error || `Verification failed: ${response.statusText}`
      };
    }

    return await response.json();
  } catch (error) {
    console.error("Token verification failed:", error);
    return {
      valid: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}
