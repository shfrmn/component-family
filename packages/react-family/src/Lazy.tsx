import {ComponentType, ExoticComponent, Suspense} from "react"

/**
 * Type guard used to determine whether the component is being lazy loaded.
 */
function isExoticComponent(
  component: ExoticComponent<any> | ComponentType<any>
): component is ExoticComponent<any> {
  return Boolean((component as ExoticComponent).$$typeof)
}

interface SuspendLazyOptions<P> {
  props: P
  component: ComponentType<P>
  fallback?: ComponentType<P>
}

export function suspendLazy<P extends JSX.IntrinsicAttributes>(
  options: SuspendLazyOptions<P>
) {
  const {component: Component, fallback: Fallback, props} = options
  if (!isExoticComponent(Component)) {
    return <Component {...props} />
  }
  return (
    <Suspense fallback={Fallback && <Fallback {...props} />}>
      <Component {...props} />
    </Suspense>
  )
}
