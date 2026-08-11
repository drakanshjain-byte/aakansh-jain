import mongoose from 'mongoose';

const consultationSubmissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    appointmentType: { type: String, enum: ['new', 'review'], default: 'new' },
    reviewRegistrationId: { type: String, default: '' },
    preferredDate: { type: String, default: '' },
    message: { type: String, default: '' },
    consentAgreed: { type: Boolean, default: false },
    status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new', index: true },
  },
  { timestamps: true }
);

export default mongoose.model('ConsultationSubmission', consultationSubmissionSchema);