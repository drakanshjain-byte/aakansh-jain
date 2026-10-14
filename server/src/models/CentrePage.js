import mongoose from 'mongoose';

// One item in the "Values" row (icon + label). `icon` is a Font Awesome class
// (e.g. "fa-light fa-heart-pulse").
const valueSchema = new mongoose.Schema({ icon: String, label: String }, { _id: false });

// Powers ONLY the "Know The Centre" page (/know-the-centre). Single document — created
// automatically with these defaults the first time the page (or the admin editor) loads,
// so no seeding is needed. Everything here is editable from the admin panel.
//
// Aim / Mission / Vision text below is taken word-for-word from the clinic's handwritten note.
const centrePageSchema = new mongoose.Schema(
  {
    // Top block ("Welcome To ..."). Leave welcomeText empty to show just the heading.
    welcomeHeading: { type: String, default: 'Welcome To Natural Cosmetic Surgery Centre' },
    welcomeText: { type: String, default: '' },

    // Photos stacked down the left side of the Aim / Mission / Vision card (top to bottom).
    // Empty by default — the photo column stays hidden until real centre photos are uploaded
    // from the admin panel.
    images: { type: [{ url: String, publicId: String }], default: () => [] },

    aimHeading: { type: String, default: 'Aim' },
    aimText: { type: String, default: 'We at natural Cosmetic Surgery Center have a aim to deliver.' },
    missionHeading: { type: String, default: 'Mission' },
    missionText: { type: String, default: 'Best Quality at affordable Price so everyone can afford best facility' },
    visionHeading: { type: String, default: 'Vision' },
    visionText: {
      type: String,
      default: 'Establish Jhansi on the world map of plastic surgery as a centre of excellence for plastic & aesthetic surgeries.',
    },

    // Button under the Vision. Clear the text to hide it.
    buttonText: { type: String, default: 'Connect With Us' },
    buttonLink: { type: String, default: '/contact' },

    // "Values" row at the bottom. Hidden entirely while `values` is empty.
    valuesHeading: { type: String, default: 'Our Values' },
    valuesIntro: { type: String, default: '' },
    values: { type: [valueSchema], default: () => [] },
  },
  { timestamps: true }
);

export default mongoose.model('CentrePage', centrePageSchema);