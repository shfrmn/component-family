import {ComponentType} from "react"
import {ErrorBoundary, ErrorBoundaryContext} from "react-error-boundary"
import {AnyFamilyConfig} from "./Types"

/**
 *
 */
;(ErrorBoundary as ComponentType<any>).displayName = "ErrorBoundary"
ErrorBoundaryContext.displayName = "ErrorBoundaryContext"

/**
 *
 */
const ICON = "💠"

/**
 *
 */
export function prependIcon(componentName: string) {
  return `${ICON}${componentName}`
}

/**
 *
 */
export function getFamilyComponentName<Conf extends AnyFamilyConfig>(
  familyConfig: Conf
): string {
  const componentNames = Object.values(familyConfig)
    .map((component) => component.name)
    .filter((name) => name)
  const maxLength = Math.max(...componentNames.map((name) => name.length))
  let name = ""
  for (let i = 0; i < maxLength; i++) {
    const char = componentNames[0][i]
    const isSameChar = componentNames.every((name) => name[i] === char)
    if (isSameChar) {
      name += char
    } else {
      break
    }
  }
  return prependIcon(name || "Family")
}
