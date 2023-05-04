import {Task} from "../Task"

interface TaskListLayoutProps {
  tasks: {
    id: number
    title: string
  }[]
  onSave?: (taskId: number, title: string) => any
}

export function TaskListLayout(props: TaskListLayoutProps) {
  if (!Array.isArray(props.tasks)) {
    throw new Error(`Property 'tasks' must be an array`)
  }
  const renderedTasks = props.tasks.length
    ? props.tasks.map((task) => {
        return <Task key={task.id} task={task} onSave={props.onSave} />
      })
    : Array(5)
        .fill(null)
        .map((_, i) => {
          return <Task.Placeholder key={i} />
        })
  return <div>{renderedTasks}</div>
}
