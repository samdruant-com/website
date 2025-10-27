import { defineStore } from "pinia";

export const useGeneralStore = defineStore("general-app", () => {
  const showsidebar = ref(false);

  const pages = computed<{ label: string, to: string }[]>(() => {
    return [
      {
        label: "Projects",
        to: "/projects"
      },
      {
        label: "Works",
        to: "/works"
      },
      {
        label: "Contact",
        to: "/contact"
      }
    ];
  });

  function toggleSidebar() {
    showsidebar.value = !showsidebar.value;
  }

  return {
    showsidebar,
    pages,
    toggleSidebar
  };
});
