// Shared metadata for the three fixed service categories (mirrors the `category` enum on
// the Service model in server/src/models/Service.js). `value` must match the string stored
// in Mongo exactly. Keeping this in one place means Home.jsx and Services.jsx always agree
// on labels, icons, blurbs, and ordering — edit this file to rename/re-describe a category
// for the whole site at once. (Which category each individual *service* belongs to is set
// per-service from the admin panel.)
export const SERVICE_CATEGORIES = [
  {
    value: 'Cosmetic Surgery',
    label: 'Cosmetic Surgery',
    shortLabel: 'Cosmetic',
    icon: 'fa-light fa-scalpel',
    blurb: 'Surgical procedures that reshape and enhance your natural silhouette, performed with precision and a focus on natural-looking results.',
    image: '/assets/img/bg/services-01.png',
  },
  {
    value: 'Hand & Reconstructive Surgery',
    label: 'Hand & Reconstructive Surgery',
    shortLabel: 'Hand & Reconstructive',
    icon: 'fa-light fa-hand-dots',
    blurb: 'Restoring form and function to the hand and upper limb after injury, trauma, or congenital conditions.',
    image: '/assets/img/bg/services-02.png',
  },
  {
    value: 'Non-Surgical & Aesthetic Treatments',
    label: 'Non-Surgical & Aesthetic Treatments',
    shortLabel: 'Non-Surgical',
    icon: 'fa-light fa-syringe',
    blurb: 'Minimally invasive injectables and regenerative treatments that refresh and rejuvenate with little to no downtime.',
    image: '/assets/img/bg/services-03.png',
  },
];

export const getCategoryMeta = (value) =>
  SERVICE_CATEGORIES.find((c) => c.value === value) || {
    value,
    label: value || 'Other Services',
    shortLabel: value || 'Other',
    icon: 'fa-light fa-star',
    blurb: '',
    image: '/assets/img/bg/services-01.png',
  };