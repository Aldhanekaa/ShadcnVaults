export function getBaseURL(): string {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  if (process.env.NEXT_PUBLIC_VERCEL_TARGET_ENV === "preview") {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`;
  }

  return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`; // or your actual domain
}
