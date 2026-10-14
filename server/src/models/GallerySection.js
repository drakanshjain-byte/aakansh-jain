import mongoose from 'mongoose';

// Powers the small heading block above the before/after grid on the Home page
// ("BEFORE/AFTER" eyebrow + "Sculpting Dreams Into Stunning Reality" + the
// "View All Before/After" button). Kept as its own singleton, same pattern as
// HomeAboutSection, so it can be edited independently from the admin panel.
const gallerySectionSchema = new mongoose.Schema(
  {
    eyebrow: { type: String, default: 'Before/After' },
    heading: { type: String, default: 'Sculpting Dreams Into Stunning Reality' },
    buttonText: { type: String, default: 'View All Before/After' },
    buttonLink: { type: String, default: '/projects' },
  },
  { timestamps: true }
);

export default mongoose.model('GallerySection', gallerySectionSchema);