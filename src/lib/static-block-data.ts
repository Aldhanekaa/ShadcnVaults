import { HeroBlock1 } from "@/blocks/hero/hero-1";
import { HeroBlock2 } from "@/blocks/hero/hero-2";
import { HeroBlock3 } from "@/blocks/hero/hero-3";
import { HeroBlock4 } from "@/blocks/hero/hero-4";
import { HeroBlock5 } from "@/blocks/hero/hero-5";

import { FooterBlock1 } from "@/blocks/footer/footer-1";
import { FooterBlock2 } from "@/blocks/footer/footer-2";
import { FooterBlock2 as FooterBlock3 } from "@/blocks/footer/footer-3";
import { FooterBlock2 as FooterBlock4 } from "@/blocks/footer/footer-4";

import Bills_1 from "@/blocks/bills/bills-1";
import Bills_2 from "@/blocks/bills/bills-2";
import Bills_3 from "@/blocks/bills/bills-3";
import Bills_4 from "@/blocks/bills/bills-4";
import Bills_5 from "@/blocks/bills/bills-5";
import Bills_6 from "@/blocks/bills/bills-6";
import Bills_7 from "@/blocks/bills/bills-7";
import Bills_8 from "@/blocks/bills/bills-8";
import Bills_9 from "@/blocks/bills/bills-9";
import Bills_10 from "@/blocks/bills/bills-10";
import Bills_11 from "@/blocks/bills/bills-11";
import Bills_12 from "@/blocks/bills/bills-12";

import API_Test_1 from "@/blocks/api_test/api_test-1";
import API_Test_2 from "@/blocks/api_test/api_test-2";
import API_Test_3 from "@/blocks/api_test/api_test-3";
import API_Test_4 from "@/blocks/api_test/api_test-4";

import Marketplace_1 from "@/blocks/marketplace/marketplace-1";
import Marketplace_2 from "@/blocks/marketplace/marketplace-2";
import Marketplace_3 from "@/blocks/marketplace/marketplace-3";
import Marketplace_4 from "@/blocks/marketplace/marketplace-4";
import Marketplace_5 from "@/blocks/marketplace/marketplace-5";
import Marketplace_6 from "@/blocks/marketplace/marketplace-6";

export interface BlockMetadata {
  id: string;
  name: string;
  description: string;
  video?: string;
  photo?: string;
}

export interface BlockWithComponent extends BlockMetadata {
  component: React.ComponentType;
}

export interface BlockCategory {
  id: string;
  title: string;
  description: string;
  image?: string;
  blocks?: BlockMetadata[];
}

// Static block data with components
export const staticBlocksWithComponents: Record<string, BlockWithComponent> = {
  "hero-1": {
    id: "hero-1",
    name: "Simple Hero",
    description: "Clean hero with title and CTA button",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750376434/Screenshot_2025-06-20_at_06.39.54_se7opv.png",
    component: HeroBlock1,
  },
  "hero-2": {
    id: "hero-2",
    name: "Hero with Image",
    description: "Hero section with stunning background image",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750376437/Screenshot_2025-06-20_at_06.40.30_qaiqfz.png",
    component: HeroBlock2,
  },
  "hero-3": {
    id: "hero-3",
    name: "Gradient Hero with Stats",
    description:
      "Modern hero section with gradient background, performance stats, and dual CTAs",
    video:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750376473/Screenshot_2025-06-20_at_06.40.51_c52yar.png",
    component: HeroBlock3,
  },
  "hero-4": {
    id: "hero-4",
    name: "Collaboration Hero",
    description:
      "Two-column hero with team collaboration features and image with status indicator",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750376478/Screenshot_2025-06-20_at_06.41.08_ts6hwk.png",
    component: HeroBlock4,
  },
  "hero-5": {
    id: "hero-5",
    name: "Feature Showcase Hero",
    description:
      "Hero section with feature cards highlighting collaboration, speed, and security",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750376551/Screenshot_2025-06-20_at_06.42.24_rl5jwg.png",
    component: HeroBlock5,
  },

  "bills-1": {
    id: "bills-1",
    name: "SaaS Billing Dashboard",
    description:
      "Customer admin dashboard for managing SaaS plans, add-ons, and current bills.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750356826/Screen_Recording_2025-06-20_at_01.12.21_twbie4.mov",
    component: Bills_1,
  },
  "bills-2": {
    id: "bills-2",
    name: "Team Billing & Add-ons",
    description:
      "Dashboard for team-based SaaS billing, plan selection, and add-on management.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750357404/Screen_Recording_2025-06-20_at_01.22.07_vrsmi1.mov",
    component: Bills_2,
  },
  "bills-3": {
    id: "bills-3",
    name: "Business Subscription Billing",
    description:
      "Subscription dashboard for business plans, add-ons, and invoice breakdown.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750357402/Screen_Recording_2025-06-20_at_01.22.39_v9srva.mov",
    component: Bills_3,
  },
  "bills-4": {
    id: "bills-4",
    name: "Project Billing & Add-ons",
    description:
      "Billing dashboard for project-based plans, add-ons, and payment status.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750357609/Screen_Recording_2025-06-20_at_01.23.17_lxwxre.mov",
    component: Bills_4,
  },
  "bills-5": {
    id: "bills-5",
    name: "Multi-Plan Billing Portal",
    description:
      "Portal for managing multiple plans, add-ons, and billing cycles.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750357610/Screen_Recording_2025-06-20_at_01.23.43_wlsdcb.mov",
    component: Bills_5,
  },
  "bills-6": {
    id: "bills-6",
    name: "Modern SaaS Billing Overview",
    description:
      "Modern dashboard for SaaS billing, plan management, and add-on tracking.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750357608/Screen_Recording_2025-06-20_at_01.24.05_ijuxn0.mov",
    component: Bills_6,
  },
  "bills-7": {
    id: "bills-7",
    name: "B2B SaaS Billing Dashboard",
    description:
      "Advanced B2B dashboard for managing plans, add-ons, payment methods, and billing history.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750361070/Bills-7_apqaqb.mov",
    component: Bills_7,
  },
  "bills-8": {
    id: "bills-8",
    name: "Enterprise Billing & Plans Portal",
    description:
      "Enterprise dashboard for plan management, add-ons, and billing with navigation and analytics.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750361070/Bills-8_yvxewc.mov",
    component: Bills_8,
  },
  "bills-9": {
    id: "bills-9",
    name: "Animated Subscription Billing",
    description:
      "Modern dashboard with animated add-on selection, plan management, and detailed billing.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750361381/Bills-9_twiefj.mov",
    component: Bills_9,
  },
  "bills-10": {
    id: "bills-10",
    name: "Team Subscription & Add-ons",
    description:
      "Dashboard for team-based SaaS plans, add-ons, and billing with tabbed navigation.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750361607/Bills-10_xbwi1r.mov",
    component: Bills_10,
  },
  "bills-11": {
    id: "bills-11",
    name: "Feature-Rich Billing Dashboard",
    description:
      "Feature-rich dashboard for plan selection, add-on toggling, and invoice management.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750361606/Bills-11_ldpqv9.mov",
    component: Bills_11,
  },
  "bills-12": {
    id: "bills-12",
    name: "Ultimate SaaS Billing Suite",
    description:
      "Comprehensive SaaS billing suite with navigation, plan management, add-ons, and usage tracking.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750361604/Bills-12_weu8bx.mov",
    component: Bills_12,
  },

  "api_test-1": {
    id: "api_test-1",
    name: "Minecraft RCON Dashboard",
    description:
      "Advanced RCON dashboard for Minecraft server management with command history and validation.",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750374500/Screenshot_2025-06-20_at_05.51.36_xm4rfs.png",
    component: API_Test_1,
  },
  "api_test-2": {
    id: "api_test-2",
    name: "Animated RCON Admin Panel",
    description:
      "RCON admin panel with animated text effects and command execution interface.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750374583/Screen_Recording_2025-06-20_at_05.49.45_fry3rp.mov",
    component: API_Test_2,
  },
  "api_test-3": {
    id: "api_test-3",
    name: "Simple RCON Dashboard",
    description:
      "Clean and simple RCON dashboard for Minecraft server command execution.",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750374499/Screenshot_2025-06-20_at_05.50.50_s6irwx.png",
    component: API_Test_3,
  },
  "api_test-4": {
    id: "api_test-4",
    name: "Enhanced RCON Dashboard",
    description:
      "Feature-rich RCON dashboard with glow effects, connection status, and command history.",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750374500/Screenshot_2025-06-20_at_05.51.12_dknzbz.png",
    component: API_Test_4,
  },

  "marketplace-1": {
    id: "marketplace-1",
    name: "Add-Ons Marketplace",
    description:
      "Interactive marketplace for SaaS add-ons with cart functionality and category filtering.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750375616/marketplace-1_mcgjtc.mov",
    component: Marketplace_1,
  },
  "marketplace-2": {
    id: "marketplace-2",
    name: "Premium Add-Ons Store",
    description:
      "Feature-rich add-ons marketplace with categorized products and shopping cart.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750375326/marketplace-2_jycelc.mov",
    component: Marketplace_2,
  },
  "marketplace-3": {
    id: "marketplace-3",
    name: "Add-Ons Selection Hub",
    description:
      "Comprehensive add-ons marketplace with quantity controls and total cost calculation.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750375323/marketplace-3_eltydm.mov",
    component: Marketplace_3,
  },
  "marketplace-4": {
    id: "marketplace-4",
    name: "Simple Add-Ons Store",
    description:
      "Clean add-ons marketplace with checkbox selection and quantity management.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750375317/marketplace-4_kkmlxk.mov",
    component: Marketplace_4,
  },
  "marketplace-5": {
    id: "marketplace-5",
    name: "Advanced Add-Ons Marketplace",
    description:
      "Sophisticated add-ons marketplace with detailed cards, features list, and order summary.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750375331/marketplace-5_mosjlq.mov",
    component: Marketplace_5,
  },
  "marketplace-6": {
    id: "marketplace-6",
    name: "Animated Add-Ons Store",
    description:
      "Modern add-ons marketplace with animations, color-coded categories, and cart summary.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750375319/marketplace-6_prijzi.mov",
    component: Marketplace_6,
  },

  "footer-1": {
    id: "footer-1",
    name: "Simple Footer",
    description:
      "Clean and minimal footer with social links and copyright information.",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750374500/Screenshot_2025-06-20_at_05.51.12_dknzbz.png",
    component: FooterBlock1,
  },
  "footer-2": {
    id: "footer-2",
    name: "Multi-Column Footer",
    description:
      "Comprehensive footer with brand section and organized link columns.",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750374500/Screenshot_2025-06-20_at_05.51.12_dknzbz.png",
    component: FooterBlock2,
  },
  "footer-3": {
    id: "footer-3",
    name: "Branded Footer",
    description:
      "Professional footer with brand identity and structured navigation links.",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750374500/Screenshot_2025-06-20_at_05.51.12_dknzbz.png",
    component: FooterBlock3,
  },
  "footer-4": {
    id: "footer-4",
    name: "Enterprise Footer",
    description:
      "Full-featured footer with comprehensive links and social media integration.",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750374500/Screenshot_2025-06-20_at_05.51.12_dknzbz.png",
    component: FooterBlock4,
  },
};

// Static block categories
export const staticBlockCategories: BlockCategory[] = [
  {
    id: "overview",
    title: "Overview",
    description: "Welcome to the ShadCN Blocks Library",
  },
  {
    id: "hero",
    title: "Hero",
    description: "Hero sections and landing page headers",
    blocks: [
      staticBlocksWithComponents["hero-1"],
      staticBlocksWithComponents["hero-2"],
      staticBlocksWithComponents["hero-3"],
      staticBlocksWithComponents["hero-4"],
      staticBlocksWithComponents["hero-5"],
    ],
  },

  {
    id: "marketplace",
    title: "Marketplace",
    description:
      "Marketplaces blocks UI for SaaS platforms with shopping carts and product management",
    image:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750375678/Screenshot_2025-06-20_at_06.27.51_kdn5m6.png",
    blocks: [
      staticBlocksWithComponents["marketplace-1"],
      staticBlocksWithComponents["marketplace-2"],
      staticBlocksWithComponents["marketplace-3"],
      staticBlocksWithComponents["marketplace-4"],
      staticBlocksWithComponents["marketplace-5"],
      staticBlocksWithComponents["marketplace-6"],
    ],
  },

  {
    id: "footer",
    title: "Footer",
    description:
      "Website footer components with navigation, social links, and branding",
    image:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750375678/Screenshot_2025-06-20_at_06.27.51_kdn5m6.png",
    blocks: [
      staticBlocksWithComponents["footer-1"],
      staticBlocksWithComponents["footer-2"],
      staticBlocksWithComponents["footer-3"],
      staticBlocksWithComponents["footer-4"],
    ],
  },

  {
    id: "bills",
    title: "Dashboard Bills",
    description: "Dashboard to show bills",
    image:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750374794/Screenshot_2025-06-20_at_06.13.06_bq6ua0.png",
    blocks: [
      staticBlocksWithComponents["bills-1"],
      staticBlocksWithComponents["bills-2"],
      staticBlocksWithComponents["bills-3"],
      staticBlocksWithComponents["bills-4"],
      staticBlocksWithComponents["bills-5"],
      staticBlocksWithComponents["bills-6"],
      staticBlocksWithComponents["bills-7"],
      staticBlocksWithComponents["bills-8"],
      staticBlocksWithComponents["bills-9"],
      staticBlocksWithComponents["bills-10"],
      staticBlocksWithComponents["bills-11"],
      staticBlocksWithComponents["bills-12"],
    ],
  },

  {
    id: "api_test",
    title: "RCON Dashboards",
    description:
      "Minecraft RCON (Remote Console) dashboards for server management and command execution",
    image:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750374719/Screenshot_2025-06-20_at_06.11.53_fszjlf.png",
    blocks: [
      staticBlocksWithComponents["api_test-1"],
      staticBlocksWithComponents["api_test-2"],
      staticBlocksWithComponents["api_test-3"],
      staticBlocksWithComponents["api_test-4"],
    ],
  },
];
