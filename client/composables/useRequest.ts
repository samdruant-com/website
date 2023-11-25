interface FetchConfig extends RequestInit {
  method?: 'POST' | 'GET' | 'PATCH' | 'DELETE';
  contentType?: string;
  authorization?: string;

  /**
   * Remove content type header so that the browser can set it automatically
   */
  removeContentType?: boolean;
}

export interface FetchError {
  status: number;
  statusText: string;
  message: string;
}

/**
 * returns true if a string is a url with or without protocol
 */
function _isValidUrl(str: string): boolean {
  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port
    '(\\?[;&amp;a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

  return !!pattern.test(str);
}

export function useRequest() {
  const DEFAULT_METHOD = 'GET';
  const DEFAULT_CONTENT_TYPE = 'application/json';

  const runtimeConfig = useRuntimeConfig();
  const BASE_URL = runtimeConfig.public.baseUrl;

  /**
   * If url is a valid url, return it. Otherwise, prepend the base url
   */
  function _buildUrl(url: string): string {
    return _isValidUrl(url) ? url : `${BASE_URL}${url}`;
  }

  /**
   * wrapper for fetch API with base url and default headers
   */
  async function request(url: string, options?: FetchConfig) {
    try {
      const config: RequestInit = {
        method: options?.method || DEFAULT_METHOD,
        headers: {
          'Content-Type': options?.contentType || DEFAULT_CONTENT_TYPE,
        }
      };

      if (options?.body) {
        config.body = options.body;
      }

      if(options?.authorization){
        config.headers!['Authorization' as keyof HeadersInit] = options.authorization;
      }

      if (options?.removeContentType) {
        delete config.headers!['Content-Type' as keyof HeadersInit];
      }

      const path = _buildUrl(url);

      const response = await fetch(path, config);

      if (!response.ok) {
        throw response;
      }

      return response.json();
    } catch (error: any) {
      
      if (error instanceof Response) {
        const { status, statusText } = error;
        const message = await error.text();

        throw { status, statusText, message } as FetchError;
      } else if (error instanceof Error) {
        
        throw { status: 500, statusText: 'Internal Server Error', message: error.message } as FetchError;
      } else {
        
        throw { status: 500, statusText: 'Internal Server Error', message: 'Unknown Error' } as FetchError;
      }
    }
  }

  return { request };
}
