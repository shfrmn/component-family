import {useContext} from "react"
import {
  AnyFamilyConfig,
  FamilyComponent,
  VariantProps,
  VariantComponent,
  FamilyProps,
} from "./Types"
import {FamilyContext} from "./Context"

/**
 *
 */
export function createVariantComponent<Conf extends AnyFamilyConfig>(
  variant: keyof Conf,
  Family: FamilyComponent<Conf>
): VariantComponent<Conf, keyof Conf> {
  function Variant(props: VariantProps<Conf, Conf[keyof Conf]>) {
    const {fallbackVariants = [], placeholderVariant} = props
    const inheritedContext = useContext(FamilyContext)
    const context = inheritedContext || {
      variants: [variant, ...fallbackVariants],
      placeholderVariant,
    }
    return (
      <FamilyContext.Provider value={context}>
        <Family {...(props as FamilyProps<Conf>)} variant={variant} />
      </FamilyContext.Provider>
    )
  }
  return Variant
}
