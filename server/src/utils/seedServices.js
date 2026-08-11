// Clears ONLY the Services collection and re-inserts the current service list, in order.
// Does not touch any other collection (slides, posts, testimonials, nav items, etc.).
//
// Usage:  node src/utils/seedServices.js
// (reads MONGO_URI from .env, same as the rest of the app)
//
// Image fields reference the original template's own images, which already live in
// client/public/assets/img and are served by the Vite dev server / static build at those
// same paths — so no Cloudinary upload is required just to see these populated. Swap any
// of these for real Cloudinary { url, publicId } objects from the admin panel whenever
// you're ready to replace placeholder imagery.
import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Service from '../models/Service.js';

const img = (path) => ({ url: path, publicId: '' });

const serviceDefs = [
  [
    'Liposuction',
    'liposuction',
    'Removes stubborn, diet-and-exercise-resistant fat to sculpt a smoother, more contoured body shape.',
    `<p>Liposuction targets localized fat deposits in areas like the abdomen, flanks, thighs, arms, and chin that don't respond to diet and exercise. Using gentle suction through small, discreet incisions, we sculpt a smoother, more proportionate body contour.</p><p>Your consultation includes a full assessment of the treatment areas, a discussion of your goals, and an honest look at expected results. The procedure is performed under appropriate anesthesia with a focus on natural-looking contouring rather than over-removal.</p><p>Most patients return to light daily activity within a few days and to exercise within a few weeks, with final contours visible over the following months as swelling subsides.</p>`,
  ],
  [
    'Gynaecomastia',
    'gynaecomastia',
    'Surgical correction of enlarged male breast tissue for a flatter, firmer, more masculine chest contour.',
    `<p>Gynaecomastia surgery addresses enlarged or puffy male breast tissue caused by excess glandular tissue, fat, or a combination of both. The goal is a flatter, firmer, more naturally masculine chest contour.</p><p>Depending on the underlying cause, treatment may involve liposuction alone, direct excision of glandular tissue, or a combination of both — determined after a thorough clinical evaluation during your consultation.</p><p>Recovery is typically quick, with most patients resuming normal activities within a week and full results visible over the following weeks to months.</p>`,
  ],
  [
    'Hair PRP',
    'hair-prp',
    'Platelet-Rich Plasma therapy that uses your own blood platelets to stimulate natural hair regrowth.',
    `<p>Hair PRP (Platelet-Rich Plasma) therapy is a non-surgical treatment for thinning hair and early hair loss. A small sample of your own blood is processed to concentrate growth-factor-rich platelets, which are then injected into the scalp to stimulate follicle activity and encourage natural regrowth.</p><p>It's a quick, in-clinic procedure with minimal downtime, typically done as a short course of sessions spaced a few weeks apart for optimal results.</p><p>Most patients notice reduced hair fall within the first few sessions, with visible improvements in hair density over the following months.</p>`,
  ],
  [
    'Botox & Fillers',
    'botox-and-fillers',
    'Non-surgical injectables that smooth fine lines, restore volume, and refresh facial contours.',
    `<p>Botox and dermal fillers are quick, non-surgical treatments that address fine lines, wrinkles, and volume loss. Botox relaxes the muscles responsible for expression lines, while fillers restore lost volume and enhance facial contours like the cheeks, lips, and jawline.</p><p>Each treatment is customized during your consultation to suit your facial anatomy and desired outcome, aiming for natural, refreshed results rather than an overdone look.</p><p>There's little to no downtime — most patients return to their day immediately, with results developing over the following days and lasting several months.</p>`,
  ],
  [
    'Tummy Tuck',
    'tummy-tuck',
    'Removes excess skin and tightens abdominal muscles for a firmer, flatter midsection.',
    `<p>A tummy tuck (abdominoplasty) removes excess loose skin and tightens weakened abdominal muscles, commonly sought after pregnancy or significant weight loss. The result is a firmer, flatter, more toned midsection.</p><p>During your consultation we'll assess your skin laxity and muscle separation to determine whether a full or mini tummy tuck — sometimes combined with liposuction — best suits your goals.</p><p>Recovery involves a few weeks of restricted activity, with most patients back to light routines within two to three weeks and final results visible over the following months.</p>`,
  ],
  [
    'Rhinoplasty',
    'rhinoplasty',
    'Reshapes the nose to improve facial balance and, where needed, breathing function.',
    `<p>Rhinoplasty reshapes the nose to improve facial harmony, correct structural concerns, or, in some cases, improve breathing function. Every nose and every goal is different, so treatment is fully personalized after a detailed consultation.</p><p>Using precise surgical techniques, we refine the bridge, tip, or overall proportions of the nose while keeping the result natural and in balance with the rest of the face.</p><p>Initial swelling and bruising settle within one to two weeks, with the final refined shape becoming visible over the following months as subtle swelling continues to resolve.</p>`,
  ],
];

const run = async () => {
  await connectDB();

  await Service.deleteMany({});

  for (let i = 0; i < serviceDefs.length; i++) {
    const [title, slug, shortDesc, bodyContent] = serviceDefs[i];
    await Service.create({
      title,
      slug,
      shortDesc,
      image: img(`/assets/img/bg/services-0${(i % 9) + 1}.png`),
      order: i + 1,
      bodyContent,
      gallery: [img('/assets/img/bg/services-deatils-img-01.png')],
      metaTitle: `${title} - Natural Cosmetic Surgery Centre`,
      metaDescription: shortDesc,
    });
  }

  console.log('Services reseeded:');
  console.log(`  Services: ${await Service.countDocuments()}`);

  await mongoose.disconnect();
};

run().catch((err) => {
  console.error('Service seeding failed:', err);
  process.exit(1);
});