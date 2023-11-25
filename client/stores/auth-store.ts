import { defineStore } from 'pinia';
import { useRequest } from '~/composables/useRequest';
import { useStorage } from '~/composables/useStorage';
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
  const STORAGE_KEY_USER = 'user';
  const STORAGE_KEY_AUTH = 'auth';
  const STORAGE_KEY_REFRESH = 'refresh';

  const { request } = useRequest();
  const { get, set, remove } = useStorage();

  const user = ref<User>();
  const accessToken = ref<string>();
  const refreshToken = ref<string>();

  const isAuthenticated = computed<boolean>(() => accessToken.value !== undefined);

  /**
   * Set or unset (undefined) user in local storage.
   */
  function _setUser(setUser: User | undefined){
    if(user === undefined){
      remove(STORAGE_KEY_USER);
    } else {

      set(STORAGE_KEY_USER, JSON.stringify(setUser));
      user.value = setUser;
    }
  }

  /**
   * Set or unset (undefined) tokens in local storage.
   */
  function _setTokens(accessT: string | undefined, refreshT: string | undefined){
    if(accessT === undefined && refreshT === undefined){
      _setUser(undefined);
    }

    if(accessT === undefined){
      remove(STORAGE_KEY_AUTH);
    } else {
      set(STORAGE_KEY_AUTH, accessT);
    }
    
    if(refreshT === undefined){
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
    const response = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    if(!response.user){
      throw new Error('Invalid username or password.');
    }

    _setUser(response.user);
    _setTokens(response.accessToken, response.refreshToken);
    
    return user.value as User;
  }
  
  /**
   * Login user. This function saves auth tokens and returns user if credentials
   * are valid.
   */
  async function login(username: string, password: string): Promise<User>{
    const response = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    if(!response.user){
      throw new Error('Invalid username or password.');
    }

    _setUser(response.user);
    _setTokens(response.accessToken, response.refreshToken);
    
    return user.value as User;
  }

  /**
   * Refreshes auth tokens.
   */
  async function refresh(): Promise<void>{
    if(!refreshToken.value){
      throw new Error('Missing refresh token.');
    }
    
    const response = await request('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken: refreshToken.value, accessToken: accessToken.value }),
    });

    _setTokens(response.accessToken, response.refreshToken);
  }

  /**
   * Removes auth tokens.
   */
  function logout(): void {
    _setUser(undefined);
    _setTokens(undefined, undefined);
  }

  onMounted(() => {
    if(get(STORAGE_KEY_USER)){
      user.value = JSON.parse(get(STORAGE_KEY_USER) as string);
    }

    if(get(STORAGE_KEY_AUTH)){
      accessToken.value = get(STORAGE_KEY_AUTH) as string;
    }

    if(get(STORAGE_KEY_REFRESH)){
      refreshToken.value = get(STORAGE_KEY_REFRESH) as string;
    }
  })

  return {
    user,
    accessToken,
    isAuthenticated,
    register,
    login,
    refresh,
    logout
  }
})