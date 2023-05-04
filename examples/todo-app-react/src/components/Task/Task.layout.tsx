import {useState} from "react"
import {useErrorBoundary} from "@component-family/react"
import style from "./Task.module.css"

interface TaskLayoutProps {
  task: {
    id: number
    title: string
  }
  isInputEnabled?: boolean
  isButtonEnabled?: boolean
  onChange?: (taskId: number, title: string) => any
  onSave?: (taskId: number, title: string) => any
}

export function TaskLayout(props: TaskLayoutProps) {
  const {
    task,
    isInputEnabled = true,
    isButtonEnabled = true,
    onChange,
    onSave,
  } = props
  const [modifiedTitle, setModifiedTitle] = useState(
    undefined as string | undefined
  )
  const {showBoundary} = useErrorBoundary()
  return (
    <div className={style.task}>
      <input
        type="text"
        value={modifiedTitle ?? task.title}
        onChange={(e) => {
          const title = e.target.value
          setModifiedTitle(title)
          onChange?.(task.id, title)
        }}
        disabled={!isInputEnabled}
      />
      <button
        disabled={!isButtonEnabled || typeof modifiedTitle === "undefined"}
        onClick={() => {
          if (modifiedTitle) {
            onSave?.(task.id, modifiedTitle)
          } else if (!modifiedTitle?.length) {
            showBoundary(new Error("Enter a task name to save"))
          }
        }}
      >
        Save
      </button>
    </div>
  )
}
