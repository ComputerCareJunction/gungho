import previewInShop from '../assets/images/office-branding/sunboard-branding.jpg';
import previewOutshop from '../assets/images/office-branding/toyota.jpg';
import previewOffice from '../assets/images/office-branding/office-branding-1.jpg';
import previewExhibition from '../assets/images/exhibition-portfolio/kings-birthday-night-stage.png';

/** Card thumbnails for Brand Visibility; swap files or paths when you add dedicated in-shop / outshop art. */
export function previewImageForBrandSlug(slug: string): string {
  switch (slug) {
    case 'in-shop-branding':
      return previewInShop;
    case 'outshop-branding':
      return previewOutshop;
    case 'office-space-branding':
      return previewOffice;
    case 'exhibition-portfolio':
      return previewExhibition;
    default:
      return previewOffice;
  }
}
