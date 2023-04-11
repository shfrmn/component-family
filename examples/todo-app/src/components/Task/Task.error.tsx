import {useErrorBoundary} from "../../../../../packages/react-family/src"
import style from "./Task.module.css"

interface TaskErrorProps {
  error?: Error
}

export function TaskError(props: TaskErrorProps) {
  const {error} = props
  const {resetBoundary} = useErrorBoundary()
  return (
    <div className={style.errorContainer}>
      <code>{error?.message}</code>
      <button onClick={() => resetBoundary()}>🔄</button>
    </div>
  )
}
