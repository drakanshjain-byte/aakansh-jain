import mongoose from 'mongoose';

const navItemSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    link: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'NavItem', default: null },
    // When true, the header link opens the target in a new browser tab (e.g. the
    // Online Consultation page) instead of navigating the current tab.
    openInNewTab: { type: Boolean, default: false },
  },
  { timestamps: true }
);
navItemSchema.index({ order: 1 });

export default mongoose.model('NavItem', navItemSchema);