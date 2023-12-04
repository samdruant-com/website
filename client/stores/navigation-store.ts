import { defineStore } from 'pinia';
import { useAuthStore } from './auth-store';
import type { ActionItem } from '~/components/base/BaseCard.vue';

export const useNavigationStore = defineStore('navigation', () => {
  const authStore = useAuthStore();

  const options = computed<ActionItem[]>(() => {
  
  const list: ActionItem[] = [
    { 
      label: 'Projects',
      to: '/projects'
    },
    { 
      label: 'Works',
      to: '/works'
    },
    { 
      label: 'Contact',
      to: '/contact'
    },
  ]

  if(authStore.isAuthenticated){
    list.push({
      label: '*Portfolio',
      to: '/profile'
    })
  }

  return list;
  });

  return {
    options
  }
})