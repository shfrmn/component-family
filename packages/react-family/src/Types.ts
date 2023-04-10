import {ComponentProps, ComponentType} from "react"

/**
 *
 */
export type AnyFamilyConfig = {
  [family: string]: ComponentType<any>
}

/**
 *
 */
type CombinedProps<Conf extends AnyFamilyConfig> =
  Conf[keyof Conf] extends ComponentType<infer P> ? P : never

/**
 *
 */
type FamilyProps<Conf extends AnyFamilyConfig> = CombinedProps<Conf> & {
  family?: keyof Conf
}

/**
 *
 */
export type VariantProps<
  Conf extends AnyFamilyConfig,
  C extends ComponentType<any>
> = ComponentProps<C> & {
  fallbackFamilies?: (keyof Conf)[]
  placeholderFamily?: keyof Conf
}

/**
 *
 */
export type VariantComponent<
  Conf extends AnyFamilyConfig,
  family extends keyof Conf
> = ComponentType<VariantProps<Conf, Conf[family]>>

/**
 *
 */
type IndexedVariants<Conf extends AnyFamilyConfig> = {
  [family in keyof Conf]: VariantComponent<Conf, family>
}

/**
 *
 */
export type FamilyComponent<Conf extends AnyFamilyConfig> =
  IndexedVariants<Conf> & ComponentType<FamilyProps<Conf>>
