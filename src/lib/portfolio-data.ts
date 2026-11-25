export const profile = {
  fullName: "Salman Abdikarim Hussein",
  shortName: "Salman A. Hussein",
  headline: "Sales Manager · Business Manager · ICT Specialist",
  location: "Burao, Somalia",
  email: "Hzalmaan@gmail.com",
  phonePrimary: "+252 634877968",
  phoneSecondary: "+252 659112232",
  portrait: "/images/salman-portrait.png",
  biography:
    "Motivated and adaptable ICT graduate with hands-on experience across sales management, business operations, digital marketing, customer relationships, graphic design, and technical infrastructure. Experienced in building client relationships, supporting commercial growth, and coordinating business and contracting operations.",
  focus:
    "Leading sales and business growth initiatives while applying practical strengths in marketing, e-commerce, graphic design, and CCTV and security systems.",
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Summary", href: "/summary" },
  { label: "Experience", href: "/experience" },
  { label: "Skills", href: "/skills" },
  { label: "Contact", href: "/contact" },
] as const;

export const experience = [
  {
    title: "Sales Manager",
    company: "ISRC Construction & Contracting Company",
    dates: "February 2024 – Present",
    location: "Burao",
    highlights: [
      "Built and maintained professional relationships with clients, developers, and property owners.",
      "Supported contract discussions and clarified client requirements and project scope.",
      "Contributed to sales planning and promotion of construction services.",
      "Coordinated with technical and project teams on proposals, estimates, and client presentations.",
    ],
  },
  {
    title: "Network Technician Trainee",
    company: "Dahabshiil Group (Bluekom Telecommunication Company)",
    dates: "August 2023 – December 2023",
    location: "Burao",
    highlights: [
      "Assisted with internet installation for homes and offices.",
      "Installed and configured network equipment under supervision.",
      "Supported server-room operations and basic maintenance.",
      "Assisted senior technicians with field installations and connectivity checks.",
    ],
  },
  {
    title: "Online Marketer",
    company: "Haqabtire Technology",
    dates: "March 2022 – July 2023",
    location: "Burao",
    highlights: [
      "Managed company social media channels and updated online product information.",
      "Created promotional graphics using Adobe Photoshop.",
      "Supported digital marketing campaigns for electronics and technology products.",
      "Responded to customer inquiries and maintained consistent brand presentation.",
    ],
  },
] as const;

export const skillDomains = [
  {
    title: "Sales & Business Management",
    skills: [
      "Sales operations and strategy",
      "Business management and coordination",
      "Proposals, quotations, and cost estimates",
      "Contract negotiation and bidding",
      "Customer relationship management",
      "Market research and opportunity identification",
    ],
  },
  {
    title: "Marketing & E-commerce",
    skills: [
      "Digital marketing campaigns",
      "Online product and service promotion",
      "Store and catalog management",
      "Facebook and Instagram business pages",
      "Product listings, descriptions, and pricing",
      "Customer communication and order coordination",
    ],
  },
  {
    title: "Graphic Design & Visual Media",
    skills: [
      "Adobe Photoshop",
      "Promotional posters and social graphics",
      "Product advertising banners",
      "Business flyers and brochures",
      "Photo editing and image manipulation",
      "Brand presentation and visual communication",
    ],
  },
  {
    title: "CCTV, Security & ICT",
    skills: [
      "IP and analog CCTV installation",
      "DVR/NVR configuration and remote monitoring",
      "Fire alarm and detection systems",
      "Network switch and router configuration",
      "LAN setup and structured cabling",
      "Hardware, software, and network troubleshooting",
    ],
  },
] as const;

export const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/salman-hussein-187287396",
    detail: "Professional profile",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/252634877968",
    detail: profile.phonePrimary,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/zalmn021",
    detail: "@zalmn021",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1A1vPxVEmP/",
    detail: "Facebook profile",
  },
] as const;
