import { HeroBlock1 } from "@/blocks/hero/hero-1";
import { HeroBlock2 } from "@/blocks/hero/hero-2";

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
  blocks?: BlockMetadata[];
}

// Static block data with components
export const staticBlocksWithComponents: Record<string, BlockWithComponent> = {
  "hero-1": {
    id: "hero-1",
    name: "Simple Hero",
    description: "Clean hero with title and CTA button",
    video:
      "https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/newProfileItem/d898be8a-7037-4c71-af0c-8997239b050d.mp4?_a=DATAdtAAZAA0",
    component: HeroBlock1,
  },
  "hero-2": {
    id: "hero-2",
    name: "Hero with Image",
    description: "Hero section with stunning background image",
    photo:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
    component: HeroBlock2,
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
    ],
  },
  {
    id: "bills",
    title: "Dashboard Bills",
    description: "Dashboard to show bills",
    blocks: [
      staticBlocksWithComponents["bills-1"],
      staticBlocksWithComponents["bills-2"],
      staticBlocksWithComponents["bills-3"],
      staticBlocksWithComponents["bills-4"],
      staticBlocksWithComponents["bills-5"],
      staticBlocksWithComponents["bills-6"],
    ],
  },
];
