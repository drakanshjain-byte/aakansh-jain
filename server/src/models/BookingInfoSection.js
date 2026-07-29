import mongoose from 'mongoose';

// Powers the Home page section that explains how a patient can actually book an
// appointment: offline (call / visit the clinic) or online, plus a link to the
// contact form. Every piece of text and every link is editable from the admin panel.
const bookingInfoSectionSchema = new mongoose.Schema(
  {
    eyebrow: { type: String, default: 'Booking Made Easy' },
    heading: { type: String, default: 'How To Book Your Appointment' },
    description: { type: String, default: '' },

    offlineHeading: { type: String, default: 'Book Offline' },
    offlineDescription: {
      type: String,
      default: 'Prefer speaking to someone directly? Call our clinic or walk in to schedule your in-person appointment.',
    },
    offlineAddress: { type: String, default: '' },
    offlineButtonText: { type: String, default: 'Call Us' },
    offlineButtonLink: { type: String, default: 'tel:+919278479456' },

    onlineHeading: { type: String, default: 'Book Online' },
    onlineDescription: {
      type: String,
      default: 'Book from anywhere, anytime. Fill in a few quick details and our team will confirm your slot.',
    },
    onlineButtonText: { type: String, default: 'Book Appointment' },
    onlineButtonLink: { type: String, default: '/contact' },

    contactFormHeading: { type: String, default: 'Have Questions First?' },
    contactFormDescription: {
      type: String,
      default: 'Send us your questions through our contact form and our team will get back to you shortly.',
    },
    contactFormButtonText: { type: String, default: 'Contact Us' },
    contactFormButtonLink: { type: String, default: '/contact' },
  },
  { timestamps: true }
);

export default mongoose.model('BookingInfoSection', bookingInfoSectionSchema);