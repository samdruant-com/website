<script setup lang="ts">
import type { SpecialUser, User } from "~/types";
import { useAuthStore } from "~/stores/auth.store";

type AuthMode = "login" | "register";

const props = defineProps({
  mode: {
    type: String as PropType<AuthMode>,
    default: "login"
  }
});

const emit = defineEmits(["login", "register"]);

const { notify } = useNotification();
const { login, register } = useAuthStore();

const form = reactive<SpecialUser>({
  username: "",
  password: "",
  passwordConfirmation: "",
  secret: ""
});

const validForm = computed<boolean>(() => {
  if (props.mode === "login") {
    return form.username.length > 0 && form.password.length > 0;
  } else {
    return (
      form.username.length > 0
      && form.password.length > 0
      && form.password === form.passwordConfirmation
      && form.secret !== undefined
      && form.secret.length > 0
    );
  }
});

async function authenticate() {
  try {
    if (props.mode === "login") {
      const user: User = await login(form.username, form.password);
      emit("login", user);
    } else {
      const user: User = await register(form.username, form.password, form.secret!);
      emit("register", user);
    }
  } catch (error) {
    notify("Authentication Error", (error as Error).message, "error");
  }
}
</script>

<template>
  <base-card class="flex flex-col gap-2">
    <InputText v-model="form.username" class="w-full" label="Username" />
    <InputText
      v-model="form.password"
      class="w-full"
      type="password"
      label="Password"
    />

    <InputText
      v-if="props.mode === 'register'"
      v-model="form.passwordConfirmation"
      class="w-full"
      type="password"
      label="Password Confirmation"
    />

    <InputText
      v-if="props.mode === 'register'"
      v-model="form.secret"
      class="w-full"
      type="password"
      label="Admin Secret"
    />

    <base-btn
      class="w-full mt-4"
      color="primary"
      large
      :disabled="!validForm"
      @click="authenticate()"
    >
      {{ props.mode === 'login' ? 'Login' : 'Register' }}
    </base-btn>
  </base-card>
</template>
