"use client";
import React, { useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Button } from "@/components/ui/button";

interface ISwitcher {
  value: string;
  onChange: (language: string) => void;
}

interface CodeBlockProps {
  filename?: string;
  language: string;
  highlightedLinesNumbers?: number[];
  hideLineNumbers?: boolean;
  switcher?: ISwitcher;
  children?: string | string[];
}

const customTheme = {
  'code[class*="language-"]': {
    background: "var(--shiki-color-background)",
    color: "var(--shiki-color-text)",
    fontFamily: "var(--font-geist-mono)",
    fontSize: "13px",
    lineHeight: "14px",
    width: "100%",
  },
  'pre[class*="language-"]': {
    background: "var(--shiki-color-background)",
    color: "var(--shiki-color-text)",
    padding: "10px 0",
    borderRadius: "8px",
    lineHeight: "20px",
    overflowX: "auto",
  },
  keyword: { color: "var(--shiki-token-keyword)" },
  string: { color: "var(--shiki-token-string)" },
  function: { color: "var(--shiki-token-function)" },
  comment: { color: "var(--shiki-token-comment)" },
  operator: { color: "var(--color-operator)" },
  variable: { color: "var(--shiki-token-constant)" },
  constant: { color: "var(--shiki-token-constant)" },
  number: { color: "var(--color-number)" },
  punctuation: { color: "var(--shiki-token-punctuation)" },
  url: { color: "var(--shiki-token-link" },
  regex: { color: "var(--shiki-token-string-expression)" },
  tag: { color: "var(--shiki-token-string)" },
};

const Icon = ({ language }: { language: string }) => {
  switch (language) {
    case "js":
    case "jsx":
      return (
        <svg height="16" viewBox="-11.5 -10.23174 23 20.46348" width="16">
          <circle cx="0" cy="0" r="2.05"></circle>
          <g fill="none" className="stroke-gray-900" strokeWidth="1">
            <ellipse rx="11" ry="4.2"></ellipse>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"></ellipse>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"></ellipse>
          </g>
        </svg>
      );
    case "ts":
    case "tsx":
      return (
        <svg
          fill="none"
          height="14"
          viewBox="0 0 512 512"
          width="14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            className="fill-gray-900"
            height="512"
            rx="50"
            width="512"
          ></rect>
          <rect
            className="fill-gray-900"
            height="512"
            rx="50"
            width="512"
          ></rect>
          <path
            clipRule="evenodd"
            d="m316.939 407.424v50.061c8.138 4.172 17.763 7.3 28.875 9.386s22.823 3.129 35.135 3.129c11.999 0 23.397-1.147 34.196-3.442 10.799-2.294 20.268-6.075 28.406-11.342 8.138-5.266 14.581-12.15 19.328-20.65s7.121-19.007 7.121-31.522c0-9.074-1.356-17.026-4.069-23.857s-6.625-12.906-11.738-18.225c-5.112-5.319-11.242-10.091-18.389-14.315s-15.207-8.213-24.18-11.967c-6.573-2.712-12.468-5.345-17.685-7.9-5.217-2.556-9.651-5.163-13.303-7.822-3.652-2.66-6.469-5.476-8.451-8.448-1.982-2.973-2.974-6.336-2.974-10.091 0-3.441.887-6.544 2.661-9.308s4.278-5.136 7.512-7.118c3.235-1.981 7.199-3.52 11.894-4.615 4.696-1.095 9.912-1.642 15.651-1.642 4.173 0 8.581.313 13.224.938 4.643.626 9.312 1.591 14.008 2.894 4.695 1.304 9.259 2.947 13.694 4.928 4.434 1.982 8.529 4.276 12.285 6.884v-46.776c-7.616-2.92-15.937-5.084-24.962-6.492s-19.381-2.112-31.066-2.112c-11.895 0-23.163 1.278-33.805 3.833s-20.006 6.544-28.093 11.967c-8.086 5.424-14.476 12.333-19.171 20.729-4.695 8.395-7.043 18.433-7.043 30.114 0 14.914 4.304 27.638 12.912 38.172 8.607 10.533 21.675 19.45 39.204 26.751 6.886 2.816 13.303 5.579 19.25 8.291s11.086 5.528 15.415 8.448c4.33 2.92 7.747 6.101 10.252 9.543 2.504 3.441 3.756 7.352 3.756 11.733 0 3.233-.783 6.231-2.348 8.995s-3.939 5.162-7.121 7.196-7.147 3.624-11.894 4.771c-4.748 1.148-10.303 1.721-16.668 1.721-10.851 0-21.597-1.903-32.24-5.71-10.642-3.806-20.502-9.516-29.579-17.13zm-84.159-123.342h64.22v-41.082h-179v41.082h63.906v182.918h50.874z"
            className="fill-white dark:fill-[#0a0a0a]"
            fillRule="evenodd"
          />
        </svg>
      );
    case "next":
      return (
        <svg
          fill="none"
          height="16"
          viewBox="0 0 16 16"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="8" className="fill-gray-900" r="7.375"></circle>
          <path
            d="M10.63 11V5"
            className="stroke-white dark:stroke-black"
            strokeMiterlimit="1.41421"
            strokeWidth="1.25"
          />
          <path
            clipRule="evenodd"
            d="M5.995 5.00087V5H4.745V11H5.995V6.96798L12.3615 14.7076C12.712 14.4793 13.0434 14.2242 13.353 13.9453L5.99527 5.00065L5.995 5.00087Z"
            className="fill-white dark:fill-black"
            fillRule="evenodd"
          />
        </svg>
      );
    default:
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 9V17.8C19 18.9201 19 19.4802 18.782 19.908C18.5903 20.2843 18.2843 20.5903 17.908 20.782C17.4802 21 16.9201 21 15.8 21H8.2C7.07989 21 6.51984 21 6.09202 20.782C5.71569 20.5903 5.40973 20.2843 5.21799 19.908C5 19.4802 5 18.9201 5 17.8V6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.0799 3 8.2 3H13M19 9L13 3M19 9H14C13.4477 9 13 8.55228 13 8V3"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
};

export const CodeBlock = ({
  filename,
  language,
  highlightedLinesNumbers = [],
  hideLineNumbers = false,
  switcher,
  children = [],
}: CodeBlockProps) => {
  const [animation, setAnimation] = useState<boolean>(false);
  const animationTimeout = useRef<NodeJS.Timeout>(null);

  const onClick = () => {
    if (animationTimeout.current) {
      clearTimeout(animationTimeout.current);
    }
    setAnimation(true);
    animationTimeout.current = setTimeout(() => setAnimation(false), 2000);

    navigator.clipboard.writeText(
      typeof children === "string"
        ? children
        : children.reduce((prev, curr) => prev + "\n" + curr)
    );
  };

  return (
    <div className="rounded-md overflow-hidden border border-gray-400">
      {filename && (
        <div className="pl-4 pr-3 rounded-t-md border-b border-gray-400 h-12 flex items-center bg-foreground/5">
          <div className="flex items-center gap-2 text-[13px] mr-auto">
            <div>
              <Icon language={language} />
            </div>
            <span>{filename}</span>
          </div>
        </div>
      )}
      <SyntaxHighlighter
        // @ts-ignore
        style={customTheme}
        language={language === "next" ? "tsx" : language}
        showLineNumbers={!hideLineNumbers}
        wrapLines
        lineProps={(lineNumber) => {
          const isHighlighted = highlightedLinesNumbers.includes(lineNumber);
          return {
            style: isHighlighted
              ? {
                  backgroundColor: "var(--shiki-token-highlighted)",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  borderLeft: "2px solid var(--shiki-token-constant)",
                  paddingLeft: 18,
                  paddingRight: 20,
                  height: 20,
                }
              : { paddingLeft: 20, paddingRight: 20 },
          };
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};
