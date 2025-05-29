interface StorageOptions {
  server?: boolean
  cookie?: boolean
}

export function useStorage() {
  function set(key: string, value: string, options?: StorageOptions): boolean {
    try {
      if (options?.server || options?.cookie) {
        const cookie = useCookie(key);
        cookie.value = value;
      } else {
        localStorage.setItem(key, value);
      }

      return true;
    } catch {
      return false;
    }
  }

  function get(key: string, options?: StorageOptions): string | null {
    try {
      let value = null;

      if (options?.server || options?.cookie) {
        const cookie = useCookie(key);
        value = cookie.value as unknown as string | null;
      } else {
        value = localStorage.getItem(key);
      }

      return value;
    } catch {
      return null;
    }
  }

  function remove(key: string, options?: StorageOptions): boolean {
    try {
      if (options?.server || options?.cookie) {
        const cookie = useCookie(key);
        cookie.value = null;
      } else {
        localStorage.removeItem(key);
      }

      return true;
    } catch {
      return false;
    }
  }

  return { set, get, remove };
}
