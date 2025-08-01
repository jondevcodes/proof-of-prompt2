export const env = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
};

export function validateEnv() {
  if (!env.apiBaseUrl) {
    throw new Error('❌ Missing required env var: NEXT_PUBLIC_API_BASE_URL');
  }
  return true;
}

