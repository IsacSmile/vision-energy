"use client";

import React, { useState } from "react";
import {
  Heading2,
  Heading3,
  Bold,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Image as ImageIcon,
  Table as TableIcon,
  Minus,
  Eye,
  Edit3,
} from "lucide-react";
import { renderSanitizedMarkdown } from "@/lib/sanitizer";

interface MarkdownEditorProps {
  value: string;
  onChange: (val: string) => void;
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [sanitizedPreview, setSanitizedPreview] = useState("");

  const words = value.trim() ? value.trim().split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  const insertText = (before: string, after: string = "") => {
    const textarea = document.getElementById("markdown-textarea") as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end);
    const replacement = `${before}${selected || "text"}${after}`;

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 50);
  };

  const handlePreviewToggle = async (tab: "write" | "preview") => {
    setActiveTab(tab);
    if (tab === "preview") {
      const html = await renderSanitizedMarkdown(value);
      setSanitizedPreview(html);
    }
  };

  return (
    <div className="space-y-3 bg-[#0D1117] border border-[#1F2937] p-4 rounded-xl">
      {/* Header Bar with Toolbar & Write/Preview Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1F2937] pb-3">
        {/* Formatting Toolbar */}
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            onClick={() => insertText("## ")}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#050608] border border-transparent hover:border-[#1F2937] rounded-lg"
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText("### ")}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#050608] border border-transparent hover:border-[#1F2937] rounded-lg"
            title="Heading 3"
          >
            <Heading3 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText("**", "**")}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#050608] border border-transparent hover:border-[#1F2937] rounded-lg"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText("*", "*")}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#050608] border border-transparent hover:border-[#1F2937] rounded-lg"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText("[", "](https://example.com)")}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#050608] border border-transparent hover:border-[#1F2937] rounded-lg"
            title="Link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText("- ")}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#050608] border border-transparent hover:border-[#1F2937] rounded-lg"
            title="Bullet list"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText("1. ")}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#050608] border border-transparent hover:border-[#1F2937] rounded-lg"
            title="Numbered list"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText("> ")}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#050608] border border-transparent hover:border-[#1F2937] rounded-lg"
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText("![Alt text](", ")")}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#050608] border border-transparent hover:border-[#1F2937] rounded-lg"
            title="Image"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText("\n| Header 1 | Header 2 |\n| --- | --- |\n| Cell 1 | Cell 2 |\n")}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#050608] border border-transparent hover:border-[#1F2937] rounded-lg"
            title="Table"
          >
            <TableIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText("\n---\n")}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#050608] border border-transparent hover:border-[#1F2937] rounded-lg"
            title="Horizontal rule"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile View Toggle */}
        <div className="flex xl:hidden items-center bg-[#050608] p-1 border border-[#1F2937] rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => handlePreviewToggle("write")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors min-h-[44px] ${
              activeTab === "write" ? "bg-[#A3E635] text-[#050608]" : "text-gray-400 hover:text-white"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Write</span>
          </button>
          <button
            type="button"
            onClick={() => handlePreviewToggle("preview")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors min-h-[44px] ${
              activeTab === "preview" ? "bg-[#A3E635] text-[#050608]" : "text-gray-400 hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
        </div>
      </div>

      {/* Editor & Split Preview Body */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Editor Area */}
        <div className={activeTab === "preview" ? "hidden xl:block" : "block"}>
          <textarea
            id="markdown-textarea"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write blog article content in Markdown format..."
            rows={16}
            className="w-full bg-[#050608] border border-[#1F2937] text-white text-base rounded-xl p-4 min-h-[320px] focus:outline-none focus:ring-2 focus:ring-[#A3E635] leading-relaxed font-sans"
          />
        </div>

        {/* Preview Area */}
        <div className={activeTab === "write" ? "hidden xl:block" : "block"}>
          <div className="bg-[#050608] border border-[#1F2937] rounded-xl p-6 min-h-[320px] max-h-[500px] overflow-y-auto prose prose-invert prose-lime max-w-none text-sm text-gray-200 leading-relaxed">
            {value.trim() ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizedPreview || "<p class='text-gray-500 italic'>Generating preview...</p>",
                }}
              />
            ) : (
              <p className="text-gray-500 text-xs italic">Live rendered preview will appear here...</p>
            )}
          </div>
        </div>
      </div>

      {/* Word Count and Reading Time Footer */}
      <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 border-t border-[#1F2937] pt-2">
        <span>{words} words</span>
        <span>~{readingTime} min read (200 wpm)</span>
      </div>
    </div>
  );
}
