import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  LabelList,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Binary,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Database,
  Euro,
  ExternalLink,
  FileText,
  Flag,
  Globe2,
  GraduationCap,
  Landmark,
  Languages,
  Layers3,
  Library,
  MapPin,
  MonitorSmartphone,
  Network,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";

const officialImages = {
  classroom:
    "https://scaling.spaggiari.eu/FIII0023/testo/5051.png%26rs%3D%2FtccTw2MgxYfdxRYmYOB6Pk9jQH5POS%2FquVc8aOi3ns2htM1BhF%2Fr5nAtRVDWvfTyMAZSK1CdbWaDHnglQjglAuFwI5cB%2FVmg%2FuX4At01ifvHVhzR520%2FYme%2BqShUDP%2B9Qj7hNmcQs3PUZ%2B9YD5vdA%3D%3D",
  lab:
    "https://scaling.spaggiari.eu/FIII0023/testo/5059.png%26rs%3D%2FtccTw2MgxYfdxRYmYOB6Pk9jQH5POS%2FquVc8aOi3ns2htM1BhF%2Fr5nAtRVDWvfTyMAZSK1CdbWaDHnglQjglAuFwI5cB%2FVmg%2FuX4At01ifvHVhzR520%2FYme%2BqShUDP%2B9YD5vdA%3D%3D",
  languageLab:
    "https://scaling.spaggiari.eu/FIII0023/testo/5057.png%26rs%3D%2FtccTw2MgxYfdxRYmYOB6Pk9jQH5POS%2FquVc8aOi3ns2htM1BhF%2Fr5nAtRVDWvfTyMAZSK1CdbWaDHnglQjglAuFwI5cB%2FVmg%2FuX4At01ifvHVhzR520%2FYme%2BqShUDP%2B9YD5vdA%3D%3D",
  library:
    "https://scaling.spaggiari.eu/FIII0023/testo/5055.png%26rs%3D%2FtccTw2MgxYfdxRYmYOB6Pk9jQH5POS%2FquVc8aOi3ns2htM1BhF%2Fr5nAtRVDWvfTyMAZSK1CdbWaDHnglQjglAuFwI5cB%2FVmg%2FuX4At01ifvHVhzR520%2FYme%2BqShUDP%2B9YD5vdA%3D%3D",
};

const chapters = [
  { id: "opening", label: "Opening", eyebrow: "Start", icon: Sparkles },
  { id: "timeline", label: "Evolution", eyebrow: "1853 → Today", icon: Building2 },
  { id: "identity", label: "Identity", eyebrow: "Current profile", icon: Landmark },
  { id: "community", label: "Community", eyebrow: "Numbers", icon: UsersRound },
  { id: "territory", label: "Territory", eyebrow: "Where students come from", icon: MapPin },
  { id: "pathways", label: "Pathways", eyebrow: "Educational offer", icon: GraduationCap },
  { id: "spaces", label: "Spaces", eyebrow: "Learning environments", icon: MonitorSmartphone },
  { id: "afm", label: "AFM base", eyebrow: "Before specialization", icon: BriefcaseBusiness },
  { id: "sia", label: "SIA", eyebrow: "Specialization", icon: Database },
  { id: "curriculum", label: "Curriculum", eyebrow: "Weekly structure", icon: BarChart },
  { id: "skills", label: "Competences", eyebrow: "Learning outcomes", icon: Network },
  { id: "certifications", label: "Certifications", eyebrow: "External value", icon: BadgeCheck },
  { id: "innovation", label: "Innovation", eyebrow: "Projects", icon: Layers3 },
  { id: "erasmus", label: "Europe", eyebrow: "International mobility", icon: Globe2 },
  { id: "visit", label: "Visit", eyebrow: "Meeting path", icon: Flag },
];

const sources = [
  "La storia",
  "I numeri della scuola",
  "I luoghi",
  "Percorsi di studio",
  "Biennio AFM",
  "Triennio SIA",
  "Quadro orario SIA",
  "ICDL - ex ECDL",
  "EUCIP Core",
  "Scuola digitale",
  "PNRR Scuola 4.0",
  "Erasmus School",
  "Orario lezioni",
  "Contatti istituzionali",
];

const history = [
  {
    year: "1853",
    title: "Foundation in Florence",
    text: "The school was founded during the Grand Duchy of Tuscany to provide young Florentines with serious cultural preparation combined with scientific, economic and professional training.",
    short: "Cultural, scientific, economic and professional education.",
  },
  {
    year: "1996/97",
    title: "Merger with ITC Albert Einstein",
    text: "The technical-commercial experience of Albert Einstein joined the Galilei tradition, strengthening the service offered to students and families.",
    short: "Technical-commercial profile reinforced.",
  },
  {
    year: "2008/09",
    title: "Expansion of the educational offer",
    text: "The school broadened its offer to respond more effectively to the needs of the territory, adding the socio-psycho-pedagogical pathway to the technical-commercial area.",
    short: "A wider answer to local educational needs.",
  },
  {
    year: "2010",
    title: "Gelmini reform",
    text: "The reform redefined the school as an Istituto Tecnico Economico and a Liceo delle Scienze Umane.",
    short: "Technical-economic and human sciences identities.",
  },
  {
    year: "2020",
    title: "Economic-social option",
    text: "The Liceo delle Scienze Umane was enriched with the economic-social option, adding a further bridge between society, law, economics and languages.",
    short: "A stronger social and economic dimension.",
  },
  {
    year: "Today",
    title: "Digital ecosystem",
    text: "The current profile combines technical education, business information systems, digital laboratories, certifications, European projects and innovation investments.",
    short: "Tradition evolves into digital and international education.",
  },
];

const schoolNumbers = [
  { label: "Students", value: 978, detail: "Total students reported in the official school numbers page." },
  { label: "Classes", value: 44, detail: "Overall classes in the institute." },
  { label: "Liceo classes", value: 25, detail: "590 students, average 23.6 students per class." },
  { label: "Technical classes", value: 19, detail: "381 students, average 20.05 students per class." },
];

const populationData = [
  { area: "Liceo", students: 590, classes: 25, avg: 23.6 },
  { area: "Technical", students: 381, classes: 19, avg: 20.05 },
];

const originData = [
  { name: "Florence", value: 50, note: "The main share of students comes from the municipality of Florence." },
  { name: "Scandicci", value: 20, note: "The school is directly connected to Scandicci and the south-west area of Florence." },
  { name: "Other municipalities", value: 30, note: "Students also come from San Casciano, Signa, Lastra a Signa, Malmantile, Campi Bisenzio, Montespertoli and Cerbaia." },
];

const pathways = [
  { title: "Biennio AFM", text: "Common two-year economic pathway before the triennium articulations.", icon: BriefcaseBusiness },
  { title: "Triennio AFM", text: "Administration, finance and marketing specialization.", icon: Landmark },
  { title: "Triennio SIA", text: "Business Information Systems: management, software, data and ICT procedures.", icon: Database },
  { title: "Triennio RIM", text: "International relations for marketing.", icon: Globe2 },
  { title: "LSU", text: "Liceo delle Scienze Umane.", icon: BookOpen },
  { title: "LES", text: "Economic-social option of the Liceo delle Scienze Umane.", icon: Languages },
];

const spaces = [
  {
    title: "Interactive classrooms",
    value: "All classrooms",
    text: "Every classroom is equipped with an interactive multimedia whiteboard.",
    image: officialImages.classroom,
    icon: MonitorSmartphone,
  },
  {
    title: "Reading room",
    value: "Study setting",
    text: "Used for individual study and for reading the volumes available in the library.",
    image: null,
    icon: BookOpen,
  },
  {
    title: "Library",
    value: "Almost 9,000 volumes",
    text: "Available to students and school staff.",
    image: officialImages.library,
    icon: Library,
  },
  {
    title: "Language lab",
    value: "20+ online stations",
    text: "Designed to support language learning and certification activities.",
    image: officialImages.languageLab,
    icon: Languages,
  },
  {
    title: "ICT laboratories",
    value: "3 labs · 60+ networked stations",
    text: "The most relevant infrastructure for the technical and digital part of the visit.",
    image: officialImages.lab,
    icon: Binary,
  },
  {
    title: "Gym",
    value: "Physical education",
    text: "Equipped with machines for muscle strengthening and hydraulic propulsion steps.",
    image: null,
    icon: UsersRound,
  },
];

const afmBiennio = [
  { subject: "Italian", y1: 4, y2: 4 },
  { subject: "History", y1: 2, y2: 2 },
  { subject: "Mathematics", y1: 4, y2: 4 },
  { subject: "English", y1: 3, y2: 3 },
  { subject: "Second EU language", y1: 3, y2: 3 },
  { subject: "Business Economics", y1: 2, y2: 2 },
  { subject: "Law and Economics", y1: 2, y2: 2 },
  { subject: "Geography", y1: 3, y2: 3 },
  { subject: "Informatics", y1: 2, y2: 2 },
  { subject: "Science area", y1: 4, y2: 4 },
  { subject: "Physical Education", y1: 2, y2: 2 },
  { subject: "Religion / alternative", y1: 1, y2: 1 },
];

const siaTimetable = [
  { subject: "Italian", y3: 4, y4: 4, y5: 4 },
  { subject: "History", y3: 2, y4: 2, y5: 2 },
  { subject: "Mathematics", y3: 3, y4: 3, y5: 3 },
  { subject: "English", y3: 3, y4: 3, y5: 3 },
  { subject: "Second EU language", y3: 3, y4: 0, y5: 0 },
  { subject: "Business Economics", y3: 4, y4: 7, y5: 7 },
  { subject: "Law", y3: 3, y4: 3, y5: 2 },
  { subject: "Political Economics", y3: 3, y4: 2, y5: 3 },
  { subject: "Informatics", y3: 4, y4: 5, y5: 5 },
  { subject: "Physical Education", y3: 2, y4: 2, y5: 2 },
  { subject: "Religion / alternative", y3: 1, y4: 1, y5: 1 },
];

const curriculumFocus = [
  { subject: "Business Economics", y3: 4, y4: 7, y5: 7 },
  { subject: "Informatics", y3: 4, y4: 5, y5: 5 },
  { subject: "Law", y3: 3, y4: 3, y5: 2 },
  { subject: "Political Economics", y3: 3, y4: 2, y5: 3 },
  { subject: "Mathematics", y3: 3, y4: 3, y5: 3 },
  { subject: "English", y3: 3, y4: 3, y5: 3 },
];

const siaCompetences = [
  {
    title: "Economic and social analysis",
    text: "Analyse economic and social phenomena using mathematical and informatic tools.",
    icon: BarChart,
  },
  {
    title: "Legal and fiscal orientation",
    text: "Navigate public, civil and fiscal regulation connected to business activity.",
    icon: FileText,
  },
  {
    title: "Business systems",
    text: "Work on forecasting, organization, operation and management control inside companies.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Marketing tools",
    text: "Use marketing tools in different cases and contexts.",
    icon: Globe2,
  },
  {
    title: "Product and service evaluation",
    text: "Distinguish and evaluate products and services, including convenience calculations.",
    icon: CheckCircle2,
  },
  {
    title: "Information systems",
    text: "Act within the company information system and support organizational and technological adaptation.",
    icon: Network,
  },
  {
    title: "Business data",
    text: "Process, interpret and effectively represent business data using IT tools and management software.",
    icon: Database,
  },
  {
    title: "Ethics and social impact",
    text: "Analyse scientific, ethical, legal and social issues connected with acquired cultural tools.",
    icon: ShieldCheck,
  },
];

const siaSystemAreas = [
  { label: "Software evaluation", text: "Choosing and adapting application software." },
  { label: "Archiving", text: "Improving data storage and retrieval procedures." },
  { label: "Network communication", text: "Organizing communication in networked environments." },
  { label: "Cybersecurity", text: "Specific attention to safer information workflows." },
  { label: "Efficiency", text: "New procedures to improve business performance." },
];

const certifications = [
  {
    title: "ICDL",
    subtitle: "International Certification of Digital Literacy",
    points: [
      "The school is an accredited ICDL Test Center.",
      "Courses are free for students.",
      "Available paths: Essentials, Base, Standard and Full Standard.",
      "The Skills Card is no longer subject to expiry.",
      "Exams are also open to external users through the school Test Center.",
    ],
    metrics: ["150+ countries", "24,000 exam venues worldwide", "about 3,000 in Italy"],
    icon: MonitorSmartphone,
  },
  {
    title: "EUCIP Core",
    subtitle: "European ICT professional foundations",
    points: [
      "Certification of key ICT knowledge for professional operators.",
      "Three exam areas: Plan, Build and Operate.",
      "The exams are in English.",
      "The school is an accredited venue for EUCIP Core exams.",
    ],
    metrics: ["Plan", "Build", "Operate"],
    icon: BadgeCheck,
  },
];

const projects = [
  {
    title: "Metaverso Lab",
    type: "PNRR · Next Generation Labs",
    amount: "€164,644.23",
    text: "A lab for future digital professions, focused on the relation between physical and virtual worlds, decentralized web, sharing, attention, contribution and platform economies.",
  },
  {
    title: "Lo Spazio Tras-forma",
    type: "PNRR · Next Generation Classrooms",
    amount: "€163,935.87",
    text: "A project for innovative learning environments, flexible and multifunctional classrooms, new furniture, tools and digital technologies for active teaching.",
  },
  {
    title: "Scuola digitale",
    type: "PNSD · Digital animator",
    amount: "€2,000.00",
    text: "The digital animator supports school digitization, innovation policies, working groups and staff involvement within the National Digital School Plan.",
  },
  {
    title: "PNRR DM 65/2023",
    type: "New skills and new languages",
    amount: "Listed among European projects",
    text: "The official project menu connects the school development line with new competences and new languages.",
  },
  {
    title: "PNRR DM 66/2023",
    type: "Digital transition training",
    amount: "Listed among European projects",
    text: "The project line is dedicated to staff training for digital transition.",
  },
];

const erasmus = [
  { country: "Spain", city: "Valencia", grants: 10, duration: "about 1 month" },
  { country: "France", city: "Bordeaux", grants: 10, duration: "about 1 month" },
  { country: "Germany", city: "Berlin", grants: 10, duration: "about 1 month" },
  { country: "Ireland", city: "—", grants: 3, duration: "92 days" },
  { country: "Spain", city: "—", grants: 3, duration: "92 days" },
];

const visitPath = [
  { step: "Welcome", text: "Institutional greeting and reason for the international meeting." },
  { step: "Origin", text: "1853 foundation and evolution toward today’s technical-digital profile." },
  { step: "Community", text: "Students, classes, territorial role and school structure." },
  { step: "Spaces", text: "Classrooms, library, language lab and ICT laboratories." },
  { step: "SIA", text: "Business information systems: curriculum, competences and professional logic." },
  { step: "Certifications", text: "ICDL and EUCIP Core as external evidence of digital competence." },
  { step: "Innovation", text: "PNRR, digital transition and European project lines." },
  { step: "Exchange", text: "Discussion on methods, tools, curriculum design and possible collaboration." },
];

function CountUp({ value }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame;
    const duration = 950;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return count.toLocaleString("en-US");
}

function Glass({ children, className = "", onClick }) {
  const Element = onClick ? "button" : "div";
  return (
    <Element
      onClick={onClick}
      className={`relative overflow-hidden rounded-[1.65rem] border border-white/10 bg-white/[0.065] p-5 text-left shadow-2xl shadow-black/25 backdrop-blur-xl ${
        onClick ? "cursor-pointer transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.09]" : ""
      } ${className}`}
    >
      {children}
    </Element>
  );
}

function ChapterShell({ chapter, index, activeIndex, children, className = "" }) {
  return (
    <section
      data-chapter={chapter.id}
      className="relative h-screen w-screen flex-none snap-start overflow-hidden px-8 pb-24 pt-24 lg:px-14 xl:px-20"
    >
      <div className="mx-auto flex h-full max-w-[1500px] flex-col">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: activeIndex === index ? 1 : 0.45, y: activeIndex === index ? 0 : 10 }}
          transition={{ duration: 0.35 }}
          className="mb-5 flex items-center gap-3"
        >
          <div className="grid h-10 w-10 place-items-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
            <chapter.icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">{String(index + 1).padStart(2, "0")} · {chapter.eyebrow}</p>
            <p className="text-sm text-slate-400">{chapter.label}</p>
          </div>
        </motion.div>
        <div className={`min-h-0 flex-1 ${className}`}>{children}</div>
      </div>
    </section>
  );
}

function Modal({ modal, close }) {
  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/80 p-6 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22 }}
            className="relative grid max-h-[86vh] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/12 bg-[#07111f] shadow-2xl shadow-black/50 md:grid-cols-[0.92fr_1.08fr]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={close}
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-slate-950/70 text-slate-200 transition hover:bg-white/10"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="min-h-[320px] bg-gradient-to-br from-cyan-300/15 via-indigo-400/10 to-white/5 p-6">
              {modal.image ? (
                <img src={modal.image} alt="" className="h-full max-h-[620px] w-full rounded-[1.4rem] object-cover opacity-90" />
              ) : (
                <div className="grid h-full min-h-[320px] place-items-center rounded-[1.4rem] border border-white/10 bg-white/[0.04]">
                  <modal.icon className="h-24 w-24 text-cyan-200" />
                </div>
              )}
            </div>
            <div className="overflow-y-auto p-8 pr-10">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">More detail</p>
              <h3 className="mt-3 text-3xl font-semibold leading-tight text-white md:text-4xl">{modal.title}</h3>
              {Array.isArray(modal.body) ? (
                <div className="mt-5 space-y-3">
                  {modal.body.map((line) => (
                    <div key={line} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-cyan-200" />
                      <p className="text-sm leading-6 text-slate-300">{line}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-5 text-base leading-8 text-slate-300">{modal.body}</p>
              )}
              {modal.extra && <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm leading-6 text-cyan-50">{modal.extra}</div>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TopChrome({ activeIndex, progress }) {
  const active = chapters[activeIndex];
  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-50 h-1.5 bg-white/10">
        <motion.div className="h-full origin-left bg-gradient-to-r from-cyan-300 via-indigo-300 to-violet-300" animate={{ width: `${progress}%` }} transition={{ duration: 0.12 }} />
      </div>
      <div className="pointer-events-none fixed left-6 right-6 top-5 z-50 flex items-center justify-between gap-4">
        <div className="rounded-full border border-white/10 bg-slate-950/72 px-4 py-2.5 shadow-2xl shadow-black/30 backdrop-blur-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
            IIS Galileo Galilei · <span className="text-cyan-200">SIA Interactive Visit</span>
          </p>
        </div>
        <div className="rounded-full border border-white/10 bg-slate-950/72 px-4 py-2.5 shadow-2xl shadow-black/30 backdrop-blur-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
            {String(activeIndex + 1).padStart(2, "0")} / {chapters.length} · <span className="text-cyan-200">{active.label}</span>
          </p>
        </div>
      </div>
    </>
  );
}

function BottomChrome({ activeIndex, goTo, progress }) {
  return (
    <div className="fixed bottom-5 left-6 right-6 z-50 flex items-center justify-between gap-5">
      <div className="hidden min-w-0 flex-1 items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 p-2 shadow-2xl shadow-black/30 backdrop-blur-2xl lg:flex">
        {chapters.map((chapter, index) => (
          <button
            key={chapter.id}
            onClick={() => goTo(index)}
            className={`group flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition ${
              index === activeIndex ? "bg-white text-slate-950" : "text-slate-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <chapter.icon className="h-3.5 w-3.5 flex-none" />
            <span className="truncate">{chapter.label}</span>
          </button>
        ))}
      </div>
      <div className="flex flex-none items-center gap-2 rounded-full border border-white/10 bg-slate-950/72 p-2 shadow-2xl shadow-black/30 backdrop-blur-2xl">
        <button
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
          aria-label="Previous chapter"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="w-20 text-center text-xs font-semibold text-slate-300">{Math.round(progress)}%</div>
        <button
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex === chapters.length - 1}
          className="grid h-10 w-10 place-items-center rounded-full bg-white text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-35"
          aria-label="Next chapter"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function StatCard({ item, openModal }) {
  return (
    <Glass
      onClick={() =>
        openModal({
          title: item.label,
          body: item.detail,
          icon: GraduationCap,
        })
      }
      className="flex min-h-40 flex-col justify-between"
    >
      <p className="text-sm text-slate-400">{item.label}</p>
      <p className="mt-4 text-6xl font-semibold tracking-tight text-white"><CountUp value={item.value} /></p>
      <div className="mt-5 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
        Official data <ChevronRight className="h-4 w-4" />
      </div>
    </Glass>
  );
}

export default function GalileiSiaInteractiveStorytelling() {
  const railRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [modal, setModal] = useState(null);

  const openModal = (data) => setModal(data);
  const closeModal = () => setModal(null);

  const goTo = (index) => {
    const rail = railRef.current;
    if (!rail) return;
    const safeIndex = Math.max(0, Math.min(index, chapters.length - 1));
    rail.scrollTo({ left: safeIndex * window.innerWidth, behavior: "smooth" });
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const update = () => {
      const width = window.innerWidth || 1;
      const index = Math.round(rail.scrollLeft / width);
      const max = rail.scrollWidth - rail.clientWidth;
      setActiveIndex(Math.max(0, Math.min(index, chapters.length - 1)));
      setProgress(max > 0 ? (rail.scrollLeft / max) * 100 : 0);
    };

    update();
    rail.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      rail.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const handleWheel = (event) => {
      const rail = railRef.current;
      if (!rail || modal) return;
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();
        rail.scrollLeft += event.deltaY;
      }
    };

    const handleKey = (event) => {
      if (modal) return;
      if (["ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        goTo(activeIndex + 1);
      }
      if (["ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goTo(activeIndex - 1);
      }
      if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        goTo(chapters.length - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKey);
    };
  }, [activeIndex, modal]);

  const sourceSummary = useMemo(() => sources.join(" · "), []);

  return (
    <main className="h-screen overflow-hidden bg-[#050914] font-sans text-slate-200">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-[-12rem] top-[-12rem] h-[38rem] w-[38rem] rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-[-14rem] right-[-10rem] h-[42rem] w-[42rem] rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute left-[42%] top-[18%] h-[25rem] w-[25rem] rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.034)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.034)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]" />
      </div>

      <TopChrome activeIndex={activeIndex} progress={progress} />

      <div ref={railRef} className="relative z-10 flex h-screen w-screen snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ChapterShell chapter={chapters[0]} index={0} activeIndex={activeIndex} className="grid grid-cols-[1.05fr_0.95fr] items-center gap-12">
          <div>
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
                <Globe2 className="h-4 w-4" />
                Interactive visit for international ICT teachers
              </div>
              <h1 className="max-w-5xl text-6xl font-semibold leading-[0.88] tracking-[-0.065em] text-white xl:text-8xl">
                From a historic school to a digital business systems pathway.
              </h1>
              <p className="mt-7 max-w-3xl text-xl leading-8 text-slate-300">
                A linear presentation of IIS Galileo Galilei focused on the evolution from institutional identity to ICT laboratories, SIA, certifications, PNRR innovation and European mobility.
              </p>
              <div className="mt-8 grid max-w-4xl grid-cols-4 gap-3">
                {schoolNumbers.map((item) => (
                  <div key={item.label} className="rounded-[1.3rem] border border-white/10 bg-white/[0.055] p-4">
                    <p className="text-3xl font-semibold text-white">{item.value}</p>
                    <p className="mt-1 text-xs text-slate-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          <Glass className="h-full max-h-[660px] p-3">
            <div className="relative h-full overflow-hidden rounded-[1.35rem]">
              <img src={officialImages.lab} alt="Computer laboratory" className="h-full w-full object-cover opacity-85" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5 backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">Main narrative</p>
                <p className="mt-2 text-2xl font-semibold text-white">History → territory → spaces → SIA → digital future</p>
              </div>
            </div>
          </Glass>
        </ChapterShell>

        <ChapterShell chapter={chapters[1]} index={1} activeIndex={activeIndex} className="grid grid-cols-[0.82fr_1.18fr] items-center gap-10">
          <div>
            <h2 className="text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white xl:text-7xl">The school evolves through precise institutional steps.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">The storyline is chronological: it starts from the foundation and progressively reaches the current digital and international profile.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {history.map((item, index) => (
              <Glass
                key={item.year}
                onClick={() => openModal({ title: `${item.year} · ${item.title}`, body: item.text, icon: Building2 })}
                className="min-h-[176px]"
              >
                <p className="text-3xl font-semibold text-cyan-200">{item.year}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.short}</p>
                <div className="absolute right-4 top-4 text-slate-500">{String(index + 1).padStart(2, "0")}</div>
              </Glass>
            ))}
          </div>
        </ChapterShell>

        <ChapterShell chapter={chapters[2]} index={2} activeIndex={activeIndex} className="grid grid-cols-[1fr_1fr] items-center gap-10">
          <div>
            <h2 className="text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white xl:text-7xl">Current identity: one institution, multiple educational directions.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">Galilei now combines an economic technical institute with human sciences pathways. The SIA focus is therefore not isolated: it is part of a broader educational ecosystem.</p>
            <div className="mt-7 rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Useful institutional data</p>
              <p className="mt-3 text-base leading-7 text-cyan-50">Via di Scandicci 151, 50143 Firenze · Tel. 055704569 · Email fiis019002@istruzione.it · Institute code FIIS019002 · Technical code FITD019018.</p>
            </div>
          </div>
          <Glass className="grid grid-cols-2 gap-4 p-5">
            {pathways.map((pathway) => {
              const Icon = pathway.icon;
              return (
                <button
                  key={pathway.title}
                  onClick={() => openModal({ title: pathway.title, body: pathway.text, icon: Icon })}
                  className="rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-5 text-left transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.085]"
                >
                  <Icon className="h-7 w-7 text-cyan-200" />
                  <h3 className="mt-4 text-lg font-semibold text-white">{pathway.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{pathway.text}</p>
                </button>
              );
            })}
          </Glass>
        </ChapterShell>

        <ChapterShell chapter={chapters[3]} index={3} activeIndex={activeIndex} className="grid grid-cols-[0.86fr_1.14fr] items-center gap-10">
          <div>
            <h2 className="text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white xl:text-7xl">A school community large enough to be read through data.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">The official numbers show both the scale of the institute and the relationship between liceo and technical education.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {schoolNumbers.map((item) => <StatCard key={item.label} item={item} openModal={openModal} />)}
            <Glass className="col-span-2 h-[280px]">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">Students and classes by area</h3>
                  <p className="text-sm text-slate-400">Liceo and technical institute comparison.</p>
                </div>
                <UsersRound className="h-6 w-6 text-cyan-200" />
              </div>
              <ResponsiveContainer width="100%" height="82%">
                <ComposedChart data={populationData} margin={{ left: 0, right: 10, top: 15, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
                  <XAxis dataKey="area" tick={{ fill: "#cbd5e1", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, color: "#fff" }} />
                  <Bar dataKey="students" fill="#67e8f9" radius={[12, 12, 0, 0]} name="Students" />
                  <Line dataKey="classes" stroke="#c4b5fd" strokeWidth={3} name="Classes" />
                </ComposedChart>
              </ResponsiveContainer>
            </Glass>
          </div>
        </ChapterShell>

        <ChapterShell chapter={chapters[4]} index={4} activeIndex={activeIndex} className="grid grid-cols-[1fr_1fr] items-center gap-10">
          <div>
            <h2 className="text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white xl:text-7xl">The school is connected to Florence and to the metropolitan area.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">The catchment area is part of the story. It explains why the institute works as a territorial reference point, not only as a single-neighbourhood school.</p>
            <div className="mt-7 grid grid-cols-2 gap-3">
              {["San Casciano", "Signa", "Lastra a Signa", "Malmantile", "Campi Bisenzio", "Montespertoli", "Cerbaia"].map((place) => (
                <div key={place} className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm text-slate-300">{place}</div>
              ))}
            </div>
          </div>
          <Glass className="h-[520px]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-white">Student origin</h3>
                <p className="text-sm text-slate-400">Official territorial distribution.</p>
              </div>
              <MapPin className="h-7 w-7 text-cyan-200" />
            </div>
            <ResponsiveContainer width="100%" height="78%">
              <BarChart data={originData} layout="vertical" margin={{ left: 22, right: 42, top: 20, bottom: 8 }}>
                <CartesianGrid stroke="rgba(255,255,255,.08)" horizontal={false} />
                <XAxis type="number" domain={[0, 60]} hide />
                <YAxis dataKey="name" type="category" width={150} tick={{ fill: "#cbd5e1", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, color: "#fff" }} />
                <Bar dataKey="value" fill="#67e8f9" radius={[0, 16, 16, 0]}>
                  <LabelList dataKey="value" position="right" formatter={(v) => `${v}%`} fill="#e2e8f0" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Glass>
        </ChapterShell>

        <ChapterShell chapter={chapters[5]} index={5} activeIndex={activeIndex} className="grid grid-cols-[0.85fr_1.15fr] items-center gap-10">
          <div>
            <h2 className="text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white xl:text-7xl">The educational offer creates the bridge toward SIA.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">The official study paths show the technical-economic sequence: a common AFM biennium followed by AFM, SIA or RIM specializations. This is the structural context for the SIA presentation.</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {pathways.map((pathway, index) => {
              const Icon = pathway.icon;
              return (
                <Glass key={pathway.title} onClick={() => openModal({ title: pathway.title, body: pathway.text, icon: Icon })} className={`${index === 2 ? "ring-2 ring-cyan-300/40" : ""} min-h-[190px]`}>
                  <Icon className="h-8 w-8 text-cyan-200" />
                  <h3 className="mt-5 text-xl font-semibold text-white">{pathway.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{pathway.text}</p>
                </Glass>
              );
            })}
          </div>
        </ChapterShell>

        <ChapterShell chapter={chapters[6]} index={6} activeIndex={activeIndex} className="grid grid-cols-[0.78fr_1.22fr] items-center gap-10">
          <div>
            <h2 className="text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white xl:text-7xl">Learning spaces make the digital dimension visible.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">Instead of repeating the same photographs, the spaces are presented as an infrastructure map. Images are used only when they add evidence.</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {spaces.map((space) => {
              const Icon = space.icon;
              return (
                <Glass
                  key={space.title}
                  onClick={() => openModal({ title: `${space.title} · ${space.value}`, body: space.text, image: space.image, icon: Icon })}
                  className={`${space.image ? "min-h-[250px] p-0" : "min-h-[250px]"}`}
                >
                  {space.image ? (
                    <>
                      <img src={space.image} alt={space.title} className="h-[250px] w-full object-cover opacity-80" />
                      <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-slate-950/72 p-4 backdrop-blur-xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">{space.value}</p>
                        <h3 className="mt-1 text-lg font-semibold text-white">{space.title}</h3>
                      </div>
                    </>
                  ) : (
                    <>
                      <Icon className="h-8 w-8 text-cyan-200" />
                      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">{space.value}</p>
                      <h3 className="mt-2 text-xl font-semibold text-white">{space.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-300">{space.text}</p>
                    </>
                  )}
                </Glass>
              );
            })}
          </div>
        </ChapterShell>

        <ChapterShell chapter={chapters[7]} index={7} activeIndex={activeIndex} className="grid grid-cols-[0.86fr_1.14fr] items-center gap-10">
          <div>
            <h2 className="text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white xl:text-7xl">Before SIA: a common economic and digital foundation.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">The technical-economic pathway begins with a common two-year AFM structure. Informatics is already present in the first two years, together with business economics, mathematics, law, languages and science.</p>
            <div className="mt-7 rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5">
              <p className="text-3xl font-semibold text-white">32 hours</p>
              <p className="mt-1 text-slate-400">per week in year I and II of AFM.</p>
            </div>
          </div>
          <Glass className="h-[570px]">
            <h3 className="text-2xl font-semibold text-white">AFM common biennium</h3>
            <p className="mt-1 text-sm text-slate-400">Weekly hours, year I and II.</p>
            <ResponsiveContainer width="100%" height="88%">
              <BarChart data={afmBiennio} margin={{ top: 22, right: 10, left: -15, bottom: 56 }}>
                <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
                <XAxis dataKey="subject" angle={-35} textAnchor="end" height={72} tick={{ fill: "#cbd5e1", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, color: "#fff" }} />
                <Bar dataKey="y1" name="Year I" fill="#67e8f9" radius={[8, 8, 0, 0]} />
                <Bar dataKey="y2" name="Year II" fill="#a5b4fc" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Glass>
        </ChapterShell>

        <ChapterShell chapter={chapters[8]} index={8} activeIndex={activeIndex} className="grid grid-cols-[0.9fr_1.1fr] items-center gap-10">
          <div>
            <h2 className="text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white xl:text-7xl">SIA is the point where company organization becomes an information system.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">The official SIA profile focuses on the management of business information systems and on the evaluation, choice and adaptation of application software.</p>
            <div className="mt-7 grid grid-cols-2 gap-3">
              {siaSystemAreas.map((area) => (
                <Glass key={area.label} onClick={() => openModal({ title: area.label, body: area.text, icon: Database })} className="min-h-[116px]">
                  <p className="text-sm font-semibold text-white">{area.label}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{area.text}</p>
                </Glass>
              ))}
            </div>
          </div>
          <Glass className="h-[620px]">
            <div className="grid h-full grid-rows-[auto_1fr] gap-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">Core logic</p>
                <h3 className="mt-2 text-3xl font-semibold text-white">Business process → data → software → network → security</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {[
                  ["Company needs", "Economic, organizational and management problems are identified."],
                  ["Information flow", "Data are collected, stored, interpreted and represented."],
                  ["Software solution", "Applications and procedures are evaluated and adapted."],
                  ["Network communication", "Information moves through connected systems and services."],
                  ["Cybersecurity", "The system must remain reliable, organized and protected."],
                ].map(([title, text], index) => (
                  <div key={title} className="grid grid-cols-[3rem_1fr] items-center gap-4 rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-4">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300 text-lg font-semibold text-slate-950">{index + 1}</div>
                    <div>
                      <h4 className="font-semibold text-white">{title}</h4>
                      <p className="mt-1 text-sm leading-6 text-slate-300">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Glass>
        </ChapterShell>

        <ChapterShell chapter={chapters[9]} index={9} activeIndex={activeIndex} className="grid grid-cols-[0.82fr_1.18fr] items-center gap-10">
          <div>
            <h2 className="text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white xl:text-7xl">The weekly timetable confirms the identity of SIA.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">The SIA triennium has 32 weekly hours every year. The most characterizing subjects are Business Economics and Informatics.</p>
            <div className="mt-7 grid grid-cols-3 gap-3">
              {["Year III", "Year IV", "Year V"].map((year) => (
                <div key={year} className="rounded-[1.3rem] border border-white/10 bg-white/[0.055] p-4">
                  <p className="text-4xl font-semibold text-white">32</p>
                  <p className="mt-1 text-sm text-slate-400">hours · {year}</p>
                </div>
              ))}
            </div>
          </div>
          <Glass className="h-[600px]">
            <h3 className="text-2xl font-semibold text-white">SIA triennium · key subjects</h3>
            <p className="mt-1 text-sm text-slate-400">Weekly hours in year III, IV and V.</p>
            <ResponsiveContainer width="100%" height="88%">
              <BarChart data={curriculumFocus} margin={{ left: -10, right: 10, top: 22, bottom: 26 }}>
                <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
                <XAxis dataKey="subject" tick={{ fill: "#cbd5e1", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, color: "#fff" }} />
                <Bar dataKey="y3" name="Year III" fill="#67e8f9" radius={[8, 8, 0, 0]} />
                <Bar dataKey="y4" name="Year IV" fill="#818cf8" radius={[8, 8, 0, 0]} />
                <Bar dataKey="y5" name="Year V" fill="#c4b5fd" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Glass>
        </ChapterShell>

        <ChapterShell chapter={chapters[10]} index={10} activeIndex={activeIndex} className="grid grid-cols-[0.78fr_1.22fr] items-center gap-10">
          <div>
            <h2 className="text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white xl:text-7xl">The learning outcomes are practical, technical and organizational.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">This scene translates the official SIA profile into a competence map, useful for guests who need to understand what students are expected to know and do.</p>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {siaCompetences.map((competence) => {
              const Icon = competence.icon;
              return (
                <Glass key={competence.title} onClick={() => openModal({ title: competence.title, body: competence.text, icon: Icon })} className="min-h-[190px]">
                  <Icon className="h-7 w-7 text-cyan-200" />
                  <h3 className="mt-4 text-lg font-semibold text-white">{competence.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{competence.text}</p>
                </Glass>
              );
            })}
          </div>
        </ChapterShell>

        <ChapterShell chapter={chapters[11]} index={11} activeIndex={activeIndex} className="grid grid-cols-[0.82fr_1.18fr] items-center gap-10">
          <div>
            <h2 className="text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white xl:text-7xl">Certifications give external evidence to digital competence.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">ICDL and EUCIP Core make the digital profile more readable for international guests because they use recognized, transferable frameworks.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {certifications.map((cert) => {
              const Icon = cert.icon;
              return (
                <Glass key={cert.title} onClick={() => openModal({ title: `${cert.title} · ${cert.subtitle}`, body: cert.points, icon: Icon, extra: cert.metrics.join(" · ") })} className="min-h-[520px]">
                  <Icon className="h-10 w-10 text-cyan-200" />
                  <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">{cert.title}</p>
                  <h3 className="mt-3 text-3xl font-semibold text-white">{cert.subtitle}</h3>
                  <div className="mt-6 space-y-3">
                    {cert.points.slice(0, 4).map((point) => (
                      <div key={point} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-cyan-200" />
                        <p className="text-sm leading-6 text-slate-300">{point}</p>
                      </div>
                    ))}
                  </div>
                </Glass>
              );
            })}
          </div>
        </ChapterShell>

        <ChapterShell chapter={chapters[12]} index={12} activeIndex={activeIndex} className="grid grid-cols-[0.78fr_1.22fr] items-center gap-10">
          <div>
            <h2 className="text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white xl:text-7xl">Innovation is presented as a system of projects.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">The official project pages connect the school to digital transition, PNRR investments, new classrooms, future digital professions and staff training.</p>
            <Glass className="mt-7">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">Total highlighted PNRR 4.0 funding</p>
              <p className="mt-3 text-5xl font-semibold text-white">€328,580.10</p>
              <p className="mt-2 text-sm text-slate-400">Metaverso Lab + Lo Spazio Tras-forma.</p>
            </Glass>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {projects.map((project, index) => (
              <Glass key={project.title} onClick={() => openModal({ title: project.title, body: project.text, icon: Layers3, extra: `${project.type} · ${project.amount}` })} className={index === 0 ? "min-h-[230px] ring-2 ring-cyan-300/30" : "min-h-[230px]"}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">{project.type}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{project.title}</h3>
                <p className="mt-2 text-xl font-semibold text-indigo-100">{project.amount}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{project.text}</p>
              </Glass>
            ))}
          </div>
        </ChapterShell>

        <ChapterShell chapter={chapters[13]} index={13} activeIndex={activeIndex} className="grid grid-cols-[0.82fr_1.18fr] items-center gap-10">
          <div>
            <h2 className="text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white xl:text-7xl">European mobility expands the meaning of technical education.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">The Erasmus School page presents participation in Erasmus+ KA121 VET with opportunities for training abroad and links with a consortium coordinated by Centro Machiavelli in Florence.</p>
            <div className="mt-7 rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
              <p className="text-base leading-7 text-cyan-50">The 2025 information includes 30 places for Spain, France and Germany, plus a VET Long call with 6 places for recent graduates.</p>
            </div>
          </div>
          <Glass className="h-[560px]">
            <h3 className="text-2xl font-semibold text-white">Erasmus+ VET opportunities</h3>
            <p className="mt-1 text-sm text-slate-400">Destinations and available grants listed in the official pages.</p>
            <ResponsiveContainer width="100%" height="86%">
              <AreaChart data={erasmus} margin={{ top: 28, right: 20, left: -10, bottom: 20 }}>
                <defs>
                  <linearGradient id="grants" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#67e8f9" stopOpacity={0.75} />
                    <stop offset="95%" stopColor="#67e8f9" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
                <XAxis dataKey="country" tick={{ fill: "#cbd5e1", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, color: "#fff" }} />
                <Area type="monotone" dataKey="grants" stroke="#67e8f9" fill="url(#grants)" strokeWidth={3} name="Grants" />
              </AreaChart>
            </ResponsiveContainer>
          </Glass>
        </ChapterShell>

        <ChapterShell chapter={chapters[14]} index={14} activeIndex={activeIndex} className="grid grid-cols-[0.82fr_1.18fr] items-center gap-10">
          <div>
            <h2 className="text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white xl:text-7xl">A proposed route for the meeting.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">The presentation closes by transforming the website into a practical sequence for the actual visit with foreign ICT teachers.</p>
            <div className="mt-7 rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Source base</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">{sourceSummary}</p>
            </div>
          </div>
          <Glass className="h-[640px] overflow-y-auto pr-3">
            <div className="space-y-3">
              {visitPath.map((item, index) => (
                <button
                  key={item.step}
                  onClick={() => openModal({ title: item.step, body: item.text, icon: Flag })}
                  className="grid w-full grid-cols-[3.5rem_1fr] items-center gap-4 rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-4 text-left transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.085]"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-lg font-semibold text-slate-950">{index + 1}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.step}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{item.text}</p>
                  </div>
                </button>
              ))}
            </div>
          </Glass>
        </ChapterShell>
      </div>

      <BottomChrome activeIndex={activeIndex} goTo={goTo} progress={progress} />
      <Modal modal={modal} close={closeModal} />
    </main>
  );
}
