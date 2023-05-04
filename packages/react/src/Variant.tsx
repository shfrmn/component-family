import {useContext} from "react"
import {
  AnyFamilyConfig,
  FamilyComponent,
  VariantComponent,
  FamilyProps,
} from "./Types"
import {FamilyContext, FamilyContextType} from "./Context"

/**
 *
 */
export function createVariantComponent<Conf extends AnyFamilyConfig>(
  variant: keyof Conf,
  FamilyComponent: FamilyComponent<Conf>
): VariantComponent<Conf, keyof Conf> {
  const Variant: VariantComponent<Conf, keyof Conf> = (props) => {
    const {variants, ...componentProps} = props
    const inheritedContext = useContext(FamilyContext)
    const context = inheritedContext || {
      variants: [variant, ...(variants?.fallback || [])],
      placeholderVariant: variants?.placeholder,
      errorVariant: variants?.error,
    }
    const familyProps = {
      ...componentProps,
      variant,
      isVariantRoot: !inheritedContext,
    } as FamilyProps<Conf>
    // Inlining family component to reduce noise in DevTools
    const Family = FamilyComponent(familyProps, context)
    if (inheritedContext) {
      return Family
    }
    return (
      <FamilyContext.Provider value={context as FamilyContextType}>
        {Family}
      </FamilyContext.Provider>
    )
  }
  Variant.displayName = `${FamilyComponent.displayName}.${variant as string}`
  return Variant
}
