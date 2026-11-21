"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Award,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  Camera,
  CheckCircle2,
  FileImage,
  Globe,
  GraduationCap,
  Handshake,
  Layers,
  Mail,
  MapPin,
  Megaphone,
  Menu,
  Network,
  Palette,
  Phone,
  Printer,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

const navigation = [
  ["Summary", "about"],
  ["Core Roles", "roles"],
  ["Portfolio & Visuals", "showcase"],
  ["Expertise", "expertise"],
  ["Experience", "experience"],
  ["Education", "education"],
] as const;

// Xogta rasmiga ah ee CV-ga (Hardcoded / Static - aan la bed-beddeli karin haddii aan koodhka la gelin)
const profile = {
  fullName: "Salman Abdikarim Hussein",
  headline: "Sales Manager · Business Manager · ICT & Digital Commerce Specialist",
  location: "Burao, Somalia",
  email: "Hzalmaan@gmail.com",
  phonePrimary: "+252 634877968",
  phoneSecondary: "+252 659112232",
  portraitUrl: "/images/salman-profile.jpg",
  biography:
    "Motivated and adaptable ICT graduate with proven leadership and hands-on experience across sales management, business operations, digital marketing, customer relationship management, graphic design, and technical infrastructure. Experienced in driving revenue growth, managing client and developer relations, leading promotional campaigns, and coordinating business and contracting operations.",
  focusStatement:
    "Focused on leading sales and business growth initiatives while leveraging practical capabilities in Marketing, E-commerce, Graphic Design, and CCTV & Security Systems.",
};

const leadershipPillars = [
  {
    code: "01",
    title: "Sales Manager",
    subtitle: "Revenue Growth & Client Acquisition",
    description:
      "Leading sales operations, building strategic relationships with property owners, developers, and corporate clients, preparing quotations and proposals, and closing high-value contracts.",
    highlights: ["Sales Strategy & Planning", "Contract Negotiation & Bidding", "Client & Key Account Management"],
    icon: TrendingUp,
  },
  {
    code: "02",
    title: "Business Manager",
    subtitle: "Operations, Strategy & Market Expansion",
    description:
      "Overseeing business development, coordinating cross-functional technical and project teams, analyzing local market trends, and turning commercial opportunities into sustainable growth.",
    highlights: ["Business Operations & Coordination", "Market Research & Expansion", "Commercial Proposals & Costing"],
    icon: BriefcaseBusiness,
  },
];

// Qaybta Bandhigga Xirfadaha & Sawirrada (Kaliya xirfadahaaga - ma jiro wax GitHub/VS Code ah)
// Hadhow markaad sawirro cusub ku darayso, geli galka public/images/ ka dibna magaca sawirka halkan ku qor (tusaale: "/images/marketing-1.jpg")
const showcaseCategories = [
  "All",
  "Marketing",
  "CCTV & Security",
  "Graphic Design",
  "E-commerce",
] as const;

type ShowcaseItem = {
  id: string;
  category: (typeof showcaseCategories)[number];
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string | null; // Marka aad sawir geliso public/images/, ku qor "/images/magaca-sawirka.jpg"
  deliverables: string[];
};

const visualShowcase: ShowcaseItem[] = [
  {
    id: "marketing-campaigns",
    category: "Marketing",
    title: "Digital & Field Marketing Campaigns",
    subtitle: "Brand Visibility & Lead Generation",
    description:
      "Strategic product and service promotion across social media and local markets to attract customers, boost brand awareness, and drive measurable sales inquiries.",
    imageUrl: null,
    deliverables: ["Social Media Campaigns", "Brand Positioning", "Customer Acquisition"],
  },
  {
    id: "cctv-security",
    category: "CCTV & Security",
    title: "CCTV Surveillance & Security Installations",
    subtitle: "IP/Analog Cameras, DVR/NVR & Remote Access",
    description:
      "End-to-end deployment of IP and analog surveillance systems, DVR/NVR configuration, structured cabling, and mobile remote monitoring for offices and commercial sites.",
    imageUrl: null,
    deliverables: ["IP & Analog CCTV", "DVR / NVR Setup", "Remote Monitoring"],
  },
  {
    id: "graphic-design",
    category: "Graphic Design",
    title: "Commercial Branding & Promotional Posters",
    subtitle: "Adobe Photoshop · Flyers · Social Banners",
    description:
      "High-impact visual communication including promotional posters, product advertising banners, corporate flyers, and cohesive social media visual kits.",
    imageUrl: null,
    deliverables: ["Adobe Photoshop", "Advertising Banners", "Corporate Flyers"],
  },
  {
    id: "ecommerce-ops",
    category: "E-commerce",
    title: "E-commerce Store & Catalog Management",
    subtitle: "Online Storefronts, Pricing & Order Fulfillment",
    description:
      "Complete management of online product catalogs, Facebook & Instagram business shops, compelling product descriptions, pricing updates, and customer order coordination.",
    imageUrl: null,
    deliverables: ["Product Catalogs", "FB & IG Business Shops", "Order Management"],
  },
];

const skillDomains = [
  {
    number: "01",
    title: "Sales & Business Management",
    icon: Building2,
    skills: [
      "Sales operations management",
      "Business management & coordination",
      "Sales strategy development",
      "Business proposals & quotations",
      "Contract negotiation & bidding",
      "Customer relationship management (CRM)",
      "Market research & opportunity identification",
      "Client presentations & cost estimates",
    ],
  },
  {
    number: "02",
    title: "Marketing & E-commerce",
    icon: Megaphone,
    skills: [
      "Digital marketing campaigns",
      "Online product & service promotion",
      "Online store & catalog management",
      "Facebook & Instagram business pages",
      "Product uploading, descriptions & pricing",
      "Customer communication & inquiry handling",
      "Order management & fulfillment tracking",
      "Brand presentation & market positioning",
    ],
  },
  {
    number: "03",
    title: "Graphic Design & Visual Media",
    icon: Palette,
    skills: [
      "Adobe Photoshop",
      "Promotional poster design",
      "Social media graphics",
      "Product advertising banners",
      "Business flyers & brochures",
      "Photo editing & image manipulation",
      "Brand identity & visual communication",
    ],
  },
  {
    number: "04",
    title: "CCTV, Security & ICT Infrastructure",
    icon: ShieldCheck,
    skills: [
      "IP & Analog CCTV camera installation",
      "DVR & NVR configuration & remote monitoring",
      "Fire alarm & detection systems installation",
      "Network switch & router configuration",
      "LAN setup & structured Ethernet cabling",
      "Hardware, software & network troubleshooting",
      "Server-room & office ICT support",
    ],
  },
];

// Xogtaadii hore ee shaqooyinka (sidii ay ahayd - waxba lagama beddelin)
const workHistory = [
  {
    title: "Sales Manager",
    company: "ISRC Construction & Contracting Company.",
    dates: "February 2024 – Present",
    location: "Burao",
    badge: "Current Role",
    responsibilities: [
      "Built and maintained professional relationships with clients, developers and property owners.",
      "Supported contract discussions and clarified client requirements and project scope.",
      "Contributed to sales planning and promotion of construction services.",
      "Coordinated with technical and project teams.",
      "Assisted with proposals, cost estimates and client presentations.",
      "Monitored local market trends.",
      "Identified potential business opportunities.",
    ],
  },
  {
    title: "Network Technician Trainee",
    company: "Dahabshiil Group (Bluekom Telecommunication Company).",
    dates: "August 2023 – December 2023",
    location: "Burao",
    badge: "Telecom & Networks",
    responsibilities: [
      "Assisted with home and office internet installation.",
      "Installed and configured network equipment under supervision.",
      "Supported server-room operations and basic maintenance.",
      "Assisted senior technicians with field installations.",
      "Participated in cable setup and connectivity checks.",
      "Developed troubleshooting and customer-support skills.",
    ],
  },
  {
    title: "Online Marketer",
    company: "Haqabtire Technology.",
    dates: "March 2022 – July 2023",
    location: "Burao",
    badge: "Marketing & Design",
    responsibilities: [
      "Managed company social media channels.",
      "Updated online product information.",
      "Created promotional graphics using Adobe Photoshop.",
      "Supported digital marketing campaigns.",
      "Promoted electronics and technology products.",
      "Responded to customer inquiries.",
      "Maintained consistent brand presentation.",
    ],
  },
];

// Xogtaadii hore ee waxbarashada (sidii ay ahayd - waxba lagama beddelin)
const educationHistory = [
  {
    degree: "Bachelor of Science in Information and Communications Technology (ICT)",
    institution: "University of Burao",
    location: "Burao",
    dates: "October 2017 – September 2021",
  },
];

const languages = [
  { name: "Somali", level: "Native / Fluent" },
  { name: "English", level: "Professional Working" },
  { name: "Arabic", level: "Moderate" },
];

export default function PortfolioHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<(typeof showcaseCategories)[number]>("All");
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");

  const filteredShowcase =
    activeCategory === "All"
      ? visualShowcase
      : visualShowcase.filter((item) => item.category === activeCategory);

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setFormState("sending");
    setFormMessage("Sending your message...");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Your message could not be sent.");
      form.reset();
      setFormState("success");
      setFormMessage("Thank you. Your message has been sent directly to Salman.");
    } catch (error) {
      setFormState("error");
      setFormMessage(error instanceof Error ? error.message : "Unable to send your message. Please try again.");
    }
  }

  return (
    <div className="cv-shell">
      {/* Top Executive Navigation */}
      <header className="cv-header no-print">
        <div className="container header-inner">
          <a className="brand" href="#home" aria-label={`${profile.fullName} CV`}>
            <span className="brand-mark">
              <Image src={profile.portraitUrl} alt="" width={38} height={38} priority />
            </span>
            <span>
              <span className="brand-name">{profile.fullName}</span>
              <span className="brand-role">CURRICULUM VITAE · EXECUTIVE PORTFOLIO</span>
            </span>
          </a>

          <nav aria-label="Primary navigation">
            <ul className="nav-list" data-open={menuOpen}>
              {navigation.map(([label, id]) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={() => setMenuOpen(false)}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="btn-print"
              onClick={() => window.print()}
              title="Print or Save CV as PDF"
            >
              <Printer size={14} />
              <span>Print CV</span>
            </button>
            <a className="nav-contact" href="#contact">
              Contact <ArrowUpRight size={14} />
            </a>
          </div>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      <main>
        {/* Executive CV Hero Section */}
        <section className="cv-hero" id="home">
          <div className="container">
            <div className="hero-card">
              <div className="hero-content reveal">
                <div className="cv-badge-row">
                  <span className="cv-status-pill">
                    <i /> Curriculum Vitae &amp; Portfolio
                  </span>
                  <span className="cv-location-pill">
                    <MapPin size={12} /> {profile.location}
                  </span>
                </div>

                <h1>
                  {profile.fullName}
                  <span>Executive Profile &amp; Visual Portfolio</span>
                </h1>

                <p className="hero-headline">{profile.headline}</p>
                <p className="hero-lede">{profile.biography}</p>

                <div className="hero-role-tags">
                  <span>Sales Manager</span>
                  <span>Business Manager</span>
                  <span>Marketing</span>
                  <span>CCTV &amp; Security</span>
                  <span>Graphic Design</span>
                  <span>E-commerce</span>
                </div>

                <div className="hero-actions no-print">
                  <a className="button button-primary" href="/api/cv" download>
                    <ArrowDownToLine size={15} /> Download Official CV
                  </a>
                  <button
                    type="button"
                    className="button button-quiet"
                    onClick={() => window.print()}
                  >
                    <Printer size={15} /> Print / Save PDF
                  </button>
                  <a className="button button-ghost" href="#showcase">
                    Visual Work <ArrowUpRight size={15} />
                  </a>
                </div>

                <div className="hero-contact-strip">
                  <a href={`mailto:${profile.email}`}>
                    <Mail size={14} /> {profile.email}
                  </a>
                  <span className="dot" />
                  <a href={`tel:${profile.phonePrimary.replace(/[^+\d]/g, "")}`}>
                    <Phone size={14} /> {profile.phonePrimary}
                  </a>
                  <span className="dot" />
                  <a href={`tel:${profile.phoneSecondary.replace(/[^+\d]/g, "")}`}>
                    <Phone size={14} /> {profile.phoneSecondary}
                  </a>
                </div>
              </div>

              <div className="hero-portrait-col reveal reveal-delay">
                <div className="portrait-card">
                  <div className="portrait-frame">
                    <Image
                      className="portrait-image"
                      src={profile.portraitUrl}
                      alt={`Portrait of ${profile.fullName}`}
                      width={900}
                      height={1125}
                      priority
                      sizes="(max-width: 768px) 80vw, 340px"
                    />
                  </div>
                  <div className="portrait-meta">
                    <div>
                      <strong>{profile.fullName}</strong>
                      <span>BSc in ICT · University of Burao</span>
                    </div>
                    <span className="verified-tag">
                      <CheckCircle2 size={13} /> Verified CV
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 01 / Executive Summary */}
        <section className="section" id="about">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="section-kicker">01 / Executive Summary</p>
                <h2 className="section-title">Commercial Leadership &amp; Technical Execution</h2>
              </div>
              <p className="section-note">
                Combining business management and sales leadership with practical digital, visual, and security systems expertise.
              </p>
            </div>

            <div className="summary-grid">
              <div className="summary-box">
                <p>{profile.biography}</p>
                <p className="summary-highlight">
                  <strong>Core Objective:</strong> {profile.focusStatement}
                </p>
              </div>

              <div className="facts-grid">
                <div className="fact-card">
                  <span className="fact-label">Primary Roles</span>
                  <span className="fact-value">Sales &amp; Business Manager</span>
                </div>
                <div className="fact-card">
                  <span className="fact-label">Academic Degree</span>
                  <span className="fact-value">BSc in ICT (2017 – 2021)</span>
                </div>
                <div className="fact-card">
                  <span className="fact-label">Location</span>
                  <span className="fact-value">{profile.location}</span>
                </div>
                <div className="fact-card">
                  <span className="fact-label">Languages</span>
                  <span className="fact-value">Somali · English · Arabic</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02 / Leadership & Management Pillars (Sales Manager & Business Manager) */}
        <section className="section section-alt" id="roles">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="section-kicker">02 / Leadership &amp; Management</p>
                <h2 className="section-title">Sales &amp; Business Management</h2>
              </div>
              <p className="section-note">
                Driving commercial growth, client trust, and operational coordination across projects and business ventures.
              </p>
            </div>

            <div className="pillars-grid">
              {leadershipPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <article className="pillar-card" key={pillar.code}>
                    <div className="pillar-top">
                      <span className="pillar-icon">
                        <Icon size={20} />
                      </span>
                      <span className="pillar-code">ROLE / {pillar.code}</span>
                    </div>
                    <h3>{pillar.title}</h3>
                    <p className="pillar-subtitle">{pillar.subtitle}</p>
                    <p className="pillar-desc">{pillar.description}</p>
                    <div className="pillar-tags">
                      {pillar.highlights.map((item) => (
                        <span key={item}>
                          <CheckCircle2 size={12} /> {item}
                        </span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 03 / Visual & Practical Showcase (Marketing, CCTV, Graphic Design, E-commerce) */}
        <section className="section" id="showcase">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="section-kicker">03 / Visual &amp; Practical Work</p>
                <h2 className="section-title">Skills &amp; Visual Portfolio</h2>
              </div>
              <p className="section-note">
                Practical work across Marketing, CCTV &amp; Security Systems, Graphic Design, and E-commerce operations.
              </p>
            </div>

            <div className="showcase-toolbar no-print">
              <div className="filter-list" role="group" aria-label="Filter visual skills">
                {showcaseCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className="filter-button"
                    aria-pressed={activeCategory === category}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <span className="showcase-count">
                {filteredShowcase.length} {filteredShowcase.length === 1 ? "discipline" : "disciplines"}
              </span>
            </div>

            <div className="showcase-grid">
              {filteredShowcase.map((item) => (
                <article className="showcase-card" key={item.id}>
                  <div className="showcase-media">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={720}
                        height={440}
                        className="showcase-img"
                      />
                    ) : (
                      <div className="showcase-visual-placeholder">
                        <div className="visual-badge">
                          {item.category === "Marketing" && <Megaphone size={22} />}
                          {item.category === "CCTV & Security" && <Camera size={22} />}
                          {item.category === "Graphic Design" && <FileImage size={22} />}
                          {item.category === "E-commerce" && <ShoppingBag size={22} />}
                        </div>
                        <span className="visual-cat-label">{item.category}</span>
                        <p>Visual Portfolio Frame · Ready for {item.category} Samples</p>
                      </div>
                    )}
                    <span className="showcase-tag">{item.category}</span>
                  </div>

                  <div className="showcase-body">
                    <span className="showcase-sub">{item.subtitle}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="showcase-deliverables">
                      {item.deliverables.map((del) => (
                        <span key={del}>{del}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 04 / Core Competencies Matrix */}
        <section className="section section-alt" id="expertise">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="section-kicker">04 / Core Competencies</p>
                <h2 className="section-title">Professional Skills Matrix</h2>
              </div>
              <p className="section-note">
                Structured overview of commercial, marketing, design, and technical capabilities.
              </p>
            </div>

            <div className="domains-grid">
              {skillDomains.map((domain) => {
                const Icon = domain.icon;
                return (
                  <article className="domain-card" key={domain.number}>
                    <div className="domain-head">
                      <span className="domain-icon">
                        <Icon size={18} />
                      </span>
                      <div>
                        <span className="domain-num">DOMAIN {domain.number}</span>
                        <h3>{domain.title}</h3>
                      </div>
                    </div>
                    <ul className="domain-skills">
                      {domain.skills.map((skill) => (
                        <li key={skill}>
                          <CheckCircle2 size={13} />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 05 / Work Experience (Xogtaadii hore oo aan waxba laga beddelin) */}
        <section className="section" id="experience">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="section-kicker">05 / Career History</p>
                <h2 className="section-title">Work Experience</h2>
              </div>
              <p className="section-note">
                Verified employment history, roles, and responsibilities.
              </p>
            </div>

            <div className="cv-timeline">
              {workHistory.map((role, index) => (
                <article className="cv-role-card" key={`${role.company}-${role.title}`}>
                  <div className="cv-role-header">
                    <div>
                      <div className="cv-role-title-row">
                        <h3>{role.title}</h3>
                        <span className="role-badge">{role.badge}</span>
                      </div>
                      <p className="cv-role-company">
                        {role.company} <span>· {role.location}</span>
                      </p>
                    </div>
                    <span className="cv-role-dates">{role.dates}</span>
                  </div>

                  <ul className="cv-role-list">
                    {role.responsibilities.map((item) => (
                      <li key={`${index}-${item}`}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 06 / Education & Languages (Xogtaadii hore oo aan waxba laga beddelin) */}
        <section className="section section-alt" id="education">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="section-kicker">06 / Academic Background</p>
                <h2 className="section-title">Education &amp; Languages</h2>
              </div>
              <p className="section-note">
                Academic qualifications and language proficiency.
              </p>
            </div>

            <div className="edu-lang-grid">
              <div>
                {educationHistory.map((edu) => (
                  <div className="education-card" key={edu.degree}>
                    <span className="education-icon">
                      <GraduationCap size={22} />
                    </span>
                    <div className="education-details">
                      <span className="education-date">{edu.dates}</span>
                      <h3>{edu.degree}</h3>
                      <p>
                        {edu.institution} · {edu.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="languages-card">
                <h3>
                  <Globe size={16} /> Languages
                </h3>
                <div className="language-list">
                  {languages.map((lang) => (
                    <div className="language-item" key={lang.name}>
                      <strong>{lang.name}</strong>
                      <span>{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 07 / Direct Contact */}
        <section className="section contact-section no-print" id="contact">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="section-kicker">07 / Direct Contact</p>
                <h2 className="section-title">Get in Touch</h2>
              </div>
              <p className="section-note">
                Available for leadership roles in Sales Management, Business Management, Marketing, E-commerce, and ICT Operations.
              </p>
            </div>

            <div className="contact-grid">
              <div className="contact-info-card">
                <h3>Contact Information</h3>
                <p>
                  Reach out directly via phone or email, or leave a message using the form.
                </p>
                <div className="contact-links">
                  <a className="contact-link" href={`mailto:${profile.email}`}>
                    <Mail size={16} />
                    <div>
                      <span>Email</span>
                      <strong>{profile.email}</strong>
                    </div>
                  </a>
                  <a className="contact-link" href={`tel:${profile.phonePrimary.replace(/[^+\d]/g, "")}`}>
                    <Phone size={16} />
                    <div>
                      <span>Primary Phone</span>
                      <strong>{profile.phonePrimary}</strong>
                    </div>
                  </a>
                  <a className="contact-link" href={`tel:${profile.phoneSecondary.replace(/[^+\d]/g, "")}`}>
                    <Phone size={16} />
                    <div>
                      <span>Secondary Phone</span>
                      <strong>{profile.phoneSecondary}</strong>
                    </div>
                  </a>
                  <div className="contact-link">
                    <MapPin size={16} />
                    <div>
                      <span>Location</span>
                      <strong>{profile.location}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <form className="contact-form" onSubmit={submitContact}>
                <div className="field">
                  <label htmlFor="fullName">Full name</label>
                  <input
                    id="fullName"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name or organization"
                    required
                    minLength={2}
                    maxLength={100}
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    required
                    maxLength={254}
                  />
                </div>
                <div className="field field-wide">
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    placeholder="Sales Management, Business Inquiry, or Project"
                    required
                    minLength={3}
                    maxLength={160}
                  />
                </div>
                <div className="field field-wide">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Write your message here..."
                    required
                    minLength={10}
                    maxLength={5000}
                  />
                </div>
                <div className="form-bottom">
                  <p className="form-note" role="status" aria-live="polite" data-state={formState}>
                    {formMessage}
                  </p>
                  <button className="button button-primary" type="submit" disabled={formState === "sending"}>
                    {formState === "sending" ? "Sending..." : "Send Message"} <Send size={14} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="cv-footer">
        <div className="container footer-inner">
          <span>
            © {new Date().getFullYear()} {profile.fullName} · Curriculum Vitae &amp; Executive Portfolio
          </span>
          <div className="footer-links no-print">
            <a href="#home">Top ↑</a>
            <a href="#experience">Experience</a>
            <a href="#showcase">Visual Work</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
