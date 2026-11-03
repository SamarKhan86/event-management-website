/**
 * WAYFARER event catalogue.
 * Official classifications stay in `category`; homepage discovery uses
 * `discoveryCategory` so broad browsing does not alter source information.
 */
export const discoveryCategories = [
  "Technology & Innovation", "Arts & Culture", "Gaming & Interactive",
  "Music & Performance", "Society & Humanities"
];

export const events = [
  {
    id: "icamme-2026", title: "International Conference on Advanced Materials and Manufacturing Engineering (ICAMME 2026)", displayTitle: "ICAMME 2026",
    category: "Technology & Engineering", discoveryCategory: "Technology & Innovation",
    date: "2026-12-04", endDate: "2026-12-05", startTime: "08:00", endTime: "18:00", venue: "Campus-6 Auditorium, KIIT",
    image: "assets/images/events/icamme-2026.jpg",
    shortDescription: "Researchers and industry specialists explore advanced materials and modern manufacturing.",
    description: "An international conference on advanced materials and manufacturing engineering, hosted by the School of Mechanical Engineering at KIIT Deemed to be University. The event unites researchers, academicians, and industry specialists across materials science, green manufacturing, computational modelling, and precision manufacturing. Features keynote lectures from international researchers and peer-reviewed technical sessions.",
    featured: true, registrationOpen: true, sourceType: "kiit-verified", sourceUrl: "https://kiit.ac.in/event/international-conference-on-advanced-materials-and-manufacturing-engineering/"
  },
  {
    id: "iihtc-2026", title: "International Conference on Innovations in Technology for Humanity (IIHTC 2026)", displayTitle: "IIHTC 2026",
    category: "Technology & Society", discoveryCategory: "Technology & Innovation",
    date: "2026-12-17", endDate: "2027-02-19", startTime: "09:00", endTime: "17:30", venue: "Campus-6 Auditorium, KIIT",
    image: "assets/images/events/iihtc-2026.jpg",
    shortDescription: "Technology-led ideas for equitable education, sustainability, health, and communities.",
    description: "A premier global conference uniting technological innovation and humanitarian action, focusing on underserved communities and the Indic context. Core themes include poverty alleviation, equitable educational technology access, cultural preservation, sustainable resource distribution, and healthcare technologies.",
    featured: false, registrationOpen: true, sourceType: "kiit-verified", sourceUrl: "https://kiit.ac.in/event/international-conference-on-innovations-in-technology-for-humanity-iihtc-2026/"
  },
  {
    id: "dharti-2026", title: "DHARTI 2026 – Decolonising the Digital: Social Justice, Inclusion, and Equitable Knowledge Production", displayTitle: "DHARTI 2026",
    category: "Digital Humanities", discoveryCategory: "Society & Humanities",
    date: "2026-12-18", endDate: "2026-12-20", startTime: "08:00", endTime: "18:30", venue: "Campus-3 Auditorium, KIIT",
    image: "assets/images/events/dharti-2026.jpeg",
    shortDescription: "A digital-humanities conference on equity, multilingual archives, and knowledge production.",
    description: "The biennial conference of the Digital Humanities Alliance for Research and Teaching Innovations (DHARTI), hosted by the School of Liberal Studies at KIIT. The conference critically examines how digital technologies intersect with social justice, multilingual archives, indigenous heritage preservation, and equitable knowledge production.",
    featured: false, registrationOpen: true, sourceType: "kiit-verified", sourceUrl: "https://kiit.ac.in/event/dharti-2026-decolonising-the-digital-social-justice-inclusion-and-equitable-knowledge-production/"
  },
  {
    id: "all-india-sociological-conference-2026", title: "51st All India Sociological Conference", displayTitle: "51st All India Sociological Conference",
    category: "Social Sciences", discoveryCategory: "Society & Humanities",
    date: "2026-12-27", endDate: "2026-12-29", startTime: "08:00", endTime: "19:00", venue: "Campus-3 Auditorium, KIIT",
    image: "assets/images/events/all-india-sociological-conference-2026.jpeg",
    shortDescription: "National conversations on culture, region, pedagogy, and the future of Indian sociology.",
    description: "The flagship annual conference of the Indian Sociological Society (ISS) celebrated during its Platinum Jubilee Year. Themed 'Culture, Region and Pedagogy: Exploring the Future of Indian Sociology', organized by the Department of Sociology, School of Liberal Studies, KIIT. Bringing together scholars and students to discuss contemporary cultural transformations and sociology education in India.",
    featured: false, registrationOpen: true, sourceType: "kiit-verified", sourceUrl: "https://kiit.ac.in/event/51st-all-india-sociological-conference/"
  }
];
