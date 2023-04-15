import {createFamilyComponent} from "./Family"
import {createVariantComponent} from "./Variant"
import {AnyFamilyConfig, FamilyComponentWithVariants} from "./Types"

export {useErrorBoundary} from "react-error-boundary"

/**
 *
 */
type CreateFamilyOptions<Conf extends AnyFamilyConfig> =
  | Conf
  | FullOptions<Conf>

/**
 *
 */
interface FullOptions<Conf> {
  name?: string
  variants: Conf
}

/**
 *
 */
function normalizeOptions<Conf extends AnyFamilyConfig>(
  options: CreateFamilyOptions<Conf>
): FullOptions<Conf> {
  return {
    name: options.name,
    variants: options.variants || options,
  } as FullOptions<Conf>
}

/**
 * Creates a `FamilyComponent` that dynamically renders variants based on `FamilyContext`,
 * with all specific variants available as properties.
 *
 * ```
 * <MyComponent />          // Renders variants dynamically
 * <MyComponent.Variant1 /> // Renders Variant1 explicitly
 * ```
 */
export function createFamily<Conf extends AnyFamilyConfig>(
  options: CreateFamilyOptions<Conf>
): FamilyComponentWithVariants<Conf> {
  const {name: familyComponentName, variants: familyConfig} =
    normalizeOptions(options)
  const FamilyComponent = createFamilyComponent(
    familyConfig,
    familyComponentName
  )
  for (const variant in familyConfig) {
    // @ts-ignore
    FamilyComponent[variant] = createVariantComponent(variant, FamilyComponent)
  }
  return FamilyComponent as FamilyComponentWithVariants<Conf>
}
