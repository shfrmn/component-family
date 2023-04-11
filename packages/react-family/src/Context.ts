import {createContext} from "react"

/**
 * Datatype that can be stored within `FamilyContext`
 */
export interface FamilyContextType {
  /**
   * Variants that can be rendered under the given context, ranked by priority.
   * If the first variant in the array is not available for a component,
   * next will be selected instead and so on.
   */
  variants: string[]

  /**
   * Component variant used as a fallback during lazy loading.
   * If no variant is specified, nothing will be rendered until the component loads.
   */
  placeholderVariant?: string

  /**
   * Component variant used as a fallback for the ErrorBoundary.
   * If no variant is specified, no ErrorBoundary will be added.
   */
  errorVariant?: string
}

/**
 * FamilyContext contains data necessary for selecting which component variant to render.
 *
 * Provider of the context is initialized by rendering a specific variant manually:
 * ```
 * <MyComponent.Variant1 />
 * ```
 *
 * Typically this should happen only once somewhere at the top of the component tree.
 */
export const FamilyContext = createContext(
  undefined as FamilyContextType | undefined
)

FamilyContext.displayName = "💠FamilyContext"
