import sanitize from "sanitize-html";
import showdown from "showdown";

export function useFormatter() {
  function sanitizeHtml(html: string): string {
    return sanitize(html, {
      allowedAttributes: {
        ...sanitize.defaults.allowedAttributes,
        a: [...sanitize.defaults.allowedAttributes.a, "class"]
      },
      transformTags: {
        a: sanitize.simpleTransform("a", { class: "underline text-blue-500" })
      }
    });
  }

  function convertMarkdownToHtml(markdown: string): string {
    const html = new showdown.Converter().makeHtml(markdown);
    return sanitizeHtml(html);
  }

  function convertDateToYear(date: string): string {
    return date.split("-")[0];
  }

  return {
    sanitizeHtml,
    convertMarkdownToHtml,
    convertDateToYear
  };
}
