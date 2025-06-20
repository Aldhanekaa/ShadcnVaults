"use client";
import React, { useEffect, useRef, useState } from "react";
import { Property } from "csstype";
import clsx from "clsx";
import { FileText, Scale, Shield, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const BREAKPOINTS = {
  SM: 0,
  MD: 600,
  LG: 960,
  XL: 1200,
};

export const useResponsive = (styles: any) => {
  const [responsiveStyles, setResponsiveStyles] = useState();

  useEffect(() => {
    const getResponsive = (styles: any) => {
      let currentDirection;
      if (typeof styles === "object") {
        if (styles.sm && window.innerWidth >= BREAKPOINTS.SM) {
          currentDirection = styles.sm;
        }
        if (styles.md && window.innerWidth >= BREAKPOINTS.MD) {
          currentDirection = styles.md;
        }
        if (styles.lg && window.innerWidth >= BREAKPOINTS.LG) {
          currentDirection = styles.lg;
        }
        if (styles.xl && window.innerWidth >= BREAKPOINTS.XL) {
          currentDirection = styles.xl;
        }
      } else {
        currentDirection = styles;
      }
      return currentDirection;
    };

    const listener = () => {
      setResponsiveStyles(getResponsive(styles));
    };

    listener();

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [JSON.stringify(styles)]);

  return responsiveStyles;
};

interface ResponsiveProp<T> {
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
}

const variants = {
  "heading-72": "font-semibold leading-[4.5rem] tracking-[-4.32px]",
  "heading-64": "font-semibold leading-[4rem] tracking-[-3.84px]",
  "heading-56": "font-semibold leading-[3.5rem] tracking-[-3.36px]",
  "heading-48": "font-semibold leading-[3.5rem] tracking-[-2.88px]",
  "heading-40": "font-semibold leading-[3rem] tracking-[-2.4px]",
  "heading-32": "font-semibold leading-10 tracking-[-1.28px]",
  "heading-24": "font-semibold leading-8 tracking-[-0.96px]",
  "heading-20": "font-semibold leading-[1.625rem] tracking-[-0.4px]",
  "heading-16": "font-semibold leading-6 tracking-[-0.32px]",
  "button-16": "font-medium leading-5",
  "button-14": "font-medium leading-5",
  "button-12": "font-medium leading-4",
  "label-20": "leading-8",
  "label-18": "leading-5",
  "label-16": "leading-5",
  "label-14": "leading-5",
  "label-13": "leading-4",
  "label-12": "leading-4",
  "copy-24": "leading-9",
  "copy-20": "leading-9",
  "copy-18": "leading-7",
  "copy-16": "leading-6",
  "copy-14": "leading-5",
  "copy-13": "leading-[1.125rem]",
};

export type TTextVariant = keyof typeof variants;

interface TextProps {
  size?: number | ResponsiveProp<number>;
  variant?: TTextVariant | ResponsiveProp<TTextVariant>;
  transform?: Property.TextTransform;
  color?: string;
  children?: React.ReactNode;
  truncate?: boolean | number;
  align?: Property.TextAlign;
  monospace?: boolean;
  className?: string;
}

export const Text = ({
  size = 16,
  variant,
  transform,
  color = "text-foreground",
  children,
  truncate,
  align,
  monospace = false,
  className,
}: TextProps) => {
  let _size = useResponsive(size) || 16;
  const _variant = useResponsive(variant) || "";
  if (_variant) {
    _size = parseInt((_variant as string)?.split("-")[1]);
  }

  return (
    <p
      className={clsx(
        monospace ? "font-mono" : "font-sans",
        !_variant && _size >= 48 && "font-bold",
        !_variant && _size >= 20 && _size < 48 && "font-semibold",
        !_variant && _size >= 72 && "leading-[4.5rem]",
        !_variant && _size >= 64 && _size < 72 && "leading-[4rem]",
        !_variant && _size >= 48 && _size < 64 && "leading-[3.5rem]",
        !_variant && _size >= 32 && _size < 48 && "leading-10",
        !_variant && _size >= 28 && _size < 32 && "leading-9",
        !_variant && _size >= 24 && _size < 28 && "leading-8",
        !_variant && _size >= 16 && _size < 24 && "leading-6",
        !_variant && _size >= 14 && _size < 16 && "leading-5",
        !_variant && _size >= 12 && _size < 14 && "leading-4",
        !_variant && _size >= 10 && _size < 12 && "leading-3",
        !!_variant && variants[_variant],
        typeof truncate === "boolean" && "truncate",
        color,
        className
      )}
      style={{
        fontSize: `${_size}px`,
        textTransform: transform,
        textAlign: align,
        display: typeof truncate === "number" ? "-webkit-box" : undefined,
        WebkitBoxOrient: typeof truncate === "number" ? "vertical" : undefined,
        WebkitLineClamp: typeof truncate === "number" ? truncate : undefined,
        overflow: typeof truncate === "number" ? "hidden" : undefined,
      }}
    >
      {children}
    </p>
  );
};

interface CollapseProps {
  size?: "small" | "large";
  title: string;
  defaultExpanded?: boolean;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

interface CollapseGroupProps {
  multiple?: boolean;
  children: React.ReactNode;
}

const ArrowIcon = () => (
  <svg
    height="16"
    strokeLinejoin="round"
    viewBox="0 0 16 16"
    width="16"
    className="fill-current"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.0607 5.49999L13.5303 6.03032L8.7071 10.8535C8.31658 11.2441 7.68341 11.2441 7.29289 10.8535L2.46966 6.03032L1.93933 5.49999L2.99999 4.43933L3.53032 4.96966L7.99999 9.43933L12.4697 4.96966L13 4.43933L14.0607 5.49999Z"
    />
  </svg>
);

const Collapse = ({
  size = "large",
  title,
  children,
  defaultExpanded,
  isOpen,
  onToggle,
  className,
}: CollapseProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [_isOpen, set_isOpen] = useState<boolean>(defaultExpanded || false);

  useEffect(() => {
    if (isOpen !== undefined) {
      set_isOpen(isOpen);
    }
  }, [isOpen]);

  return (
    <div
      className={clsx(
        "text-left border-y border-border overflow-hidden font-sans",
        className
      )}
    >
      <h3
        className={clsx(
          "text-foreground",
          size === "small" ? "text-base font-medium" : "text-2xl font-semibold"
        )}
      >
        <button
          onClick={
            onToggle && isOpen !== undefined
              ? onToggle
              : () => set_isOpen(!_isOpen)
          }
          className="cursor-pointer w-full transition"
        >
          <span
            className={clsx(
              "flex justify-between items-center w-full",
              size === "small" ? "py-3" : "py-6"
            )}
          >
            {title}
            <span
              className={clsx(
                "text-foreground flex duration-200",
                _isOpen && "rotate-180"
              )}
            >
              <ArrowIcon />
            </span>
          </span>
        </button>
      </h3>
      <div
        ref={contentRef}
        className="transition-all ease-in-out duration-200 overflow-hidden"
        style={{
          maxHeight: _isOpen ? `${contentRef?.current?.scrollHeight}px` : 0,
        }}
      >
        <div>{children}</div>
      </div>
    </div>
  );
};

const CollapseGroup = ({ multiple = false, children }: CollapseGroupProps) => {
  const collapses = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<CollapseProps> =>
      React.isValidElement(child) && "props" in child
  );

  const [openStates, setOpenStates] = useState(() =>
    collapses.map((child) => child.props.defaultExpanded || false)
  );

  const handleToggle = (index: number) => {
    setOpenStates((prev) =>
      multiple
        ? prev.map((state, i) => (i === index ? !state : state))
        : prev.map((state, i) => (i === index ? !state : false))
    );
  };

  return (
    <div className="border-t border-border">
      {collapses.map((child, index) =>
        React.cloneElement(child, {
          isOpen: openStates[index],
          onToggle: () => handleToggle(index),
          className: "border-t-0",
        })
      )}
    </div>
  );
};

interface License {
  id: string;
  name: string;
  type: "Open Source" | "Commercial" | "Proprietary" | "Creative Commons";
  version?: string;
  description: string;
  permissions: string[];
  limitations: string[];
  conditions: string[];
  fullText: string;
  url?: string;
  icon: React.ReactNode;
}

interface ProjectLicensePageProps {
  projectName?: string;
  licenses?: License[];
}

const ProjectLicensePage = ({
  projectName = "My Awesome Project",
  licenses = [
    {
      id: "mit",
      name: "MIT License",
      type: "Open Source",
      description:
        "A short and simple permissive license with conditions only requiring preservation of copyright and license notices.",
      permissions: [
        "Commercial use",
        "Modification",
        "Distribution",
        "Private use",
      ],
      limitations: ["Liability", "Warranty"],
      conditions: ["License and copyright notice"],
      fullText: `MIT License

Copyright (c) 2025 Aldhaneka

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,
      url: "https://opensource.org/licenses/MIT",
      icon: <Shield className="h-6 w-6" />,
    },
    {
      id: "apache-2",
      name: "CC BY-NC 4.0 with Internal Use Exception",
      type: "Open Source",
      version: "2.0",
      description:
        "A permissive license whose main conditions require preservation of copyright and license notices.",
      permissions: [
        "Commercial use",
        "Modification",
        "Distribution",
        "Patent use",
        "Private use",
      ],
      limitations: ["Trademark use", "Liability", "Warranty"],
      conditions: ["License and copyright notice", "State changes"],
      fullText: `Shadcn Vaults Project (CC BY-NC 4.0 with Internal Use Exception)

All user-submitted components in the '/blocks' directory are licensed under the Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0),
with the following clarification and exception:

You are free to:
- Share — copy and redistribute the material in any medium or format
- Adapt — remix, transform, and build upon the material

Under these conditions:
- Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made.
- NonCommercial — You may NOT use the material for commercial redistribution, resale, or monetization.

🚫 You MAY NOT:
- Sell or redistribute the components individually or as part of a product (e.g. a UI kit, template marketplace, SaaS component library)
- Offer the components or derivative works in any paid tool, theme pack, or design system

✅ You MAY:
- Use the components in internal company tools, dashboards, or applications that are not sold as products
- Remix or adapt components for private or enterprise projects
- Use them in open-source non-commercial projects

This license encourages sharing, learning, and internal innovation — but prohibits using these components as a basis for monetized products.

Full license text: https://creativecommons.org/licenses/by-nc/4.0/

By submitting a component, contributors agree to these terms.
`,
      icon: <Scale className="h-6 w-6" />,
    },
  ],
}: ProjectLicensePageProps) => {
  const getTypeColor = (type: License["type"]) => {
    switch (type) {
      case "Open Source":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Commercial":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Proprietary":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Creative Commons":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const downloadLicense = (license: License) => {
    const element = document.createElement("a");
    const file = new Blob([license.fullText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${license.name.toLowerCase().replace(/\s+/g, "-")}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className=" bg-background">
      <div className="container mx-auto px-4 pt-10 w-full">
        {/* Full License Text */}
        <div className="space-y-8">
          <Text variant="heading-32" className="text-center text-foreground">
            LICENSE
          </Text>

          <CollapseGroup multiple>
            {licenses.map((license) => (
              <Collapse
                key={license.id}
                title={`${license.name} - Full Text`}
                size="large"
              >
                <div className="mb-6">
                  <pre className="whitespace-pre-wrap text-sm bg-muted p-6 rounded-lg overflow-auto max-h-96 font-mono">
                    {license.fullText}
                  </pre>
                  <div className="flex justify-end mt-4 space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => downloadLicense(license)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download License
                    </Button>
                    {license.url && (
                      <Button
                        variant="outline"
                        onClick={() => window.open(license.url, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Original
                      </Button>
                    )}
                  </div>
                </div>
              </Collapse>
            ))}
          </CollapseGroup>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <Text variant="copy-14" className="text-muted-foreground">
            For questions about licensing, please contact the project
            maintainers.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default ProjectLicensePage;
