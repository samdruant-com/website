import type { ActionItem } from '~/components/base/BaseCard.vue';
import { useNotification } from '~/composables/useNotification';
import { defineStore } from 'pinia';

export const useNavigationStore = defineStore('navigation', () => {
  const { notify } = useNotification();
  
  const options: ActionItem[] = [
    { 
      label: 'Projects',
      to: '/projects'
    },
    { 
      label: 'Contact',
      to: '/contact'
    },
  ]

  return {
    options
  }
})