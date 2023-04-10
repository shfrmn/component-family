import {useState} from "react"
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
  const [modifiedTitle, setModifiedTitle] = useState("")
  return (
    <div className={style.task}>
      <input
        type="text"
        value={modifiedTitle || task.title}
        onChange={(e) => {
          const title = e.target.value
          setModifiedTitle(title)
          onChange?.(task.id, title)
        }}
        disabled={!isInputEnabled}
      />
      <button
        disabled={!isButtonEnabled}
        onClick={() => onSave?.(task.id, modifiedTitle)}
      >
        Save
      </button>
    </div>
  )
}
