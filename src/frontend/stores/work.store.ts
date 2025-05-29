import type { Work } from "~/types";
import { defineStore } from "pinia";

export const useWorkStore = defineStore("work", () => {
  const { request } = useRequest();

  const indexWorks = async (): Promise<Work[]> => {
    const data = await request("/works");
    return data as unknown as Work[];
  };

  const getWork = async (id: string): Promise<Work> => {
    const data = await request(`/works/${id}`);
    return data as unknown as Work;
  };

  return { indexWorks, getWork };
});
