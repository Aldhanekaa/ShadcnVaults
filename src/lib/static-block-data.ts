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

import Confidential_1 from "@/vaults/blocks/confidential/confidential-1";
import Confidential_2 from "@/vaults/blocks/confidential/confidential-2";
import Confidential_3 from "@/vaults/blocks/confidential/confidential-3";
import Confidential_4 from "@/vaults/blocks/confidential/confidential-4";
import Confidential_5 from "@/vaults/blocks/confidential/confidential-5";

import Pricing_1 from "@/vaults/blocks/pricing/pricing-1";
import Pricing_2 from "@/vaults/blocks/pricing/pricing-2";

import PayAsYouGo_1 from "@/vaults/blocks/payasyougo/payasyougo-1";
import PayAsYouGo_2 from "@/vaults/blocks/payasyougo/payasyougo-2";

import ReviewForm_1 from "@/vaults/blocks/reviewform/reviewform-1";

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
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/11477e020278442a456ad86ba91bb8a0aa6d6246_screenshot_2025-07-30_at_07.55.03.png",
    component: HeroBlock1,
  },
  "hero-2": {
    id: "hero-2",
    name: "Hero with Image",
    description: "Hero section with stunning background image",
    photo:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/d23977e235211390a1fa846b55e9f9b436ce0c85_screenshot_2025-07-30_at_07.55.20.png",
    component: HeroBlock2,
  },
  "hero-3": {
    id: "hero-3",
    name: "Gradient Hero with Stats",
    description:
      "Modern hero section with gradient background, performance stats, and dual CTAs",
    photo:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/cd9ddffd4984981724e83b2c01c33c4e4e6bdf38_screenshot_2025-07-30_at_07.55.43.png",
    component: HeroBlock3,
  },
  "hero-4": {
    id: "hero-4",
    name: "Collaboration Hero",
    description:
      "Two-column hero with team collaboration features and image with status indicator",
    photo:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/6b86e9d6250519288719c72ccbf94503e46494c8_screenshot_2025-07-30_at_07.56.11.png",
    component: HeroBlock4,
  },
  "hero-5": {
    id: "hero-5",
    name: "Feature Showcase Hero",
    description:
      "Hero section with feature cards highlighting collaboration, speed, and security",
    photo:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/4afeccd83c1195ad15ea8d2fd8ee75c04bfa6d51_screenshot_2025-07-30_at_07.56.59.png",
    component: HeroBlock5,
  },

  "footer-1": {
    id: "footer-1",
    name: "Footer One",
    description: "whatever",
    photo:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/7e5f4909176035e78a3347d61c756cd94dc1d1ab_screenshot_2025-07-30_at_07.35.41.png",
    component: FooterBlock1,
  },
  "footer-2": {
    id: "footer-2",
    name: "Footer Two",
    description: "whatever",
    photo:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/0001644decaed582b9bd61641f36c63a9e0403c1_screenshot_2025-07-30_at_07.36.00.png",
    component: FooterBlock2,
  },

  "bills-1": {
    id: "bills-1",
    name: "SaaS Billing Dashboard",
    description:
      "Customer admin dashboard for managing SaaS plans, add-ons, and current bills.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/1970f0ab2ba95fe6c423f36d6a43e8ce97ba5067_bills-1.mp4",
    component: Bills_1,
  },
  "bills-2": {
    id: "bills-2",
    name: "Team Billing & Add-ons",
    description:
      "Dashboard for team-based SaaS billing, plan selection, and add-on management.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/3b3e1d1d08e5580f74ae98b7089dc22990cda036_bills-2.mp4",
    component: Bills_2,
  },
  "bills-3": {
    id: "bills-3",
    name: "Business Subscription Billing",
    description:
      "Subscription dashboard for business plans, add-ons, and invoice breakdown.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/15f48bfba9eef5cecc435ac2b93cacf805322c94_bills-3.mp4",
    component: Bills_3,
  },
  "bills-4": {
    id: "bills-4",
    name: "Project Billing & Add-ons",
    description:
      "Billing dashboard for project-based plans, add-ons, and payment status.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/3734928decd21882a00a266bd1da4c9c8113389d_bills-4.mp4",
    component: Bills_4,
  },
  "bills-5": {
    id: "bills-5",
    name: "Multi-Plan Billing Portal",
    description:
      "Portal for managing multiple plans, add-ons, and billing cycles.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/48c08b813a89ef9dc935c9f0f83312296f111f05_bills-5.mp4",
    component: Bills_5,
  },
  "bills-6": {
    id: "bills-6",
    name: "Modern SaaS Billing Overview",
    description:
      "Modern dashboard for SaaS billing, plan management, and add-on tracking.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/0ba445a3d5a0c012fe9c970eed77499e68ec3cac_bills-6.mp4",
    component: Bills_6,
  },
  "bills-7": {
    id: "bills-7",
    name: "B2B SaaS Billing Dashboard",
    description:
      "Advanced B2B dashboard for managing plans, add-ons, payment methods, and billing history.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/6ece389072975771d5bc06467002cb2dd4483f9b_bills-7.mp4",
    component: Bills_7,
  },
  "bills-8": {
    id: "bills-8",
    name: "Enterprise Billing & Plans Portal",
    description:
      "Enterprise dashboard for plan management, add-ons, and billing with navigation and analytics.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/a06a6047646059cc43af09beaf65474fd7d2cfaa_bills-8.mp4",
    component: Bills_8,
  },
  "bills-9": {
    id: "bills-9",
    name: "Animated Subscription Billing",
    description:
      "Modern dashboard with animated add-on selection, plan management, and detailed billing.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/56d49eaf0a36d28e59bea297b2c3be0963ded860_bills-9.mp4",
    component: Bills_9,
  },
  "bills-10": {
    id: "bills-10",
    name: "Team Subscription & Add-ons",
    description:
      "Dashboard for team-based SaaS plans, add-ons, and billing with tabbed navigation.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/cd8c8999bccea5cb25cc14312b2b1c0b6008e43b_bills-10.mp4",
    component: Bills_10,
  },
  "bills-11": {
    id: "bills-11",
    name: "Feature-Rich Billing Dashboard",
    description:
      "Feature-rich dashboard for plan selection, add-on toggling, and invoice management.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/83f99c6d5b1d2e3aa26b3c54e2bd347f86ec0cf5_bills-11.mp4",
    component: Bills_11,
  },
  "bills-12": {
    id: "bills-12",
    name: "Ultimate SaaS Billing Suite",
    description:
      "Comprehensive SaaS billing suite with navigation, plan management, add-ons, and usage tracking.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/33c73428576176a8d19caf90e38a67a712c98476_bills-12.mp4",
    component: Bills_12,
  },

  "api_test-1": {
    id: "api_test-1",
    name: "Minecraft RCON Dashboard",
    description:
      "Advanced RCON dashboard for Minecraft server management with command history and validation.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/0364de92afee0b76218b7fe06e05cd7a69423216_apitest-1.mp4",
    component: API_Test_1,
  },
  "api_test-2": {
    id: "api_test-2",
    name: "Animated RCON Admin Panel",
    description:
      "RCON admin panel with animated text effects and command execution interface.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/e43fd22eb7d004fe8469524ba4106cea7ae54dd1_apitest-2.mp4",
    component: API_Test_2,
  },
  "api_test-3": {
    id: "api_test-3",
    name: "Simple RCON Dashboard",
    description:
      "Clean and simple RCON dashboard for Minecraft server command execution.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/aa2bf3e49a3359906778718e79e539595e66901d_apitest-3.mp4",
    component: API_Test_3,
  },
  "api_test-4": {
    id: "api_test-4",
    name: "Enhanced RCON Dashboard",
    description:
      "Feature-rich RCON dashboard with glow effects, connection status, and command history.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/fed1648c6f6716b7f2b7e5f0b7bdda4317bab926_apitest-4.mp4",
    component: API_Test_4,
  },

  "marketplace-1": {
    id: "marketplace-1",
    name: "Add-Ons Marketplace",
    description:
      "Interactive marketplace for SaaS add-ons with cart functionality and category filtering.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/103f4d698a7aa70d5b5b95fe67d59f130e533ea2_marketplace-1.mp4",
    component: Marketplace_1,
  },
  "marketplace-2": {
    id: "marketplace-2",
    name: "Premium Add-Ons Store",
    description:
      "Feature-rich add-ons marketplace with categorized products and shopping cart.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/2e3ed35f9a0a0fcd4de6fef5fbe4470d0a75c4ea_marketplace-2.mp4",
    component: Marketplace_2,
  },
  "marketplace-3": {
    id: "marketplace-3",
    name: "Add-Ons Selection Hub",
    description:
      "Comprehensive add-ons marketplace with quantity controls and total cost calculation.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/41c2e7d268a81e8e3430890c41435a29755abd77_marketplace-3.mp4",
    component: Marketplace_3,
  },
  "marketplace-4": {
    id: "marketplace-4",
    name: "Simple Add-Ons Store",
    description:
      "Clean add-ons marketplace with checkbox selection and quantity management.",
    photo:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/aedffccf6c8d63de8cf615de910cf0ab91a48789_screenshot_2025-07-30_at_09.16.00.png",
    component: Marketplace_4,
  },
  "marketplace-5": {
    id: "marketplace-5",
    name: "Advanced Add-Ons Marketplace",
    description:
      "Sophisticated add-ons marketplace with detailed cards, features list, and order summary.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/e0327b5c9ede01a85ee135cf88c8db620ffbb3ab_marketing-5.mp4",
    component: Marketplace_5,
  },
  "marketplace-6": {
    id: "marketplace-6",
    name: "Animated Add-Ons Store",
    description:
      "Modern add-ons marketplace with animations, color-coded categories, and cart summary.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/5d40908a6475d12a78b77da21e57f9822b8c7d23_marketing-6.mp4",
    component: Marketplace_6,
  },

  "feature-1": {
    id: "feature-1",
    name: "Feature Grid",
    description:
      "3-column feature grid layout with icons and descriptions for showcasing product capabilities.",
    photo:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/87fb89c037db52c839fcddf6d42be50321e2cf56_screenshot_2025-07-30_at_07.29.47.png",
    component: FeatureBlock1,
  },
  "feature-2": {
    id: "feature-2",
    name: "Feature Showcase",
    description:
      "Two-column layout with feature list and visual mockup for comprehensive product presentation.",
    photo:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/76797a981f436e722660a75ef3fd9662de1fcb7b_screenshot_2025-07-29_at_19.33.28.png",
    component: FeatureBlock2,
  },
  "feature-3": {
    id: "feature-3",
    name: "Feature Cards with Badges",
    description:
      "Interactive feature cards with badges, icons, and call-to-action buttons for enhanced engagement.",
    photo:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/31c6639e9c592b30bb142b9cd6aeab6b28bab6c3_screenshot_2025-07-29_at_19.34.53.png",
    component: FeatureBlock3,
  },
  "feature-4": {
    id: "feature-4",
    name: "Interactive Feature Tabs",
    description:
      "Tabbed feature showcase with images, detailed descriptions, and interactive navigation.",
    photo:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/e1010a9af248a0bac55779919615ed565771c077_screenshot_2025-07-29_at_19.35.07.png",
    component: FeatureBlock4,
  },

  "auth-1": {
    id: "auth-1",
    name: "Simple Login",
    description:
      "Clean and minimal login form with email, password, and remember me functionality.",
    photo:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/860ff1aba3b584e97eee4358f645a15ac46d7475_screenshot_2025-07-29_at_19.36.23.png",
    component: LoginBlock1,
  },
  "auth-2": {
    id: "auth-2",
    name: "Social Login",
    description:
      "Login form with social authentication options (Google, GitHub) and email/password fallback.",
    photo:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/8bcf0b3e6c30798f506dcc4b501762b204ba08f8_screenshot_2025-07-29_at_19.40.28.png",
    component: LoginBlock2,
  },
  "auth-3": {
    id: "auth-3",
    name: "Split Screen Login",
    description:
      "Modern split-screen login layout with branding section and comprehensive form.",
    photo:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/65347b47476dfd6dd1a38362e82a2912d4c18c0f_screenshot_2025-07-30_at_07.31.51.png",
    component: LoginBlock3,
  },
  "auth-4": {
    id: "auth-4",
    name: "Signup Form",
    description:
      "Comprehensive user registration form with social signup, validation, and terms acceptance.",
    photo:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/5c9ba51cd417f595ce976634bc8d658fafe06eba_screenshot_2025-07-30_at_07.32.15.png",
    component: LoginBlock4,
  },
  "auth-5": {
    id: "auth-5",
    name: "Forgot Password",
    description:
      "Password reset form with email verification and confirmation screen.",
    photo:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/79d72fbb9286711f1527693f0492b2fa29a27d19_screenshot_2025-07-30_at_07.32.47.png",
    component: LoginBlock5,
  },
  "auth-6": {
    id: "auth-6",
    name: "Reset Password",
    description:
      "Password reset form with strength indicator and real-time validation requirements.",
    photo:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/fc131da74d9fe1a4f4eca845558d97aa2cd183f4_screenshot_2025-07-30_at_07.33.03.png",
    component: LoginBlock6,
  },
  "auth-7": {
    id: "auth-7",
    name: "Two-Factor Login",
    description:
      "Login form with two-factor authentication and 6-digit code verification.",
    photo:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/ff2c5df6bbf8ceb299e1ce2afc001d23afb16d58_screenshot_2025-07-30_at_07.33.45.png",
    component: LoginBlock7,
  },

  "monitoring-1": {
    id: "monitoring-1",
    name: "Database Backup Dashboard",
    description:
      "Comprehensive database backup management dashboard with filtering, sorting, and bulk operations.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/0f558016b0871921aedb9dadfb41fd3b1161d8e8_monitoring-1.mp4",
    component: Monitoring_1,
  },
  "monitoring-2": {
    id: "monitoring-2",
    name: "Backup Manager with Logs",
    description:
      "Database backup manager with detailed logs, status tracking, and real-time monitoring capabilities.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/b7323ef0120b1c9b2eba83308621322c287d647e_monitoring-2.mp4",
    component: Monitoring_2,
  },
  "monitoring-3": {
    id: "monitoring-3",
    name: "Advanced Backup Dashboard",
    description:
      "Advanced backup dashboard with tabbed interface, detailed metrics, and comprehensive backup management.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/52a52068cf3a5498dfcaccb64890397f07c3c5a9_monitoring-3.mp4",
    component: Monitoring_3,
  },
  "monitoring-4": {
    id: "monitoring-4",
    name: "Backup Monitoring Dashboard",
    description:
      "Real-time backup monitoring dashboard with status indicators, compression ratios, and retention management.",
    photo:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/f22c9e6abebbecafaade67715623f08ff51adff0_screenshot_2025-07-30_at_05.11.57.png",
    component: Monitoring_4,
  },
  "monitoring-5": {
    id: "monitoring-5",
    name: "Enterprise Backup Manager",
    description:
      "Enterprise-grade backup management system with advanced table features, filtering, and detailed backup analytics.",
    photo:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/9a9cdce545e3a0bdc8b153836e524232d37f478b_screenshot_2025-07-30_at_05.12.45.png",
    component: Monitoring_5,
  },
  "monitoring-6": {
    id: "monitoring-6",
    name: "VPS Management Dashboard",
    description:
      "Comprehensive VPS management dashboard for creating, monitoring, and managing VPS parents, shared, and dedicated instances with real-time status and activity logs.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/5441bfef085de20895747cf11aca18d55ae0c924_monitoring-6.mp4",
    component: Monitoring_6,
  },
  "monitoring-7": {
    id: "monitoring-7",
    name: "Animated VPS Admin Panel",
    description:
      "Feature-rich VPS admin panel with animated transitions, resource usage indicators, and advanced controls for shared and dedicated VPS instances.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/1fdfc780f8fd357d1de9e80bfa3b0584148d8b8c_monitoring-7.mp4",
    component: Monitoring_7,
  },
  "monitoring-8": {
    id: "monitoring-8",
    name: "Modern VPS Admin Console",
    description:
      "Modern VPS admin console with sidebar navigation, responsive layout, and advanced filtering for managing VPS parents, shared, and dedicated servers.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/8179564787dc735392fa4a762ef18e6f1dcd101e_monitoring-8.mp4",
    component: Monitoring_8,
  },
  "monitoring-9": {
    id: "monitoring-9",
    name: "VPS Resource Analytics Dashboard",
    description:
      "Advanced VPS analytics dashboard with expandable resource usage charts, customer details, and real-time monitoring for all VPS types.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/4895617cac90a0e5247e3bdfdc62131ea7f97647_monitoring-9.mp4",
    component: Monitoring_9,
  },
  "monitoring-10": {
    id: "monitoring-10",
    name: "VPS Management & Monitoring Dashboard",
    description:
      "Comprehensive dashboard for managing and monitoring VPS instances, including resource usage, customer details, and real-time status with detailed dialogs.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/e648a8828520f767f6bf7cc6d0a8e90e54434db9_monitoring-10.mp4",
    component: Monitoring_10,
  },
  "monitoring-11": {
    id: "monitoring-11",
    name: "Advanced VPS Admin Panel",
    description:
      "Feature-rich VPS admin panel with customer management, resource tracking, status controls, and advanced table features for shared and dedicated VPS.",
    photo:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/2133c86e00de45daa422530059e61749bb9cd361_screenshot_2025-07-30_at_07.49.24.png",
    component: Monitoring_11,
  },
  "monitoring-12": {
    id: "monitoring-12",
    name: "VPS Instance CRUD Dashboard",
    description:
      "Modern dashboard for creating, editing, and deleting VPS instances with customer assignment, resource allocation, and confirmation dialogs.",
    photo:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/73a0e4a7419812b268334c175da70e55d6eb0c19_screenshot_2025-07-30_at_07.50.16.png",
    component: Monitoring_12,
  },
  "monitoring-13": {
    id: "monitoring-13",
    name: "VPS Instance Management UI",
    description:
      "Interactive UI for managing VPS instances, including add/edit dialogs, resource and customer details, and advanced filtering and search.",
    photo:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/576aa0e561515a2c4c1c4eded83ff730914a2f5e_screenshot_2025-07-30_at_07.50.34.png",
    component: Monitoring_13,
  },
  "monitoring-14": {
    id: "monitoring-14",
    name: "Animated VPS Management Suite",
    description:
      "Animated and modern VPS management suite with advanced stats, customer analytics, revenue tracking, and editable VPS instance table.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/a6ac704f5613dfe93f7770d16edd077fda3dd639_monitoring-14.mp4",
    component: Monitoring_14,
  },

  "banking-1": {
    id: "banking-1",
    name: "Money Transfer Dashboard",
    description:
      "Comprehensive money transfer dashboard with transaction monitoring, status tracking, and fee breakdown.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/f6e6c89576fadef1ca4b1602acf73579a1d86b6a_banking-1.mp4",
    component: Banking_1,
  },
  "banking-2": {
    id: "banking-2",
    name: "Advanced Transaction Table",
    description:
      "Feature-rich transaction table with advanced filtering, sorting, and detailed money transfer analytics.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/6f6a67761836e1d52130a727e3ade277d612ea6f_banking-2.mp4",
    component: Banking_2,
  },
  "banking-3": {
    id: "banking-3",
    name: "Animated Transaction List",
    description:
      "Modern animated transaction list with smooth transitions, status indicators, and detailed fee breakdown.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/d608ab4324f9fcc2967f7cae8c2a7010829f05cf_banking-3.mp4",
    component: Banking_3,
  },
  "banking-4": {
    id: "banking-4",
    name: "Enhanced Transaction Dashboard",
    description:
      "Advanced transaction dashboard with status badges, revenue tracking, and comprehensive money transfer management.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/02fcf2fab068aea6e65f7b46c19d936804273cfc_banking-4.mp4",
    component: Banking_4,
  },
  "banking-5": {
    id: "banking-5",
    name: "Modern Transaction Table",
    description:
      "Modern transaction table with TanStack Table integration, column visibility controls, and advanced filtering.",
    video:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/dd5a83a7c53e52d6d3a07b671ec5ed7a3301b050_banking-5.mp4",
    component: Banking_5,
  },

  "confidential-1": {
    id: "confidential-1",
    name: "Animated Access Request",
    description:
      "Interactive access request form with loading states, secure authentication badge, and administrator contact",
    photo:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/059ee3abc71530ad1f29d87f8ec60ed62c9b5be4_screenshot_2025-07-30_at_07.39.18.png",
    component: Confidential_1,
  },
  "confidential-2": {
    id: "confidential-2",
    name: "Simple Access Denied",
    description:
      "Clean access denied page with destructive styling, restricted content indicator, and navigation options",
    photo:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/9c68286dc696ab4a028809ad3310fd22e2d44b28_screenshot_2025-07-30_at_07.39.43.png",
    component: Confidential_2,
  },
  "confidential-3": {
    id: "confidential-3",
    name: "Premium Feature Upgrade",
    description:
      "Animated upgrade prompt with feature highlights, rotating icon, and interactive upgrade button",
    photo:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/73a981cbf595ec8bab615d0559c9353a114fa1e3_screenshot_2025-07-30_at_07.40.12.png",
    component: Confidential_3,
  },
  "confidential-4": {
    id: "confidential-4",
    name: "Security Alert Access Control",
    description:
      "Confidential access page with security alerts, permission levels, and administrator contact options",
    photo:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/fce50164fb853d05a413e72bee6139973878311b_screenshot_2025-07-30_at_07.40.45.png",
    component: Confidential_4,
  },
  "confidential-5": {
    id: "confidential-5",
    name: "Premium Add-on Dialog",
    description:
      "Premium feature access with upgrade dialog, benefit highlights, and subscription modal",
    photo:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/b07d76426f2a9d749d871937ee1665965bdb5983_screenshot_2025-07-30_at_07.41.00.png",
    component: Confidential_5,
  },

  "pricing-1": {
    id: "pricing-1",
    name: "Two-Tier Pricing Comparison",
    description:
      "Clean pricing comparison with Basic and Pro plans, feature checkmarks, and popular plan highlighting",
    photo:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/f35e1e1062bdbb2363fa5c1fd8d4fbed18c59f18_screenshot_2025-07-30_at_07.37.25.png",
    component: Pricing_1,
  },
  "pricing-2": {
    id: "pricing-2",
    name: "Confidential Access System",
    description:
      "Premium content access control with authentication, upgrade prompts, and animated purchase flow",
    photo:
      "https://hc-cdn.hel1.your-objectstorage.com/s/v3/e043f6531c97f25bf1a90096c630d4a3d8405ce8_screenshot_2025-07-30_at_07.37.53.png",
    component: Pricing_2,
  },

  "payasyougo-1": {
    id: "payasyougo-1",
    name: "Pay-As-You-Go Pricing Calculator",
    description:
      "Interactive resource-based pricing calculator with sliders, presets, and real-time cost breakdown",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750386367/Screenshot_2025-06-20_at_09.25.58_gg4hiu.png",
    component: PayAsYouGo_1,
  },
  "payasyougo-2": {
    id: "payasyougo-2",
    name: "Pay-As-You-Go Pricing Calculator",
    description:
      "Interactive resource-based pricing calculator with sliders, presets, and real-time cost breakdown",
    photo:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750386367/Screenshot_2025-06-20_at_09.25.58_gg4hiu.png",
    component: PayAsYouGo_2,
  },

  "reviewform-1": {
    id: "reviewform-1",
    name: "Customer Review Form",
    description:
      "Review form with rating and comment input, great for e-commerce",
    photo:
      "https://res.cloudinary.com/milopy/image/upload/v1751637332/reviewform.png",
    component: ReviewForm_1,
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
    id: "footer",
    title: "Footer",
    description:
      "Footer components for website navigation, links, and branding",
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
    id: "confidential",
    title: "Confidential Access ",
    description:
      "Access control components for restricted content, premium features, and security alerts",
    image:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1751152433/Screenshot_2025-06-29_at_06.13.47_zzysmz.png",
    keywords: [
      "access",
      "control",
      "premium",
      "security",
      "restricted",
      "upgrade",
      "confidential",
    ],
    blocks: [
      staticBlocksWithComponents["confidential-1"],
      staticBlocksWithComponents["confidential-2"],
      staticBlocksWithComponents["confidential-3"],
      staticBlocksWithComponents["confidential-4"],
      staticBlocksWithComponents["confidential-5"],
    ],
  },

  {
    id: "pricing",
    title: "Pricing Comparison",
    description:
      "Pricing table components for comparing plans, features, and subscription tiers",
    image:
      "https://res.cloudinary.com/dnrtsh66v/image/upload/v1751775465/Screenshot_2025-07-06_at_11.04.01_awzi9o.png",
    keywords: [
      "pricing",
      "plans",
      "comparison",
      "tiers",
      "features",
      "billing",
      "subscription",
      "pricing-table",
    ],
    blocks: [
      staticBlocksWithComponents["pricing-1"],
      staticBlocksWithComponents["pricing-2"],
      // staticBlocksWithComponents["pricing-3"],
    ],
  },

  // {
  //   id: "payasyougo",
  //   title: "Pay-As-You-Go Pricing",
  //   description:
  //     "Comprehensive money transfer transaction management dashboards with payment tracking, fee breakdown, and status monitoring",
  //   image:
  //     "https://res.cloudinary.com/dnrtsh66v/image/upload/v1750386367/Screenshot_2025-06-20_at_09.25.58_gg4hiu.png",
  //   keywords: [
  //     "pricing",
  //     "plans",
  //     "comparison",
  //     "tiers",
  //     "features",
  //     "billing",
  //     "subscription",
  //     "pricing-table",
  //   ],
  //   blocks: [
  //     staticBlocksWithComponents["payasyougo-1"],
  //     staticBlocksWithComponents["payasyougo-2"],
  //     // staticBlocksWithComponents["pricing-3"],
  //   ],
  // },

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
    description:
      "SaaS billing dashboards for managing subscriptions, plans, add-ons, and invoices",
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
      "Money transfer and transaction management dashboards with payment tracking, fee breakdown, and status monitoring",
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
  {
    id: "reviewform",
    title: "Review Form",
    description: "Forms for collecting user reviews and feedback",
    image:
      "https://res.cloudinary.com/milopy/image/upload/v1751637332/reviewform.png",
    keywords: ["review", "rating", "comment", "feedback", "ecommerce"],
    blocks: [staticBlocksWithComponents["reviewform-1"]],
  },
];
