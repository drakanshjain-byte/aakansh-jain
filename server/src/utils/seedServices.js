// Clears ONLY the Services collection and re-inserts the current service list, grouped by
// category and in the order given in "Natural Cosmetic Surgery Center – Main Services".
// Does not touch any other collection (slides, posts, testimonials, nav items, etc.).
//
// Usage:  node src/utils/seedServices.js
// (reads MONGO_URI from .env, same as the rest of the app)
//
// Category names below MUST match the `category` enum in server/src/models/Service.js and
// SERVICE_CATEGORIES in client/src/lib/serviceCategories.js exactly.
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

// Builds the HTML body from three paragraphs (same shape the old seed used).
const body = (...paras) => paras.map((p) => `<p>${p}</p>`).join('');

// [title, slug, shortDesc, [paragraph1, paragraph2, paragraph3]]
const serviceGroups = [
  {
    category: 'Cosmetic & Aesthetic Surgery',
    services: [
      [
        'Rhinoplasty (Nose Surgery)',
        'rhinoplasty',
        'Reshapes the nose to improve facial balance and, where needed, breathing function.',
        [
          'Rhinoplasty reshapes the nose to improve facial harmony, correct structural concerns, or, in some cases, improve breathing function. Every nose and every goal is different, so treatment is fully personalized after a detailed consultation.',
          'Using precise surgical techniques, we refine the bridge, tip, or overall proportions of the nose while keeping the result natural and in balance with the rest of the face.',
          'Initial swelling and bruising settle within one to two weeks, with the final refined shape becoming visible over the following months as subtle swelling continues to resolve.',
        ],
      ],
      [
        'Facelift',
        'facelift',
        'Lifts and tightens sagging facial and neck tissues for a refreshed, naturally rejuvenated look.',
        [
          'A facelift addresses the visible effects of ageing on the lower face and neck, including sagging skin, deepening folds, and loss of a defined jawline. The aim is a rested, refreshed appearance that still looks like you.',
          'Your surgeon will assess your skin quality, facial structure, and goals during consultation to plan the technique best suited to you, with incisions placed discreetly to keep scarring as inconspicuous as possible.',
          'Most patients need a couple of weeks of recovery before returning to social activities, with swelling settling gradually and the final result becoming clear over the following months.',
        ],
      ],
      [
        'Eyelid Surgery',
        'eyelid-surgery',
        'Refines drooping upper lids and puffy lower lids for a more open, rested appearance.',
        [
          'Eyelid surgery (blepharoplasty) removes or repositions excess skin and fat from the upper and lower eyelids. It can reduce a tired or heavy look and, when drooping skin affects the field of vision, may also improve function.',
          'The procedure uses fine incisions placed in the natural creases of the eyelids, and the plan is tailored to your eye shape and concerns following a careful evaluation.',
          'Bruising and swelling usually ease within one to two weeks, and most patients are comfortable returning to routine activities within about a week to ten days.',
        ],
      ],
      [
        'Liposuction',
        'liposuction',
        'Removes stubborn, diet-and-exercise-resistant fat to sculpt a smoother, more contoured body shape.',
        [
          "Liposuction targets localized fat deposits in areas like the abdomen, flanks, thighs, arms, and chin that don't respond to diet and exercise. Using gentle suction through small, discreet incisions, we sculpt a smoother, more proportionate body contour.",
          'Your consultation includes a full assessment of the treatment areas, a discussion of your goals, and an honest look at expected results. The procedure is performed under appropriate anesthesia with a focus on natural-looking contouring rather than over-removal.',
          'Most patients return to light daily activity within a few days and to exercise within a few weeks, with final contours visible over the following months as swelling subsides.',
        ],
      ],
      [
        'Tummy Tuck (Abdominoplasty)',
        'tummy-tuck',
        'Removes excess skin and tightens abdominal muscles for a firmer, flatter midsection.',
        [
          'A tummy tuck (abdominoplasty) removes excess loose skin and tightens weakened abdominal muscles, commonly sought after pregnancy or significant weight loss. The result is a firmer, flatter, more toned midsection.',
          "During your consultation we'll assess your skin laxity and muscle separation to determine whether a full or mini tummy tuck — sometimes combined with liposuction — best suits your goals.",
          'Recovery involves a few weeks of restricted activity, with most patients back to light routines within two to three weeks and final results visible over the following months.',
        ],
      ],
      [
        'Body Contouring',
        'body-contouring',
        'Reshapes the body and removes loose skin and fat, especially after major weight loss or pregnancy.',
        [
          'Body contouring brings together procedures that reshape the body by removing excess skin and stubborn fat and improving overall proportions. It is often chosen after significant weight loss, pregnancy, or natural changes that diet and exercise cannot correct.',
          'Depending on your concerns, your plan may address the abdomen, arms, thighs, back, or buttocks, either in a single procedure or in carefully planned stages. We discuss the options, scar placement, and realistic outcomes in detail beforehand.',
          'Recovery depends on the areas treated and the extent of surgery, and your surgeon will guide you on activity, compression garments, and follow-up so you heal safely and comfortably.',
        ],
      ],
      [
        'Breast Augmentation, Reduction & Lift',
        'breast-augmentation-reduction-lift',
        'Enhances, reduces, or lifts the breasts to restore balanced proportions and a more comfortable, confident silhouette.',
        [
          'Breast surgery can increase fullness with implants or fat transfer (augmentation), reduce size and weight to relieve discomfort and restore proportion (reduction), or raise and reshape sagging breasts (lift). Each is planned around your anatomy, lifestyle, and personal goals.',
          'At your consultation we discuss size, shape, implant or technique options, and scar placement, so you can make an informed decision with a clear understanding of what to expect.',
          'Most patients resume light activity within a week or two, with a gradual return to exercise on your surgeon\'s advice, and the final shape settling over the following months.',
        ],
      ],
      [
        'Gynecomastia Surgery',
        'gynecomastia-surgery',
        'Surgical correction of enlarged male breast tissue for a flatter, firmer, more masculine chest contour.',
        [
          'Gynecomastia surgery addresses enlarged or puffy male breast tissue caused by excess glandular tissue, fat, or a combination of both. The goal is a flatter, firmer, more naturally masculine chest contour.',
          'Depending on the underlying cause, treatment may involve liposuction alone, direct excision of glandular tissue, or a combination of both — determined after a thorough clinical evaluation during your consultation.',
          'Recovery is typically quick, with most patients resuming normal activities within a week and full results visible over the following weeks to months.',
        ],
      ],
    ],
  },
  {
    category: 'Reconstructive Surgery',
    services: [
      [
        'Trauma & Injury Reconstruction',
        'trauma-injury-reconstruction',
        'Repairs and restores form and function after accidents, fractures, and serious injuries.',
        [
          'Trauma and injury reconstruction restores both function and appearance after accidents, falls, road traffic injuries, or other serious damage to skin, soft tissue, and underlying structures.',
          'Treatment is planned around the type and extent of injury and may involve wound management, tissue repair, skin grafts, or flap surgery, sometimes performed in stages to achieve the best possible result.',
          'Recovery varies with the injury, and we guide you through each phase, from early wound care to rehabilitation and any later refinements.',
        ],
      ],
      [
        'Facial Reconstruction',
        'facial-reconstruction',
        'Rebuilds facial structure and features affected by injury, illness, or surgery.',
        [
          'Facial reconstruction rebuilds areas of the face affected by trauma, tumour removal, infection, or congenital differences, with the aim of restoring both appearance and essential functions such as eating, speaking, and eye protection.',
          'Because the face is so central to identity, planning is careful and individualized, using techniques such as local tissue rearrangement, grafts, or flaps, with scars placed as discreetly as possible.',
          'Reconstruction can sometimes be completed in a single procedure, but often involves staged surgery, and we will outline the expected path and timeline with you in advance.',
        ],
      ],
      [
        'Limb Reconstruction',
        'limb-reconstruction',
        'Restores form, coverage, and function to arms and legs after injury or tissue loss.',
        [
          'Limb reconstruction aims to restore coverage, function, and shape to the arms and legs following severe trauma, infection, tumour removal, or tissue loss. The focus is on preserving as much useful function as possible.',
          'Depending on the situation, treatment may include skin grafts, local or free tissue flaps, and microsurgical techniques, often coordinated with orthopaedic and other specialist care.',
          'Recovery is tailored to the type of reconstruction, and rehabilitation and physiotherapy are an important part of regaining strength and mobility.',
        ],
      ],
      [
        'Breast Reconstruction',
        'breast-reconstruction',
        'Rebuilds breast shape after mastectomy or other breast surgery using implants or your own tissue.',
        [
          'Breast reconstruction rebuilds the shape of the breast after mastectomy, lumpectomy, or other surgery. Options include implant-based reconstruction and reconstruction using your own tissue, and the right choice depends on your health, anatomy, and preferences.',
          'We take time to explain each approach, the number of stages involved, and what results you can realistically expect, so that you feel supported and informed in your decision.',
          'Timing can be coordinated with your cancer treatment, either at the same time as mastectomy or later, and your care team will plan the sequence with you.',
        ],
      ],
      [
        'Post-Cancer Reconstruction',
        'post-cancer-reconstruction',
        'Restores appearance and function after surgery to remove tumours of the skin, head, neck, breast, or limbs.',
        [
          'Post-cancer reconstruction repairs the defects left behind after tumour removal, helping restore appearance and function in areas such as the face, scalp, neck, breast, and limbs.',
          'Surgery is carefully coordinated with your oncology team, so that reconstruction is timed safely around cancer treatment, using grafts, flaps, or other techniques suited to the size and location of the defect.',
          'We aim to support you through every stage, from planning and surgery to recovery and any follow-up refinements.',
        ],
      ],
      [
        'Soft Tissue Reconstruction',
        'soft-tissue-reconstruction',
        'Rebuilds skin, fat, and muscle defects caused by injury, infection, or surgical removal of tissue.',
        [
          'Soft tissue reconstruction repairs defects in the skin, fat, and muscle that result from injury, infection, pressure wounds, or the surgical removal of diseased tissue.',
          'Depending on the size and location of the defect, treatment may use skin grafts, local flaps, or tissue transferred from another part of the body to restore cover, contour, and protection of deeper structures.',
          'Your plan, expected healing time, and aftercare are discussed in detail during consultation, so you know what to expect at each stage.',
        ],
      ],
    ],
  },
  {
    category: 'Burn & Scar Reconstruction',
    services: [
      [
        'Burn Reconstruction',
        'burn-reconstruction',
        'Restores function and appearance to areas of the body affected by burn injuries.',
        [
          'Burn reconstruction focuses on restoring movement, comfort, and appearance after burn injuries have healed or when healing leaves tight, thickened, or uneven skin.',
          'Treatment may include skin grafts, flaps, scar release, and other reconstructive techniques, planned in stages according to the area and depth of the original burn.',
          'We work with you over time, since burn recovery is often gradual, and combine surgery with guidance on scar care and rehabilitation.',
        ],
      ],
      [
        'Scar Revision',
        'scar-revision',
        'Improves the look and feel of scars from injury, surgery, or previous wounds.',
        [
          'Scar revision aims to make a scar less noticeable, softer, or more comfortable, and to improve its alignment with surrounding skin. While no scar can be removed completely, many can be significantly improved.',
          'The approach depends on the scar\'s type, size, and location, and may include surgical re-closure, techniques that reposition the scar, or complementary treatments to support healing.',
          'We will assess your scar and explain realistic outcomes and timing, since scars continue to mature for many months after treatment.',
        ],
      ],
      [
        'Keloid Treatment',
        'keloid-treatment',
        'Manages raised, overgrown keloid scars with a plan aimed at reducing size and recurrence.',
        [
          'Keloids are raised, thickened scars that grow beyond the original wound and may be itchy, tender, or cosmetically bothersome. They can be tricky to treat because they have a tendency to return.',
          'Treatment is individualized and may combine approaches such as injections, surgical removal, pressure therapy, or other adjuncts, chosen to reduce size and lower the chance of recurrence.',
          'Follow-up is an important part of care, and we will guide you on aftercare and what to watch for after treatment.',
        ],
      ],
      [
        'Contracture Release & Reconstruction',
        'contracture-release-reconstruction',
        'Releases tight scar bands that restrict movement and reconstructs the area to restore function.',
        [
          'A contracture occurs when scar tissue tightens and shortens, restricting the movement of a joint or nearby area. This is commonly seen after burns or deep wounds.',
          'Contracture release surgery frees the tight tissue and reconstructs the area, often with skin grafts or flaps, to restore a better range of motion and function.',
          'Post-operative physiotherapy and splinting are often important to maintain the improvement, and we will plan the rehabilitation together with you.',
        ],
      ],
    ],
  },
  {
    category: 'Hand & Microsurgery',
    services: [
      [
        'Hand Surgery',
        'hand-surgery',
        'Treats conditions and injuries of the hand and wrist to restore comfort, strength, and function.',
        [
          'Hand surgery treats a wide range of problems affecting the hand and wrist, including injuries, nerve compression, tendon and joint conditions, and congenital or acquired deformities.',
          'After a careful examination and any necessary investigations, we recommend the treatment that best suits your condition, which may include non-surgical measures as well as surgery.',
          'Hand therapy is often an important part of recovery, and we guide you through rehabilitation so you can get back to everyday and work activities.',
        ],
      ],
      [
        'Nerve & Tendon Repair',
        'nerve-tendon-repair',
        'Repairs cut or damaged nerves and tendons to help restore feeling and movement.',
        [
          'Nerves provide sensation and tendons allow the fingers and hand to move, so injuries to either can seriously affect hand function. Prompt assessment and repair give the best chance of recovery.',
          'Repair is performed using fine surgical techniques, and in some cases grafts or tendon transfers are used to restore function when direct repair is not possible.',
          'Recovery involves a structured period of protection followed by guided hand therapy, and regaining sensation and movement can take time.',
        ],
      ],
      [
        'Complex Hand Injury Reconstruction',
        'complex-hand-injury-reconstruction',
        'Reconstructs severe hand injuries involving bone, tendon, nerve, vessel, and skin damage.',
        [
          'Complex hand injuries often involve several structures at once, such as bone, tendon, nerve, blood vessels, and skin. Treating them requires a coordinated plan that restores as much function as possible.',
          'Reconstruction may involve fracture fixation, tendon and nerve repair, vascular repair, and soft tissue cover using grafts or flaps, sometimes in stages.',
          'Rehabilitation is a key part of the outcome, and your care plan includes close follow-up and therapy to help you regain strength and dexterity.',
        ],
      ],
      [
        'Microsurgical Reconstruction',
        'microsurgical-reconstruction',
        'Uses an operating microscope to repair tiny vessels and nerves and transfer tissue for complex reconstruction.',
        [
          'Microsurgery uses an operating microscope and very fine instruments to repair tiny blood vessels and nerves, allowing tissue to be moved from one part of the body to another to rebuild a defect.',
          'It is used in complex reconstruction after trauma, cancer surgery, and other conditions, and in some cases for reattachment of severed parts.',
          'These are detailed procedures that need careful planning and monitoring, and we will explain the process, recovery, and follow-up in advance.',
        ],
      ],
    ],
  },
  {
    category: 'Congenital & Pediatric Plastic Surgery',
    services: [
      [
        'Cleft Lip Surgery',
        'cleft-lip-surgery',
        'Repairs a cleft of the lip to restore normal lip form, function, and appearance in infants and children.',
        [
          'A cleft lip is a separation in the upper lip that is present from birth. Surgical repair closes the gap and restores the shape, muscle function, and appearance of the lip.',
          'Surgery is usually performed in infancy, and the timing and technique are planned carefully with the family, with attention to creating a natural-looking result and a discreet scar.',
          'Some children need further refinement as they grow, and we support families with follow-up over time and guidance on feeding and aftercare.',
        ],
      ],
      [
        'Cleft Palate Surgery',
        'cleft-palate-surgery',
        'Repairs an opening in the roof of the mouth to support feeding, speech development, and ear health.',
        [
          'A cleft palate is an opening in the roof of the mouth that can affect feeding, speech, and hearing. Surgical repair closes the opening and rebuilds the muscles needed for normal function.',
          'Repair is typically carried out in infancy at a time chosen to support speech development, and is often part of a wider team approach that may include speech, hearing, and dental specialists.',
          'We guide families through every step, from preparation to recovery and long-term follow-up as the child grows.',
        ],
      ],
      [
        'Congenital Anomaly Correction',
        'congenital-anomaly-correction',
        'Corrects birth differences of the face, hands, ears, and other areas to improve function and appearance.',
        [
          'Congenital anomalies are differences in the way a part of the body has formed before birth, such as those of the face, ears, hands, or limbs. Plastic surgery can help improve both function and appearance.',
          'Treatment depends on the specific condition and the child\'s age, and is planned carefully with the family, sometimes in several stages over the course of childhood.',
          'We take time to explain the options, timing, and expected outcomes, and provide supportive follow-up as the child grows.',
        ],
      ],
      [
        'Hemangioma Surgery',
        'hemangioma-surgery',
        'Treats infantile hemangiomas and similar vascular birthmarks when intervention is needed.',
        [
          'Hemangiomas are common vascular birthmarks that appear in infancy. Many shrink on their own, but some grow in ways that affect appearance or function, or leave residual skin changes.',
          'After careful assessment, we advise whether observation, medical treatment, or surgery is most appropriate, and surgery may be used to remove a lesion or to correct residual skin changes after it has settled.',
          'We discuss the timing and options with parents in detail so that decisions are made together and with the child\'s long-term wellbeing in mind.',
        ],
      ],
    ],
  },
  {
    category: 'Hair & Minor Aesthetic Procedures',
    services: [
      [
        'Hair Transplantation',
        'hair-transplantation',
        'Relocates your own hair follicles to thinning or bald areas for natural, permanent-looking coverage.',
        [
          'Hair transplantation moves healthy hair follicles from a donor area, usually the back of the scalp, to areas of thinning or baldness. Because the hair is your own, the result looks and grows naturally.',
          'After assessing your hair loss pattern, donor supply, and goals, we plan the hairline design and the number of grafts to achieve natural-looking density.',
          'New hair typically begins to grow within a few months, with fuller results developing gradually over the following year.',
        ],
      ],
      [
        'PRP Therapy',
        'prp-therapy',
        'Platelet-Rich Plasma therapy that uses your own blood platelets to stimulate natural hair regrowth.',
        [
          'PRP (Platelet-Rich Plasma) therapy is a non-surgical treatment for thinning hair and early hair loss. A small sample of your own blood is processed to concentrate growth-factor-rich platelets, which are then injected into the scalp to stimulate follicle activity and encourage natural regrowth.',
          "It's a quick, in-clinic procedure with minimal downtime, typically done as a short course of sessions spaced a few weeks apart for optimal results.",
          'Most patients notice reduced hair fall within the first few sessions, with visible improvements in hair density over the following months.',
        ],
      ],
      [
        'Ear Lobe Repair',
        'ear-lobe-repair',
        'Repairs torn or stretched earlobes for a natural, even shape.',
        [
          'Ear lobe repair corrects torn, split, or stretched earlobes caused by heavy earrings, injury, or long-term stretching, restoring a natural and even shape.',
          'It is a quick, minor procedure usually performed under local anaesthesia, with fine stitches used to close the lobe neatly.',
          'Healing takes a few weeks, and your surgeon will advise when it is safe to wear earrings again.',
        ],
      ],
      [
        'Mole & Skin Lesion Removal',
        'mole-skin-lesion-removal',
        'Safe removal of moles, cysts, and other skin lesions, with the option of laboratory examination.',
        [
          'Moles, cysts, and other skin lesions may be removed for cosmetic reasons, because they cause irritation, or because a closer look is needed. Each lesion is examined before any treatment is planned.',
          'Removal is usually a short procedure under local anaesthesia, and where appropriate the removed tissue can be sent for laboratory examination for peace of mind.',
          'Any changing, bleeding, or unusual mole should be assessed promptly, and we will advise you on the right approach and aftercare during your visit.',
        ],
      ],
    ],
  },
];

const run = async () => {
  await connectDB();

  await Service.deleteMany({});

  let order = 0;
  for (const { category, services } of serviceGroups) {
    for (const [title, slug, shortDesc, paras] of services) {
      await Service.create({
        title,
        slug,
        shortDesc,
        category,
        image: img(`/assets/img/bg/services-0${(order % 9) + 1}.png`),
        order: order + 1,
        bodyContent: body(...paras),
        gallery: [img('/assets/img/bg/services-deatils-img-01.png')],
        metaTitle: `${title} - Natural Cosmetic Surgery Centre`,
        metaDescription: shortDesc,
      });
      order++;
    }
  }

  console.log('Services reseeded:');
  console.log(`  Services: ${await Service.countDocuments()}`);
  for (const { category } of serviceGroups) {
    console.log(`  ${category}: ${await Service.countDocuments({ category })}`);
  }

  await mongoose.disconnect();
};

run().catch((err) => {
  console.error('Service seeding failed:', err);
  process.exit(1);
});