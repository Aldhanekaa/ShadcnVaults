"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  CheckIcon,
  CodeIcon,
  CopyIcon,
  GitBranchPlus,
  PlusIcon,
} from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { toast } from "sonner";
import React, { useState } from "react";

interface BlockButtonsProps {
  shadcnComponents: string[];
  externalLibraries: string[];
  type: "block" | "component" | "template";
  id?: string;
  sourceCode?: string | null;
}
export default function BlockButtons({
  shadcnComponents,
  externalLibraries,
  sourceCode,
  id,
}: BlockButtonsProps) {
  const [isClicked, setClicked] = useState(false);
  const [isSourceCodeClicked, setSourceCodeClicked] = useState(false);

  const copyCode = () => {
    let textToCopy = "";
    if (externalLibraries.length > 0) {
      textToCopy += `npm install ${externalLibraries.join(" ")}`;
    }

    if (shadcnComponents.length > 0) {
      textToCopy += `${
        externalLibraries.length > 0 && " &&"
      } npx shadcn@latest add ${shadcnComponents.join(" ")}`;
    }

    navigator.clipboard.writeText(textToCopy);

    setClicked(true);
    toast.success("Dependencies copied", {
      description: `Paste to your terminal to install required dependencies and shadcn components.`,
    });

    setTimeout(() => {
      setClicked(false);
    }, 1500);
  };

  const copySourceCode = () => {
    let textToCopy = sourceCode || "";

    navigator.clipboard.writeText(textToCopy);

    setClicked(true);
    toast.success("Source code copied", {
      description: `You can now paste it into your code editor.`,
    });

    setTimeout(() => {
      setClicked(false);
    }, 1500);
  };

  return (
    <div className="w-full relative">
      <div className=" inline-flex items-center px-2 py-2 rounded-lg gap-2 bg-gray-100 dark:bg-muted">
        <Link
          href={`https://github.com/Aldhanekaa/ShadcnVaults/tree/main/src/vaults/blocks/${
            id?.split("-")[0]
          }/${id}.tsx`}
          target="_blank"
        >
          <Button
            variant="outline"
            size="sm"
            className={cn("cursor-pointer gap-2 transition-all")}
          >
            <GitHubLogoIcon className="h-4 w-4" />
            View Source
          </Button>
        </Link>

        <Button
          variant="outline"
          size="sm"
          onClick={copySourceCode}
          className={cn("cursor-pointer gap-2 transition-all")}
        >
          {isSourceCodeClicked ? (
            <React.Fragment>
              <CheckIcon className="h-4 w-4" />
              Source code copied to clipboard!
            </React.Fragment>
          ) : (
            <React.Fragment>
              <CodeIcon className="h-4 w-4" />
              Copy Code
            </React.Fragment>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={copyCode}
          className={cn("cursor-pointer gap-2 transition-all")}
        >
          {isClicked ? (
            <React.Fragment>
              <CheckIcon className="h-4 w-4" />
              Dependencied copied to clipboard!
            </React.Fragment>
          ) : (
            <React.Fragment>
              <GitBranchPlus className="h-4 w-4" />
              Copy Dependencies
            </React.Fragment>
          )}
        </Button>
      </div>
    </div>
  );
}
