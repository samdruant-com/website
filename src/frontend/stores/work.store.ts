import type { Work } from "~/types";
import { defineStore } from "pinia";

export const useWorkStore = defineStore("work", () => {
  const indexWorks = async (): Promise<Work[]> => {
    return await $fetch("/api/works");
  };

  const getWork = async (id: string): Promise<Work> => {
    return await $fetch(`/api/works/${id}`);
  };

  return { indexWorks, getWork };
});
