import mongoose from 'mongoose';

// A single labeled button in the "quick links" row on the home about box
// (e.g. "Know Your Doctor" -> /about). "icon" is a Font Awesome class; leave
// it blank to render with no icon. Set "link" to empty/omit to render the
// button as a non-clickable "coming soon" pill instead of a link.
const buttonSchema = new mongoose.Schema(
  { text: String, link: String, icon: String },
  { _id: false }
);

// One line-item in the short checklist under the description
// (e.g. "Know Your Doctor"). If `link` is set, the whole line renders as a
// clickable link to that page; if left blank (e.g. a "coming soon" item),
// it renders as plain, non-clickable text.
const featurePointSchema = new mongoose.Schema(
  { text: String, link: String },
  { _id: false }
);

// Powers ONLY the "About Us" box on the Home page. Intentionally separate from
// AboutSection (which powers the /about page hero) so the two can be edited,
// and can look, completely independently from the admin panel.
const homeAboutSectionSchema = new mongoose.Schema(
  {
    subheading: { type: String, default: 'About Us' },
    heading: { type: String, default: 'Transform Your Look With Precision' },
    description: {
      type: String,
      default:
        'Plastic surgery is a specialized branch of medicine that focuses on restoring, enhancing, or reshaping the body for both medical and aesthetic purposes. It helps people improve their appearance.',
    },
    primaryImage: { url: String, publicId: String },
    secondaryImage: { url: String, publicId: String },
    badgeText: { type: String, default: 'Best Awarded Company' },
    // The row of pill buttons under the description. Renders as a Link for
    // any item with a "link", and as a non-clickable "coming soon" pill for
    // any item without one (e.g. "Know The Centre").
    pillButtons: {
      type: [buttonSchema],
      default: () => [
        { text: 'Know Your Doctor', link: '/about', icon: 'fa-light fa-user-doctor' },
        { text: 'Know The Centre', link: '/about', icon: 'fa-light fa-building' },
        { text: 'Know The Services', link: '/services', icon: 'fa-light fa-briefcase-medical' },
      ],
    },
    featurePoints: {
      type: [featurePointSchema],
      default: () => [
        { text: 'Shaping Confidence Through Expert Surgery' },
        { text: 'Discover Beauty Beyond Your Imagination' },
      ],
    },
    ctaText: { type: String, default: 'Read More' },
    ctaLink: { type: String, default: '/about' },
    ratingValue: { type: String, default: '4.9' },
    ratingText: { type: String, default: '100+ 5star' },
  },
  { timestamps: true }
);

export default mongoose.model('HomeAboutSection', homeAboutSectionSchema);