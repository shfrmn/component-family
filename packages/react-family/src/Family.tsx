import {ComponentType, ExoticComponent, useContext} from "react"
import {ErrorBoundary} from "react-error-boundary"
import {getFamilyComponentName} from "./DevTools"
import {AnyFamilyConfig, FamilyComponent} from "./Types"
import {FamilyContext} from "./Context"
import {Lazy} from "./Lazy"

/**
 * Selects a component variant to be rendered according to the ranked list of variants.
 * If none of the variants are available, throws an error.
 */
function selectVariant<Conf extends AnyFamilyConfig>(
  familyConfig: Conf,
  variants: (keyof Conf)[]
): ExoticComponent<any> | ComponentType<any> {
  for (const variant of variants) {
    const Variant = familyConfig[variant]
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
  const Family: FamilyComponent<Conf> = (props) => {
    const {variant: variantOverride, isVariantRoot} = props
    const isFamilyRoot = Boolean(!variantOverride || isVariantRoot)
    const context = useContext(FamilyContext)
    if (!context) {
      throw new Error(
        "Component family can't be rendered outside of FamilyContext. Please select a specific variant of the component."
      )
    }
    const {variants, placeholderVariant, errorVariant} = context
    const Variant = selectVariant(
      familyConfig,
      props.variant ? [props.variant, ...variants] : variants
    )
    const LazyFallback = placeholderVariant
      ? familyConfig[placeholderVariant]
      : undefined
    const LazyLoaded = Lazy({
      component: Variant,
      fallback: LazyFallback,
      ...props,
    })
    const ErrorFallback = errorVariant ? familyConfig[errorVariant] : undefined
    if (ErrorFallback && isFamilyRoot) {
      return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          {LazyLoaded}
        </ErrorBoundary>
      )
    } else {
      return LazyLoaded
    }
  }
  Family.displayName = getFamilyComponentName(familyConfig)
  return Family
}
