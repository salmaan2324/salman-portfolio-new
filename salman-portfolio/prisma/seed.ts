import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  {
    name: "Network Infrastructure",
    slug: "network-infrastructure",
    skills: ["Network switch installation", "Router installation and configuration", "LAN network configuration", "Structured Ethernet cabling", "Internet distribution to multiple computers", "Network troubleshooting and maintenance", "Office and bank network infrastructure installation", "Server-room and networking equipment setup"],
  },
  {
    name: "CCTV and Security Systems",
    slug: "cctv-security-systems",
    skills: ["IP CCTV camera installation", "Analog CCTV camera installation", "DVR configuration", "NVR configuration", "CCTV monitoring systems", "Remote camera monitoring", "Fire alarm and detection systems installation", "Security systems troubleshooting and maintenance"],
  },
  {
    name: "Sales and Business Development",
    slug: "sales-business-development",
    skills: ["Sales operations management", "Product and service promotion", "Customer relationship management", "Finding potential customers", "Business opportunity identification", "Sales strategy development", "Business proposals and quotations", "Contract negotiation", "Bidding", "Market research", "Business development"],
  },
  {
    name: "Graphic Design",
    slug: "graphic-design",
    skills: ["Adobe Photoshop", "Promotional poster design", "Social media graphics", "Product advertising banners", "Business flyers", "Marketing materials", "Photo editing", "Image manipulation", "Brand identity and visual communication"],
  },
  {
    name: "E-commerce and Digital Marketing",
    slug: "ecommerce-digital-marketing",
    skills: ["Online store management", "Product uploading", "Product image management", "Product descriptions and pricing", "Facebook business page management", "Instagram business page management", "Online product promotion", "Digital marketing campaigns", "Customer communication", "Order management", "Product catalog management"],
  },
  {
    name: "General ICT",
    slug: "general-ict",
    skills: ["Computer skills", "Basic ICT support", "Hardware and software troubleshooting", "Database management coursework", "Network administration coursework", "Technical support"],
  },
];

const experiences = [
  {
    title: "Sales Manager",
    company: "ISRC Construction & Contracting Company.",
    location: "Burao",
    startDate: new Date("2024-02-01T00:00:00.000Z"),
    isCurrent: true,
    isTrainee: false,
    sortOrder: 0,
    responsibilities: [
      "Built and maintained professional relationships with clients, developers and property owners.",
      "Supported contract discussions and clarified client requirements and project scope.",
      "Contributed to sales planning and promotion of construction services.",
      "Coordinated with technical and project teams.",
      "Assisted with proposals, cost estimates and client presentations.",
      "Monitored local market trends.",
      "Identified potential business opportunities.",
    ] as Prisma.InputJsonValue,
  },
  {
    title: "Network Technician Trainee",
    company: "Dahabshiil Group (Bluekom Telecommunication Company).",
    location: "Burao",
    startDate: new Date("2023-08-01T00:00:00.000Z"),
    endDate: new Date("2023-12-01T00:00:00.000Z"),
    isCurrent: false,
    isTrainee: true,
    sortOrder: 1,
    responsibilities: [
      "Assisted with home and office internet installation.",
      "Installed and configured network equipment under supervision.",
      "Supported server-room operations and basic maintenance.",
      "Assisted senior technicians with field installations.",
      "Participated in cable setup and connectivity checks.",
      "Developed troubleshooting and customer-support skills.",
    ] as Prisma.InputJsonValue,
  },
  {
    title: "Online Marketer",
    company: "Haqabtire Technology.",
    location: "Burao",
    startDate: new Date("2022-03-01T00:00:00.000Z"),
    endDate: new Date("2023-07-01T00:00:00.000Z"),
    isCurrent: false,
    isTrainee: false,
    sortOrder: 2,
    responsibilities: [
      "Managed company social media channels.",
      "Updated online product information.",
      "Created promotional graphics using Adobe Photoshop.",
      "Supported digital marketing campaigns.",
      "Promoted electronics and technology products.",
      "Responded to customer inquiries.",
      "Maintained consistent brand presentation.",
    ] as Prisma.InputJsonValue,
  },
];

async function main() {
  for (const [index, category] of categories.entries()) {
    const savedCategory = await prisma.skillCategory.upsert({
      where: { slug: category.slug },
      update: { name: category.name, sortOrder: index },
      create: { name: category.name, slug: category.slug, sortOrder: index },
    });

    for (const [skillOrder, name] of category.skills.entries()) {
      await prisma.skill.upsert({
        where: { categoryId_name: { categoryId: savedCategory.id, name } },
        update: { sortOrder: skillOrder },
        create: { categoryId: savedCategory.id, name, sortOrder: skillOrder },
      });
    }
  }

  for (const experience of experiences) {
    const { responsibilities, ...fields } = experience;
    await prisma.experience.upsert({
      where: { id: `verified-${experience.sortOrder}` },
      update: { ...fields, responsibilities },
      create: { id: `verified-${experience.sortOrder}`, ...fields, responsibilities },
    });
  }

  await prisma.education.upsert({
    where: { id: "verified-ict-degree" },
    update: {},
    create: {
      id: "verified-ict-degree",
      degree: "Bachelor of Science in Information and Communications Technology (ICT)",
      institution: "University of Burao",
      location: "Burao",
      startDate: new Date("2017-10-01T00:00:00.000Z"),
      endDate: new Date("2021-09-01T00:00:00.000Z"),
      sortOrder: 0,
    },
  });

  await prisma.siteSettings.upsert({
    where: { id: "site" },
    update: {},
    create: {
      id: "site",
      fullName: "Salman Abdikarim Hussein",
      headline: "IT & Network Infrastructure Specialist | Business Development Professional",
      biography: "Motivated and adaptable ICT graduate with experience across sales, digital marketing, customer relationship management, graphic design and technical support. Experienced in supporting online promotion, managing social media channels, communicating with clients and coordinating sales and contracting activities. Strong problem-solving, organization, communication and teamwork skills.",
      email: "Hzalmaan@gmail.com",
      phonePrimary: "+252 634877968",
      phoneSecondary: "+252 659112232",
      city: "Burao",
      country: "Somalia",
      siteTitle: "Salman Abdikarim Hussein | ICT & Network Infrastructure",
      siteDescription: "ICT graduate with practical capabilities in network infrastructure, security systems, business development and digital commerce.",
    },
  });

  await prisma.socialLink.upsert({
    where: { name: "GitHub" },
    update: { url: "https://github.com/salmaan2324", isVisible: true },
    create: { name: "GitHub", url: "https://github.com/salmaan2324", sortOrder: 0 },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exitCode = 1;
  });