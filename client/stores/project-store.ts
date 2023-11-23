import { defineStore } from 'pinia'
import type { Project, SpecialProject } from '~/types'

export const useProjectStore = defineStore('project', () => {

  const { request } = useRequest();

  async function postProject(project: Partial<SpecialProject>): Promise<Project> {
    return await request('/projects', {
      method: 'POST',
      body: JSON.stringify(project)
    })
  }

  async function indexProjects(): Promise<Project[]> {
    return await request('/projects');
  }

  async function getProject(projectId: string): Promise<Project> {
    return await request(`/projects/${projectId}`)
  }

  async function patchProject(id: string, project: Partial<SpecialProject>): Promise<Project> {
    return await request(`/projects/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(project)
    })
  }

  return { postProject, indexProjects, getProject, patchProject }
})
