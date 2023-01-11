import React, { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
//import "prismjs/components/prism-clike";
//import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import type { Grammar } from "prismjs";
import { highlight, languages } from "prismjs";
import CopyButton from "./buttons/CopyButton";

interface CodeBlockProps {
  code: string;
  title?: string;
  placeHolder?: string;
  readonly?: boolean;
  onCodeChange?: (code: string) => void;
}

export default function CodeBlock({
  code,
  title,
  placeHolder,
  readonly,
  onCodeChange,
}: CodeBlockProps) {
  const [typedCode, setTypedCode] = useState("");

  useEffect(() => {
    if (readonly && code.length) {
      setTypedCode(code.slice(0, 1));
    }
  }, [code, readonly]);

  useEffect(() => {
    if (!readonly) return;
    const timeout = setTimeout(() => {
      if (typedCode.length < code.length) {
        setTypedCode(code.slice(0, typedCode.length + 1));
        window.scrollTo(0, document.body.scrollHeight);
      }
    }, 4);

    return () => clearTimeout(timeout);
  }, [typedCode, code, readonly]);

  return (
    <div className="rounded-lg bg-white shadow">
      <div className="flex h-10 items-center justify-start rounded-t-lg bg-slate-200">
        <h3 className="ml-3 font-medium text-slate-900">{title}</h3>
        {code.length >= 1000 && !readonly && (
          <p className="ml-4 font-medium text-red-500">
            Character limit of 1000 hit
          </p>
        )}
        <CopyButton code={code} />
      </div>
      <div className="no-outline-text-area overflow-auto p-2">
        <Editor
          value={readonly ? typedCode : code}
          readOnly={readonly}
          onValueChange={(value) => {
            onCodeChange && onCodeChange(value);
          }}
          highlight={(code) =>
            highlight(code, languages.js as Grammar, "javascript")
          }
          placeholder={placeHolder}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 18,
          }}
        />
      </div>
    </div>
  );
}
