<script setup lang="ts">
import { useAuthStore } from '~/stores/auth-store';
import type { User, SpecialUser } from '~/types';
import type { ActionItem } from '~/components/base/BaseCard.vue';

const props = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true
  }
});

const emit = defineEmits(['updated']);

const authStore = useAuthStore();
const { notify } = useNotification();

const form = reactive<SpecialUser>({
  username: props.user?.username || '',
  password: '',
  passwordConfirmation: ''
});

const validForm = computed<boolean>(() => {
  // if password is empty, we don't want to validate it
  if (form.password.length === 0) {
    return form.username.length > 0;
  } else {
    return (
      form.username.length > 0 &&
      form.password.length > 0 &&
      form.password === form.passwordConfirmation
    );
  }
});

const options = computed<ActionItem[]>(() => {
  return [
    {
      label: 'Update',
      disabled: !validForm.value,
      color: validForm.value ? 'success' : undefined,
      action: async () => {
        try {
          const user: User = await authStore.updateUser(props.user?._id, form);
          emit('updated', user);
        } catch (error) {
          notify('User Error', (error as Error).message, 'error');
        }
      }
    }
  ];
});
</script>

<template>
  <base-card :actions="options">
    <InputText v-model="form.username" label="Username" />
    <InputText v-model="form.password" type="password" label="Password" />
    <InputText v-model="form.passwordConfirmation" type="password" label="Confirm Password" />
  </base-card>
</template>
