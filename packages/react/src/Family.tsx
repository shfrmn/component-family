import {ComponentType, ExoticComponent, useContext} from "react"
import {ErrorBoundary} from "react-error-boundary"
import {prependIcon, getFamilyComponentName} from "./DevTools"
import {AnyFamilyConfig, FamilyComponent} from "./Types"
import {FamilyContext, FamilyContextType} from "./Context"
import {suspendLazy} from "./Lazy"

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
  familyConfig: Conf,
  componentName?: string
): FamilyComponent<Conf> {
  const Family: FamilyComponent<Conf> = (
    props,
    /** Context override is passed when `Family` component is being inlined under a specific `Variant` */
    contextOverride: FamilyContextType
  ) => {
    const {variant: variantOverride, isVariantRoot, ...componentProps} = props
    const isFamilyRoot = Boolean(!variantOverride || isVariantRoot)
    const context = useContext(FamilyContext) || contextOverride
    if (!context) {
      throw new Error(
        "Component family can't be rendered outside of FamilyContext. Please select a specific variant of the component."
      )
    }
    const {variants, placeholderVariant, errorVariant} = context
    const Variant = selectVariant(
      familyConfig,
      variantOverride ? [variantOverride, ...variants] : variants
    )
    const LazyFallback = placeholderVariant
      ? familyConfig[placeholderVariant]
      : undefined
    const WithSuspense = suspendLazy({
      props: componentProps,
      component: Variant,
      fallback: LazyFallback,
    })
    const ErrorFallback = errorVariant ? familyConfig[errorVariant] : undefined
    if (ErrorFallback && isFamilyRoot) {
      return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          {WithSuspense}
        </ErrorBoundary>
      )
    } else {
      return WithSuspense
    }
  }
  Family.displayName = componentName
    ? prependIcon(componentName)
    : getFamilyComponentName(familyConfig)
  FamilyContext.displayName = prependIcon("FamilyContext")
  return Family
}
