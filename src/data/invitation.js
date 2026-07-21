// Single source of truth — all copy extracted verbatim from the invitation document.
// Do not alter names, dates, venues, timings, or wording here.

export const invitation = {
  invocation: {
    sanskrit: "\u0950 \u0936\u094d\u0930\u0940 \u0917\u0923\u0947\u0936\u093e\u092f \u0928\u092e\u0903", // ॐ श्री गणेशाय नमः
    label: "Wedding Invitation",
  },

  couple: {
    bride: "Diya",
    groom: "Abhishek",
    tagline: "Diya Weds Abhishek",
    subtitle: "A beginning of forever",
    initials: "D & A",
  },

  weddingDate: {
    display: "1st March 2027",
    day: "1",
    ordinal: "st",
    month: "March",
    year: "2027",
    weekday: "Monday",
    // ISO used for countdown calculations, derived from "Monday 1st March 2027, 7:00 PM"
    iso: "2027-03-01T19:00:00+05:30",
  },

  shlok: {
    lines: [
      "\u0935\u0915\u094d\u0930\u0924\u0941\u0923\u094d\u0921 \u092e\u0939\u093e\u0915\u093e\u092f \u0938\u0942\u0930\u094d\u092f\u0915\u094b\u091f\u093f \u0938\u092e\u092a\u094d\u0930\u092d \u0964",
      "\u0928\u093f\u0930\u094d\u0935\u093f\u0918\u094d\u0928\u0902 \u0915\u0941\u0930\u0941 \u092e\u0947 \u0926\u0947\u0935 \u0938\u0930\u094d\u0935\u0915\u093e\u0930\u094d\u092f\u0947\u0937\u0941 \u0938\u0930\u094d\u0935\u0926\u093e \u0965",
    ],
  },

  hosts: {
    invitationFrom: "A Cordial Invitation from",
    parents: "Dr. Sunanda Kakroo & Dr. Sushil Dohare",
    address: "B-112, Beta 1, Greater Noida, UP \u2013 201308",
    phones: ["8527936725", "8826318543"],
  },

  brideDetails: {
    intro:
      "Dr. Sunanda Kakroo and Dr. Sushil Dohare solicit your gracious presence and blessings at the auspicious wedding of their daughter and sister of Pranavi,",
    name: "Diya",
    lineage: "( Grand D/o Smt. Ram Murti & Shri R. D. Dohare and Late Smt. Usha & Shri R. K Kakroo )",
  },

  groomDetails: {
    connector: "With",
    name: "Abhishek",
    lineage: "S/o Smt Daisy and Shri Sanjay Verma",
  },

  weddingEvent: {
    title: "Wedding Ceremony",
    date: "Monday 1st March 2027",
    time: "7:00 PM Onwards",
    venueName: "The Wedding Planet",
    venueAddress:
      "behind Stellar Jeevan Society, Sector 1, Bisrakh Jalalpur, Greater Noida, Uttar Pradesh, 201318",
    mapsQuery:
      "The Wedding Planet, behind Stellar Jeevan Society, Sector 1, Bisrakh Jalalpur, Greater Noida, Uttar Pradesh, 201318",
  },

  preWeddingEvents: {
    date: "28 February, 2027",
    haldi: {
      title: "Haldi",
      time: "11.00 AM Onwards",
      description: "Let's drip in the turmeric tinge and pamper Diya With Hues of Haldi",
    },
    mehendi: {
      title: "Mehendi",
      time: "7.00 PM Onwards",
      description:
        "And as the sun sets... Let the colours of Mehendi take over, Bringing music, dance and endless celebration",
    },
    venueName: "Grand Heritage Resort",
    venueAddress: "R-4, Sector-20, Near City Park, Greater Noida - 201306",
    mapsQuery: "Grand Heritage Resort, R-4, Sector-20, Near City Park, Greater Noida - 201306",
  },

  rsvp: {
    title: "R.S.V.P",
    contacts: [
      { name: "Dr. Sushil Dohare", phone: "8527936725" },
      { name: "Dr. Sunanda Kakroo", phone: "8826318543" },
      { name: "Mr. Sandeep Kakroo", phone: "9867960657" },
      { name: "Ms. Pranavi Dohare", phone: "7982380142" },
      { name: "Mr. Dhruv Dohare", phone: "9968333600" },
    ],
  },

  compliments: {
    title: "With Best Compliments From:",
    names: [
      "Dr. & Dr. Sunil K Dohare,",
      "Mr. & Mrs. Sandeep Kakroo,",
      "Mr. & Mrs. Rajeev Kumar,",
      "Mr. & Mrs. Rajendra Singh",
    ],
  },

  specialInvitation: {
    title: "Special Invitation From:",
    names: [
      "Pranavi, Dhruv, Aaditya, Digvijay,",
      "Swarni & Avi, Aayushi & Vipul, Avani, Angela",
    ],
  },
};

export default invitation;
