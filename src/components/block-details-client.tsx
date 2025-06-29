"use client";

import { Button } from "@/components/ui/button";
import { CheckIcon, Copy, ExternalLink, Github } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface Block {
  id: string;
  name: string;
  description: string;
  link?: string;
}

interface BlockDetailsClientProps {
  currentBlock: Block;
  showCopyButton?: boolean;
  sourceCode: string | null;
}

export function BlockDetailsClient({
  currentBlock,
  showCopyButton = false,
  sourceCode,
}: BlockDetailsClientProps) {
  const [isClicked, setClicked] = useState(false);

  const copyCode = () => {
    // In a real implementation, this would copy the actual component code
    navigator.clipboard.writeText(
      sourceCode
        ? sourceCode
        : `// ${currentBlock.name} component code\n// This would contain the actual JSX and styling`
    );
    toast.success("Code copied", {
      description: `${currentBlock.name} component code copied to clipboard.`,
    });
    setClicked(true);

    setTimeout(() => {
      setClicked(false);
    }, 1500);
  };

  const openPreview = () => {
    if (currentBlock.link && currentBlock.link !== "#") {
      window.open(currentBlock.link, "_blank");
    }
  };

  if (showCopyButton) {
    return (
      <Button variant="outline" size="sm" onClick={copyCode} className="gap-2">
        {isClicked ? (
          <React.Fragment>
            <CheckIcon className="h-4 w-4" />
            Copied to Clipboard!
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Copy className="h-4 w-4" />
            Copy Code
          </React.Fragment>
        )}
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={copyCode} className="gap-2">
        {isClicked ? (
          <React.Fragment>
            <CheckIcon className="h-4 w-4" />
            Copied to Clipboard!
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Copy className="h-4 w-4" />
            Copy Code
          </React.Fragment>
        )}
      </Button>
      {currentBlock.link && currentBlock.link !== "#" && (
        <Button
          variant="outline"
          size="sm"
          onClick={openPreview}
          className="gap-2"
        >
          <ExternalLink className="h-4 w-4" />
          Preview
        </Button>
      )}
      {/* <Button size="sm" className="gap-2" asChild>
        <a
          href="https://github.com/shadcn/ui"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>
      </Button> */}
    </div>
  );
}
