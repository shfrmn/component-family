import {useApi} from "../../hooks/useApi"
import {useTour} from "../../hooks/useTour"
import {Task} from "./"

interface TaskWidgetProps {
  task: {
    id: number
    title: string
  }
}

export default function TaskTour(props: TaskWidgetProps) {
  const {task} = props
  const {saveTask} = useApi()
  const {tourStep, tourCompleted, completeStep} = useTour()
  const isInputEnabled = tourCompleted || (task.id === 3 && tourStep === 0)
  const isButtonEnabled = tourCompleted || (task.id === 3 && tourStep > 0)
  return (
    <Task.Layout
      task={task}
      onChange={tourCompleted ? undefined : () => completeStep()}
      onSave={tourCompleted ? saveTask : () => completeStep()}
      isInputEnabled={isInputEnabled}
      isButtonEnabled={isButtonEnabled}
    />
  )
}
