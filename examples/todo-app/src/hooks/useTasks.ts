import {create} from "zustand"

interface TaskStore {
  tasks: any
  listTasks: () => void
  saveTask: (taskId: number, title: string) => void

  hasError: boolean
  breakTasks: () => void
  fixTasks: () => void
}

export const useTasks = create<TaskStore>((set, getState) => ({
  tasks: [],

  listTasks: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const response = await fetch("https://jsonplaceholder.typicode.com/todos")
    const tasks = await response.json()
    set({tasks: tasks.slice(0, 5)})
  },

  saveTask: async (taskId: number, title: string) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
      method: "PUT",
      body: JSON.stringify({title}),
    })
  },

  hasError: false,

  breakTasks: () => {
    set(({tasks}) => ({
      tasks: new Map(tasks.map((task: any) => [task.id, task])),
      hasError: true,
    }))
  },

  fixTasks: () => {
    const {tasks, hasError} = getState()
    if (hasError) {
      set({
        tasks: [...(tasks as any).values()],
        hasError: false,
      })
    }
  },
}))
