/** Meghalaya Tourism book button (custom element from mtb-button.js loaded in index.html). */
export default function MtbButton({ slug }: { slug: string }) {
  const El = "mtb-button" as keyof JSX.IntrinsicElements;
  return <El {...({ slug } as React.JSX.IntrinsicAttributes)} />;
}
