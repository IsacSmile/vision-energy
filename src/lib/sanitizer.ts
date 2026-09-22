import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

const customSchema = {
  ...defaultSchema,
  tagNames: [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "b",
    "i",
    "strong",
    "em",
    "ul",
    "ol",
    "li",
    "a",
    "img",
    "blockquote",
    "code",
    "pre",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "hr",
    "br",
  ],
  attributes: {
    ...defaultSchema.attributes,
    a: ["href", "title", "target", "rel"],
    img: ["src", "alt", "title", "width", "height"],
  },
  protocols: {
    ...defaultSchema.protocols,
    href: ["http", "https", "mailto", "tel"],
    src: ["http", "https"],
  },
};

export async function renderSanitizedMarkdown(markdown: string): Promise<string> {
  if (!markdown) return "";
  try {
    const file = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeSanitize, customSchema)
      .use(rehypeStringify)
      .process(markdown);

    return String(file);
  } catch (error) {
    console.error("Failed to process Markdown:", error);
    return "";
  }
}
