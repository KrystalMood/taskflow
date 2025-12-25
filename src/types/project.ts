import { Task } from "./task";

export type ProjectStatus = "active" | "archived" | "completed";

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  ownerId: string;
  color?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProjectWithTasks extends Project {
  tasks: Task[];
}

export interface CreateProjectInput {
  name: string;
  description?: string;
  color?: string;
}

export interface UpdateProjectInput {
  id: string;
  name?: string;
  description?: string;
  status?: ProjectStatus;
  color?: string;
}
