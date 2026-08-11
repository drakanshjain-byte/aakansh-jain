import mongoose from 'mongoose';

// Powers the standalone "/online-consultation" page — the online video-consultation
// booking form, fee table, payment details, process steps and the Informed Consent
// popup. Every piece of text, every list item and both images (payment QR code +
// doctor payment photo) are editable from the admin panel (Singleton: Online
// Consultation Page).

const processStepSchema = new mongoose.Schema(
  { icon: String, title: String },
  { _id: false }
);

const feeRowSchema = new mongoose.Schema(
  { type: String, client: String, fee: String, duration: String },
  { _id: false }
);

const consultationSectionSchema = new mongoose.Schema(
  {
    // ---- Hero / intro ----
    eyebrow: { type: String, default: 'Online Consultation' },
    introHeading: {
      type: String,
      default:
        'Dr. Aakansh Jain will provide you with his expert feedback in order for you to make a well informed decision.',
    },
    introParagraph1: {
      type: String,
      default:
        "We now offer online consultations to ensure your convenience, privacy, and comfort. Whether you're exploring options or ready to take the next step, our virtual sessions are designed to fit your schedule.",
    },
    introParagraph2: { type: String, default: 'We look forward to your online consultation!' },

    // ---- "How it works" process strip ----
    processHeading: { type: String, default: 'How Online Consultation Works' },
    processSteps: {
      type: [processStepSchema],
      default: () => [
        { icon: 'fa-light fa-file-pen', title: 'Fill Up Our Form' },
        { icon: 'fa-light fa-file-shield', title: 'Agree To The Terms & Conditions' },
        { icon: 'fa-light fa-hand-pointer', title: 'Submit The Form' },
        { icon: 'fa-light fa-mobile-screen', title: 'Pay Online By GPay Or Paytm' },
        { icon: 'fa-light fa-building-columns', title: 'Complete The Transaction' },
        { icon: 'fa-light fa-share-nodes', title: 'Share Payment Details With Us' },
        { icon: 'fa-light fa-phone-volume', title: 'Our Team Will Contact You' },
      ],
    },

    // ---- Booking form copy ----
    formHeading: { type: String, default: 'Book Your Online Consultation' },
    consentCheckboxLabel: { type: String, default: 'I agree to the Informed Consent for Telemedicine Consultation' },
    viewConsentLinkText: { type: String, default: 'View Informed Consent for Telemedicine Consultation' },
    submitButtonText: { type: String, default: 'Book Online Consultation' },

    // ---- Fee table ----
    feeTableHeading: {
      type: String,
      default: 'Below given is a comprehensive list of the online consultation fee that hold good with Dr. Aakansh Jain.',
    },
    feeTableNote: { type: String, default: 'Review clients should confirm their registration ID No. prior to consultation.' },
    feeRows: {
      type: [feeRowSchema],
      default: () => [
        { type: 'Video', client: 'New', fee: '₹ 1000', duration: '10 min' },
        { type: 'Video', client: 'Review', fee: '₹ 500', duration: '10 min' },
      ],
    },

    // ---- Online payment ----
    paymentHeading: { type: String, default: 'Online Payment' },
    upiId: { type: String, default: 'drakanshjain@okhdfcbank' },
    paymentMobile: { type: String, default: '9278479456' },
    paymentNote: {
      type: String,
      default: 'Kindly note that these are not clickable gateways and the payment has to be made manually through Google Pay or Paytm.',
    },
    paymentQrImage: { url: String, publicId: String },
    paymentDoctorPhoto: { url: String, publicId: String },
    paymentDoctorPhotoCaption: { type: String, default: 'Scan to pay Dr. Aakansh Jain' },

    // ---- Terms & conditions (shown on the page itself) ----
    termsHeading: { type: String, default: 'Terms and Conditions' },
    termsItems: {
      type: [String],
      default: () => [
        'The consultation will be provided to you via audio/video call. Please make sure you have working video-conferencing equipment and a stable internet connection. In case of inadequate equipment, technical error, or defective internet connectivity, we reserve the right to reschedule or cancel your appointment.',
        'You understand and acknowledge that there will not be any physical examination involved and the consultation will be provided via video only.',
        'The opinion given by the doctor will be based solely on the verbal communication between the doctor and the patient, and on the reports and other information you provide during the online consultation.',
        'If you miss or cancel your appointment, you will not be entitled to a refund.',
        'Our online consultation service is not meant for emergency conditions. In an emergency, please go to the nearest hospital immediately.',
        'We reserve the right to ask for confirmation of identification when required, and to cancel the consultation without a refund if this is not provided.',
        'By signing up, you consent to Dr. Aakansh Jain reaching out to you via phone call, WhatsApp, Facebook Messenger, SMS and email. These communications may be both transactional and promotional in nature.',
      ],
    },
    regulationNote: {
      type: String,
      default: 'This Telemedicine Consultation is offered in accordance with the Indian Medical Council (Professional Conduct, Etiquette and Ethics) (Amendment) Regulations, 2020.',
    },

    // ---- Informed Consent popup ----
    consentModalTitle: { type: String, default: 'Informed Consent for Telemedicine Consultation' },

    consentGuidelinesHeading: { type: String, default: 'Guidelines' },
    consentGuidelinesItems: {
      type: [String],
      default: () => [
        'As per MOHFW and MCI guidelines, we offer teleconsultation as a convenient option for patients.',
        'Video consultation is offered as the primary mode of consult, with email used for sharing medical records.',
        'We offer only elective consultations. For all emergencies, patients should get to the nearest hospital in person.',
        'Telemedicine consultation is never anonymous — both the patient and the doctor need to know each other\u2019s identity.',
        'The doctor will make every effort to gather sufficient medical information about your condition before forming a professional judgement.',
        'If your condition can be appropriately managed via telemedicine, the doctor may proceed to provide health education, counselling, and/or prescribe medicines as appropriate.',
        'If telemedicine is not appropriate for your situation, the doctor will advise accordingly and/or refer you for an in-person consultation.',
        'A telemedicine consultation is treated the same as an in-person consultation from a fee perspective, and an appropriate fee may be charged.',
        'Either the doctor or the patient may refuse or discontinue a teleconsultation at any point, with due notice.',
      ],
    },

    consentDoctorHeading: { type: String, default: 'Identification of Your Doctor' },
    consentDoctorName: { type: String, default: 'Dr. Aakansh Jain' },
    consentDoctorQualification: { type: String, default: '' },
    consentDoctorCouncil: { type: String, default: '' },
    consentDoctorRegNo: { type: String, default: '' },

    consentAppointmentSlotsHeading: { type: String, default: 'Appointment Slots' },
    consentAppointmentSlotsText: {
      type: String,
      default: 'Appointments are of 15 minutes duration, with an accommodative window of about 10 minutes to prepare for the next teleconsult.',
    },

    consentIntroHeading: { type: String, default: 'Introduction' },
    consentIntroText: {
      type: String,
      default:
        'Telemedicine involves the use of electronic communication (phone, email, SMS, WhatsApp, video call, etc.) to allow a healthcare provider at one location to provide patient care to someone at a different location. The information exchanged may be used for diagnosis, therapy, follow-up and/or education, and may include any of the following:',
    },
    consentIntroItems: {
      type: [String],
      default: () => [
        'Patient medical records',
        'Medical images',
        'Live two-way audio and video',
        'Output data from medical devices, and sound and video files',
      ],
    },
    consentIntroFooter: {
      type: String,
      default:
        'The electronic systems used incorporate network and software security protocols to protect the confidentiality of patient identification and imaging data, and include measures to safeguard that data and protect its integrity against intentional or unintentional corruption.',
    },

    consentBenefitsHeading: { type: String, default: 'Expected Benefits' },
    consentBenefitsItems: {
      type: [String],
      default: () => [
        'Improved access to medical care by allowing you to remain at your own location while the doctor provides care from a different site.',
        'More efficient medical evaluation and management.',
        'Access to the doctor\u2019s expertise without the need to travel.',
        'Reduced need for travel.',
      ],
    },

    consentRisksHeading: { type: String, default: 'Possible Risks' },
    consentRisksIntro: {
      type: String,
      default: 'As with any medical process, telemedicine carries some potential risks, which may include but are not limited to:',
    },
    consentRisksItems: {
      type: [String],
      default: () => [
        'In rare cases, the information transmitted (e.g. image resolution) may not be sufficient for the doctor to make an appropriate decision, and a face-to-face visit may be recommended.',
        'Delays in evaluation or treatment could occur because of equipment deficiencies or failures.',
        'In very rare instances, a security protocol could fail, resulting in a breach of privacy of your personal medical information.',
        'In rare cases, a lack of access to your complete medical records may result in adverse drug interactions, allergic reactions, or other errors of judgement.',
      ],
    },

    consentFinancialText: {
      type: String,
      default: 'I understand that I am financially responsible for all charges incurred during the telemedicine consultation.',
    },

    consentExplicitHeading: { type: String, default: 'Explicit Informed Consent for Telemedicine Consultation' },
    consentExplicitIntro: { type: String, default: 'By agreeing to this consent, I understand the following:' },
    consentExplicitItems: {
      type: [String],
      default: () => [
        'The laws protecting the privacy and confidentiality of medical information also apply to telemedicine, and no information identifying me obtained through this telemedicine consultation will be disclosed to researchers or other entities without my consent.',
        'There will not be any physical examination involved, and the consultation will be provided via video only.',
        'I have the right to withhold or withdraw my consent to the use of telemedicine at any time, without affecting my right to future care or treatment.',
        'If my equipment, technical connection or internet connectivity is inadequate, the provider reserves the right to reschedule or cancel the appointment.',
        'If the doctor believes I would be better served by a traditional face-to-face visit, they may stop the telemedicine consult at any time and arrange an in-person visit instead.',
        'A variety of alternative methods of medical care may be available to me, and I may choose one or more of these at any time.',
        'Telemedicine may involve electronic communication of my personal medical information to other medical practitioners, who may be located in other areas.',
        'It is my responsibility to inform the doctor of any other electronic interactions regarding my care that I may have with other healthcare providers.',
        'While I can expect the anticipated benefits from the use of telemedicine in my care, no results can be guaranteed or assured.',
        'This online consultation service is not meant for emergency conditions.',
      ],
    },

    consentFooterText: {
      type: String,
      default:
        'By checking the box to agree, you confirm that you have read the above Informed Consent for Telemedicine Consultation and wish to proceed with your consultation using one or more of the communication methods described above.',
    },
  },
  { timestamps: true }
);

export default mongoose.model('ConsultationSection', consultationSectionSchema);