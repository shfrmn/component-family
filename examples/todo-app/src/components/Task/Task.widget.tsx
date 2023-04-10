import {Task} from "./"
import {useApi} from "../../hooks/useApi"

interface TaskWidgetProps {
  task: {
    id: number
    title: string
  }
}

export default function TaskWidget(props: TaskWidgetProps) {
  const {saveTask} = useApi()
  return <Task.Layout task={props.task} onSave={saveTask} />
}
