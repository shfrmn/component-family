import {Task} from "../Task"

interface TaskListLayoutProps {
  tasks: {
    id: number
    title: string
  }[]
  onSave?: (taskId: number, title: string) => any
}

export function TaskListLayout(props: TaskListLayoutProps) {
  return (
    <div>
      {!props.tasks.length && "Fetching tasks..."}
      {props.tasks.map((task) => {
        return <Task key={task.id} task={task} onSave={props.onSave} />
      })}
    </div>
  )
}
