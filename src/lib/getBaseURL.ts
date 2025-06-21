export function getBaseURL(): string {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  if (process.env.VERCEL_ENV === "preview") {
    return `https://${process.env.VERCEL_BRANCH_URL}`;
  }

  return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`; // or your actual domain
}
