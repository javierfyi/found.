"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface HoverCardProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * The title of the card
   */
  title: string;

  /**
   * The description/subtitle of the card
   */
  description: string;

  /**
   * Optional image/visual to display in the card background
   */
  image?: string;

  /**
   * Custom class for the card container
   */
  className?: string;

  /**
   * Custom class for the description container
   */
  descriptionClassName?: string;

  /**
   * Show the external link icon
   * @default true
   */
  showIcon?: boolean;

  /**
   * Custom icon to replace the default external link icon
   */
  customIcon?: React.ReactNode;

  /**
   * When true, render as a div instead of an anchor (e.g. when used inside a Link to avoid invalid nested <a>).
   * @default false
   */
  asDiv?: boolean;
}

/**
 * HoverCard - A card component that reveals description on hover
 *
 * Features:
 * - Smooth slide-up animation on hover
 * - Keyboard accessible (focus-visible support)
 * - Fully customizable with Tailwind classes
 * - Works as a link (anchor tag)
 * - Clean design with subtle shadows
 */
export function HoverCard({
  title,
  description,
  image,
  href = "#",
  className,
  descriptionClassName,
  showIcon = true,
  customIcon,
  asDiv = false,
  ...props
}: HoverCardProps) {
  const defaultIcon = (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      className="absolute right-4 top-4"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.33333 0.4375C6.33333 0.195877 6.52922 0 6.77083 0H10.5625C10.8041 0 11 0.195877 11 0.4375V4.22917C11 4.47078 10.8041 4.66667 10.5625 4.66667C10.3209 4.66667 10.125 4.47078 10.125 4.22917V1.49372L7.08017 4.53851C6.90932 4.70937 6.63235 4.70937 6.46149 4.53851C6.29063 4.36765 6.29063 4.09068 6.46149 3.91981L9.50626 0.875H6.77083C6.52922 0.875 6.33333 0.679122 6.33333 0.4375ZM0.5 6.27083C0.5 6.02922 0.695877 5.83333 0.9375 5.83333C1.17912 5.83333 1.375 6.02922 1.375 6.27083V9.00626L4.41981 5.96149C4.59068 5.79063 4.86765 5.79063 5.03851 5.96149C5.20937 6.13235 5.20937 6.40932 5.03851 6.58017L1.99372 9.625H4.72917C4.97078 9.625 5.16667 9.82088 5.16667 10.0625C5.16667 10.3041 4.97078 10.5 4.72917 10.5H0.9375C0.695877 10.5 0.5 10.3041 0.5 10.0625V6.27083Z"
        fill="currentColor"
      />
    </svg>
  );

  const wrapperClassName = cn(
    "group relative flex h-[340px] w-[340px] items-end overflow-hidden rounded-2xl bg-white text-left no-underline",
    "shadow-[0px_0px_0px_1px_rgba(9,9,11,0.08),0px_1px_2px_-1px_rgba(9,9,11,0.08),0px_2px_4px_0px_rgba(9,9,11,0.04)]",
    className,
  );

  const content = (
    <>
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
          aria-hidden="true"
        />
      )}
      <div
        className={cn(
          "relative m-1.5 w-full rounded-xl border border-white bg-neutral-50 px-3.5 pb-3.5 pt-2.5 text-[13px]",
          "shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)]",
          "translate-y-[calc(100%+0.375rem+1px)]",
          "transition-transform duration-500",
          "[transition-timing-function:cubic-bezier(0.19,1,0.22,1)]",
          "group-hover:translate-y-0 group-focus-visible:translate-y-0",
          descriptionClassName,
        )}
      >
        <h3 className="font-medium text-neutral-900">{title}</h3>
        <p className="mt-1 leading-none text-neutral-500">{description}</p>
        {showIcon && (
          <div className="text-neutral-600">{customIcon ?? defaultIcon}</div>
        )}
      </div>
    </>
  );

  if (asDiv) {
    return <div className={wrapperClassName}>{content}</div>;
  }

  return (
    <a href={href} className={wrapperClassName} {...props}>
      {content}
    </a>
  );
}
