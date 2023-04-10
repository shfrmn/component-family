import {TaskLayout} from "./Task.layout"
import {useApi} from "../../hooks/useApi"

interface TaskWidgetProps {
  task: {
    id: number
    title: string
  }
}

export default function TaskWidget(props: TaskWidgetProps) {
  const {saveTask} = useApi()
  return <TaskLayout task={props.task} onSave={saveTask} />
}
