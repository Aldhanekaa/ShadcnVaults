"use client";

import * as React from "react";
import {
  Search,
  Command as CommandIcon,
  Sun,
  Moon,
  Monitor,
  Home,
  Settings,
  User,
  Mail,
  Bell,
  Copy,
  Share2,
  RefreshCw,
  Trash2,
  Clock,
  Bookmark,
  HelpCircle,
  FileText,
  Zap,
  Palette,
  Globe,
  Lock,
  Volume2,
  Smartphone,
  Printer,
  Camera,
  Wrench as ToolIcon,
  Maximize,
  Info,
  GitBranch,
  Twitter,
  Play,
  Terminal,
  Smartphone as Phone,
  Blocks,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { getBlockCategories } from "@/lib/block-utils";
import { blocksIcon } from "@/lib/icons_data";
import { useRouter } from "next/navigation";

const { useState, useEffect, useRef, useCallback } = React;

// Define types for our items
type CommandCategory =
  | "Navigation"
  | "System"
  | "Utility"
  | "Application"
  | "Social"
  | "Media"
  | "Development"
  | "Settings"
  | "Tools";

type CommandSection =
  | "favorites"
  | "recents"
  | "suggestions"
  | "all"
  | "blocks"
  | "components"
  | "templates";

type CommandItem = {
  id: string;
  title: string;
  description: string;
  category?: CommandCategory;
  section: CommandSection;
  icon?: React.ReactNode;
  action?: () => void;
  shortcut?: string;
  keywords?: string[];
  tags?: string[];
};

// Define a type for command history
type CommandHistory = {
  id: string;
  timestamp: number;
  count: number;
};

let blocks = getBlockCategories(true);
blocks = blocks.slice(1, blocks.length);
interface CommandPaletteProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function CommandPalette({ open, setOpen }: CommandPaletteProps) {
  const blocksCommandData: CommandItem[] = blocks.map((block) => {
    const Icon = blocksIcon[block.id as keyof typeof blocksIcon] || Blocks;
    return {
      id: block.id,
      title: block.title,
      description: block.description,
      section: "blocks",
      icon: <Icon className="h-3 w-3" />,
      action: () => navigateTo(`/blocks/${block.id}`),
      shortcut: String(block.blocks?.length),
      keywords: block.keywords,
      category: "Navigation",
    };
  });

  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<CommandCategory | "All">(
    "All"
  );

  const { setTheme, theme } = useTheme();

  const [commandHistory, setCommandHistory] = useState<CommandHistory[]>(() => {
    // Load command history from localStorage if available
    const savedHistory =
      typeof window !== "undefined"
        ? localStorage.getItem("commandHistory")
        : null;
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const ref = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

  // Function to record command usage in history
  const recordCommandUsage = useCallback((commandId: string) => {
    setCommandHistory((prev) => {
      const now = Date.now();
      const existingCommand = prev.find((cmd) => cmd.id === commandId);

      let newHistory;
      if (existingCommand) {
        // Update existing command
        newHistory = prev.map((cmd) =>
          cmd.id === commandId
            ? { ...cmd, timestamp: now, count: cmd.count + 1 }
            : cmd
        );
      } else {
        // Add new command
        newHistory = [...prev, { id: commandId, timestamp: now, count: 1 }];
      }

      // Sort by count (descending) and limit to 10 items
      newHistory.sort((a, b) => b.count - a.count || b.timestamp - a.timestamp);
      const limitedHistory = newHistory.slice(0, 10);

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("commandHistory", JSON.stringify(limitedHistory));
      }

      return limitedHistory;
    });
  }, []);

  // Function to navigate to a URL
  const navigateTo = useCallback((url: string) => {
    router.push(url);
  }, []);

  // Function to copy text to clipboard
  const copyToClipboard = useCallback(
    (text: string, successMessage = "Copied to clipboard!") => {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          // Show success notification
          showNotification(successMessage, "success");
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
          showNotification("Failed to copy to clipboard", "error");
        });
      setOpen(false);
    },
    []
  );

  // Function to show a notification
  const showNotification = useCallback(
    (message: string, type: "success" | "error" | "info" = "info") => {
      // Create notification element
      const notification = document.createElement("div");
      notification.className = `fixed bottom-4 right-4 z-50 rounded-lg px-4 py-3 shadow-lg transition-all duration-300 transform translate-y-0 opacity-0 ${
        type === "success"
          ? "bg-green-500"
          : type === "error"
          ? "bg-red-500"
          : "bg-blue-500"
      } text-white`;
      notification.textContent = message;

      // Add to DOM
      document.body.appendChild(notification);

      // Animate in
      setTimeout(() => {
        notification.style.opacity = "1";
      }, 10);

      // Remove after delay
      setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transform = "translateY(20px)";
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 3000);
    },
    []
  );

  // Function to share current page
  const sharePage = useCallback(() => {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          url: window.location.href,
        })
        .then(() => {
          showNotification("Page shared successfully!", "success");
        })
        .catch((error) => {
          console.error("Error sharing page:", error);
          // Fallback to copying the URL
          copyToClipboard(window.location.href, "URL copied to clipboard!");
        });
    } else {
      // Fallback for browsers that don't support the Web Share API
      copyToClipboard(window.location.href, "URL copied to clipboard!");
    }
    setOpen(false);
  }, [copyToClipboard, showNotification]);

  // Function to refresh the page
  const refreshPage = useCallback(() => {
    window.location.reload();
  }, []);

  // Function to clear browser cache
  const clearCache = useCallback(() => {
    if ("caches" in window) {
      caches.keys().then((cacheNames) => {
        cacheNames.forEach((cacheName) => {
          caches.delete(cacheName);
        });
        showNotification("Cache cleared successfully!", "success");
      });
    } else {
      showNotification("Cache API not supported in this browser", "error");
    }
    setOpen(false);
  }, [showNotification]);

  // Function to toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        showNotification(
          `Error attempting to enable fullscreen: ${err.message}`,
          "error"
        );
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setOpen(false);
  }, [showNotification]);

  // Function to print the current page
  const printPage = useCallback(() => {
    window.print();
    setOpen(false);
  }, []);

  // Function to toggle AI prompt mode
  const toggleAIPrompt = useCallback(() => {
    setShowAIPrompt((prev) => !prev);
    setAiPrompt("");
  }, []);

  // Function to submit AI prompt
  const submitAIPrompt = useCallback(() => {
    if (aiPrompt.trim()) {
      showNotification(`AI prompt submitted: "${aiPrompt}"`, "success");
      // Here you would typically send the prompt to your AI service
      console.log("AI prompt:", aiPrompt);
      setAiPrompt("");
      setShowAIPrompt(false);
      setOpen(false);
    }
  }, [aiPrompt, showNotification]);

  // Define our command items with actions
  const allCommandItems: CommandItem[] = [
    ...blocksCommandData,
    // Navigation commands
    {
      id: "nav-home",
      title: "Go to Home",
      description: "Navigate to the home page",
      category: "Navigation",
      section: "all",
      icon: <Home className="h-3 w-3" />,
      action: () => navigateTo("/"),
      shortcut: "Alt+H",
      keywords: ["home", "main", "start", "landing"],
    },
    {
      id: "nav-about",
      title: "Go to About",
      description: "Learn more about us",
      category: "Navigation",
      section: "all",
      icon: <Info className="h-3 w-3" />,
      action: () => navigateTo("/about"),
      shortcut: "Alt+A",
      keywords: ["about", "info", "company", "team"],
    },
    {
      id: "nav-settings",
      title: "Go to Settings",
      description: "Configure your preferences",
      category: "Navigation",
      section: "all",
      icon: <Settings className="h-3 w-3" />,
      action: () => navigateTo("/settings"),
      shortcut: "Alt+S",
      keywords: ["settings", "preferences", "options", "config"],
    },
    {
      id: "nav-profile",
      title: "Go to Profile",
      description: "View and edit your profile",
      category: "Navigation",
      section: "all",
      icon: <User className="h-3 w-3" />,
      action: () => navigateTo("/profile"),
      shortcut: "Alt+P",
      keywords: ["profile", "account", "user", "personal"],
    },
    {
      id: "nav-messages",
      title: "Go to Messages",
      description: "Check your messages and notifications",
      category: "Navigation",
      section: "all",
      icon: <Mail className="h-3 w-3" />,
      action: () => navigateTo("/messages"),
      keywords: ["messages", "inbox", "mail", "communication"],
    },

    // System commands
    {
      id: "theme-toggle",
      title: "Toggle Theme",
      description: "Switch between light, dark, and system themes",
      section: "favorites",
      icon: <Moon className="h-3 w-3" />, // sempre modo escuro
      action: () => {
        setOpen(false);
        setTheme(theme === "light" ? "dark" : "light");
      },
      shortcut: "Alt+T",
      keywords: ["theme", "dark", "light", "system", "mode", "appearance"],
    },
    {
      id: "toggle-fullscreen",
      title: "Toggle Fullscreen",
      description: "Enter or exit fullscreen mode",
      category: "System",
      section: "all",
      icon: <Maximize className="h-3 w-3" />,
      action: () => {
        toggleFullscreen();
        recordCommandUsage("toggle-fullscreen");
      },
      shortcut: "F11",
      keywords: ["fullscreen", "expand", "screen", "display"],
    },
  ];

  // Get recent commands based on history
  const getRecentCommands = useCallback(() => {
    return commandHistory
      .slice(0, 5)
      .map((historyItem) => {
        const command = allCommandItems.find(
          (cmd) => cmd.id === historyItem.id
        );
        return command ? { ...command, section: "recents" as const } : null;
      })
      .filter(
        (cmd): cmd is CommandItem & { section: "recents" } => cmd !== null
      );
  }, [commandHistory, allCommandItems]);

  // Get favorite commands
  const getFavoriteCommands = useCallback(() => {
    return allCommandItems.filter((cmd) => cmd.section === "favorites");
  }, [allCommandItems]);

  // Get Blocks command
  const getBlocksShortcut = useCallback(() => {
    return allCommandItems.filter((cmd) => cmd.section === "blocks");
  }, [allCommandItems]);

  // Get Components command
  const getComponentsShortcut = useCallback(() => {
    return allCommandItems.filter((cmd) => cmd.section === "components");
  }, [allCommandItems]);

  // Get Components command
  const getTemplatesShortcut = useCallback(() => {
    return allCommandItems.filter((cmd) => cmd.section === "templates");
  }, [allCommandItems]);

  // Filter commands based on search term and active category
  const getFilteredCommands = useCallback(() => {
    const searchLower = searchTerm.toLowerCase();

    return allCommandItems.filter((cmd) => {
      // Filter by category if not "All"
      if (activeCategory !== "All" && cmd.category !== activeCategory) {
        if (activeCategory !== "Navigation") {
          return false;
        }
      }

      // Filter by search term
      if (searchLower) {
        const matchesTitle = cmd.title.toLowerCase().includes(searchLower);
        const matchesDescription = cmd.description
          .toLowerCase()
          .includes(searchLower);
        const matchesKeywords = cmd.keywords?.some((keyword) =>
          keyword.toLowerCase().includes(searchLower)
        );
        const matchesTags = cmd.tags?.some((tag) =>
          tag.toLowerCase().includes(searchLower)
        );

        return (
          matchesTitle || matchesDescription || matchesKeywords || matchesTags
        );
      }

      if (cmd.category === "Navigation") {
        return false;
      }

      return true;
    });
  }, [searchTerm, activeCategory, allCommandItems]);

  // Combine all commands for display
  const commandItems = useCallback(() => {
    if (showAIPrompt) {
      // When in AI prompt mode, don't show commands
      return [];
    }

    const recents = getRecentCommands();
    const favorites = getFavoriteCommands();
    const filtered = getFilteredCommands();
    const blocks = getBlocksShortcut();

    // If searching, only show filtered results
    if (searchTerm) {
      return filtered;
    }

    // Otherwise show recents, favorites, and filtered (as suggestions)
    return [
      ...recents,
      ...blocks,
      ...favorites.filter((fav) => !recents.some((rec) => rec.id === fav.id)),
      ...filtered
        .filter(
          (cmd) =>
            !recents.some((rec) => rec.id === cmd.id) &&
            !favorites.some((fav) => fav.id === cmd.id)
        )
        .slice(0, 10), // Limit suggestions to 10 items
    ];
  }, [
    showAIPrompt,
    getRecentCommands,
    getFavoriteCommands,
    getFilteredCommands,
    searchTerm,
  ]);

  // Get all available categories
  // @ts-ignore
  const categories: CommandCategory[] = [
    ...new Set(
      allCommandItems
        .filter((cmd) => cmd.category !== undefined)
        .map((cmd) => cmd.category)
    ),
  ];

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Toggle command palette with Cmd/Ctrl+K
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
        if (!open) {
          setSelectedIndex(0);
          setSearchTerm("");
          setShowAIPrompt(false);
        }
      }

      // Handle keyboard shortcuts for commands when palette is closed
      if (!open) {
        // Example: Alt+T for theme toggle
        if (e.key === "t" && e.altKey) {
          e.preventDefault();
          const themeCommand = allCommandItems.find(
            (cmd) => cmd.id === "theme-toggle"
          );
          themeCommand?.action?.();
        }
        return;
      }

      // Handle AI prompt mode
      if (showAIPrompt) {
        if (e.key === "Escape") {
          e.preventDefault();
          setShowAIPrompt(false);
        } else if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          submitAIPrompt();
        }
        return;
      }

      // Handle arrow key navigation
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const max = commandItems().length - 1;
          // Permite ir para baixo até o último item, mas não além
          return Math.min(prev + 1, max);
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => {
          // Permite ir para cima até o primeiro item, mas não além
          return Math.max(prev - 1, 0);
        });
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        e.preventDefault();
        // Execute the selected command if it has an action
        const selectedCommand = commandItems()[selectedIndex];
        if (selectedCommand?.action) {
          selectedCommand.action();
          recordCommandUsage(selectedCommand.id);
        } else {
          console.log("Execute command:", selectedCommand);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      } else if (e.key === "Tab" && !e.shiftKey) {
        // Tab to enter AI prompt mode
        e.preventDefault();
        toggleAIPrompt();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [
    open,
    selectedIndex,
    showAIPrompt,
    aiPrompt,
    commandItems,
    recordCommandUsage,
    submitAIPrompt,
    toggleAIPrompt,
    allCommandItems,
  ]);

  // Scroll selected item into view
  useEffect(() => {
    if (open && selectedIndex >= 0 && itemsRef.current[selectedIndex]) {
      itemsRef.current[selectedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedIndex, open]);

  // Reset selected index when opening or when filtered items change
  useEffect(() => {
    if (open) {
      setSelectedIndex(0);
    }
  }, [open, searchTerm, activeCategory, showAIPrompt]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node) && open) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Helper function to set refs safely
  const setItemRef = useCallback((el: HTMLDivElement | null, index: number) => {
    itemsRef.current[index] = el;
  }, []);

  // Reset refs array when items change
  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, commandItems().length);
  }, [commandItems]);

  // Get current theme text for display
  const getThemeText = () => {
    return "Dark";
  };

  return (
    <>
      {/* Full command palette */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={`fixed inset-0 top-0 z-50 flex items-center justify-center`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              ref={ref}
              className="relative w-full max-w-2xl overflow-hidden rounded-xl text-[#181818] shadow-2xl backdrop-blur-xl dark:bg-[#181818]/20 dark:text-[#f2f2f2]"
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.3,
              }}
            >
              {/* Search Input or AI Prompt Input */}
              <div className="flex items-center border-b border-[#ffffff]/10 px-4">
                <div className="flex w-full items-center">
                  <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                  <input
                    className="h-12 w-full border-0 bg-transparent text-[#181818] placeholder:text-[#181818]/50 focus:outline-none focus:ring-0 dark:text-[#f2f2f2] dark:placeholder:text-[#f2f2f2]/50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search commands or type / to filter..."
                    autoFocus
                  />
                </div>
              </div>

              {/* Category Filter (only shown when not in AI mode) */}

              {/* AI Prompt Mode */}

              <div className="max-h-[60vh] overflow-auto py-2 custom-scrollbar scrollbar-hide">
                {/* Recent Commands Group */}
                {getRecentCommands().length > 0 && !searchTerm && (
                  <div className="px-2 py-1">
                    <div className="flex items-center gap-2 px-2 text-xs">
                      <span className="font-medium">Recent</span>
                      <span className="text-xs text-[#181818]/50 dark:text-[#f2f2f2]/50">
                        {getRecentCommands().length} items
                      </span>
                    </div>
                    {getRecentCommands().map((item, idx) => {
                      const globalIdx = commandItems().findIndex(
                        (i) => i.id === item.id
                      );
                      const isSelected = selectedIndex === globalIdx;

                      return (
                        <div
                          key={item.id}
                          ref={(el) => setItemRef(el, globalIdx)}
                          className={`mx-2 flex cursor-pointer items-center justify-between rounded-md px-2 py-2 transition-colors ${
                            isSelected
                              ? "bg-[#181818]/20 text-[#181818] dark:bg-white/20 dark:text-white"
                              : "hover:bg-[#181818]/10 dark:hover:bg-[#ffffff]/10"
                          }`}
                          onClick={() => {
                            setSelectedIndex(globalIdx);
                            if (item.action) {
                              item.action();
                            }
                          }}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`flex h-5 w-5 items-center justify-center rounded border ${
                                isSelected
                                  ? "border-[#181818]/40 bg-[#181818]/20 dark:border-white/40 dark:bg-white/20"
                                  : "border-[#181818]/20 bg-[#181818]/10 dark:border-[#ffffff]/20 dark:bg-[#ffffff]/10"
                              }`}
                            >
                              {item.icon}
                            </div>
                            <span className="text-xs font-medium">
                              {item.title}
                            </span>
                            <span className="text-xs text-[#181818]/50 dark:text-[#f2f2f2]/50">
                              {item.category}
                            </span>
                          </div>
                          {item.shortcut && (
                            <kbd className="rounded border border-[#181818]/20 bg-[#181818]/5 px-1.5 py-0.5 text-xs text-[#181818]/70 dark:border-[#ffffff]/20 dark:bg-[#ffffff]/5 dark:text-[#f2f2f2]/70">
                              {item.shortcut}
                            </kbd>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Favorites Group */}
                {getFavoriteCommands().length > 0 && !searchTerm && (
                  <div className="px-2 py-1">
                    <div className="flex items-center gap-2 px-2 text-xs">
                      <span className="font-medium">Favorites</span>
                      <span className="text-xs text-[#181818]/50 dark:text-[#f2f2f2]/50">
                        {getFavoriteCommands().length} items
                      </span>
                    </div>
                    {getFavoriteCommands()
                      .filter(
                        (fav) =>
                          !getRecentCommands().some((rec) => rec.id === fav.id)
                      )
                      .map((item) => {
                        const globalIdx = commandItems().findIndex(
                          (i) => i.id === item.id
                        );
                        const isSelected = selectedIndex === globalIdx;
                        const isThemeToggle = item.id === "theme-toggle";

                        return (
                          <div
                            key={item.id}
                            ref={(el) => setItemRef(el, globalIdx)}
                            className={`mx-2 flex cursor-pointer items-center justify-between rounded-md px-2 py-2 transition-colors ${
                              isSelected
                                ? "bg-[#181818]/20 text-[#181818] dark:bg-white/20 dark:text-white"
                                : "hover:bg-[#181818]/10 dark:hover:bg-[#ffffff]/10"
                            }`}
                            onClick={() => {
                              setSelectedIndex(globalIdx);
                              if (item.action) {
                                item.action();
                              }
                            }}
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`flex h-5 w-5 items-center justify-center rounded border ${
                                  isSelected
                                    ? "border-[#181818]/40 bg-[#181818]/20 dark:border-white/40 dark:bg-white/20"
                                    : "border-[#181818]/20 bg-[#181818]/10 dark:border-[#ffffff]/20 dark:bg-[#ffffff]/10"
                                }`}
                              >
                                {item.icon}
                              </div>
                              <span className="text-xs font-medium">
                                {isThemeToggle
                                  ? `${item.title}: ${getThemeText()}`
                                  : item.title}
                              </span>
                              <span className="text-xs text-[#181818]/50 dark:text-[#f2f2f2]/50">
                                {item.category}
                              </span>
                            </div>
                            {item.shortcut && (
                              <kbd className="rounded border border-[#181818]/20 bg-[#181818]/5 px-1.5 py-0.5 text-xs text-[#181818]/70 dark:border-[#ffffff]/20 dark:bg-[#ffffff]/5 dark:text-[#f2f2f2]/70">
                                {item.shortcut}
                              </kbd>
                            )}
                          </div>
                        );
                      })}
                  </div>
                )}

                {/* Blocks Group */}
                {getBlocksShortcut().length > 0 && !searchTerm && (
                  <div className="px-2 py-1">
                    <div className="flex items-center gap-2 px-2 text-xs">
                      <span className="font-medium">Blocks</span>
                      <span className="text-xs text-[#181818]/50 dark:text-[#f2f2f2]/50">
                        {getBlocksShortcut().length} items
                      </span>
                    </div>

                    {getBlocksShortcut().map((item) => {
                      const globalIdx = commandItems().findIndex((i) => {
                        console.log(
                          `I iteration ${i.id} ${i.title} ${item.id}`
                        );
                        return i.id === item.id;
                      });
                      console.log(
                        `item ${selectedIndex} ${globalIdx} ${item.id} ${item.title}`
                      );
                      const isSelected = selectedIndex === globalIdx;
                      const isThemeToggle = item.id === "theme-toggle";
                      return (
                        <div
                          key={item.id}
                          ref={(el) => setItemRef(el, globalIdx)}
                          className={`mx-2 flex cursor-pointer items-center justify-between rounded-md px-2 py-2 transition-colors ${
                            isSelected
                              ? "bg-[#181818]/20 text-[#181818] dark:bg-white/20 dark:text-white"
                              : "hover:bg-[#181818]/10 dark:hover:bg-[#ffffff]/10"
                          }`}
                          onClick={() => {
                            setSelectedIndex(globalIdx);
                            if (item.action) {
                              item.action();
                            }
                          }}
                        >
                          <div className="flex items-center gap-2.5">
                            <div>
                              <div
                                className={`flex h-5 w-5 items-center justify-center rounded border box-border ${
                                  isSelected
                                    ? "border-[#181818]/40 bg-[#181818]/20 dark:border-white/40 dark:bg-white/20"
                                    : "border-[#181818]/20 bg-[#181818]/10 dark:border-[#ffffff]/20 dark:bg-[#ffffff]/10"
                                }`}
                              >
                                {item.icon}
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-medium">
                                {item.title}
                              </span>
                              <span className="text-xs max-w-md text-[#181818]/50 dark:text-[#f2f2f2]/50">
                                {item.description}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* All Commands or Search Results */}
                <div className="px-2 py-1">
                  <div className="flex items-center gap-2 px-2 pt-1 text-xs">
                    <span className="font-medium">
                      {searchTerm && "Search Results"}
                    </span>
                    {searchTerm && (
                      <span className="text-xs text-[#181818]/50 dark:text-[#f2f2f2]/50">
                        {getFilteredCommands().length} items
                      </span>
                    )}
                  </div>

                  {/* No results message */}
                  {getFilteredCommands().length === 0 && (
                    <div className="mx-2 my-8 flex flex-col items-center justify-center text-center">
                      <Search className="mb-2 h-5 w-5 text-[#181818]/30 dark:text-[#f2f2f2]/30" />
                      <p className="text-sm text-[#181818]/50 dark:text-[#f2f2f2]/50">
                        No commands found for "{searchTerm}"
                      </p>
                      <button
                        onClick={() => setSearchTerm("")}
                        className="mt-2 rounded-md bg-[#181818]/10 px-3 py-1 text-xs font-medium hover:bg-[#181818]/20 dark:bg-[#ffffff]/10 dark:hover:bg-[#ffffff]/20"
                      >
                        Clear search
                      </button>
                    </div>
                  )}

                  {/* Command items */}
                  {getFilteredCommands()
                    .filter(
                      (cmd) =>
                        !getRecentCommands().some((rec) => rec.id === cmd.id) &&
                        !getFavoriteCommands().some((fav) => fav.id === cmd.id)
                    )
                    .map((item, idx) => {
                      const globalIdx = commandItems().findIndex(
                        (i) => i.id === item.id
                      );
                      const isSelected = selectedIndex === globalIdx;

                      return (
                        <div
                          key={item.id}
                          ref={(el) => setItemRef(el, globalIdx)}
                          className={`mx-2 flex cursor-pointer items-center justify-between rounded-md px-2 py-2 transition-colors ${
                            isSelected
                              ? "bg-[#181818]/20 text-[#181818] dark:bg-white/20 dark:text-white"
                              : "hover:bg-[#181818]/10 dark:hover:bg-[#ffffff]/10"
                          }`}
                          onClick={() => {
                            setSelectedIndex(globalIdx);
                            if (item.action) {
                              item.action();
                            }
                          }}
                        >
                          <div className="flex items-center gap-2.5">
                            <div>
                              <div
                                className={`flex h-5 w-5 items-center justify-center rounded border ${
                                  isSelected
                                    ? "border-[#181818]/40 bg-[#181818]/20 dark:border-white/40 dark:bg-white/20"
                                    : "border-[#181818]/20 bg-[#181818]/10 dark:border-[#ffffff]/20 dark:bg-[#ffffff]/10"
                                }`}
                              >
                                {item.icon}
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-medium">
                                {item.title}
                              </span>
                              <span className="text-xs text-[#181818]/50 dark:text-[#f2f2f2]/50">
                                {item.description}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {/* <span className="text-xs text-[#181818]/50 dark:text-[#f2f2f2]/50">
                              {item.category}
                            </span>
                            {item.shortcut && (
                              <kbd className="rounded border border-[#181818]/20 bg-[#181818]/5 px-1.5 py-0.5 text-xs text-[#181818]/70 dark:border-[#ffffff]/20 dark:bg-[#ffffff]/5 dark:text-[#f2f2f2]/70">
                                {item.shortcut}
                              </kbd>
                            )} */}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Footer with keyboard navigation hint */}
              <div className="flex items-center justify-between border-t border-[#ffffff]/10 p-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md">
                    <CommandIcon className="h-3.5 w-3.5 text-[#181818]/50 dark:text-[#f2f2f2]/50" />
                  </div>
                  <span className="text-xs text-[#181818]/50 dark:text-[#f2f2f2]/50">
                    +
                  </span>
                  <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#181818]/10 dark:bg-[#ffffff]/10">
                    <span className="text-xs font-medium">K</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {showAIPrompt ? (
                    <>
                      <span className="text-xs font-medium">Submit</span>
                      <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#181818]/10 dark:bg-[#ffffff]/10">
                        <span className="text-xs font-medium">↵</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="text-xs font-medium">Navigate</span>
                      <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#181818]/10 dark:bg-[#ffffff]/10">
                        <span className="text-xs font-medium">↑</span>
                      </div>
                      <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#181818]/10 dark:bg-[#ffffff]/10">
                        <span className="text-xs font-medium">↓</span>
                      </div>
                      <span className="mx-2 text-[#181818]/30 dark:text-[#f2f2f2]/30">
                        |
                      </span>
                      <span className="text-xs font-medium">Execute</span>
                      <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#181818]/10 dark:bg-[#ffffff]/10">
                        <span className="text-xs font-medium">↵</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export { CommandPalette };
