"use client";

import { Highlight, themes } from "prism-react-renderer";

export function CodeBlock({
  code,
  language = "tsx",
  className = "",
}: {
  code: string;
  language?: string;
  className?: string;
}) {
  return (
    <Highlight theme={themes.vsLight} code={code.trim()} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`overflow-x-auto rounded-2xl border border-border bg-muted/50 p-6 text-sm ${className}`}
          style={{ ...style, backgroundColor: "transparent" }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
