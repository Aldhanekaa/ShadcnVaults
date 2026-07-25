"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/codeblock";
import { cn } from "@/lib/utils";
import {
  Eye,
  Code,
  Copy,
  Check,
  GitBranchPlus,
  ExternalLink,
} from "lucide-react";
import { getBaseURL } from "@/lib/getBaseURL";
import { toast } from "sonner";

export interface BlockDependencies {
  externalLibraries: string[];
  localComponents: string[];
  shadcnComponents: string[];
}

interface BlockItemProps {
  block: {
    id: string;
    name: string;
    description: string;
  };
  sourceCode: string | null;
  dependencies: BlockDependencies;
}

type Tab = "preview" | "code";

export function BlockItem({ block, sourceCode, dependencies }: BlockItemProps) {
  const [activeTab, setActiveTab] = useState<Tab>("preview");
  const [codeCopied, setCodeCopied] = useState(false);
  const [depsCopied, setDepsCopied] = useState(false);

  const hasDependencies =
    dependencies.externalLibraries.length > 0 ||
    dependencies.shadcnComponents.length > 0;

  const copyCode = () => {
    if (!sourceCode) return;
    navigator.clipboard.writeText(sourceCode);
    setCodeCopied(true);
    toast.success("Code copied", {
      description: "Paste it into your code editor.",
    });
    setTimeout(() => setCodeCopied(false), 1800);
  };

  const copyDeps = () => {
    const parts: string[] = [];
    if (dependencies.externalLibraries.length > 0)
      parts.push(`npm install ${dependencies.externalLibraries.join(" ")}`);
    if (dependencies.shadcnComponents.length > 0)
      parts.push(
        `npx shadcn@latest add ${dependencies.shadcnComponents.join(" ")}`
      );
    navigator.clipboard.writeText(parts.join(" && "));
    setDepsCopied(true);
    toast.success("Dependencies copied", {
      description: "Paste in your terminal to install.",
    });
    setTimeout(() => setDepsCopied(false), 1800);
  };

  return (
    <div className="space-y-3">
      {/* Tab Bar */}
      <div className="flex items-center border-b">
        {/* Left: tabs */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab("preview")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
              activeTab === "preview"
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <Eye className="h-3.5 w-3.5" />
            Preview
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
              activeTab === "code"
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <Code className="h-3.5 w-3.5" />
            Code
          </button>
        </div>

        {/* Right: action buttons */}
        <div className="ml-auto flex items-center gap-1 pb-px">
          {/* Open in new tab */}
          <a
            href={`/block/${block.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title="Open block page"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Open
          </a>

          {/* Copy Dependencies */}
          {hasDependencies && (
            <button
              onClick={copyDeps}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Copy install commands"
            >
              {depsCopied ? (
                <Check className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <GitBranchPlus className="h-3.5 w-3.5" />
              )}
              {depsCopied ? "Copied!" : "Copy Deps"}
            </button>
          )}

          {/* Copy Code */}
          <button
            onClick={copyCode}
            disabled={!sourceCode}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            title="Copy source code"
          >
            {codeCopied ? (
              <Check className="h-3.5 w-3.5 text-green-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            {codeCopied ? "Copied!" : "Copy Code"}
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === "preview" ? (
        <div className="relative h-[600px] border overflow-hidden rounded-xl bg-zinc-50/40 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800">
          <iframe
            src={`${getBaseURL()}/view/${block.id}`}
            className="w-full h-full"
            title={block.name}
          />
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden max-h-[500px] overflow-y-auto">
          <CodeBlock filename={`${block.id}.tsx`} language="tsx">
            {sourceCode ||
              `// ${block.name}\n// Source code could not be loaded`}
          </CodeBlock>
        </div>
      )}

      {/* Block Info */}
      <div className="px-1 space-y-0.5">
        <p className="font-[450] text-zinc-900 dark:text-zinc-50">
          {block.name}
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {block.description}
        </p>
      </div>
    </div>
  );
}
