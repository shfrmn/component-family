import {Task} from "./"
import {useTasks} from "../../hooks/useTasks"

interface TaskWidgetProps {
  task: {
    id: number
    title: string
  }
}

export default function TaskWidget(props: TaskWidgetProps) {
  const {saveTask} = useTasks()
  return <Task.Layout task={props.task} onSave={saveTask} />
}
