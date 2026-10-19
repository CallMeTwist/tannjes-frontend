import type { LucideIcon } from "lucide-react";
import { Armchair, BriefcaseMedical, HandHeart, Home, HeartPulse, HousePlus, Sunset, Syringe } from "lucide-react";
import serviceHome from "@/assets/service-home.jpg";
import ctaFamily from "@/assets/cta-family.jpg";
import aboutCare from "@/assets/about-care.jpg";
import hospiceRoom from "@/assets/care/hospice-room.jpeg";
import loungeFamily from "@/assets/care/lounge-family.jpeg";
import elderlyWheelchair from "@/assets/care/elderly-wheelchair.jpeg";
import ambulanceTransfer from "@/assets/care/ambulance-transfer.jpeg";
import conciergeAir from "@/assets/care/concierge-air-transfer.jpeg";

// DRAFT CLINICAL COPY, to be reviewed and approved by the Tannjes clinical team before launch.
// Elderly / hospital-to-home / palliative / concierge bullets come from the existing hospital services list.

export type CareSetting = "home" | "inpatient" | "residence" | "anywhere";

export type CareService = {
  to: string;
  title: string;
  /** One line for the navigation menu. */
  blurb: string;
  /** Card / meta description. */
  summary: string;
  icon: LucideIcon;
  image: string;
  /** Short list for the home-page card. */
  includes: string[];
  /** Service page content. */
  intro: string[];
  whoFor: string[];
  details: { title: string; text: string }[];
  settings: CareSetting[];
  faqs: { q: string; a: string }[];
};

export const careServices: CareService[] = [
  {
    to: "/home-care",
    title: "Home Care",
    blurb: "Nursing and personal care in your own home",
    summary: "Nursing and personal care in the comfort of your own home, planned around you.",
    icon: Home,
    image: serviceHome,
    includes: [
      "Nursing visits or live-in support",
      "Help with washing, dressing and moving safely",
      "Medication support and health monitoring",
      "Doctor visits at home when needed",
    ],
    intro: [
      "Home care helps you stay safely in your own home while you recover from an illness, live with a long-term condition or need more help as you get older.",
      "Our nurses and carers visit as often as you need, from a few hours a week to live-in support, and work closely with your doctor and your family.",
    ],
    whoFor: [
      "People recovering after an illness or a hospital stay",
      "People living with long-term conditions such as diabetes, stroke or heart disease",
      "Older adults who need help with daily living",
      "Families who need trained support at home",
    ],
    details: [
      { title: "Nursing care", text: "Medication, injections, wound care and regular checks by qualified nurses." },
      { title: "Personal care", text: "Gentle help with washing, dressing, toileting and moving around safely." },
      { title: "Doctor home visits", text: "Medical reviews, prescriptions and referrals without leaving home." },
      { title: "Health monitoring", text: "Blood pressure, blood sugar and other checks, shared with your doctor." },
      { title: "Flexible support", text: "Visiting care or live-in care, on a schedule agreed with you." },
      { title: "Guidance for family", text: "Practical tips so everyone at home feels confident caring together." },
    ],
    settings: ["home"],
    faqs: [
      {
        q: "How often can a nurse visit?",
        a: "As often as your care plan needs, from occasional visits to round-the-clock or live-in care. We agree the schedule with you at the assessment.",
      },
      {
        q: "Can you work with my own doctor?",
        a: "Yes. With your permission we keep your doctor informed and follow any treatment plan they have already put in place.",
      },
    ],
  },
  {
    to: "/palliative-care",
    title: "Palliative Care",
    blurb: "Comfort and symptom relief alongside treatment",
    summary: "Relief from pain and other symptoms for people with a serious illness, at any stage.",
    icon: HandHeart,
    image: ctaFamily,
    includes: [
      "Pain management and feeding assistance",
      "Psychological and emotional support",
      "Daily living and family support",
    ],
    intro: [
      "Palliative care is for people living with a serious illness. It treats pain and other symptoms, and helps with emotional, practical and spiritual needs.",
      "It can start at diagnosis and can be given alongside treatments such as chemotherapy, dialysis or surgery.",
    ],
    whoFor: [
      "People living with cancer",
      "People with advanced heart, lung, kidney or liver disease",
      "People with neurological conditions such as stroke, Parkinson's or dementia",
      "Families caring for someone with a serious illness",
    ],
    details: [
      { title: "Pain and symptom control", text: "Easing pain, breathlessness, nausea, tiredness and poor appetite." },
      { title: "Feeding support", text: "Feeding assistance and nutrition support, including NGT/PEG care." },
      { title: "Emotional support", text: "Time to talk about worries and feelings, for patients and families." },
      { title: "Planning ahead", text: "Talking about your wishes and future care when you are ready to." },
      { title: "Help with daily living", text: "Practical support that makes each day easier at home." },
      { title: "Working with your specialists", text: "We coordinate with your hospital team so care fits together." },
    ],
    settings: ["home", "inpatient"],
    faqs: [
      {
        q: "Does palliative care mean stopping treatment?",
        a: "No. Palliative care can be given alongside treatments aimed at controlling or curing an illness. Its focus is helping you feel as well as possible.",
      },
      {
        q: "Is palliative care only for people with cancer?",
        a: "No. It can help anyone living with a serious illness, including heart, lung, kidney and neurological conditions.",
      },
    ],
  },
  {
    to: "/hospice-care",
    title: "Hospice Care",
    blurb: "Specialist care when cure is no longer the aim",
    summary: "Specialist care for people whose illness can no longer be cured, at home or in our inpatient hospice.",
    icon: Armchair,
    image: hospiceRoom,
    includes: [
      "Symptom control by doctors and specialist nurses",
      "Care at home or in our inpatient unit",
      "Emotional and spiritual support for the whole family",
    ],
    intro: [
      "Hospice care is for people whose illness can no longer be cured. The aim is to keep them comfortable and help them and their family make the most of the time they have.",
      "We provide hospice care in your own home, or in our inpatient hospice when closer care is needed.",
    ],
    whoFor: [
      "People with a life-limiting illness where treatment to cure is no longer working or wanted",
      "People who want their care to focus on comfort and quality of life",
      "Families who need extra help caring for someone at home",
    ],
    details: [
      { title: "Specialist symptom control", text: "Doctors and nurses experienced in easing pain and distress." },
      { title: "Nursing day and night", text: "Skilled care whenever it is needed, at home or on our unit." },
      { title: "Personal care with dignity", text: "Washing, comfort and positioning, always done with respect." },
      { title: "Emotional and spiritual support", text: "Time to talk about worries, faith and family." },
      { title: "Respite and short stays", text: "Short stays in our hospice to settle symptoms or give carers a rest." },
      { title: "Support for the family", text: "Guidance, a listening ear and help with what comes next." },
    ],
    settings: ["home", "inpatient"],
    faqs: [
      {
        q: "How long can someone receive hospice care?",
        a: "There is no fixed limit. Some people receive hospice care for months, others for weeks or days. Care continues for as long as it is needed.",
      },
      {
        q: "Can someone move between home and the inpatient hospice?",
        a: "Yes. Some people come in for a short stay to settle symptoms and then return home. We plan any move together with you and your family.",
      },
    ],
  },
  {
    to: "/end-of-life-care",
    title: "End-of-Life Care",
    blurb: "Care in the last weeks and days of life",
    summary: "Care in the last weeks and days of life, following each person's wishes.",
    icon: Sunset,
    image: aboutCare,
    includes: [
      "Comfort-focused nursing, day and night",
      "Care that respects faith, culture and personal wishes",
      "Support for loved ones before and after a death",
    ],
    intro: [
      "End-of-life care is for people in the last weeks and days of life. We aim to keep each person comfortable and to care for them in the way and place they choose.",
      "We also support families before, at the time of, and after a death.",
    ],
    whoFor: [
      "People who are likely to be in the last weeks or days of life",
      "Families and carers who want to be close and supported",
    ],
    details: [
      { title: "Comfort-focused care", text: "Easing pain, breathlessness and restlessness so the person can rest." },
      { title: "Honouring wishes", text: "Respecting the chosen place of care, faith, culture and rituals." },
      { title: "Nursing day and night", text: "Our nurses can stay through the night so families are not alone." },
      { title: "Spiritual care", text: "Christian and Muslim spiritual support, arranged on request." },
      { title: "Guidance for families", text: "Clear explanations of what is happening and what to expect." },
      { title: "Support after a death", text: "Help with the practical next steps, and bereavement support afterwards." },
    ],
    settings: ["home", "inpatient"],
    faqs: [
      {
        q: "Can someone stay with us through the night?",
        a: "Yes. Our nurses can provide overnight care at home, and in our inpatient hospice there is space for family to stay close.",
      },
      {
        q: "What happens after a death?",
        a: "Our team will guide you through the practical next steps, gently and at your pace, and stay in touch to support your family afterwards.",
      },
    ],
  },
  {
    to: "/assisted-living",
    title: "Assisted Living",
    blurb: "Supported living in our residence or at home",
    summary: "Daily support with nurses close by, in our assisted living residence or in your own home.",
    icon: HousePlus,
    image: loungeFamily,
    includes: [
      "A safe, supported place to live",
      "Help with daily living and medicines",
      "Nursing and doctor oversight",
    ],
    intro: [
      "Assisted living is for people who can do some things for themselves but need daily help with personal care, medicines or meals, or need someone close by.",
      "Live in our assisted living residence, with support on hand day and night, or receive the same daily support in your own home.",
    ],
    whoFor: [
      "Older adults who can no longer manage safely on their own",
      "People needing longer-term support after a stroke or serious illness",
      "People living with memory problems who benefit from routine",
      "Families who can't provide daily care themselves",
    ],
    details: [
      { title: "A comfortable home", text: "Safe, quiet rooms and shared spaces in our residence." },
      { title: "Help with daily living", text: "Help with washing, dressing, meals and getting around, as much as each person needs." },
      { title: "Medication support", text: "Medicines given correctly and on time, and reviewed with a doctor." },
      { title: "Nursing and doctor oversight", text: "Nurses on hand and regular doctor reviews, with our hospital close by." },
      { title: "Company and routine", text: "The same carers each day, conversation and daily activities." },
      { title: "Family involvement", text: "Families are welcome to visit and are kept updated on care." },
    ],
    settings: ["residence", "home"],
    faqs: [
      {
        q: "How is assisted living different from the inpatient hospice?",
        a: "Assisted living is a longer-term home for people who need daily support. Our inpatient hospice is for people with a serious illness who need specialist comfort care, often for shorter stays.",
      },
      {
        q: "Can my parent try a short stay first?",
        a: "Ask us about short stays. We will explain what is available.",
      },
    ],
  },
  {
    to: "/elderly-care",
    title: "Elderly Care",
    blurb: "Dignified daily support for older loved ones",
    summary: "Medical care and daily support for older adults, and help for their families.",
    icon: HeartPulse,
    image: elderlyWheelchair,
    includes: [
      "General medical and surgical care",
      "Incontinence and neurological support",
      "Stabilization and daily living assistance",
    ],
    intro: [
      "Our elderly care helps older adults live safely at home, with their family close by.",
      "It combines medical care with help with daily living, and we help families plan as needs change.",
    ],
    whoFor: [
      "Older adults living with frailty or reduced mobility",
      "People living with dementia, stroke or Parkinson's",
      "Older adults with continence needs or complex medication",
      "Families caring for a parent or grandparent",
    ],
    details: [
      { title: "Medical and surgical care", text: "Doctor-led care for health conditions common in later life." },
      { title: "Neurological support", text: "Care for people living with stroke, dementia or Parkinson's." },
      { title: "Continence care", text: "Discreet, respectful support that protects comfort and skin." },
      { title: "Daily living assistance", text: "Help with washing, dressing, meals and getting around." },
      { title: "Safe mobility", text: "Support to move safely around the home and reduce the risk of falls." },
      { title: "Routine and companionship", text: "The same carers and a regular daily routine." },
    ],
    settings: ["home"],
    faqs: [
      {
        q: "Can you care for someone living with dementia?",
        a: "Yes. Our team supports people living with dementia with patience and routine, and guides families on what to expect as needs change.",
      },
      {
        q: "Can care increase as my parent's needs change?",
        a: "Yes. We review the care plan regularly and change it with you, from occasional visits up to live-in support.",
      },
    ],
  },
  {
    to: "/hospital-to-home",
    title: "Hospital to Home",
    blurb: "Skilled nursing after discharge or surgery",
    summary: "Skilled nursing that makes the move from hospital to home safe and smooth.",
    icon: Syringe,
    image: ambulanceTransfer,
    includes: [
      "Post-surgery and chronic illness care",
      "Wound, tracheostomy and colostomy care",
      "NGT/PEG nutrition therapy",
    ],
    intro: [
      "Our hospital-to-home service gives you skilled nursing at home after a hospital stay, following a plan agreed with your doctors.",
      "We can start planning before discharge, so care is ready when you arrive home.",
    ],
    whoFor: [
      "People going home after surgery",
      "People leaving hospital after a serious or long-term illness",
      "People with a tracheostomy, colostomy, feeding tube or complex wound",
      "Families who need training to care confidently at home",
    ],
    details: [
      { title: "Post-operative care", text: "Monitoring, pain relief and support through recovery." },
      { title: "Wound care", text: "Dressings and wound checks by experienced nurses." },
      { title: "Tracheostomy and colostomy care", text: "Skilled, hygienic care for stomas and airways." },
      { title: "NGT/PEG nutrition therapy", text: "Safe tube feeding and nutrition support." },
      { title: "Medication management", text: "Making sure medicines are taken correctly and on time." },
      { title: "Family coordination", text: "Keeping your family and your doctors informed and involved." },
    ],
    settings: ["home"],
    faqs: [
      {
        q: "Do I have to be discharged from Tannjes Clinics?",
        a: "No. Tell us where you are being discharged from and we will coordinate with the team there.",
      },
      {
        q: "When should we contact you?",
        a: "As early as possible, ideally before discharge, so care can start as soon as you get home.",
      },
    ],
  },
  {
    to: "/medical-concierge",
    title: "Medical Concierge",
    blurb: "Doctors at home, hotel or work, and medical escort",
    summary: "Doctor visits at home, in your hotel or at work, and medical escort by land or air.",
    icon: BriefcaseMedical,
    image: conciergeAir,
    includes: [
      "Home, office and hotel doctor visits",
      "Land and air medical escort",
      "Routine screening referrals",
    ],
    intro: [
      "Our medical concierge sends a doctor to your home, hotel or workplace anywhere in Abuja, day or night.",
      "We also arrange safe medical escort by land or air, and coordinate with our network of partner hospitals.",
    ],
    whoFor: [
      "Busy professionals and executives",
      "Visitors and travellers staying in Abuja",
      "People who find it hard to travel to a clinic",
      "Patients who need to travel safely for treatment",
    ],
    details: [
      { title: "Doctor visits", text: "Personalised consultations at home, in your hotel or at the office." },
      { title: "Screening and referrals", text: "Routine screening referrals and follow-up, arranged for you." },
      { title: "Lifestyle and nutrition advice", text: "Practical counselling to help you stay well." },
      { title: "Medical escort", text: "Safe, professional medical travel by land or air." },
      { title: "Medical evacuation support", text: "Coordination when someone needs to move quickly for treatment." },
      { title: "Partner hospitals", text: "A network of partner hospitals across Nigeria." },
    ],
    settings: ["anywhere"],
    faqs: [
      {
        q: "Can a doctor come to my hotel or office?",
        a: "Yes. Our doctors visit homes, hotels and workplaces anywhere in Abuja, day or night.",
      },
      {
        q: "Can you arrange travel to another hospital?",
        a: "Yes. We arrange medical escort by land or air and coordinate with the receiving hospital.",
      },
    ],
  },
];
