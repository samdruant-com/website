import { defineStore } from 'pinia';
import type { ActionItem } from '~/components/base/BaseCard.vue';

export const useNavigationStore = defineStore('navigation', () => {
  
  const options = computed<ActionItem[]>(() => {
  
  return [
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
  });

  return {
    options
  }
})