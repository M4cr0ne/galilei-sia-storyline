import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
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
  BriefcaseBusiness,
  CheckCircle2,
  Database,
  FileText,
  Flag,
  Globe2,
  Layers3,
  MonitorSmartphone,
  Network,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

const officialImages = {
  classroom:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
  lab:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
  languageLab:
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80",
  library:
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1400&q=80",
};

const svgImage = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const flowchartImage = svgImage(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#07111f"/>
      <stop offset="1" stop-color="#0f2f4f"/>
    </linearGradient>
    <linearGradient id="node" x1="0" x2="1">
      <stop offset="0" stop-color="#67e8f9"/>
      <stop offset="1" stop-color="#a5b4fc"/>
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="1200" height="800" fill="url(#bg)"/>
  <g opacity=".18" stroke="#ffffff" stroke-width="1">
    <path d="M0 100h1200M0 200h1200M0 300h1200M0 400h1200M0 500h1200M0 600h1200M0 700h1200"/>
    <path d="M100 0v800M200 0v800M300 0v800M400 0v800M500 0v800M600 0v800M700 0v800M800 0v800M900 0v800M1000 0v800M1100 0v800"/>
  </g>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" filter="url(#glow)">
    <rect x="455" y="75" width="290" height="82" rx="41" fill="none" stroke="url(#node)" stroke-width="8"/>
    <text x="600" y="126" fill="#e0faff" font-size="34" font-weight="700">START</text>
    <path d="M600 157v70" stroke="#93c5fd" stroke-width="8" marker-end="url(#a)"/>
    <rect x="420" y="230" width="360" height="95" rx="18" fill="#0b2440" stroke="#67e8f9" stroke-width="7"/>
    <text x="600" y="288" fill="#e0faff" font-size="30" font-weight="700">Read input data</text>
    <path d="M600 325v72" stroke="#93c5fd" stroke-width="8"/>
    <path d="M600 397l170 105-170 105-170-105z" fill="#102b4c" stroke="#a5b4fc" stroke-width="7"/>
    <text x="600" y="493" fill="#f8fafc" font-size="27" font-weight="700">Condition?</text>
    <text x="600" y="530" fill="#bae6fd" font-size="22">yes / no</text>
    <path d="M430 502H275v92" stroke="#67e8f9" stroke-width="8"/>
    <path d="M770 502h155v92" stroke="#67e8f9" stroke-width="8"/>
    <rect x="150" y="595" width="250" height="85" rx="16" fill="#0b2440" stroke="#67e8f9" stroke-width="7"/>
    <text x="275" y="648" fill="#e0faff" font-size="28" font-weight="700">Loop block</text>
    <rect x="800" y="595" width="250" height="85" rx="16" fill="#0b2440" stroke="#a5b4fc" stroke-width="7"/>
    <text x="925" y="648" fill="#e0faff" font-size="28" font-weight="700">Output</text>
  </g>
</svg>`);

const escapeSvgText = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const softwareScreenImage = ({ title, subtitle, color = "#67e8f9", panels = [], code = [] }) => svgImage(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#07111f"/>
      <stop offset="1" stop-color="#172554"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#bg)"/>
  <rect x="95" y="70" width="1010" height="660" rx="28" fill="#0f172a" stroke="#334155" stroke-width="4"/>
  <rect x="95" y="70" width="1010" height="74" rx="28" fill="#111827"/>
  <circle cx="145" cy="107" r="13" fill="#f87171"/>
  <circle cx="186" cy="107" r="13" fill="#facc15"/>
  <circle cx="227" cy="107" r="13" fill="#34d399"/>
  <text x="285" y="116" fill="${color}" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="800">${escapeSvgText(title)}</text>
  <text x="145" y="190" fill="#e5faff" font-family="Inter, Arial, sans-serif" font-size="40" font-weight="800">${escapeSvgText(subtitle)}</text>
  ${panels.map((panel, index) => {
    const x = 145 + (index % 2) * 465;
    const y = 235 + Math.floor(index / 2) * 155;
    return `<rect x="${x}" y="${y}" width="420" height="116" rx="18" fill="#1e293b" stroke="${color}" stroke-opacity=".45" stroke-width="3"/>
      <text x="${x + 26}" y="${y + 48}" fill="#f8fafc" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="800">${escapeSvgText(panel[0])}</text>
      <text x="${x + 26}" y="${y + 84}" fill="#bae6fd" font-family="Inter, Arial, sans-serif" font-size="21">${escapeSvgText(panel[1])}</text>`;
  }).join("")}
  ${code.map((line, index) => {
    const y = 275 + index * 48;
    return `<text x="155" y="${y}" fill="${index % 2 === 0 ? "#e2e8f0" : color}" font-family="Consolas, monospace" font-size="30">${escapeSvgText(line)}</text>`;
  }).join("")}
</svg>`);

const screenBank = {
  word: softwareScreenImage({
    title: "Word processor",
    subtitle: "Structured document",
    color: "#60a5fa",
    panels: [["Styles", "headings · sections"], ["Tables", "data in documents"], ["Images", "layout and captions"], ["Export", "shared final file"]],
  }),
  slides: softwareScreenImage({
    title: "Presentation software",
    subtitle: "Clear technical slides",
    color: "#fb923c",
    panels: [["Slide master", "consistent layout"], ["Charts", "visual evidence"], ["Speaker notes", "oral explanation"], ["Export", "present and share"]],
  }),
  spreadsheet: softwareScreenImage({
    title: "Spreadsheet",
    subtitle: "Rows, columns and formulas",
    color: "#34d399",
    panels: [["A1:D12", "structured table"], ["=SUM(B2:B12)", "basic formulas"], ["Charts", "readable results"], ["Filters", "data exploration"]],
  }),
  files: softwareScreenImage({
    title: "Digital workspace",
    subtitle: "Folders, versions and sharing",
    color: "#a78bfa",
    panels: [["Naming", "clear file structure"], ["Cloud", "shared documents"], ["Formats", "docx · xlsx · pdf"], ["Workflow", "draft · review · final"]],
  }),
  excelFunctions: softwareScreenImage({
    title: "Advanced spreadsheet",
    subtitle: "Functions and logical tests",
    color: "#22c55e",
    code: ["=IF(C2>=60,\"PASS\",\"REVIEW\")", "=XLOOKUP(A2,Clients[ID],Clients[Name])", "=SUMIFS(Sales[Total],Sales[Area],F2)", "=ROUND(AVERAGE(B2:B20),2)"],
  }),
  excelTables: softwareScreenImage({
    title: "Data table",
    subtitle: "Sort, filter, summarize",
    color: "#14b8a6",
    panels: [["Filters", "select rows"], ["Pivot view", "group values"], ["Conditional format", "highlight patterns"], ["Chart", "show the trend"]],
  }),
  customFunctions: softwareScreenImage({
    title: "Custom spreadsheet logic",
    subtitle: "Reusable calculations",
    color: "#84cc16",
    code: ["function margin(revenue, cost) {", "  return (revenue - cost) / revenue;", "}", "=MARGIN(B2,C2)", "model → test → reuse"],
  }),
  cppBasics: softwareScreenImage({
    title: "C++ editor",
    subtitle: "Variables and input/output",
    color: "#38bdf8",
    code: ["#include <iostream>", "using namespace std;", "int main() {", "  int n; cin >> n;", "  cout << n * 2;", "}"],
  }),
  cppLoops: softwareScreenImage({
    title: "C++ control structures",
    subtitle: "Selection and loops",
    color: "#38bdf8",
    code: ["for (int i = 0; i < n; i++) {", "  if (values[i] > max) {", "    max = values[i];", "  }", "}", "cout << max;"],
  }),
  cppFunctions: softwareScreenImage({
    title: "C++ functions",
    subtitle: "Reusable program logic",
    color: "#38bdf8",
    code: ["double average(vector<int> values) {", "  double sum = 0;", "  for (int v : values) sum += v;", "  return sum / values.size();", "}"],
  }),
  webHtmlCss: softwareScreenImage({
    title: "HTML + CSS",
    subtitle: "Responsive web interface",
    color: "#f472b6",
    code: ["<section class=\"dashboard\">", "  <h1>Company data</h1>", "  <button>Open report</button>", "</section>", ".dashboard { display: grid; }"],
  }),
  javascript: softwareScreenImage({
    title: "JavaScript",
    subtitle: "Interaction and events",
    color: "#facc15",
    code: ["button.addEventListener('click', () => {", "  const total = calculateTotal(rows);", "  renderChart(total);", "});"],
  }),
  erModel: softwareScreenImage({
    title: "E/R model",
    subtitle: "Entities and relationships",
    color: "#a78bfa",
    panels: [["CUSTOMER", "id · name · email"], ["ORDER", "date · total"], ["PRODUCT", "code · price"], ["1:N", "customer places orders"]],
  }),
  vbSql: softwareScreenImage({
    title: "Visual Basic + SQL",
    subtitle: "Forms connected to data",
    color: "#60a5fa",
    code: ["Private Sub Save_Click()", "  cmd.CommandText = \"INSERT INTO orders ...\"", "  cmd.ExecuteNonQuery()", "End Sub", "SELECT * FROM orders WHERE status='open';"],
  }),
  dbAdvanced: softwareScreenImage({
    title: "Advanced database",
    subtitle: "Joins, keys and constraints",
    color: "#2dd4bf",
    code: ["SELECT c.name, SUM(o.total)", "FROM customers c", "JOIN orders o ON o.customer_id = c.id", "GROUP BY c.name", "HAVING SUM(o.total) > 1000;"],
  }),
  phpBackend: softwareScreenImage({
    title: "PHP backend",
    subtitle: "Server-side web logic",
    color: "#818cf8",
    code: ["<?php", "$stmt = $pdo->prepare($sql);", "$stmt->execute([$id]);", "$rows = $stmt->fetchAll();", "echo json_encode($rows);"],
  }),
  pythonData: softwareScreenImage({
    title: "Python",
    subtitle: "Automation and data handling",
    color: "#facc15",
    code: ["import pandas as pd", "df = pd.read_csv('sales.csv')", "report = df.groupby('area').sum()", "report.to_excel('report.xlsx')"],
  }),
  backendNetwork: softwareScreenImage({
    title: "Networks + backend",
    subtitle: "Services, APIs and security",
    color: "#22d3ee",
    panels: [["Client", "browser request"], ["API", "backend route"], ["Database", "persistent data"], ["Network", "security and access"]],
  }),
};

const imageBank = {
  office: [
    screenBank.word,
    screenBank.slides,
    screenBank.spreadsheet,
    screenBank.files,
  ],
  excelFlow: [
    screenBank.excelFunctions,
    screenBank.excelTables,
    screenBank.customFunctions,
    flowchartImage,
  ],
  pathways: [
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1531498860502-7c67cf02f657?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1400&q=80",
  ],
  yearIII: [
    flowchartImage,
    screenBank.cppBasics,
    screenBank.cppLoops,
    screenBank.cppFunctions,
  ],
  yearIV: [
    screenBank.webHtmlCss,
    screenBank.javascript,
    screenBank.erModel,
    screenBank.vbSql,
  ],
  yearV: [
    screenBank.dbAdvanced,
    screenBank.phpBackend,
    screenBank.pythonData,
    screenBank.backendNetwork,
  ],
  siaAreas: [
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1400&q=80",
  ],
  competences: [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1400&q=80",
  ],
  certificates: [
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80",
  ],
  projects: [
    "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80",
  ],
  erasmus: [
    "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=80",
  ],
  ai: [
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1560439514-4e9645039924?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
  ],
  visit: [
    "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
  ],
};

const chapters = [
  { id: "opening", label: "Opening", eyebrow: "Start", icon: Sparkles },
  { id: "first-year", label: "Year I", eyebrow: "Office suite", icon: FileText },
  { id: "second-year", label: "Year II", eyebrow: "Advanced Excel · Flowcharts", icon: BarChart },
  { id: "third-year", label: "Year III", eyebrow: "Flowcharts · C++", icon: Binary },
  { id: "fourth-year", label: "Year IV", eyebrow: "Web · Databases", icon: MonitorSmartphone },
  { id: "afm", label: "AFM base", eyebrow: "Before specialization", icon: BriefcaseBusiness },
  { id: "sia", label: "SIA", eyebrow: "Specialization", icon: Database },
  { id: "curriculum", label: "Year V", eyebrow: "DB · Backend · Networks", icon: Network },
  { id: "skills", label: "Competences", eyebrow: "Learning outcomes", icon: Network },
  { id: "certifications", label: "Certifications", eyebrow: "External value", icon: BadgeCheck },
  { id: "innovation", label: "Innovation", eyebrow: "Projects", icon: Layers3 },
  { id: "erasmus", label: "Europe", eyebrow: "International mobility", icon: Globe2 },
  { id: "ai-cyber", label: "AI & cybersafety", eyebrow: "STEM · Ethics · AI", icon: ShieldCheck },
  { id: "visit", label: "Visit", eyebrow: "Meeting path", icon: Flag },
];

const firstYearProgram = [
  {
    title: "Word processing",
    text: "Students learn structured documents: styles, page layout, tables, images, indexes and clear digital formatting.",
    image: imageBank.office[0],
    icon: FileText,
  },
  {
    title: "Presentations",
    text: "Slides are used to communicate projects with visual hierarchy, concise text, images, charts and oral presentation logic.",
    image: imageBank.office[1],
    icon: MonitorSmartphone,
  },
  {
    title: "Spreadsheet basics",
    text: "Excel or equivalent spreadsheets introduce cells, formulas, references, charts and simple data organization.",
    image: imageBank.office[2],
    icon: BarChart,
  },
  {
    title: "Digital file workflow",
    text: "Students organize files, export documents, collaborate and use office tools as the first layer of digital productivity.",
    image: imageBank.office[3],
    icon: Database,
  },
];

const secondYearProgram = [
  {
    title: "Advanced spreadsheet functions",
    text: "Functions, nested formulas, logical tests and lookup-style operations are used to solve practical business problems.",
    image: imageBank.excelFlow[0],
    icon: BarChart,
  },
  {
    title: "Tables and data analysis",
    text: "Students organize datasets, filter information, summarize tables and read patterns through charts and structured ranges.",
    image: imageBank.excelFlow[1],
    icon: Database,
  },
  {
    title: "Custom functions and models",
    text: "Spreadsheet work becomes more procedural: students design reusable calculations and small decision models.",
    image: imageBank.excelFlow[2],
    icon: FileText,
  },
  {
    title: "Flowcharts",
    text: "Flowcharts introduce algorithmic thinking before programming: input, process, conditions, loops and output.",
    image: imageBank.excelFlow[3],
    icon: Binary,
  },
];

const siaYearProgram = [
  {
    year: "Year III",
    title: "Algorithms and C++ foundations",
    image: imageBank.yearIII[1],
    icon: Binary,
    modules: [
      "Moving from Year II flowcharts to C++ source code.",
      "Variables, basic input/output and simple expressions in C++.",
      "Conditional structures and loops for repeated procedures.",
      "First complete programs, then functions to organize reusable logic.",
    ],
    output: "Students learn to translate a problem into an algorithm and then into a working C++ program.",
  },
  {
    year: "Year IV",
    title: "Web front-end and database design",
    image: imageBank.yearIV[0],
    icon: MonitorSmartphone,
    modules: [
      "HTML for structure, CSS for layout and responsive interface rules.",
      "JavaScript for interaction, events and dynamic page behavior.",
      "Entity/Relationship models and relational modelling before implementation.",
      "Visual Basic, DBMS logic and SQL queries to create, read and connect business data.",
    ],
    output: "Students connect interface design with structured data, moving from web pages to database-backed systems.",
  },
  {
    year: "Year V",
    title: "Advanced data, backend and networks",
    image: imageBank.yearV[0],
    icon: Network,
    modules: [
      "Advanced database work: normalization, joins, constraints and reliable queries.",
      "PHP and backend logic for business-oriented web applications.",
      "Python for automation, data handling and practical problem solving.",
      "Networks and backend management for company websites and services.",
    ],
    output: "Students read an information system as a complete chain: data, application logic, network and security.",
  },
];

const siaTriennio = [
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
    focus: "future digital professions",
    text: "A lab for future digital professions, focused on the relation between physical and virtual worlds, decentralized web, sharing, attention, contribution and platform economies.",
  },
  {
    title: "Lo Spazio Tras-forma",
    type: "PNRR · Next Generation Classrooms",
    focus: "active learning spaces",
    text: "A project for innovative learning environments, flexible and multifunctional classrooms, new furniture, tools and digital technologies for active teaching.",
  },
  {
    title: "Scuola digitale",
    type: "PNSD · Digital animator",
    focus: "digital transition",
    text: "The digital animator supports school digitization, innovation policies, working groups and staff involvement within the National Digital School Plan.",
  },
  {
    title: "PNRR DM 65/2023",
    type: "New skills and new languages",
    focus: "STEM, AI and languages",
    text: "The project line explicitly connects STEM, artificial intelligence, foreign languages and CLIL. Student notices include podcast and artificial intelligence, educational robotics, Lego Spike, coding and 3D printing.",
  },
  {
    title: "PNRR DM 66/2023",
    type: "Digital transition training",
    focus: "staff training",
    text: "The project line is dedicated to staff training for digital transition.",
  },
];

const aiCyberHighlights = [
  {
    title: "Artificial intelligence with rules",
    tag: "Institutional governance",
    metric: "AI regulation",
    text: "The school document area includes a dedicated regulation for the use of Artificial Intelligence, useful to frame classroom experimentation with shared criteria.",
    icon: FileText,
  },
  {
    title: "Digital Horizons",
    tag: "Erasmus+ dissemination",
    metric: "Didacta 2026",
    text: "The Digital Horizons dissemination highlights appropriate, safe and ethical implementation of digital technologies and AI, involving teachers, students and families.",
    icon: Globe2,
  },
  {
    title: "DANEEL",
    tag: "Cyber citizenship",
    metric: "April 2026",
    text: "The final event, hosted at the University of Florence Novoli campus, focused on growing aware and safe citizens in cyberspace.",
    icon: ShieldCheck,
  },
  {
    title: "STEM laboratories",
    tag: "DM65 learning lines",
    metric: "AI · robotics · 3D",
    text: "The DM65 notices connect artificial intelligence, educational robotics, coding, Lego Spike, podcast work and 3D printing into practical learning paths.",
    icon: Binary,
  },
  {
    title: "Business orientation",
    tag: "Camera di Commercio",
    metric: "SIA/RIM class",
    text: "Students from the articulated SIA and RIM fourth class were hosted in the auditorium through the Florence Chamber of Commerce initiative Orientarsi al Futuro.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Digital services",
    tag: "Everyday infrastructure",
    metric: "Workspace · Office · registro",
    text: "The official services area presents Google Workspace for Education, Office 365, the electronic register, Unica and online payment tools as part of the operational digital ecosystem.",
    icon: MonitorSmartphone,
  },
];

const erasmusFocus = [
  { title: "International comparison", text: "Students and teachers can compare how digital education is organized in different school systems." },
  { title: "Professional vocabulary", text: "SIA topics become easier to discuss abroad when students can explain databases, software and business processes in English." },
  { title: "Digital citizenship", text: "European mobility connects technical competence with responsible online behavior and collaboration." },
  { title: "Project culture", text: "The SIA method fits international project work: analyse, model, build, test and present." },
];

const visitPath = [
  { step: "Welcome", text: "Institutional greeting and reason for the international meeting." },
  { step: "Year I", text: "Office suite: documents, presentations, spreadsheets and file workflow." },
  { step: "Year II", text: "Advanced Excel, functions, tables, custom calculations and flowcharts." },
  { step: "SIA identity", text: "Business information systems: curriculum, competences and professional logic." },
  { step: "Year III", text: "C++ basics, loops, first programs and functions." },
  { step: "Year IV", text: "HTML, CSS, JavaScript, E/R relational models, Visual Basic and SQL." },
  { step: "Year V", text: "Advanced databases, PHP, Python, networks and backend management." },
  { step: "Certifications", text: "ICDL and EUCIP Core as external evidence of digital competence." },
  { step: "AI and cybersafety", text: "AI, robotics, coding, responsible use and cybersecurity as connected digital themes." },
  { step: "Exchange", text: "Discussion on methods, tools, curriculum design and possible collaboration." },
];

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
                <img src={modal.image} alt="" className="h-full max-h-[620px] w-full rounded-[1.4rem] bg-slate-950/70 object-contain opacity-95" />
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
                SIA: where business problems become digital systems.
              </h1>
              <p className="mt-7 max-w-3xl text-xl leading-8 text-slate-300">
                A horizontal storyline for visiting ICT teachers: from the official SIA profile to the real three-year learning path in algorithms, C++, web development, databases, backend, Python, networks and cybersecurity.
              </p>
              <div className="mt-8 grid max-w-4xl grid-cols-4 gap-3">
                {["Flowcharts", "C++", "Web + SQL", "Backend + networks"].map((item) => (
                  <div key={item} className="rounded-[1.3rem] border border-white/10 bg-white/[0.055] p-4">
                    <p className="text-lg font-semibold text-white">{item}</p>
                    <p className="mt-1 text-xs text-slate-400">SIA learning layer</p>
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
                <p className="mt-2 text-2xl font-semibold text-white">Algorithms → software → data → backend → networks</p>
              </div>
            </div>
          </Glass>
        </ChapterShell>

        <ChapterShell chapter={chapters[1]} index={1} activeIndex={activeIndex} className="grid grid-cols-[0.82fr_1.18fr] items-center gap-10">
          <div>
            <h2 className="text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white xl:text-7xl">Year I: digital productivity with the office suite.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">The informatics path starts from practical tools students can immediately use: word processing, presentations, spreadsheets and file workflow. This is the base for later data and programming work.</p>
            <div className="mt-7 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.055]">
              <img src={imageBank.office[0]} alt="Office suite screen" className="h-52 w-full bg-slate-950/70 object-contain opacity-95" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {firstYearProgram.map((item, index) => {
              const Icon = item.icon;
              return (
              <Glass key={item.title} onClick={() => openModal({ title: `Year I · ${item.title}`, body: item.text, icon: Icon, image: item.image })} className="min-h-[190px]">
                <p className="text-4xl font-semibold text-cyan-200">{index + 1}</p>
                <Icon className="absolute right-5 top-5 h-6 w-6 text-cyan-200" />
                <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.text}</p>
              </Glass>
              );
            })}
          </div>
        </ChapterShell>

        <ChapterShell chapter={chapters[2]} index={2} activeIndex={activeIndex} className="grid grid-cols-[1fr_1fr] items-center gap-10">
          <div>
            <h2 className="text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white xl:text-7xl">Year II: advanced Excel and flowcharts.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">The second year moves from tool use to structured problem solving: advanced spreadsheet functions, data tables, custom calculations and flowcharts as a bridge toward programming.</p>
            <div className="mt-7 rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Bridge toward programming</p>
              <p className="mt-3 text-base leading-7 text-cyan-50">Before C++, students learn to represent decisions and procedures visually through flowcharts.</p>
            </div>
          </div>
          <Glass className="grid grid-cols-2 gap-4 p-5">
            {secondYearProgram.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.title}
                  onClick={() => openModal({ title: `Year II · ${item.title}`, body: item.text, icon: Icon, image: item.image })}
                  className="rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-5 text-left transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.085]"
                >
                  <Icon className="h-7 w-7 text-cyan-200" />
                  <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.text}</p>
                </button>
              );
            })}
          </Glass>
        </ChapterShell>

        <ChapterShell chapter={chapters[3]} index={3} activeIndex={activeIndex} className="grid grid-cols-[0.86fr_1.14fr] items-center gap-10">
          <div>
            <h2 className="text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white xl:text-7xl">Year III: from flowcharts to C++ programs.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">After Year II flowcharts, students move into C++. They start from variables and basic input/output, then use selection, loops and functions to build complete programs.</p>
            <div className="mt-7 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.055]">
              <img src={siaYearProgram[0].image} alt="C++ editor screen" className="h-56 w-full bg-slate-950/70 object-contain opacity-95" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {siaYearProgram[0].modules.map((item, index) => (
              <Glass key={item} onClick={() => openModal({ title: `Year III · step ${index + 1}`, body: item, icon: Binary, image: imageBank.yearIII[index] })} className="min-h-[190px]">
                <p className="text-4xl font-semibold text-cyan-200">{index + 1}</p>
                <p className="mt-4 text-lg font-semibold text-white">{item}</p>
              </Glass>
            ))}
            <Glass className="col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Expected output</p>
              <p className="mt-3 text-xl leading-8 text-white">{siaYearProgram[0].output}</p>
            </Glass>
          </div>
        </ChapterShell>

        <ChapterShell chapter={chapters[4]} index={4} activeIndex={activeIndex} className="grid grid-cols-[1fr_1fr] items-center gap-10">
          <div>
            <h2 className="text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white xl:text-7xl">Year IV: web interfaces meet relational data.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">The second SIA year gives students the web stack and then connects it to data modelling: HTML, CSS and JavaScript become the front-end face of systems described with E/R models and implemented through DBMS and SQL.</p>
            <Glass className="mt-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Bridge concept</p>
              <p className="mt-3 text-2xl font-semibold text-white">User interface → data model → database query</p>
            </Glass>
          </div>
          <Glass className="h-[560px] p-0">
            <img src={siaYearProgram[1].image} alt="Web development screen" className="h-44 w-full bg-slate-950/70 object-contain opacity-95" />
            <div className="grid grid-cols-2 gap-3 p-4">
              {siaYearProgram[1].modules.map((item, index) => (
                <button
                  key={item}
                  onClick={() => openModal({ title: `Year IV · ${index < 2 ? "web" : "database"}`, body: item, icon: index < 2 ? MonitorSmartphone : Database, image: imageBank.yearIV[index] })}
                  className="min-h-[112px] rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-4 text-left transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.085]"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">{index < 2 ? "Front-end" : "Data"}</p>
                  <p className="mt-3 text-base font-semibold leading-6 text-white">{item}</p>
                </button>
              ))}
              <div className="col-span-2 rounded-[1.25rem] border border-cyan-300/20 bg-cyan-300/10 p-3">
                <p className="text-sm leading-5 text-cyan-50">{siaYearProgram[1].output}</p>
              </div>
            </div>
          </Glass>
        </ChapterShell>

        <ChapterShell chapter={chapters[5]} index={5} activeIndex={activeIndex} className="grid grid-cols-[0.86fr_1.14fr] items-center gap-10">
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
                <Tooltip cursor={{ fill: "rgba(15, 23, 42, 0.45)" }} contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, color: "#fff" }} />
                <Bar dataKey="y1" name="Year I" fill="#67e8f9" radius={[8, 8, 0, 0]} />
                <Bar dataKey="y2" name="Year II" fill="#a5b4fc" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Glass>
        </ChapterShell>

        <ChapterShell chapter={chapters[6]} index={6} activeIndex={activeIndex} className="grid grid-cols-[0.9fr_1.1fr] items-center gap-10">
          <div>
            <h2 className="text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white xl:text-7xl">SIA is the point where company organization becomes an information system.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">The official SIA profile focuses on the management of business information systems and on the evaluation, choice and adaptation of application software.</p>
            <div className="mt-7 grid grid-cols-2 gap-3">
              {siaSystemAreas.map((area) => (
                <Glass key={area.label} onClick={() => openModal({ title: area.label, body: area.text, icon: Database, image: imageBank.siaAreas[siaSystemAreas.findIndex((item) => item.label === area.label)] })} className="min-h-[116px]">
                  <p className="text-sm font-semibold text-white">{area.label}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{area.text}</p>
                </Glass>
              ))}
            </div>
          </div>
          <Glass className="h-[600px]">
            <h3 className="text-2xl font-semibold text-white">SIA triennium timetable</h3>
            <p className="mt-1 text-sm text-slate-400">Same structure as the previous chart, focused on years III, IV and V.</p>
            <ResponsiveContainer width="100%" height="88%">
              <BarChart data={siaTriennio} margin={{ top: 22, right: 10, left: -15, bottom: 58 }}>
                <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
                <XAxis dataKey="subject" angle={-35} textAnchor="end" height={76} tick={{ fill: "#cbd5e1", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: "rgba(15, 23, 42, 0.45)" }} contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, color: "#fff" }} />
                <Bar dataKey="y3" name="Year III" fill="#67e8f9" radius={[8, 8, 0, 0]} />
                <Bar dataKey="y4" name="Year IV" fill="#818cf8" radius={[8, 8, 0, 0]} />
                <Bar dataKey="y5" name="Year V" fill="#f0abfc" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Glass>
        </ChapterShell>

        <ChapterShell chapter={chapters[7]} index={7} activeIndex={activeIndex} className="grid grid-cols-[0.82fr_1.18fr] items-center gap-10">
          <div>
            <h2 className="text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white xl:text-7xl">Year V: the full business information system.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">After Year III algorithms and Year IV web/database foundations, the final SIA year treats the company website as an information system: reliable data, server-side logic, Python, networks and backend management.</p>
            <div className="mt-7 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.055]">
              <img src={siaYearProgram[2].image} alt="Advanced database screen" className="h-56 w-full bg-slate-950/70 object-contain opacity-95" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {siaYearProgram[2].modules.map((item, index) => (
              <Glass key={item} onClick={() => openModal({ title: `Year V · module ${index + 1}`, body: item, icon: index === 3 ? Network : Database, image: imageBank.yearV[index] })} className="min-h-[185px]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">{["Data", "PHP", "Python", "Networks"][index]}</p>
                <p className="mt-4 text-lg font-semibold leading-7 text-white">{item}</p>
              </Glass>
            ))}
            <Glass className="col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Expected output</p>
              <p className="mt-3 text-xl leading-8 text-white">{siaYearProgram[2].output}</p>
            </Glass>
          </div>
        </ChapterShell>

        <ChapterShell chapter={chapters[8]} index={8} activeIndex={activeIndex} className="grid grid-cols-[0.78fr_1.22fr] items-center gap-10">
          <div>
            <h2 className="text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white xl:text-7xl">The learning outcomes are practical, technical and organizational.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">This scene translates the official SIA profile into a competence map, useful for guests who need to understand what students are expected to know and do.</p>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {siaCompetences.map((competence) => {
              const Icon = competence.icon;
              return (
                <Glass key={competence.title} onClick={() => openModal({ title: competence.title, body: competence.text, icon: Icon, image: imageBank.competences[siaCompetences.findIndex((item) => item.title === competence.title)] })} className="min-h-[190px]">
                  <Icon className="h-7 w-7 text-cyan-200" />
                  <h3 className="mt-4 text-lg font-semibold text-white">{competence.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{competence.text}</p>
                </Glass>
              );
            })}
          </div>
        </ChapterShell>

        <ChapterShell chapter={chapters[9]} index={9} activeIndex={activeIndex} className="grid grid-cols-[0.82fr_1.18fr] items-center gap-10">
          <div>
            <h2 className="text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white xl:text-7xl">Certifications give external evidence to digital competence.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">ICDL and EUCIP Core make the digital profile more readable for international guests because they use recognized, transferable frameworks.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {certifications.map((cert) => {
              const Icon = cert.icon;
              return (
                <Glass key={cert.title} onClick={() => openModal({ title: `${cert.title} · ${cert.subtitle}`, body: cert.points, icon: Icon, extra: cert.metrics.join(" · "), image: imageBank.certificates[certifications.findIndex((item) => item.title === cert.title)] })} className="min-h-[520px]">
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

        <ChapterShell chapter={chapters[10]} index={10} activeIndex={activeIndex} className="grid grid-cols-[0.78fr_1.22fr] items-center gap-10">
          <div>
            <h2 className="text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white xl:text-7xl">Innovation supports the SIA mindset.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">The project layer is useful only when it helps explain what happens in SIA: active laboratories, digital transition, STEM, artificial intelligence, coding and robotics.</p>
            <Glass className="mt-7">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">No financial figures shown</p>
              <p className="mt-3 text-2xl font-semibold text-white">The visitor sees educational value, not budgets.</p>
              <p className="mt-2 text-sm text-slate-400">Sensitive or administrative details are intentionally excluded.</p>
            </Glass>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {projects.map((project, index) => (
              <Glass key={project.title} onClick={() => openModal({ title: project.title, body: project.text, icon: Layers3, extra: `${project.type} · ${project.focus}`, image: imageBank.projects[index] })} className={index === 0 ? "min-h-[230px] ring-2 ring-cyan-300/30" : "min-h-[230px]"}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">{project.type}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{project.title}</h3>
                <p className="mt-2 text-xl font-semibold text-indigo-100">{project.focus}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{project.text}</p>
              </Glass>
            ))}
          </div>
        </ChapterShell>

        <ChapterShell chapter={chapters[11]} index={11} activeIndex={activeIndex} className="grid grid-cols-[0.82fr_1.18fr] items-center gap-10">
          <div>
            <h2 className="text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white xl:text-7xl">European mobility expands the meaning of technical education.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">For visiting teachers, the European layer is best used as a conversation bridge: how students explain algorithms, databases, web apps and digital responsibility across languages and school systems.</p>
            <div className="mt-7 rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
              <p className="text-base leading-7 text-cyan-50">No mobility counts or administrative details are shown. The focus stays on educational exchange and ICT teaching practice.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Glass className="col-span-2 h-[240px] p-0">
              <img src={officialImages.languageLab} alt="Language laboratory" className="h-full w-full object-cover opacity-80" />
              <div className="absolute inset-x-5 bottom-5 rounded-[1.4rem] border border-white/10 bg-slate-950/72 p-4 backdrop-blur-xl">
                <h3 className="text-2xl font-semibold text-white">Language lab as a bridge for ICT exchange</h3>
              </div>
            </Glass>
            {erasmusFocus.map((item) => (
              <Glass key={item.title} onClick={() => openModal({ title: item.title, body: item.text, icon: Globe2, image: imageBank.erasmus[erasmusFocus.findIndex((focus) => focus.title === item.title)] })} className="min-h-[150px]">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.text}</p>
              </Glass>
            ))}
          </div>
        </ChapterShell>

        <ChapterShell chapter={chapters[12]} index={12} activeIndex={activeIndex} className="grid grid-cols-[0.78fr_1.22fr] items-center gap-10">
          <div>
            <h2 className="text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white xl:text-7xl">AI is treated as a cultural, technical and civic question.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">For ICT teachers, this is the strongest “current” layer of the visit: the school links AI, robotics, cybersecurity, digital citizenship and business orientation instead of presenting technology as isolated tools.</p>
            <div className="mt-7 grid grid-cols-2 gap-3">
              {[
                ["STEM line", "new skills and languages"],
                ["Named learning areas", "AI · robotics · coding · 3D"],
                ["Ethical axis", "safe and responsible digital use"],
                ["Business bridge", "SIA/RIM and local enterprise culture"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[1.3rem] border border-white/10 bg-white/[0.055] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">{label}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {aiCyberHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <Glass key={item.title} onClick={() => openModal({ title: item.title, body: item.text, icon: Icon, extra: `${item.tag} · ${item.metric}`, image: imageBank.ai[aiCyberHighlights.findIndex((highlight) => highlight.title === item.title)] })} className="min-h-[245px]">
                  <Icon className="h-8 w-8 text-cyan-200" />
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">{item.tag}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-indigo-100">{item.metric}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{item.text}</p>
                </Glass>
              );
            })}
          </div>
        </ChapterShell>

        <ChapterShell chapter={chapters[13]} index={13} activeIndex={activeIndex} className="grid grid-cols-[0.82fr_1.18fr] items-center gap-10">
          <div>
            <h2 className="text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white xl:text-7xl">A proposed route for the meeting.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">The presentation closes by transforming the website into a practical sequence for the actual visit with foreign ICT teachers.</p>
            <div className="mt-7 rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Source base</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">Official school pages on SIA, study paths, learning spaces, certifications, digital school, AI and Erasmus.</p>
            </div>
          </div>
          <Glass className="p-4">
            <div className="grid grid-cols-3 gap-3">
              {visitPath.map((item, index) => (
                <button
                  key={item.step}
                  onClick={() => openModal({ title: item.step, body: item.text, icon: Flag, image: imageBank.visit[index] })}
                  className="min-h-[145px] rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-4 text-left transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.085]"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-base font-semibold text-slate-950">{index + 1}</div>
                  <h3 className="mt-3 text-base font-semibold text-white">{item.step}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-300">{item.text}</p>
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
