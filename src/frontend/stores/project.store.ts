import type { Project } from "~/types";
import { defineStore } from "pinia";

export const useProjectStore = defineStore("project", () => {
  const { request } = useRequest();

  async function indexProjects(): Promise<Project[]> {
    return await request("/projects");
  }

  async function getProject(projectId: string): Promise<Project> {
    return await request(`/projects/${projectId}`);
  }

  return { indexProjects, getProject };
});
