import {ComponentType, ExoticComponent, Suspense} from "react"

/**
 * Type guard used to determine whether the component is being lazy loaded.
 */
function isExoticComponent(
  component: ExoticComponent<any> | ComponentType<any>
): component is ExoticComponent<any> {
  return Boolean((component as ExoticComponent).$$typeof)
}

interface LazyProps<P> {
  component: ComponentType<P>
  fallback?: ComponentType<P>
}

export function Lazy<P>(props: P & LazyProps<P>) {
  const {component: Component, fallback: Fallback} = props
  if (!isExoticComponent(Component)) {
    return <Component {...props} />
  }
  return (
    <Suspense fallback={Fallback && <Fallback {...props} />}>
      <Component {...props} />
    </Suspense>
  )
}
