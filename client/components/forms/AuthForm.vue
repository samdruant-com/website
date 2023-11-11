<script setup lang="ts">
import { useAuthStore } from "~/stores/auth-store";
import type { User } from "~/types";

type AuthMode = "login" | "register";

interface AuthForm {
  username: string;
  password: string;
  passwordConfirmation?: string;
}

const props = defineProps({
	mode: {
    type: String as PropType<AuthMode>,
    default: 'login'
  }
});

const emit = defineEmits(['login', 'register'])

const { login, register } = useAuthStore();

const form = reactive<AuthForm>({
	username: "",
	password: "",
	passwordConfirmation: "",
});

const validForm = computed<boolean>(() => {
  if (props.mode === 'login') {
    return form.username.length > 0 && form.password.length > 0;
  } else {
    return form.username.length > 0 && form.password.length > 0 && form.password === form.passwordConfirmation;
  }
});

async function authenticate(){
  if (props.mode === 'login') {
    const user: User = await login(form.username, form.password);
    emit('login', user);
  } else {
    const user: User = await register(form.username, form.password);
    emit('register', user);
  }
}
</script>

<template>
	<v-sheet class="pa-1" color="surface">
    <InputText v-model="form.username" label="Username"/>
    <InputText v-model="form.password" type="password" label="Password"/>
    <InputText v-if="props.mode === 'register'" v-model="form.passwordConfirmation" type="password" label="Password Confirmation"/>

    <v-row justify="center">
      <v-col md="auto">
        <BaseBtn color="primary" large :disabled="!validForm" @click="authenticate()">
          {{ props.mode === 'login' ? 'Login' : 'Register' }}
        </BaseBtn>
      </v-col>
    </v-row>
  </v-sheet>
</template>
