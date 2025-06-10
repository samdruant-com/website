import type { Project, Work } from "~/types";
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

  function sortListByDate(list: Project[] | Work[]): Project[] | Work[] {
    return list.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // Sort in descending order
    });
  }

  return {
    sanitizeHtml,
    convertMarkdownToHtml,
    convertDateToYear,
    sortListByDate
  };
}
