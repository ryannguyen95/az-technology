import sanitizeHtml from "sanitize-html";

// Sanitize CMS-authored HTML before rendering (XSS defense — required because
// rich-text is rendered via dangerouslySetInnerHTML). Allows the formatting
// CKEditor produces; strips scripts/handlers/iframes-by-default.
export function cleanHtml(dirty: string): string {
  return sanitizeHtml(dirty, {
    allowedTags: [
      "h1", "h2", "h3", "h4", "h5", "h6", "p", "a", "ul", "ol", "li",
      "blockquote", "strong", "em", "u", "s", "code", "pre", "br", "hr",
      "table", "thead", "tbody", "tr", "th", "td", "img", "figure", "figcaption", "span", "div",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "width", "height", "loading"],
      "*": ["class"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      // External links open safely.
      a: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, rel: "noopener noreferrer", ...(attribs.target ? {} : {}) },
      }),
    },
  });
}
