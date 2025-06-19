import { HeroBlock1 } from "@/blocks/hero/hero-1";
import { HeroBlock2 } from "@/blocks/hero/hero-2";

import Bills_1 from "@/blocks/bills/bills-1";
import Bills_2 from "@/blocks/bills/bills-2";
import Bills_3 from "@/blocks/bills/bills-3";
import Bills_4 from "@/blocks/bills/bills-4";
import Bills_5 from "@/blocks/bills/bills-5";
import Bills_6 from "@/blocks/bills/bills-6";

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
