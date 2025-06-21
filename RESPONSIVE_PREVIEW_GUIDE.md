# Responsive Preview Guide

This guide explains how to use the new responsive preview system to make your components respond to the preview device size instead of the actual viewport size.

## Problem

When using Tailwind CSS responsive classes like `md:grid-cols-3` or `lg:text-xl`, these classes respond to the actual browser viewport size, not the preview container size. This means that even when you're previewing a mobile-sized component, it might still show desktop styles if your browser window is large.

## Solution

The `ResponsivePreview` component now provides a context and custom hook that allows child components to respond to the preview device size instead of the viewport size.

## How to Use

### 1. Wrap Your Component with ResponsivePreview

```tsx
import { ResponsivePreview } from "@/components/responsive-preview";

<ResponsivePreview>
  <YourComponent />
</ResponsivePreview>;
```

### 2. Use the useResponsivePreview Hook

Import and use the hook in your component:

```tsx
import { useResponsivePreview } from "@/components/responsive-preview";

export function YourComponent() {
  const { deviceSize, customWidth, isBreakpointActive, responsiveClass } =
    useResponsivePreview();

  // Your component logic here
}
```

### 3. Replace Tailwind Responsive Classes

#### Method 1: Using responsiveClass Helper

Instead of:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

Use:

```tsx
<div className={responsiveClass({
  base: "grid gap-4",
  sm: "grid-cols-1",
  md: "grid-cols-2",
  lg: "grid-cols-3"
})}>
```

#### Method 2: Using isBreakpointActive for Conditional Rendering

Instead of:

```tsx
<div className="hidden md:block">Desktop-only content</div>
```

Use:

```tsx
{
  isBreakpointActive("md") && <div>Desktop-only content</div>;
}
```

## Available Breakpoints

The system uses the same breakpoints as Tailwind CSS:

- `sm`: 640px and above
- `md`: 768px and above
- `lg`: 1024px and above
- `xl`: 1280px and above

## Device Size Mapping

The preview device sizes map to these widths:

- **Mobile**: 375px (below md breakpoint)
- **Tablet**: 768px (md breakpoint)
- **Desktop**: 1920px (above lg breakpoint)
- **Custom**: User-defined width

## Complete Example

Here's a complete example showing the conversion from Tailwind responsive classes to the new system:

### Before (using Tailwind responsive classes):

```tsx
export function HeroBlock() {
  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Build Amazing Websites
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
              Create stunning, responsive websites with our modern components.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg">Get Started</Button>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### After (using responsive preview hook):

```tsx
import { useResponsivePreview } from "@/components/responsive-preview";

export function HeroBlock() {
  const { responsiveClass } = useResponsivePreview();

  return (
    <section
      className={responsiveClass({
        base: "w-full py-20 bg-gradient-to-b from-background to-muted/20",
        md: "py-32",
      })}
    >
      <div
        className={responsiveClass({
          base: "container mx-auto px-4",
          md: "px-6",
        })}
      >
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-4 max-w-4xl">
            <h1
              className={responsiveClass({
                base: "text-4xl font-bold tracking-tighter",
                sm: "text-5xl",
                md: "text-6xl",
                lg: "text-7xl",
              })}
            >
              Build Amazing Websites
            </h1>
            <p
              className={responsiveClass({
                base: "mx-auto max-w-2xl text-lg text-muted-foreground",
                md: "text-xl",
              })}
            >
              Create stunning, responsive websites with our modern components.
            </p>
          </div>

          <div
            className={responsiveClass({
              base: "flex flex-col gap-4",
              sm: "flex-row",
            })}
          >
            <Button size="lg">Get Started</Button>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

## Advanced Usage

### Conditional Content Based on Device Size

```tsx
export function AdvancedComponent() {
  const { deviceSize, isBreakpointActive } = useResponsivePreview();

  return (
    <div>
      {/* Always show */}
      <div>Base content</div>

      {/* Show only on mobile */}
      {deviceSize === "mobile" && <div>Mobile-specific content</div>}

      {/* Show on medium screens and above */}
      {isBreakpointActive("md") && <div>Medium+ content</div>}

      {/* Show on large screens and above */}
      {isBreakpointActive("lg") && <div>Large+ content</div>}
    </div>
  );
}
```

### Dynamic Styling Based on Custom Width

```tsx
export function CustomWidthComponent() {
  const { deviceSize, customWidth, responsiveClass } = useResponsivePreview();

  // Custom logic based on exact width
  const isNarrow = customWidth < 600;
  const isWide = customWidth > 1200;

  return (
    <div
      className={responsiveClass({
        base: "p-4",
        md: "p-6",
        lg: "p-8",
      })}
    >
      <div className={isNarrow ? "text-sm" : "text-base"}>
        {deviceSize === "custom" && <p>Custom width: {customWidth}px</p>}
        <p>This text is {isNarrow ? "small" : "normal"} sized</p>
      </div>
    </div>
  );
}
```

## Migration Tips

1. **Start with the most important responsive elements** - Focus on layout, text sizes, and spacing first.

2. **Use the responsiveClass helper for most cases** - It's the most straightforward replacement for Tailwind's responsive classes.

3. **Use isBreakpointActive for conditional rendering** - Perfect for showing/hiding elements based on device size.

4. **Test with different device sizes** - Use the responsive preview controls to test your component at different sizes.

5. **Keep base styles simple** - The `base` property should contain the most basic styles that work on all devices.

## Benefits

- **Accurate preview**: Components now respond to the preview device size, not the browser viewport
- **Better testing**: You can see exactly how your component will look on different devices
- **Consistent behavior**: All responsive behavior is controlled by the preview system
- **Flexible**: Supports both predefined device sizes and custom widths
- **Type-safe**: Full TypeScript support with proper type checking

## Limitations

- **Only works within ResponsivePreview**: The hook must be used within a ResponsivePreview component
- **No CSS media queries**: This system doesn't use actual CSS media queries, so it won't work outside the preview context
- **Learning curve**: Requires learning the new API instead of using familiar Tailwind responsive classes

## Examples

See the following files for complete examples:

- `src/components/responsive-preview-demo.tsx` - Comprehensive demo with all features
- `src/blocks/hero/hero-1-responsive.tsx` - Real-world example converted from Tailwind responsive classes
