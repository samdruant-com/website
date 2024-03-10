interface StorageOptions {
  server?: boolean;
  cookie?: boolean;
}

export function useStorage () {
	function set (key: string, value: string, options?: StorageOptions): boolean {
		try {
			if (options?.server || options?.cookie || process.server) {
				const cookie = useCookie(key);
				cookie.value = value;
			} else {
				localStorage.setItem(key, value);
			}

			return true;
		} catch (error) {
			return false;
		}
	}

	function get (key: string, options?: StorageOptions): string | null {
		try {
			let value = null;

			if (options?.server || options?.cookie || process.server) {
				const cookie = useCookie(key);
				value = cookie.value as unknown as string | null;
			} else {
				value = localStorage.getItem(key);
			}

			return value;
		} catch (error) {
			return null;
		}
	}

	function remove (key: string, options?: StorageOptions): boolean {
		try {
			if (options?.server || options?.cookie || process.server) {
				const cookie = useCookie(key);
				cookie.value = null;
			} else {
				localStorage.removeItem(key);
			}

			return true;
		} catch (error) {
			return false;
		}
	}

	return { set, get, remove };
}
