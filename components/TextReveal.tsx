"use client";

import { cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 3 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/**
 * Recursively splits text content into per-word motion spans, preserving
 * inline elements (e.g. bold <span>s) and their styling.
 */
function splitIntoWords(node: ReactNode, keyPrefix: string): ReactNode[] {
  if (node == null || typeof node === "boolean") return [];
  if (typeof node === "string" || typeof node === "number") {
    return String(node)
      .split(/(\s+)/)
      .map((part, i) =>
        /^\s*$/.test(part) ? (
          part
        ) : (
          <motion.span
            key={`${keyPrefix}-${i}`}
            variants={wordVariants}
            className="inline-block"
          >
            {part}
          </motion.span>
        )
      );
  }
  if (Array.isArray(node)) {
    return node.flatMap((child, i) => splitIntoWords(child, `${keyPrefix}-${i}`));
  }
  if (isValidElement(node)) {
    const el = node as ReactElement<{ children?: ReactNode }>;
    if (el.props.children == null) return [el];
    return [
      cloneElement(
        el,
        { key: `${keyPrefix}-el` },
        splitIntoWords(el.props.children, `${keyPrefix}-c`)
      ),
    ];
  }
  return [node];
}

const tags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
} as const;

type TextRevealProps = {
  as?: keyof typeof tags;
  className?: string;
  /** Delay before the first word appears (seconds) */
  delay?: number;
  /** Gap between consecutive words (seconds) */
  stagger?: number;
  children: ReactNode;
};

export default function TextReveal({
  as = "p",
  className,
  delay = 0,
  stagger = 0.02,
  children,
}: TextRevealProps) {
  const Tag = tags[as];
  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      className={className}
    >
      {splitIntoWords(children, "w")}
    </Tag>
  );
}
