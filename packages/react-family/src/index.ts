import {createFamilyComponent} from "./Family"
import {createVariantComponent} from "./Variant"
import {AnyFamilyConfig, FamilyComponentWithVariants} from "./Types"

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
  familyConfig: Conf
): FamilyComponentWithVariants<Conf> {
  const FamilyComponent = createFamilyComponent(familyConfig)
  for (const variant in familyConfig) {
    // @ts-ignore
    FamilyComponent[variant] = createVariantComponent(variant, FamilyComponent)
  }
  return FamilyComponent as FamilyComponentWithVariants<Conf>
}
