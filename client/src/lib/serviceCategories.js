// Shared metadata for the six fixed service categories (mirrors the `category` enum on
// the Service model in server/src/models/Service.js). `value` must match the string stored
// in Mongo exactly. Keeping this in one place means Home.jsx and Services.jsx always agree
// on labels, icons, blurbs, and ordering — edit this file to rename/re-describe a category
// for the whole site at once. (Which category each individual *service* belongs to is set
// per-service from the admin panel.)
export const SERVICE_CATEGORIES = [
  {
    value: 'Cosmetic & Aesthetic Surgery',
    label: 'Cosmetic & Aesthetic Surgery',
    shortLabel: 'Cosmetic & Aesthetic',
    icon: 'fa-light fa-scalpel',
    blurb: 'Surgical procedures that reshape and enhance your natural silhouette, performed with precision and a focus on natural-looking results.',
    image: '/assets/img/bg/services-01.png',
  },
  {
    value: 'Reconstructive Surgery',
    label: 'Reconstructive Surgery',
    shortLabel: 'Reconstructive',
    icon: 'fa-light fa-bandage',
    blurb: 'Restoring form and function after trauma, illness, or cancer treatment, with results built around the individual patient.',
    image: '/assets/img/bg/services-02.png',
  },
  {
    value: 'Burn & Scar Reconstruction',
    label: 'Burn & Scar Reconstruction',
    shortLabel: 'Burn & Scar',
    icon: 'fa-light fa-fire',
    blurb: 'Specialised care for burn injuries, scars, keloids, and tight scar contractures to improve movement, comfort, and appearance.',
    image: '/assets/img/bg/services-03.png',
  },
  {
    value: 'Hand & Microsurgery',
    label: 'Hand & Microsurgery',
    shortLabel: 'Hand & Micro',
    icon: 'fa-light fa-hand-dots',
    blurb: 'Surgical treatment of injuries and conditions affecting the hand, wrist, and upper limb, including nerve, tendon, and microsurgical reconstruction.',
    image: '/assets/img/bg/services-04.png',
  },
  {
    value: 'Congenital & Pediatric Plastic Surgery',
    label: 'Congenital & Pediatric Plastic Surgery',
    shortLabel: 'Pediatric',
    icon: 'fa-light fa-baby',
    blurb: 'Compassionate surgical care for children born with cleft conditions, congenital differences, and vascular birthmarks.',
    image: '/assets/img/bg/services-05.png',
  },
  {
    value: 'Hair & Minor Aesthetic Procedures',
    label: 'Hair & Minor Aesthetic Procedures',
    shortLabel: 'Hair & Minor',
    icon: 'fa-light fa-sparkles',
    blurb: 'Hair restoration and quick, minor in-clinic procedures including PRP therapy, ear lobe repair, and skin lesion removal.',
    image: '/assets/img/bg/services-06.png',
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