// Module augmentation for custom HTML elements used in JSX.
// Must be a module file (has top-level import) so TypeScript merges rather than replaces React types.
import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "mtb-button": import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<HTMLElement> & { slug: string },
        HTMLElement
      >;
    }
  }
}
