export type UrlTarget = "_blank";

export function useNavigator() {
  const router = useRouter();

  function openLink(url: string, target?: UrlTarget) {
    // if link starts with /, use router
    if (url.startsWith("/")) {
      return router.push(url);
    }

    // if link doesn't have http, add it
    if (!url.startsWith("http")) {
      url = `https://${url}`;
    }

    target = target || "_blank";

    window.open(url, target);
  }

  return { openLink };
}
