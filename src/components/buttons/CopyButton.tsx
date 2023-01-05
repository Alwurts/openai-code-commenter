import React, { useEffect, useState } from "react";

interface CopyButtonProps {
  code: string;
  onCopy?: () => void;
}

const CopyButton: React.FC<CopyButtonProps> = ({ code, onCopy }) => {
  function copyToClipboard(text: string) {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [copied]);

  function handleCopy() {
    copyToClipboard(code);
    setCopied(true);
    onCopy && onCopy();
  }

  return (
    <button
      className={`font-mediu ml-auto mr-2 rounded-full border py-1 px-3  ${
        copied
          ? "text-orange-500 hover:text-orange-400"
          : "text-slate-900 hover:text-white"
      }`}
      onClick={handleCopy}
    >
      {copied ? "Copied" : "Copy code"}
    </button>
  );
};

export default CopyButton;
