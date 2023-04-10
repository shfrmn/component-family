import {useState} from "react"

export function useApi() {
  const [tasks, setTasks] = useState([])

  const listTasks = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const response = await fetch("https://jsonplaceholder.typicode.com/todos")
    const tasks = await response.json()
    setTasks(tasks.slice(0, 10))
  }

  const saveTask = async (taskId: number, title: string) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
      method: "PUT",
      body: JSON.stringify({title}),
    })
  }

  return {
    tasks,
    listTasks,
    saveTask,
  }
}
