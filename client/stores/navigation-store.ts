import type { ActionItem } from '~/components/base/BaseCard.vue';
import { useNotification } from '~/composables/useNotification';
import { defineStore } from 'pinia';

export const useNavigationStore = defineStore('navigation', () => {
  const { notify } = useNotification();
  
  const options: ActionItem[] = [
    { 
      label: 'about',
      icon: 'mdi-information-outline',
      to: '/about'
    },
    { 
      label: 'ui components',
      icon: 'mdi-view-dashboard-outline',
      to: '/components'
    },
    { 
      label: 'notifications',
      icon: 'mdi-bell-outline',
      action: () => {
        notify('Nav Bar', 'Notification triggered', 'success')
      }
    }
  ]

  return {
    options
  }
})