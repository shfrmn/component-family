import {
  ComponentProps,
  ComponentType,
  ExoticComponent,
  Suspense,
  useContext,
} from "react"
import {FamilyContext} from "./Context"
import {AnyFamilyConfig, FamilyComponent} from "./Types"

/**
 *
 */
function isExoticComponent(
  component: ExoticComponent<any> | ComponentType<any>
): component is ExoticComponent<any> {
  return Boolean((component as ExoticComponent).$$typeof)
}

/**
 *
 */
function NoPlaceholder(_props: {}) {
  return null
}

/**
 *
 */
function selectFamilyComponent<Conf extends AnyFamilyConfig>(
  familyConfig: Conf,
  families: (keyof Conf)[]
): ExoticComponent<any> | ComponentType<any> {
  for (const family of families) {
    const Component = familyConfig[family]
    if (Component) return Component
  }
  throw new Error("No component")
}

/**
 *
 */
export function createFamilyComponent<Conf extends AnyFamilyConfig>(
  familyConfig: Conf
): FamilyComponent<Conf> {
  function Family(
    props: ComponentProps<Conf[keyof Conf]> & {family: keyof Conf}
  ) {
    const context = useContext(FamilyContext)
    if (!context) throw new Error("no family context")
    const {families, placeholderFamily} = context
    const Component = selectFamilyComponent(familyConfig, [
      props.family,
      ...families,
    ])
    if (!isExoticComponent(Component)) {
      return <Component {...props} />
    }
    const Placeholder = placeholderFamily
      ? familyConfig[placeholderFamily]
      : NoPlaceholder
    return (
      <Suspense fallback={<Placeholder {...props} />}>
        <Component {...props} />
      </Suspense>
    )
  }
  return Family as FamilyComponent<Conf>
}
