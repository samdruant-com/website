// plugins/sonner.client.ts
import { toast, Toaster } from "vue-sonner";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("Toaster", Toaster);

  return {
    provide: {
      toast
    }
  };
});
