import { defineStore } from 'pinia'
import MockProjects from '~/stores/mock/projects'
import MockWorks from '~/stores/mock/works'
import type { Project, Work } from '~/types'

const mockProjects = MockProjects()

export const useProjectStore = defineStore('project', () => {

  const projects = ref<Project[]>([])

  async function _fetchProjects(): Promise<Project[]> {
    projects.value = mockProjects;
    return projects.value
  }

  async function _fetchProject(projectId: string): Promise<Project> {
    const project = mockProjects.find((p: Project) => p._id === projectId)

    if(project === undefined) {
      throw new Error(`Project with id ${projectId} not found`)
    } else {
      // populate works
      return project
    }
  }

  async function _fetchWork(workId: string): Promise<Work> {
    const work = MockWorks().find((w: Work) => w._id === workId)
    
    if(!work) {
      throw new Error(`Work with id ${workId} not found`)
    }

    return work
  }

  async function indexProjects(): Promise<Project[]> {
    projects.value = await _fetchProjects()
    return projects.value
  }

  async function getProject(projectId: string): Promise<Project> {
    return await _fetchProject(projectId)
  }

  async function getWork(workId: string): Promise<Work> {
    return await _fetchWork(workId)
  }

  return { projects, indexProjects, getProject, getWork }
})
