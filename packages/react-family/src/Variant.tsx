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
    const {variants} = props
    const inheritedContext = useContext(FamilyContext)
    const context = inheritedContext || {
      variants: [variant, ...(variants?.fallback || [])],
      placeholderVariant: variants?.placeholder,
      errorVariant: variants?.error,
    }
    const Family = (
      <FamilyComponent
        {...(props as FamilyProps<Conf>)}
        variant={variant}
        isVariantRoot={!inheritedContext}
      />
    )
    if (inheritedContext) {
      return Family
    }
    return (
      <FamilyContext.Provider value={context as FamilyContextType}>
        {Family}
      </FamilyContext.Provider>
    )
  }
  Variant.displayName = FamilyComponent.displayName + "." + (variant as string)
  return Variant
}
