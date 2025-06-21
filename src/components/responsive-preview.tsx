"use client";

import {
  useState,
  createContext,
  useContext,
  ReactNode,
  useRef,
  useEffect,
} from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Monitor, Tablet, Smartphone, Move, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import { getBaseURL } from "@/lib/getBaseURL";

interface ResponsivePreviewProps {
  children: React.ReactNode;
}

type DeviceSize = "desktop" | "tablet" | "mobile" | "custom";

// Context for providing device size to children
interface ResponsiveContextType {
  deviceSize: DeviceSize;
  customWidth: number;
}

const ResponsiveContext = createContext<ResponsiveContextType | null>(null);

// Custom hook for responsive styling based on preview device size
export function useResponsivePreview() {
  const context = useContext(ResponsiveContext);
  if (!context) {
    throw new Error(
      "useResponsivePreview must be used within ResponsivePreview"
    );
  }

  const { deviceSize, customWidth } = context;

  // Helper function to determine if a breakpoint should be active
  const isBreakpointActive = (breakpoint: "sm" | "md" | "lg" | "xl") => {
    const breakpointWidths = {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    };

    const currentWidth =
      deviceSize === "custom"
        ? customWidth
        : deviceSize === "tablet"
        ? 768
        : deviceSize === "mobile"
        ? 375
        : 1920; // desktop default

    return currentWidth >= breakpointWidths[breakpoint];
  };

  // Helper function to conditionally apply classes based on device size
  const responsiveClass = (classes: Record<string, string>) => {
    const activeClasses: string[] = [];

    // Always apply base classes
    if (classes.base) {
      activeClasses.push(classes.base);
    }

    // Apply responsive classes based on current device size
    if (classes.sm && isBreakpointActive("sm")) {
      activeClasses.push(classes.sm);
    }
    if (classes.md && isBreakpointActive("md")) {
      activeClasses.push(classes.md);
    }
    if (classes.lg && isBreakpointActive("lg")) {
      activeClasses.push(classes.lg);
    }
    if (classes.xl && isBreakpointActive("xl")) {
      activeClasses.push(classes.xl);
    }

    return activeClasses.join(" ");
  };

  return {
    deviceSize,
    customWidth,
    isBreakpointActive,
    responsiveClass,
  };
}

const deviceSizes = {
  desktop: { width: "100%", maxWidth: "none", label: "Desktop", icon: Monitor },
  tablet: { width: "768px", maxWidth: "768px", label: "Tablet", icon: Tablet },
  mobile: {
    width: "375px",
    maxWidth: "375px",
    label: "Mobile",
    icon: Smartphone,
  },
  custom: { width: "100%", maxWidth: "none", label: "Custom", icon: Move },
};

// Component that renders content inside an iframe
function IframeContent({ children }: { children: React.ReactNode }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeDocument, setIframeDocument] = useState<Document | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      const doc = iframe.contentDocument;
      if (doc) {
        // Set up the iframe document with proper styling
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Preview</title>
              <style>
                /* Reset styles */
                * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                }
                
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  line-height: 1.5;
                  color: #333;
                  background: white;
                }
                
                /* Ensure the iframe content takes full width */
                #root {
                  width: 100%;
                  min-height: 100vh;
                }
              </style>
            </head>
            <body>
              <div id="root"></div>
            </body>
          </html>
        `);
        doc.close();

        setIframeDocument(doc);
      }
    };

    iframe.addEventListener("load", handleLoad);

    // Trigger load event if iframe is already loaded
    if (iframe.contentDocument) {
      handleLoad();
    }

    return () => {
      iframe.removeEventListener("load", handleLoad);
    };
  }, []);

  if (!iframeDocument) {
    return (
      <iframe
        ref={iframeRef}
        className="w-full h-96 border-0"
        title="Preview"
      />
    );
  }

  return (
    <iframe ref={iframeRef} className="w-full h-96 border-0" title="Preview">
      {iframeDocument &&
        createPortal(
          <div className="w-full min-h-screen">{children}</div>,
          iframeDocument.getElementById("root")!
        )}
    </iframe>
  );
}

export function ResponsivePreview({ blockId }: { blockId: string }) {
  const [activeSize, setActiveSize] = useState<DeviceSize>("desktop");
  const [customWidth, setCustomWidth] = useState(1200);
  const [isResizing, setIsResizing] = useState(false);

  const handleReset = () => {
    setCustomWidth(1200);
    setActiveSize("desktop");
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (activeSize !== "custom") return;

    setIsResizing(true);
    const startX = e.clientX;
    const startWidth = customWidth;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const newWidth = Math.max(320, Math.min(1920, startWidth + deltaX));
      setCustomWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const getPreviewStyle = () => {
    if (activeSize === "custom") {
      return {
        width: `${customWidth}px`,
        maxWidth: `${customWidth}px`,
        transition: isResizing ? "none" : "width 0.3s ease-in-out",
      };
    }

    return {
      width: deviceSizes[activeSize].width,
      maxWidth: deviceSizes[activeSize].maxWidth,
      transition: "width 0.3s ease-in-out",
    };
  };

  const contextValue: ResponsiveContextType = {
    deviceSize: activeSize,
    customWidth,
  };

  return (
    <ResponsiveContext.Provider value={contextValue}>
      <div className="space-y-4">
        {/* Device Size Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {Object.entries(deviceSizes).map(([size, config]) => {
              const Icon = config.icon;
              const isActive = activeSize === size;

              return (
                <Button
                  key={size}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveSize(size as DeviceSize)}
                  className={cn(
                    "gap-2 transition-all",
                    isActive && "shadow-sm"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {config.label}
                </Button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {activeSize === "custom" && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Width: {customWidth}px</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>

        <Separator />

        {/* Preview Container */}
        <div className="relative">
          <div className="flex justify-center">
            <div
              className={cn(
                "relative border rounded-lg overflow-hidden bg-background shadow-sm",
                activeSize === "custom" && "resize-x",
                isResizing && "select-none"
              )}
              style={getPreviewStyle()}
            >
              {/* Custom Resize Handle */}
              {activeSize === "custom" && (
                <div
                  className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize bg-transparent hover:bg-primary/10 transition-colors z-10 flex items-center justify-center group"
                  onMouseDown={handleMouseDown}
                >
                  <div className="w-1 h-8 bg-border group-hover:bg-primary/30 rounded-full transition-colors" />
                </div>
              )}

              {/* Device Frame Indicators */}
              {activeSize !== "desktop" && activeSize !== "custom" && (
                <div className="absolute top-2 left-2 z-10">
                  <div className="bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                    {deviceSizes[activeSize].label}
                    {activeSize === "tablet" && " (768px)"}
                    {activeSize === "mobile" && " (375px)"}
                  </div>
                </div>
              )}

              {/* Block Content */}
              <div className="w-full">
                <iframe
                  src={`${getBaseURL()}/view/${blockId}`}
                  className="w-full h-[750px]"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Width Indicator for Custom Mode */}
          {activeSize === "custom" && (
            <div className="flex justify-center mt-2">
              <div className="bg-muted px-3 py-1 rounded-full text-sm text-muted-foreground">
                Custom Width: {customWidth}px
              </div>
            </div>
          )}
        </div>

        {/* Device Size Info */}
        <div className="text-center text-sm text-muted-foreground">
          {activeSize === "desktop" && "Full width desktop view"}
          {activeSize === "tablet" && "Tablet view (768px width)"}
          {activeSize === "mobile" && "Mobile view (375px width)"}
          {activeSize === "custom" &&
            "Custom resizable width - drag the right edge or use the resize handle"}
        </div>
      </div>
    </ResponsiveContext.Provider>
  );
}
