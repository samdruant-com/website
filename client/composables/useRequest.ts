interface FetchConfig extends RequestInit {
  /**
   * If true, the request does not use the base url
   */
  external?: boolean;
}

interface FetchError {
  status: number;
  statusText: string;
  content: any;
}

export function useRequest() {
  const runtimeConfig = useRuntimeConfig();
  const BASE_URL = runtimeConfig.public.restApi;

  /**
   * wrapper for fetch API with base url and default headers
   */
  async function request(url: string, options?: FetchConfig) {

    const defaultOptions: RequestInit = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    const config: RequestInit = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options?.headers // merge headers with default and options headers
      }
    };

    try {
      const path: string = options?.external ? url : `${BASE_URL}${url}`;
      const res = await fetch(path, { ...config });

      if (!res.ok) {
        throw res;
      }

      return res.json();
    } catch (err: any) {

      const error: FetchError = {
        status: err.status,
        statusText: err.statusText,
        content: undefined
      };

      if (error.status >= 400 && error.status < 500) {
        error.content = err.json();
      } else {
        error.content = err;
      }

      throw error;
    }
  }

  return { request };
}
