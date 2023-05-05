import {ComponentProps, ComponentType, FunctionComponent} from "react"

/**
 * Base type for the config that can be provided to `createFamily` function.
 */
export type AnyFamilyConfig = {
  [variant: string]: ComponentType<any>
}

/**
 * Intersection type of all component props from the family config.
 */
type CombinedProps<Conf extends AnyFamilyConfig> =
  Conf[keyof Conf] extends ComponentType<infer P> ? P : never

/**
 * Props of `FamilyComponent`.
 */
export type FamilyProps<Conf extends AnyFamilyConfig> = CombinedProps<Conf> & {
  /**
   * Can be used to override family ranking inherited from `FamilyContext`.
   * This is necessary for two reasons:
   *  - Being able to create interdependency between the variants of the same component without
   * going into an infinite loop
   *  - Shorter syntax that allows users to alter the rendered variant dynamically
   */
  variant?: keyof Conf

  /**
   *
   */
  isVariantRoot?: boolean
}

/**
 * Type of the component that can render variants dynamically based on context.
 */
export type FamilyComponent<Conf extends AnyFamilyConfig> = FunctionComponent<
  FamilyProps<Conf>
>

/**
 * Props of `VariantComponent`.
 */
export type VariantProps<V> = {
  variants?: {
    /**
     * List of variants that can be rendered when the target variant is not available.
     * Should be sorted by priority.
     */
    fallback?: V[]

    /**
     * Variant that can be used as a placeholder while other variants are lazy-loading.
     */
    placeholder?: V

    /**
     *
     */
    error?: V
  }
}

/**
 *
 */
export type VariantComponent<
  Conf extends AnyFamilyConfig,
  variant extends keyof Conf
> = ComponentType<ComponentProps<Conf[variant]> & VariantProps<keyof Conf>>

/**
 *
 */
type IndexedVariants<Conf extends AnyFamilyConfig> = {
  [variant in keyof Conf]: VariantComponent<Conf, variant>
}

/**
 *
 */
export type FamilyComponentWithVariants<Conf extends AnyFamilyConfig> =
  FamilyComponent<Conf> & IndexedVariants<Conf> & {variants: (keyof Conf)[]}

/**
 * Infers the union type of possible variants from a Family component
 */
export type FamilyVariant<C> = C extends {variants: (infer V)[]} ? V : never
