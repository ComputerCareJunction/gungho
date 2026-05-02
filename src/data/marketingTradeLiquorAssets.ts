const brandAssociationModules = import.meta.glob('../assets/images/liquor-brand-association/*.{jpg,png}', {
  eager: true,
  import: 'default'
}) as Record<string, string>;

function brandIndex(path: string): number {
  const m = /brand-(\d+)/i.exec(path);
  return m ? parseInt(m[1], 10) : 0;
}

/** Sorted URLs for each liquor brand logo tile (used in brand association grid). */
export const liquorBrandAssociationTiles: string[] = Object.keys(brandAssociationModules)
  .sort((a, b) => brandIndex(a) - brandIndex(b))
  .map((path) => brandAssociationModules[path]);
