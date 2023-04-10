import {useContext} from "react"
import {
  AnyFamilyConfig,
  FamilyComponent,
  VariantProps,
  VariantComponent,
} from "./Types"
import {FamilyContext} from "./Context"

/**
 *
 */
export function createVariantComponent<Conf extends AnyFamilyConfig>(
  family: keyof Conf,
  FamilyComponent: FamilyComponent<Conf>
): VariantComponent<Conf, keyof Conf> {
  function Variant(props: VariantProps<Conf, Conf[keyof Conf]>) {
    const {fallbackFamilies = [], placeholderFamily} = props
    const inheritedContext = useContext(FamilyContext)
    const context = inheritedContext || {
      families: [family, ...fallbackFamilies],
      placeholderFamily,
    }
    return (
      <FamilyContext.Provider value={context}>
        <FamilyComponent {...props} family={family} />
      </FamilyContext.Provider>
    )
  }
  return Variant
}
