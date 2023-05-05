import type {ComponentType} from "react"
import type {VariantProps, FamilyVariant} from "@component-family/react"

type AnyStory<V> = {
  args: VariantProps<V> & {
    [prop: string]: any
  }
}

/**
 *
 */
export function createStories<
  C extends ComponentType<any> & {variants: string[]},
  Story extends AnyStory<FamilyVariant<C>>
>(FamilyComponent: C, storyOptions: Story): Record<string, Story> {
  const stories = {} as Record<FamilyVariant<C>, Story>
  for (const variant of FamilyComponent.variants) {
    const story: Story = {
      ...storyOptions,
      render: (props: any) => {
        const Variant = (FamilyComponent as any)[variant]
        return <Variant {...props} />
      },
    }
    stories[variant as FamilyVariant<C>] = story
  }
  return stories
}
