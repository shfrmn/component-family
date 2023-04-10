import {createContext} from "react"

/**
 *
 */
interface FamilyContextType {
  families: string[]
  placeholderFamily?: string
}

/**
 *
 */
export const FamilyContext = createContext(
  undefined as FamilyContextType | undefined
)
