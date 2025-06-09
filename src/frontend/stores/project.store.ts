import type { Project } from "~/types";
import { defineStore } from "pinia";

export const useProjectStore = defineStore("project", () => {
  async function indexProjects(): Promise<Project[]> {
    return await $fetch("/api/projects");
  }

  async function getProject(projectId: string): Promise<Project> {
    return await $fetch(`/api/projects/${projectId}`);
  }

  return { indexProjects, getProject };
});
