import {createFamilyComponent} from "./Family"
import {createVariantComponent} from "./Variant"
import {AnyFamilyConfig, FamilyComponent} from "./Types"

export function createFamily<Conf extends AnyFamilyConfig>(
  familyConfig: Conf
): FamilyComponent<Conf> {
  const FamilyComponent = createFamilyComponent(familyConfig)
  for (const family in familyConfig) {
    // @ts-ignore
    FamilyComponent[family] = createVariantComponent(family, FamilyComponent)
  }
  return FamilyComponent as FamilyComponent<Conf>
}
