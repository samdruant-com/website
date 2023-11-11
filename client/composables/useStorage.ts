export function useStorage() {
   
  function set(key: string, value: string): boolean {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      return false;
    }
  }

  function get(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function remove(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      return false;
    }
  }

  return { set, get, remove };
}
