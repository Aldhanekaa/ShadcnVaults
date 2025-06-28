import { HeroBlock1 } from "@/vaults/blocks/hero/hero-1";
import { HeroBlock2 } from "@/vaults/blocks/hero/hero-2";
import { HeroBlock3 } from "@/vaults/blocks/hero/hero-3";
import { HeroBlock4 } from "@/vaults/blocks/hero/hero-4";
import { HeroBlock5 } from "@/vaults/blocks/hero/hero-5";

import { FooterBlock1 } from "@/vaults/blocks/footer/footer-1";
import { FooterBlock2 } from "@/vaults/blocks/footer/footer-2";

import { FeatureBlock1 } from "@/vaults/blocks/feature/feature-1";
import { FeatureBlock2 } from "@/vaults/blocks/feature/feature-2";
import { FeatureBlock3 } from "@/vaults/blocks/feature/feature-3";
import { FeatureBlock4 } from "@/vaults/blocks/feature/feature-4";

import { LoginBlock1 } from "@/vaults/blocks/auth/auth-1";
import { LoginBlock2 } from "@/vaults/blocks/auth/auth-2";
import { LoginBlock3 } from "@/vaults/blocks/auth/auth-3";
import { LoginBlock4 } from "@/vaults/blocks/auth/auth-4";
import { LoginBlock5 } from "@/vaults/blocks/auth/auth-5";
import { LoginBlock6 } from "@/vaults/blocks/auth/auth-6";
import { LoginBlock7 } from "@/vaults/blocks/auth/auth-7";

import Bills_1 from "@/vaults/blocks/bills/bills-1";
import Bills_2 from "@/vaults/blocks/bills/bills-2";
import Bills_3 from "@/vaults/blocks/bills/bills-3";
import Bills_4 from "@/vaults/blocks/bills/bills-4";
import Bills_5 from "@/vaults/blocks/bills/bills-5";
import Bills_6 from "@/vaults/blocks/bills/bills-6";
import Bills_7 from "@/vaults/blocks/bills/bills-7";
import Bills_8 from "@/vaults/blocks/bills/bills-8";
import Bills_9 from "@/vaults/blocks/bills/bills-9";
import Bills_10 from "@/vaults/blocks/bills/bills-10";
import Bills_11 from "@/vaults/blocks/bills/bills-11";
import Bills_12 from "@/vaults/blocks/bills/bills-12";

import API_Test_1 from "@/vaults/blocks/api_test/api_test-1";
import API_Test_2 from "@/vaults/blocks/api_test/api_test-2";
import API_Test_3 from "@/vaults/blocks/api_test/api_test-3";
import API_Test_4 from "@/vaults/blocks/api_test/api_test-4";

import Marketplace_1 from "@/vaults/blocks/marketplace/marketplace-1";
import Marketplace_2 from "@/vaults/blocks/marketplace/marketplace-2";
import Marketplace_3 from "@/vaults/blocks/marketplace/marketplace-3";
import Marketplace_4 from "@/vaults/blocks/marketplace/marketplace-4";
import Marketplace_5 from "@/vaults/blocks/marketplace/marketplace-5";
import Marketplace_6 from "@/vaults/blocks/marketplace/marketplace-6";

import Monitoring_1 from "@/vaults/blocks/monitoring/monitoring-1";
import Monitoring_2 from "@/vaults/blocks/monitoring/monitoring-2";
import Monitoring_3 from "@/vaults/blocks/monitoring/monitoring-3";
import Monitoring_4 from "@/vaults/blocks/monitoring/monitoring-4";
import Monitoring_5 from "@/vaults/blocks/monitoring/monitoring-5";
import Monitoring_6 from "@/vaults/blocks/monitoring/monitoring-6";
import Monitoring_7 from "@/vaults/blocks/monitoring/monitoring-7";
import Monitoring_8 from "@/vaults/blocks/monitoring/monitoring-8";
import Monitoring_9 from "@/vaults/blocks/monitoring/monitoring-9";
import Monitoring_10 from "@/vaults/blocks/monitoring/monitoring-10";
import Monitoring_11 from "@/vaults/blocks/monitoring/monitoring-11";
import Monitoring_12 from "@/vaults/blocks/monitoring/monitoring-12";
import Monitoring_13 from "@/vaults/blocks/monitoring/monitoring-13";
import Monitoring_14 from "@/vaults/blocks/monitoring/monitoring-14";

import Banking_1 from "@/vaults/blocks/banking/banking-1";
import Banking_2 from "@/vaults/blocks/banking/banking-2";
import Banking_3 from "@/vaults/blocks/banking/banking-3";
import Banking_4 from "@/vaults/blocks/banking/banking-4";
import Banking_5 from "@/vaults/blocks/banking/banking-5";

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
  keywords: string[];
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

  "footer-1": {
    id: "footer-1",
    name: "Footer One",
    description: "whatever",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750603089/Screenshot_2025-06-22_at_21.37.54_wulcc3.png",
    component: FooterBlock1,
  },
  "footer-2": {
    id: "footer-2",
    name: "Footer Two",
    description: "whatever",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750603090/Screenshot_2025-06-22_at_21.38.05_nluo44.png",
    component: FooterBlock2,
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

  "feature-1": {
    id: "feature-1",
    name: "Feature Grid",
    description:
      "3-column feature grid layout with icons and descriptions for showcasing product capabilities.",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750379379/Screenshot_2025-06-20_at_07.29.18_hqdocm.png",
    component: FeatureBlock1,
  },
  "feature-2": {
    id: "feature-2",
    name: "Feature Showcase",
    description:
      "Two-column layout with feature list and visual mockup for comprehensive product presentation.",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750379277/Screenshot_2025-06-20_at_07.27.35_isz7ui.png",
    component: FeatureBlock2,
  },
  "feature-3": {
    id: "feature-3",
    name: "Feature Cards with Badges",
    description:
      "Interactive feature cards with badges, icons, and call-to-action buttons for enhanced engagement.",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750379388/Screenshot_2025-06-20_at_07.29.42_fwp15m.png",
    component: FeatureBlock3,
  },
  "feature-4": {
    id: "feature-4",
    name: "Interactive Feature Tabs",
    description:
      "Tabbed feature showcase with images, detailed descriptions, and interactive navigation.",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750379443/Screenshot_2025-06-20_at_07.30.33_vraxkd.png",
    component: FeatureBlock4,
  },

  "auth-1": {
    id: "auth-1",
    name: "Simple Login",
    description:
      "Clean and minimal login form with email, password, and remember me functionality.",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750388006/Screenshot_2025-06-20_at_09.53.09_ixdg7v.png",
    component: LoginBlock1,
  },
  "auth-2": {
    id: "auth-2",
    name: "Social Login",
    description:
      "Login form with social authentication options (Google, GitHub) and email/password fallback.",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750388020/Screenshot_2025-06-20_at_09.53.24_pammcv.png",
    component: LoginBlock2,
  },
  "auth-3": {
    id: "auth-3",
    name: "Split Screen Login",
    description:
      "Modern split-screen login layout with branding section and comprehensive form.",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750388062/Screenshot_2025-06-20_at_09.53.37_q4i1be.png",
    component: LoginBlock3,
  },
  "auth-4": {
    id: "auth-4",
    name: "Signup Form",
    description:
      "Comprehensive user registration form with social signup, validation, and terms acceptance.",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750388051/Screenshot_2025-06-20_at_09.53.48_jxv1fu.png",
    component: LoginBlock4,
  },
  "auth-5": {
    id: "auth-5",
    name: "Forgot Password",
    description:
      "Password reset form with email verification and confirmation screen.",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750388118/Screenshot_2025-06-20_at_09.54.06_apyei7.png",
    component: LoginBlock5,
  },
  "auth-6": {
    id: "auth-6",
    name: "Reset Password",
    description:
      "Password reset form with strength indicator and real-time validation requirements.",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750388121/Screenshot_2025-06-20_at_09.54.20_hxyvhi.png",
    component: LoginBlock6,
  },
  "auth-7": {
    id: "auth-7",
    name: "Two-Factor Login",
    description:
      "Login form with two-factor authentication and 6-digit code verification.",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750388076/Screenshot_2025-06-20_at_09.54.32_i6gfcf.png",
    component: LoginBlock7,
  },

  "monitoring-1": {
    id: "monitoring-1",
    name: "Database Backup Dashboard",
    description:
      "Comprehensive database backup management dashboard with filtering, sorting, and bulk operations.",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750384424/Screenshot_2025-06-20_at_08.53.24_rur46r.png",
    component: Monitoring_1,
  },
  "monitoring-2": {
    id: "monitoring-2",
    name: "Backup Manager with Logs",
    description:
      "Database backup manager with detailed logs, status tracking, and real-time monitoring capabilities.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750384535/Screen_Recording_2025-06-20_at_08.54.52_c2glfq.mov",
    component: Monitoring_2,
  },
  "monitoring-3": {
    id: "monitoring-3",
    name: "Advanced Backup Dashboard",
    description:
      "Advanced backup dashboard with tabbed interface, detailed metrics, and comprehensive backup management.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750384719/Screen_Recording_2025-06-20_at_08.58.07_unoz7i.mov",
    component: Monitoring_3,
  },
  "monitoring-4": {
    id: "monitoring-4",
    name: "Backup Monitoring Dashboard",
    description:
      "Real-time backup monitoring dashboard with status indicators, compression ratios, and retention management.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750384972/Screen_Recording_2025-06-20_at_09.02.30_jdhs0x.mov",
    component: Monitoring_4,
  },
  "monitoring-5": {
    id: "monitoring-5",
    name: "Enterprise Backup Manager",
    description:
      "Enterprise-grade backup management system with advanced table features, filtering, and detailed backup analytics.",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750385000/Screenshot_2025-06-20_at_09.03.15_wf4vsd.png",
    component: Monitoring_5,
  },
  "monitoring-6": {
    id: "monitoring-6",
    name: "VPS Management Dashboard",
    description:
      "Comprehensive VPS management dashboard for creating, monitoring, and managing VPS parents, shared, and dedicated instances with real-time status and activity logs.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750385857/monitoring-6_f0ghyk.mov",
    component: Monitoring_6,
  },
  "monitoring-7": {
    id: "monitoring-7",
    name: "Animated VPS Admin Panel",
    description:
      "Feature-rich VPS admin panel with animated transitions, resource usage indicators, and advanced controls for shared and dedicated VPS instances.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750385842/monitoring-7_nysapt.mov",
    component: Monitoring_7,
  },
  "monitoring-8": {
    id: "monitoring-8",
    name: "Modern VPS Admin Console",
    description:
      "Modern VPS admin console with sidebar navigation, responsive layout, and advanced filtering for managing VPS parents, shared, and dedicated servers.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750385849/monitoring-8_h35dd1.mov",
    component: Monitoring_8,
  },
  "monitoring-9": {
    id: "monitoring-9",
    name: "VPS Resource Analytics Dashboard",
    description:
      "Advanced VPS analytics dashboard with expandable resource usage charts, customer details, and real-time monitoring for all VPS types.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750385846/monitoring-9_oos7p6.mov",
    component: Monitoring_9,
  },
  "monitoring-10": {
    id: "monitoring-10",
    name: "VPS Management & Monitoring Dashboard",
    description:
      "Comprehensive dashboard for managing and monitoring VPS instances, including resource usage, customer details, and real-time status with detailed dialogs.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750387509/monitoring-10_yltbrm.mov",
    component: Monitoring_10,
  },
  "monitoring-11": {
    id: "monitoring-11",
    name: "Advanced VPS Admin Panel",
    description:
      "Feature-rich VPS admin panel with customer management, resource tracking, status controls, and advanced table features for shared and dedicated VPS.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750387524/monitoring-11_dlyp4s.mov",
    component: Monitoring_11,
  },
  "monitoring-12": {
    id: "monitoring-12",
    name: "VPS Instance CRUD Dashboard",
    description:
      "Modern dashboard for creating, editing, and deleting VPS instances with customer assignment, resource allocation, and confirmation dialogs.",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750387508/monitoring-12_uz94it.png",
    component: Monitoring_12,
  },
  "monitoring-13": {
    id: "monitoring-13",
    name: "VPS Instance Management UI",
    description:
      "Interactive UI for managing VPS instances, including add/edit dialogs, resource and customer details, and advanced filtering and search.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750387511/monitoring-13_wb3rwy.mov",
    component: Monitoring_13,
  },
  "monitoring-14": {
    id: "monitoring-14",
    name: "Animated VPS Management Suite",
    description:
      "Animated and modern VPS management suite with advanced stats, customer analytics, revenue tracking, and editable VPS instance table.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750387512/monitoring-14_z1ma05.mov",
    component: Monitoring_14,
  },

  "banking-1": {
    id: "banking-1",
    name: "Money Transfer Dashboard",
    description:
      "Comprehensive money transfer dashboard with transaction monitoring, status tracking, and fee breakdown.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750385512/banking-1_ccjfa6.mov",
    component: Banking_1,
  },
  "banking-2": {
    id: "banking-2",
    name: "Advanced Transaction Table",
    description:
      "Feature-rich transaction table with advanced filtering, sorting, and detailed money transfer analytics.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750385513/banking-2_dg3p7i.mov",
    component: Banking_2,
  },
  "banking-3": {
    id: "banking-3",
    name: "Animated Transaction List",
    description:
      "Modern animated transaction list with smooth transitions, status indicators, and detailed fee breakdown.",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750385806/banking-3_i6ir8t.png",
    component: Banking_3,
  },
  "banking-4": {
    id: "banking-4",
    name: "Enhanced Transaction Dashboard",
    description:
      "Advanced transaction dashboard with status badges, revenue tracking, and comprehensive money transfer management.",
    video:
      "https://res.cloudinary.com/dnrtsh66v/video/upload/v1750385808/banking-4_l5pshm.mov",
    component: Banking_4,
  },
  "banking-5": {
    id: "banking-5",
    name: "Modern Transaction Table",
    description:
      "Modern transaction table with TanStack Table integration, column visibility controls, and advanced filtering.",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750385806/banking-5_ztbfsg.png",
    component: Banking_5,
  },
};

export const staticBlockQuantities = Object.keys(
  staticBlocksWithComponents
).length;

// Static block categories

export const staticBlockCategories: BlockCategory[] = [
  {
    id: "overview",
    title: "Overview",
    description: "Welcome to the ShadCN Blocks Library",
    keywords: [],
  },
  {
    id: "hero",
    title: "Hero",
    description: "Hero sections and landing page headers",
    keywords: ["hero", "cta", "gradient", "stats", "collaboration", "feature"],
    blocks: [
      staticBlocksWithComponents["hero-1"],
      staticBlocksWithComponents["hero-2"],
      staticBlocksWithComponents["hero-3"],
      staticBlocksWithComponents["hero-4"],
      staticBlocksWithComponents["hero-5"],
    ],
  },

  {
    id: "feature",
    title: "Feature",
    description:
      "Feature showcase components for highlighting product capabilities and benefits",
    image:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750379277/Screenshot_2025-06-20_at_07.27.35_isz7ui.png",
    keywords: ["feature", "grid", "showcase", "cards", "badges", "tabs"],
    blocks: [
      staticBlocksWithComponents["feature-1"],
      staticBlocksWithComponents["feature-2"],
      staticBlocksWithComponents["feature-3"],
      staticBlocksWithComponents["feature-4"],
    ],
  },

  {
    id: "footer",
    title: "Footer",
    description:
      "Feature showcase components for highlighting product capabilities and benefits",
    image:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750603090/Screenshot_2025-06-22_at_21.38.05_nluo44.png",
    keywords: ["footer"],
    blocks: [
      staticBlocksWithComponents["footer-1"],
      staticBlocksWithComponents["footer-2"],
      // staticBlocksWithComponents["footer-3"],
      // staticBlocksWithComponents["footer-4"],
    ],
  },

  {
    id: "marketplace",
    title: "Marketplace",
    description:
      "Marketplaces blocks UI for SaaS platforms with shopping carts and product management",
    image:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750375678/Screenshot_2025-06-20_at_06.27.51_kdn5m6.png",
    keywords: [
      "marketplace",
      "addons",
      "cart",
      "store",
      "products",
      "shopping",
      "selection",
      "animated",
    ],
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
    id: "bills",
    title: "Dashboard Bills",
    description: "Dashboard to show bills",
    image:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750374794/Screenshot_2025-06-20_at_06.13.06_bq6ua0.png",
    keywords: [
      "billing",
      "dashboard",
      "plans",
      "addons",
      "subscription",
      "portal",
      "suite",
      "invoice",
    ],
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
    keywords: [
      "rcon",
      "dashboard",
      "minecraft",
      "admin",
      "command",
      "animated",
    ],
    blocks: [
      staticBlocksWithComponents["api_test-1"],
      staticBlocksWithComponents["api_test-2"],
      staticBlocksWithComponents["api_test-3"],
      staticBlocksWithComponents["api_test-4"],
    ],
  },

  {
    id: "auth",
    title: "Auth",
    description:
      "Complete authentication system components including login, signup, password reset, and two-factor authentication",
    image:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750387918/Screenshot_2025-06-20_at_09.51.53_swnunx.png",
    keywords: [
      "login",
      "signup",
      "password",
      "reset",
      "social",
      "twofactor",
      "authentication",
    ],
    blocks: [
      staticBlocksWithComponents["auth-1"],
      staticBlocksWithComponents["auth-2"],
      staticBlocksWithComponents["auth-3"],
      staticBlocksWithComponents["auth-4"],
      staticBlocksWithComponents["auth-5"],
      staticBlocksWithComponents["auth-6"],
      staticBlocksWithComponents["auth-7"],
    ],
  },

  {
    id: "monitoring",
    title: "System Monitoring",
    description:
      "System monitoring and backup management dashboards for tracking database backups, system health, and administrative tasks",
    image:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750385071/Screenshot_2025-06-20_at_09.04.26_yaxixk.png",
    keywords: [
      "backup",
      "monitoring",
      "dashboard",
      "vps",
      "analytics",
      "admin",
      "management",
      "resource",
      "instance",
    ],
    blocks: [
      staticBlocksWithComponents["monitoring-1"],
      staticBlocksWithComponents["monitoring-2"],
      staticBlocksWithComponents["monitoring-3"],
      staticBlocksWithComponents["monitoring-4"],
      staticBlocksWithComponents["monitoring-5"],
      staticBlocksWithComponents["monitoring-6"],
      staticBlocksWithComponents["monitoring-7"],
      staticBlocksWithComponents["monitoring-8"],
      staticBlocksWithComponents["monitoring-9"],
      staticBlocksWithComponents["monitoring-10"],
      staticBlocksWithComponents["monitoring-11"],
      staticBlocksWithComponents["monitoring-12"],
      staticBlocksWithComponents["monitoring-13"],
      staticBlocksWithComponents["monitoring-14"],
    ],
  },

  {
    id: "banking",
    title: "Banking ",
    description:
      "Comprehensive money transfer transaction management dashboards with payment tracking, fee breakdown, and status monitoring",
    image:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750386367/Screenshot_2025-06-20_at_09.25.58_gg4hiu.png",
    keywords: [
      "transaction",
      "dashboard",
      "money",
      "transfer",
      "analytics",
      "table",
      "revenue",
      "status",
    ],
    blocks: [
      staticBlocksWithComponents["banking-1"],
      staticBlocksWithComponents["banking-2"],
      staticBlocksWithComponents["banking-3"],
      staticBlocksWithComponents["banking-4"],
      staticBlocksWithComponents["banking-5"],
    ],
  },
];
