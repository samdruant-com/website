import { defineStore } from 'pinia';
import { useRequest } from '~/composables/useRequest';
import { useStorage } from '~/composables/useStorage';
import { useNotification } from '~/composables/useNotification';
import type { User } from '~/types'

/**
 * This store provides a basic authentication flow and should be updated accordingly.
 * 
 * That being said, it offers the following features:
 * 
 * 1. register a user
 * 2. login a user
 * 3. store authentication tokens
 * 4. refresh tokens
 */
export const useAuthStore = defineStore('auth', () => {
  const STORAGE_KEY_AUTH = 'auth';
  const STORAGE_KEY_REFRESH = 'refresh';

  const { request } = useRequest();
  const { notify } = useNotification();
  const { get, set, remove } = useStorage();

  const user = ref<User | null>(null);
  const accessToken = ref<string | null>(get(STORAGE_KEY_AUTH));
  const refreshToken = ref<string | null>(get(STORAGE_KEY_REFRESH));

  const isAuthenticated = computed<boolean>(() => accessToken.value !== null);

  /**
   * Set or unset (null) tokens in local storage.
   */
  function _setTokens(accessT: string | null, refreshT: string | null){
    if(accessT === null && refreshT === null){
      user.value = null;
    }

    if(accessT === null){
      remove(STORAGE_KEY_AUTH);
    } else {
      set(STORAGE_KEY_AUTH, accessT);
    }
    
    if(refreshT === null){
      remove(STORAGE_KEY_REFRESH);
    } else {
      set(STORAGE_KEY_REFRESH, refreshT);
    }
    
    accessToken.value = accessT;
    refreshToken.value = refreshT;
  }

  /**
   * Register user. This function saves auth tokens and returns user if
   * if everything goes as planned.
   */
  async function register(username: string, password: string): Promise<User> {
    try {
      const response = await request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });

      if(!response.user){
        throw new Error('Invalid username or password.');
      }

      user.value = response.user;
      _setTokens(response.accessToken, response.refreshToken);

    } catch (error) {
      notify('Auth Store', (error as Error).message, 'error');
    }
    
    return user.value as User;
  }
  
  /**
   * Login user. This function saves auth tokens and returns user if credentials
   * are valid.
   */
  async function login(username: string, password: string): Promise<User>{
    try {
      const response = await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });

      if(!response.user){
        throw new Error('Invalid username or password.');
      }

      user.value = response.user;
      _setTokens(response.accessToken, response.refreshToken);
      
    } catch (error) {
      notify('Auth Store', (error as Error).message, 'error');
    }

    return user.value as User;
  }

  /**
   * Refreshes auth tokens.
   */
  async function refresh(): Promise<void>{
    if(!refreshToken.value){
      notify('Auth Store', 'Missing refresh token.', 'error');
      return;
    }
    
    try {
      const response = await request('/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken: refreshToken.value, accessToken: accessToken.value }),
      });

      _setTokens(response.accessToken, response.refreshToken);
      
    } catch (error) {
      notify('Auth Store', (error as Error).message, 'error');
    }
  }

  /**
   * Removes auth tokens.
   */
  function logout(): void {
    _setTokens(null, null);
  }

  /**
   * Sets auth tokens if they are stored locally.
   */
  onMounted(() => {
    accessToken.value = get(STORAGE_KEY_AUTH);
    refreshToken.value = get(STORAGE_KEY_REFRESH);
  });

  return {
    accessToken,
    isAuthenticated,
    register,
    login,
    refresh,
    logout
  }
})