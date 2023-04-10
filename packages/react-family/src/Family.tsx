import {ComponentType, ExoticComponent, Suspense, useContext} from "react"
import {FamilyContext} from "./Context"
import {AnyFamilyConfig, FamilyProps, FamilyComponent} from "./Types"

/**
 * Type guard used to determine whether the component is being lazy loaded.
 */
function isExoticComponent(
  component: ExoticComponent<any> | ComponentType<any>
): component is ExoticComponent<any> {
  return Boolean((component as ExoticComponent).$$typeof)
}

/**
 * Empty placeholder used when no placeholder family is provided for lazy loading.
 */
function NoPlaceholder<P extends {}>(_props: P) {
  return null
}

/**
 * Selects a component variant to be rendered according to the ranked list of variants.
 * If none of the variants are available, throws an error.
 */
function selectVariant<Conf extends AnyFamilyConfig>(
  familyConfig: Conf,
  variants: (keyof Conf)[]
): ExoticComponent<any> | ComponentType<any> {
  for (const family of variants) {
    const Variant = familyConfig[family]
    if (Variant) {
      return Variant
    }
  }
  const requestedVariants = variants.join(", ")
  const availableVariants = Object.keys(familyConfig).join(", ")
  throw new Error(
    `Missing requested variants: ${requestedVariants}. Variants available: ${availableVariants}`
  )
}

/**
 * Creates a component that dynamically renders variants based on `FamilyContext`
 */
export function createFamilyComponent<Conf extends AnyFamilyConfig>(
  familyConfig: Conf
): FamilyComponent<Conf> {
  return function Family(props: FamilyProps<Conf>) {
    const context = useContext(FamilyContext)
    if (!context) {
      throw new Error(
        "Component family can't be rendered outside of FamilyContext. Please select a specific variant of the component."
      )
    }
    const {variants, placeholderVariant} = context
    const Variant = selectVariant(
      familyConfig,
      props.variant ? [props.variant, ...variants] : variants
    )
    if (!isExoticComponent(Variant)) {
      return <Variant {...props} />
    }
    const Placeholder = placeholderVariant
      ? familyConfig[placeholderVariant]
      : NoPlaceholder
    return (
      <Suspense fallback={<Placeholder {...props} />}>
        <Variant {...props} />
      </Suspense>
    )
  }
}
