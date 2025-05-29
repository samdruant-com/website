import type { Project, SpecialProject } from "~/types";
import { defineStore } from "pinia";
import { useAuthStore } from "~/stores/auth.store";

export const useProjectStore = defineStore("project", () => {
  const { request } = useRequest();
  const authStore = useAuthStore();

  async function postProject(project: Partial<SpecialProject>): Promise<Project> {
    return await request("/projects", {
      method: "POST",
      body: JSON.stringify(project),
      authorization: authStore.accessToken
    });
  }

  async function indexProjects(): Promise<Project[]> {
    return await request("/projects", { authorization: authStore.accessToken });
  }

  async function getProject(projectId: string): Promise<Project> {
    return await request(`/projects/${projectId}`, { authorization: authStore.accessToken });
  }

  async function patchProject(id: string, project: Partial<SpecialProject>): Promise<Project> {
    return await request(`/projects/${id}`, {
      method: "PATCH",
      body: JSON.stringify(project),
      authorization: authStore.accessToken
    });
  }

  async function deleteProject(id: string): Promise<Project> {
    return await request(`/projects/${id}`, {
      method: "DELETE",
      authorization: authStore.accessToken
    });
  }

  return { postProject, indexProjects, getProject, patchProject, deleteProject };
});
