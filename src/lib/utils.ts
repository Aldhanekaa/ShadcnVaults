import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates keyword variations for SEO metadata
 * @param baseKeywords - Array of base keywords
 * @returns Array of expanded keywords with variations
 */
export function generateKeywordVariations(baseKeywords: string[]): string[] {
  if (!baseKeywords || baseKeywords.length === 0) {
    return [];
  }

  const variations: string[] = [];

  // Add original keywords
  variations.push(...baseKeywords);

  // Common prefixes and suffixes for UI/component keywords
  const prefixes = [
    "ui",
    "react",
    "nextjs",
    "shadcn",
    "shadcnui",
    "shadcn/ui",
    "component",
    "block",
    "dashboard",
  ];
  const suffixes = [
    "ui",
    "component",
    "block",
    "dashboard",
    "template",
    "design",
    "interface",
  ];

  // Common related terms
  const relatedTerms: Record<string, string[]> = {
    hero: ["landing", "header", "banner", "cta", "call-to-action"],
    auth: ["authentication", "login", "signup", "register", "security"],
    billing: ["payment", "invoice", "subscription", "pricing", "checkout"],
    dashboard: ["admin", "panel", "management", "analytics", "metrics"],
    monitoring: ["analytics", "tracking", "metrics", "performance", "status"],
    marketplace: ["store", "shop", "ecommerce", "products", "catalog"],
    footer: ["navigation", "links", "branding", "social"],
    feature: ["showcase", "capabilities", "benefits", "highlights"],
    pricing: ["plans", "tiers", "subscription", "billing", "cost"],
    confidential: ["access", "security", "premium", "restricted", "private"],
    banking: ["finance", "payment", "transaction", "money", "transfer"],
    review: ["feedback", "rating", "comment", "testimonial", "evaluation"],
    rcon: ["minecraft", "server", "admin", "console", "command"],
  };

  // Generate variations for each base keyword
  baseKeywords.forEach((keyword) => {
    // Add prefix variations
    prefixes.forEach((prefix) => {
      variations.push(`${prefix} ${keyword}`);
      variations.push(`${keyword} ${prefix}`);
    });

    // Add suffix variations
    suffixes.forEach((suffix) => {
      variations.push(`${keyword} ${suffix}`);
      variations.push(`${suffix} ${keyword}`);
    });

    // Add related terms
    const related = relatedTerms[keyword.toLowerCase()];
    if (related) {
      related.forEach((term: string) => {
        variations.push(term);
        variations.push(`${keyword} ${term}`);
        variations.push(`${term} ${keyword}`);
      });
    }

    // Add common UI/component variations
    variations.push(`${keyword} template`);
    variations.push(`${keyword} design`);
    variations.push(`${keyword} interface`);
    variations.push(`modern ${keyword}`);
    variations.push(`responsive ${keyword}`);
    variations.push(`${keyword} component`);
    variations.push(`react ${keyword}`);
    variations.push(`nextjs ${keyword}`);
    variations.push(`shadcn ${keyword}`);
  });

  // Add general UI/component keywords
  const generalKeywords = [
    "ui components",
    "react components",
    "nextjs components",
    "shadcn ui",
    "ui blocks",
    "dashboard templates",
    "admin panels",
    "web components",
    "frontend components",
    "ui design",
    "component library",
    "ui templates",
    "react templates",
    "nextjs templates",
    "ui block",
    "react block",
    "nextjs block",
    "shadcn block",
  ];

  variations.push(...generalKeywords);

  // Remove duplicates and limit to reasonable size
  const uniqueVariations = [...new Set(variations)];

  // Limit to 50 keywords to avoid overwhelming metadata
  return uniqueVariations.slice(0, 50);
}
