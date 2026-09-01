import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    shortDesc: { type: String, default: '' },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    // Which service category this procedure belongs to. Kept as a plain enum (rather than
    // a separate collection) since the clinic only needs these three fixed groupings — the
    // admin panel exposes it as a dropdown on each Service so it's still fully editable.
    category: {
      type: String,
      enum: ['Cosmetic Surgery', 'Hand & Reconstructive Surgery', 'Non-Surgical & Aesthetic Treatments'],
      default: 'Cosmetic Surgery',
      trim: true,
    },
    image: { url: String, publicId: String },
    order: { type: Number, default: 0 },
    bodyContent: { type: String, default: '' },
    gallery: [{ url: String, publicId: String }],
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
  },
  { timestamps: true }
);
serviceSchema.index({ order: 1 });
serviceSchema.index({ category: 1 });

export default mongoose.model('Service', serviceSchema);