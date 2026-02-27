import { useState, useEffect, useRef } from "react";

// === DATA (exact from bundle) ===
const ENDPOINT = "https://script.google.com/macros/s/AKfycbz7vWWFdx6FEVA8T6xZGEU71KP6Mr-J0CDe1isKVOqdRIHauhW6mLAxGZ8jb6Mt5kc/exec";

const mh = ["Live interactive training sessions","Assignments, quizzes & doubt-solving","Requirement Engineering & Documentation","SDLC, Agile & Scrum frameworks","UML Diagrams — Use Case, Activity, Sequence","BRD, FRD, SRS & RTM mastery","Test Case Writing & UAT Process","AI in Business Analysis","Tools — Jira, Excel, SQL Basics"];

const hh = ["Work on a complete end-to-end project","Prepare BRD from scratch","Prepare FRD with specifications","Create professional UML Diagrams","Write industry-standard Test Cases","UAT simulation & validation","Weekly one-on-one evaluation sessions","Final project presentation to panel","Structured feedback at every stage"];

const yh = [
  {w:"Week 1",t:"BA Foundations & SDLC",i:["Business Analyst role & responsibilities","SDLC — Waterfall, Agile, Scrum","Stakeholder identification & management","Introduction to requirement types"]},
  {w:"Week 2",t:"Requirement Engineering",i:["Elicitation techniques","User Stories & Acceptance Criteria","BRD, FRD & SRS documentation","Prioritization frameworks (MoSCoW)"]},
  {w:"Week 3",t:"UML, RTM & Modeling",i:["Use Case Diagrams","Activity & Sequence Diagrams","Requirements Traceability Matrix","Process flow documentation"]},
  {w:"Week 4",t:"Testing, Tools & AI in BA",i:["Test Case writing & UAT process","Jira, Excel & UML tool overview","AI for requirement drafting & docs","Interview prep & resume strategies"]}
];

const gh = [
  {w:"Week 5",t:"Stakeholders & BRD",i:["Understand project brief","Identify stakeholders & roles","Gather & document requirements","Draft end-to-end BRD"]},
  {w:"Week 6",t:"FRD & Use Cases",i:["Functional specifications","Use case narratives","Edge cases & validations","One-on-one evaluation"]},
  {w:"Week 7",t:"UML + RTM + Test Cases",i:["Create UML diagrams","Build traceability matrix","Write professional test cases","Peer review sessions"]},
  {w:"Week 8",t:"UAT + Final Evaluation",i:["UAT simulation","Fix documentation gaps","Final project presentation","Panel evaluation & certificates"]}
];

const vh = ["Business Requirements Document","Functional Requirements Document","Traceability Matrix (RTM)","Use Case Diagram","Activity Diagram","Sequence Diagram","Test Case Document","Internship Certificate"];

const ph = [
  {icon:"📝",t:"Resume Building Workshop",d:"Craft a BA-focused resume that highlights your project experience and skills"},
  {icon:"💼",t:"LinkedIn Profile Optimization",d:"Optimize your professional profile to attract recruiters in the BA space"},
  {icon:"🎯",t:"Interview Preparation",d:"Structured sessions covering HR & technical BA interview questions"},
  {icon:"🗣️",t:"Mock Interviews",d:"Practice with realistic mock interviews and receive actionable feedback"},
  {icon:"🔗",t:"Placement Assistance",d:"Access to our personalized job portal, job alerts, and application support"},
  {icon:"📬",t:"Job Alerts & Support",d:"Curated BA job opportunities matched to your profile and location"}
];

const bh = [
  {n:"01",t:"Structured 60-Day Roadmap",d:"Clear milestones, weekly targets, and structured progression from day one."},
  {n:"02",t:"Live Instructor-Led Sessions",d:"Learn from industry practitioners in real-time with interactive Q&A."},
  {n:"03",t:"Real Project Simulation",d:"Work on a genuine end-to-end project scenario during your internship."},
  {n:"04",t:"AI in Business Analysis",d:"Learn cutting-edge AI tools for requirement drafting and documentation."},
  {n:"05",t:"One-on-One Evaluation",d:"Personalized weekly evaluation sessions with direct feedback from mentors."},
  {n:"06",t:"Career Support Included",d:"Resume building, mock interviews, LinkedIn optimization, and placement assistance."}
];

const Sh = ["30 Days Live Training","30 Days Project Internship","Dual Certification","Resume & Interview Support","Placement Assistance (No Job Guarantee)","Only 10 Students Per Batch","AI in Business Analysis Module"];

const Od = [
  {q:"Is this a job guarantee program?",a:"No. This is a structured training + internship program. We provide placement assistance and career support, but this is not a job guarantee program."},
  {q:"Are sessions live?",a:"Yes. All training sessions are live and instructor-led with interactive discussions, Q&A, and doubt-solving support."},
  {q:"Will there be one-on-one evaluation?",a:"Yes. The internship phase includes personalized one-on-one evaluation sessions every week, with structured feedback on your deliverables."},
  {q:"Is AI covered in the training?",a:"Yes. You'll learn how to use AI tools for requirement drafting, documentation support, analysis, and productivity enhancement."},
  {q:"Will I receive certificates?",a:"Yes. Upon successful completion and evaluation, you will receive both a Course Completion Certificate and a Project-Based Internship Certificate."},
  {q:"Is prior coding knowledge required?",a:"No. The program is designed for non-technical professionals and beginners. SQL basics and tool overviews are included in the curriculum."}
];

const xh = ["Career switchers entering Business Analysis","Fresh graduates wanting structured IT entry","Manual testers moving to BA roles","Professionals upgrading documentation skills","Non-IT background transitioning into IT","Working professionals upgrading skills"];

const zh = [
  {t:"Business Analysis Course Completion Certificate",s:"Live Training Program",d:"Validates your training in BA fundamentals, requirement engineering, UML documentation, and AI-assisted analysis"},
  {t:"Project-Based Internship Completion Certificate",s:"Internship Program",d:"Certifies your hands-on project work including BRD, FRD, RTM, UML diagrams, test cases, and UAT simulation"}
];

const hf = {
  "Refund Policy":{sections:[{h:"Refund Eligibility",items:["Full refund if requested at least 3 days before batch start.","No refund once live sessions have started.","No refund after course material access provided."]},{h:"Non-Refundable Scenarios",items:["Schedule conflicts or change of mind after sessions begin.","Payment gateway charges may be deducted."]},{h:"How to Request",items:["Email hello@businessanalysis.in with name, email, batch details.","Processed within 7–10 business days."]}]},
  "Privacy Policy":{sections:[{h:"Information We Collect",items:["Name, email, phone during registration.","Payment info processed securely via third-party gateway."]},{h:"How We Use Your Data",items:["Communication, enrollment processing, program updates.","Relevant updates about upcoming batches."]},{h:"Data Protection",items:["We never sell or share your data with third parties.","By using this site, you consent to this policy."]}]},
  "Terms & Conditions":{sections:[{h:"Program Nature",items:["Structured training + project-based internship.","Not an employment contract.","Not a job guarantee program."]},{h:"Student Responsibilities",items:["Attend all sessions and complete assignments on time.","Certification requires completion of both phases."]},{h:"Intellectual Property",items:["All materials are property of Business Analysis Academy.","Cannot be redistributed without written permission."]},{h:"Updates",items:["Academy reserves right to update curriculum and schedule."]}]}
};

// === COMPONENTS ===
function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)", transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s` }}>{children}</div>;
}

const Check = ({ children, light }) => (
  <div style={{ display: "flex", alignItems: "flex-start", gap: 9, marginBottom: 7 }}>
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" style={{ marginTop: 3, flexShrink: 0 }}>
      <circle cx="8" cy="8" r="8" fill={light ? "rgba(96,165,250,.2)" : "rgba(29,99,237,.1)"} />
      <path d="M5 8l2 2 4-4" stroke={light ? "#93C5FD" : "#1D63ED"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span style={{ fontSize: ".86rem", lineHeight: 1.55, color: light ? "rgba(255,255,255,.8)" : "#4B5563" }}>{children}</span>
  </div>
);

const Label = ({ children, light }) => <p style={{ fontFamily: "var(--mono)", fontSize: ".7rem", fontWeight: 700, letterSpacing: ".13em", textTransform: "uppercase", color: light ? "#93C5FD" : "#1D63ED", marginBottom: 12 }}>{children}</p>;

const Title = ({ children, light }) => <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(1.55rem,4vw,2.3rem)", fontWeight: 800, lineHeight: 1.15, marginBottom: 14, color: light ? "#fff" : "#0A1628" }}>{children}</h2>;

const PhoneIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;

// === MAIN APP ===
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(0);
  const [legalOpen, setLegalOpen] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [formType, setFormType] = useState("consultation");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [modalForm, setModalForm] = useState({ name: "", email: "", phone: "", profession: "", experience: "", reason: "", message: "" });

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (legalOpen || formOpen || mobileOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [legalOpen, formOpen, mobileOpen]);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); setMobileOpen(false); };
  
  const openForm = (type = "consultation") => {
    setFormType(type); setSubmitted(false); setSubmitting(false);
    setModalForm({ name: "", email: "", phone: "", profession: "", experience: "", reason: "", message: "" });
    setFormOpen(true); setMobileOpen(false);
  };

  const submitForm = async (data, source) => {
    try {
      setSubmitting(true);
      await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ ...data, source, timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }) });
      setSubmitted(true);
    } catch (e) { console.error(e); setSubmitted(true); } finally { setSubmitting(false); }
  };

  const navItems = ["Program", "Curriculum", "Pricing", "FAQ"];
  const mobileNavItems = ["Program", "Curriculum", "Internship", "Career", "Pricing", "FAQ", "Contact"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=Fraunces:opsz,wght@9..144,700;9..144,800;9..144,900&family=JetBrains+Mono:wght@500;600;700&display=swap');
        :root{--display:'Fraunces',serif;--body:'DM Sans',sans-serif;--mono:'JetBrains Mono',monospace;--blue:#1D63ED;--blue-dk:#1550C7;--navy:#0A1628;--navy2:#132240;--bg:#F7F8FC}
        *{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth;scroll-padding-top:72px}
        body{font-family:var(--body);background:var(--bg);color:#0A1628;-webkit-font-smoothing:antialiased}
        ::selection{background:var(--blue);color:#fff}
        .wrap{width:100%;max-width:1200px;margin:0 auto;padding:0 20px}
        @media(min-width:640px){.wrap{padding:0 32px}}
        .sec{padding:64px 0}@media(min-width:768px){.sec{padding:96px 0}}
        .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:none;border-radius:14px;font-family:var(--body);font-weight:700;cursor:pointer;transition:all .25s;min-height:52px;text-decoration:none;line-height:1.2;font-size:.95rem}
        .bp{background:var(--blue);color:#fff;padding:16px 32px;box-shadow:0 4px 20px rgba(29,99,237,.28)}.bp:hover{background:var(--blue-dk);transform:translateY(-2px);box-shadow:0 8px 28px rgba(29,99,237,.35)}
        .bs{background:transparent;color:var(--blue);border:2px solid var(--blue);padding:14px 30px}.bs:hover{background:var(--blue);color:#fff}
        .bw{background:#fff;color:var(--navy);padding:16px 32px;box-shadow:0 4px 16px rgba(0,0,0,.1)}.bw:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.15)}
        .inp{width:100%;padding:14px 18px;border:2px solid #E5E7EB;border-radius:12px;font-family:var(--body);font-size:.95rem;background:#fff;color:#0A1628;outline:none;transition:border .2s;min-height:48px}
        .inp:focus{border-color:var(--blue)}.inp::placeholder{color:#9CA3AF}
        select.inp{cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 5l3 3 3-3' stroke='%236B7280' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 16px center}
        .card{background:#fff;border:1.5px solid rgba(10,22,40,.06);border-radius:20px;padding:24px 22px;transition:all .3s}
        .card:hover{border-color:rgba(29,99,237,.14);box-shadow:0 8px 28px rgba(29,99,237,.06);transform:translateY(-2px)}
        .g2{display:grid;grid-template-columns:1fr;gap:20px}@media(min-width:768px){.g2{grid-template-columns:1fr 1fr}}
        .g3{display:grid;grid-template-columns:1fr;gap:16px}@media(min-width:640px){.g3{grid-template-columns:1fr 1fr}}@media(min-width:1024px){.g3{grid-template-columns:1fr 1fr 1fr}}
        .g4{display:grid;grid-template-columns:1fr 1fr;gap:14px}@media(min-width:768px){.g4{grid-template-columns:1fr 1fr 1fr 1fr}}
        .ham span{display:block;width:22px;height:2px;background:#0A1628;border-radius:2px;transition:all .3s}
        .ham.on span:nth-child(1){transform:translateY(7px) rotate(45deg)}.ham.on span:nth-child(2){opacity:0}.ham.on span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
        .mob{position:fixed;top:64px;left:0;right:0;bottom:0;background:#fff;z-index:150;padding:24px 20px;display:flex;flex-direction:column;gap:2px;transform:translateX(100%);transition:transform .35s cubic-bezier(.4,0,.2,1);overflow-y:auto;box-shadow:-4px 0 24px rgba(0,0,0,.08)}
        .mob.on{transform:translateX(0)}
        .faq-a{max-height:0;overflow:hidden;transition:max-height .35s ease,padding .35s ease;padding:0 20px}
        .faq-a.on{max-height:220px;padding:0 20px 16px}
        .ov{position:fixed;inset:0;z-index:200;background:rgba(10,22,40,.5);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:16px;animation:fi .25s ease}
        .mb{background:#fff;border-radius:24px;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;box-shadow:0 24px 64px rgba(10,22,40,.2);animation:su .3s cubic-bezier(.22,1,.36,1)}
        @keyframes fi{from{opacity:0}to{opacity:1}}@keyframes su{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes pd{0%,100%{opacity:.4}50%{opacity:1}}
        .dot{background-image:radial-gradient(circle at 1px 1px,rgba(255,255,255,.06) 1px,transparent 0);background-size:28px 28px}
        .gp{background-image:linear-gradient(rgba(10,22,40,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(10,22,40,.03) 1px,transparent 1px);background-size:48px 48px}
        @media(min-width:768px){.desk{display:flex!important}.mobi{display:none!important}}
        @media(max-width:767px){.desk{display:none!important}.mobi{display:flex!important}}
        .wa-float{position:fixed;bottom:24px;right:24px;z-index:90;width:58px;height:58px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(37,211,102,.35);cursor:pointer;transition:all .3s;text-decoration:none;border:none}
        .wa-float:hover{transform:scale(1.08) translateY(-2px);box-shadow:0 8px 28px rgba(37,211,102,.45)}
        .wa-float:active{transform:scale(.96)}
        .wa-float svg{width:28px;height:28px;fill:#fff}
        @media(max-width:767px){.wa-float{bottom:20px;right:16px;width:52px;height:52px}.wa-float svg{width:24px;height:24px}}
        @media(max-width:767px){
          .btn{width:100%;justify-content:center}
          .wrap{padding:0 16px!important}
          .sec{padding:48px 0!important}
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(255,255,255,.95)" : "rgba(247,248,252,.5)", backdropFilter: "blur(18px) saturate(1.6)", borderBottom: `1px solid ${scrolled ? "rgba(10,22,40,.07)" : "transparent"}`, transition: "all .35s", boxShadow: scrolled ? "0 1px 12px rgba(10,22,40,.04)" : "none" }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div style={{ width: 34, height: 50, borderRadius: 13, background: "linear-gradient(160deg,#0F1E3C,#2563EB)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontFamily: "Georgia,serif", fontWeight: 700, fontSize: 15, letterSpacing: 1 }}>BA</span>
            </div>
            <div style={{ lineHeight: 1.15 }}>
              <div style={{ fontWeight: 800, fontSize: ".82rem", color: "#0A1628", letterSpacing: ".02em", textTransform: "uppercase" }}>Business Analysis</div>
              <div style={{ fontWeight: 800, fontSize: ".82rem", color: "var(--blue)", letterSpacing: ".06em", textTransform: "uppercase" }}>Academy</div>
            </div>
          </div>

          <div className="desk" style={{ display: "none", alignItems: "center", gap: 6 }}>
            {navItems.map(p => <button key={p} onClick={() => scrollTo(p)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--body)", fontSize: ".84rem", fontWeight: 600, color: "#6B7280", padding: "8px 14px", borderRadius: 8, transition: "all .2s" }} onMouseEnter={e => { e.target.style.color = "#1D63ED"; e.target.style.background = "rgba(29,99,237,.06)"; }} onMouseLeave={e => { e.target.style.color = "#6B7280"; e.target.style.background = "none"; }}>{p}</button>)}
            <div style={{ width: 1, height: 22, background: "#E5E7EB", margin: "0 6px" }} />
            <a href="tel:8088434442" style={{ display: "flex", alignItems: "center", gap: 5, textDecoration: "none", fontFamily: "var(--body)", fontSize: ".84rem", fontWeight: 600, color: "#0A1628" }}><PhoneIcon />8088434442</a>
            <div style={{ width: 1, height: 22, background: "#E5E7EB", margin: "0 4px" }} />
            <button className="btn bp" onClick={() => openForm("consultation")} style={{ padding: "9px 20px", fontSize: ".82rem", borderRadius: 10, minHeight: 38 }}>Free Consultation</button>
          </div>

          <div className="mobi" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href="tel:8088434442" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 10, background: "rgba(29,99,237,.08)", color: "#1D63ED", textDecoration: "none" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg></a>
            <button className={`ham ${mobileOpen ? "on" : ""}`} onClick={() => setMobileOpen(!mobileOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5 }}><span /><span /><span /></button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mob ${mobileOpen ? "on" : ""}`}>
        {mobileNavItems.map(p => <button key={p} onClick={() => scrollTo(p)} style={{ background: "none", border: "none", textAlign: "left", padding: "15px 8px", fontFamily: "var(--body)", fontSize: "1.05rem", fontWeight: 600, color: "#374151", borderBottom: "1px solid #F3F4F6", cursor: "pointer" }}>{p}</button>)}
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          <button className="btn bp" onClick={() => openForm("consultation")} style={{ width: "100%" }}>Book Free Consultation →</button>
          <button className="btn bs" onClick={() => openForm("enrollment")} style={{ width: "100%" }}>Enroll Now — ₹5,999</button>
        </div>
      </div>

      {/* HERO */}
      <section style={{ minHeight: "100dvh", display: "flex", alignItems: "center", background: "linear-gradient(175deg,#F7F8FC 0%,#E8EEFF 40%,#D4E2FF 100%)", position: "relative", overflow: "hidden", paddingTop: 96, paddingBottom: 48 }}>
        <div style={{ position: "absolute", top: "5%", right: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(29,99,237,.08) 0%,transparent 65%)", animation: "fl 7s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "8%", left: "2%", width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle,rgba(29,99,237,.05) 0%,transparent 65%)", animation: "fl 9s ease-in-out infinite 2s" }} />
        <div className="gp" style={{ position: "absolute", inset: 0 }} />
        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: 700 }}>
            <FadeIn><div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(29,99,237,.07)", borderRadius: 100, padding: "10px 20px", fontSize: ".84rem", fontWeight: 600, color: "#1D63ED", marginBottom: 22 }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: "#1D63ED", animation: "pd 2s infinite" }} />Admissions Open — Only 10 Students Per Batch</div></FadeIn>
            <FadeIn delay={0.07}><h1 style={{ fontFamily: "var(--display)", fontSize: "clamp(1.75rem,5vw,3.3rem)", fontWeight: 800, lineHeight: 1.12, color: "#0A1628", marginBottom: 20, letterSpacing: "-0.01em" }}>30 Days Live Training <span style={{ color: "#1D63ED" }}>+</span> 30 Days Project Internship</h1></FadeIn>
            <FadeIn delay={0.12}><p style={{ fontSize: "clamp(.92rem,2vw,1.08rem)", lineHeight: 1.75, color: "#4B5563", marginBottom: 16, maxWidth: 540 }}>Become Job-Ready as a Business Analyst through Structured Live Sessions, Real Project Experience, and Career Support.</p></FadeIn>
            <FadeIn delay={0.14}><div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(22,163,74,.07)", border: "1px solid rgba(22,163,74,.14)", borderRadius: 100, padding: "8px 20px", marginBottom: 24 }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#16A34A" fillOpacity=".15" /><path d="M5 8l2 2 4-4" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span style={{ fontSize: ".82rem", fontWeight: 600, color: "#15803D" }}>No Coding Required</span>
              <span style={{ width: 1, height: 14, background: "rgba(22,163,74,.2)" }} />
              <span style={{ fontSize: ".82rem", fontWeight: 600, color: "#15803D" }}>Open to All Backgrounds</span>
            </div></FadeIn>
            <FadeIn delay={0.17}><div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
              {["Live Training + Internship", "Only 10 Per Batch", "AI in BA", "1-on-1 Evaluation", "Dual Certification", "Interview Prep"].map((p, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(29,99,237,.05)", borderRadius: 100, padding: "7px 14px", fontSize: ".78rem", fontWeight: 600, color: "#132240" }}>
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#1D63ED" fillOpacity=".14" /><path d="M5 8l2 2 4-4" stroke="#1D63ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>{p}
                </span>
              ))}
            </div></FadeIn>
            <FadeIn delay={0.22}><div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <button className="btn bp" onClick={() => openForm("consultation")} style={{ fontSize: "clamp(.88rem,2vw,1rem)", padding: "16px clamp(24px,4vw,40px)" }}>Book Free Consultation →</button>
              <button className="btn bs" onClick={() => openForm("enrollment")}>Enroll Now — ₹5,999</button>
            </div></FadeIn>
          </div>
        </div>
      </section>

      {/* PROGRAM OVERVIEW */}
      <section id="Program" className="sec" style={{ background: "#fff" }}>
        <div className="wrap">
          <FadeIn><div style={{ textAlign: "center", marginBottom: 44 }}><Label>Program Overview</Label><Title>60 Days to Launch Your BA Career</Title><p style={{ color: "#6B7280", maxWidth: 540, margin: "0 auto", lineHeight: 1.7, fontSize: ".98rem" }}>Structured training designed to prepare you for real Business Analyst roles — from documentation to interviews.</p></div></FadeIn>
          <div className="g2" style={{ gap: 24 }}>
            <FadeIn delay={0.06}>
              <div style={{ background: "linear-gradient(160deg,#0A1628,#132240)", borderRadius: 22, padding: "clamp(26px,4vw,40px) clamp(22px,3vw,30px)", color: "#fff", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -50, right: -50, width: 150, height: 150, borderRadius: "50%", background: "rgba(29,99,237,.1)" }} />
                <p style={{ fontFamily: "var(--mono)", fontSize: ".68rem", letterSpacing: ".12em", textTransform: "uppercase", color: "#93C5FD", fontWeight: 700, marginBottom: 8 }}>Phase 1 — 30 Days</p>
                <h3 style={{ fontFamily: "var(--display)", fontSize: "clamp(1.2rem,2.5vw,1.45rem)", fontWeight: 800, marginBottom: 8 }}>Live Instructor-Led Training</h3>
                <p style={{ color: "rgba(255,255,255,.5)", fontSize: ".86rem", marginBottom: 18, lineHeight: 1.6 }}>Practical approach focused on real documentation and interview preparation</p>
                {mh.map((p, i) => <Check key={i} light>{p}</Check>)}
              </div>
            </FadeIn>
            <FadeIn delay={0.12}>
              <div className="card" style={{ padding: "clamp(26px,4vw,40px) clamp(22px,3vw,30px)" }}>
                <p style={{ fontFamily: "var(--mono)", fontSize: ".68rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--blue)", fontWeight: 700, marginBottom: 8 }}>Phase 2 — 30 Days</p>
                <h3 style={{ fontFamily: "var(--display)", fontSize: "clamp(1.2rem,2.5vw,1.45rem)", fontWeight: 800, marginBottom: 8, color: "#0A1628" }}>Project-Based Internship</h3>
                <p style={{ color: "#6B7280", fontSize: ".86rem", marginBottom: 8, lineHeight: 1.6 }}>Work on real project documentation under guided mentorship</p>
                <p style={{ color: "#6B7280", fontSize: ".76rem", marginBottom: 18, lineHeight: 1.5, fontStyle: "italic", borderLeft: "3px solid rgba(29,99,237,.2)", paddingLeft: 12, opacity: .85 }}>Structured project-based internship conducted under Business Analysis Academy.</p>
                {hh.map((p, i) => <Check key={i}>{p}</Check>)}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* WHO CAN JOIN */}
      <section id="WhoCanJoin" className="sec" style={{ background: "var(--bg)" }}>
        <div className="wrap" style={{ maxWidth: 940 }}>
          <FadeIn><div style={{ textAlign: "center", marginBottom: 44 }}>
            <Label>Eligibility</Label>
            <Title>Who Can Join This Program?</Title>
            <p style={{ color: "#6B7280", maxWidth: 520, margin: "0 auto", lineHeight: 1.7, fontSize: ".95rem" }}>This program is designed for individuals from all backgrounds who want to build a career in Business Analysis.</p>
          </div></FadeIn>
          <div className="g3" style={{ gap: 14 }}>
            {[
              { icon: "🎓", t: "Students from any degree background", d: "Arts, Science, Commerce, Engineering — all are welcome" },
              { icon: "💻", t: "Technical and non-technical professionals", d: "No matter your current domain or expertise" },
              { icon: "🚀", t: "Fresh graduates", d: "Kickstart your IT career with structured training" },
              { icon: "🔄", t: "Career switchers", d: "Transition smoothly into Business Analysis" },
              { icon: "🧪", t: "Manual testers moving to BA roles", d: "Leverage your testing experience in a new direction" },
              { icon: "📈", t: "Working professionals upgrading skills", d: "Upskill while you continue working" }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div className="card" style={{ height: "100%", display: "flex", alignItems: "flex-start", gap: 14, padding: "20px 22px" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(29,99,237,.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: ".92rem", color: "#0A1628", marginBottom: 3, lineHeight: 1.35 }}>{item.t}</p>
                    <p style={{ fontSize: ".82rem", color: "#6B7280", lineHeight: 1.55 }}>{item.d}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div style={{ marginTop: 28, background: "linear-gradient(135deg, rgba(22,163,74,.06), rgba(22,163,74,.03))", border: "1.5px solid rgba(22,163,74,.14)", borderRadius: 16, padding: "22px 28px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(22,163,74,.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#16A34A" fillOpacity=".2" /><path d="M5 8l2 2 4-4" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontWeight: 800, fontSize: "1rem", color: "#15803D", marginBottom: 2 }}>No Coding Knowledge Required</p>
                <p style={{ fontSize: ".86rem", color: "#4B5563", lineHeight: 1.55 }}>Basic computer skills are sufficient to enroll. We teach everything you need from the ground up.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* BLUE CTA BANNER */}
      <section style={{ padding: "clamp(36px,6vw,52px) 0", background: "linear-gradient(135deg,#1D63ED,#1550C7)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,.06)" }} />
        <div className="wrap" style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          <FadeIn>
            <h3 style={{ fontFamily: "var(--display)", fontSize: "clamp(1.15rem,3vw,1.6rem)", fontWeight: 800, color: "#fff", marginBottom: 8, lineHeight: 1.25 }}>Not Sure If This Program Is Right for You?</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: ".92rem", marginBottom: 22, lineHeight: 1.6, maxWidth: 500, margin: "0 auto 22px" }}>Book a free one-on-one consultation. We'll help you understand the program and plan your career switch.</p>
            <button className="btn bw" onClick={() => openForm("consultation")}>Book Free Consultation →</button>
          </FadeIn>
        </div>
      </section>

      {/* CURRICULUM */}
      <section id="Curriculum" className="sec" style={{ background: "var(--bg)" }}>
        <div className="wrap">
          <FadeIn><div style={{ textAlign: "center", marginBottom: 44 }}><Label>Detailed Curriculum</Label><Title>8 Weeks. Structured. Practical.</Title></div></FadeIn>
          <FadeIn><p style={{ fontFamily: "var(--mono)", fontSize: ".7rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}><span style={{ width: 24, height: 2, background: "var(--blue)", borderRadius: 1 }} />Training Phase — Weeks 1–4</p></FadeIn>
          <div className="g4" style={{ marginBottom: 36 }}>
            {yh.map((p, i) => <FadeIn key={i} delay={i * 0.05}><div style={{ background: i === 3 ? "linear-gradient(140deg,#0A1628,#132240)" : "#fff", borderRadius: 16, padding: "20px 18px", border: i === 3 ? "none" : "1px solid rgba(10,22,40,.06)", boxShadow: i === 3 ? "0 8px 24px rgba(10,22,40,.14)" : "0 1px 6px rgba(10,22,40,.03)", color: i === 3 ? "#fff" : "#0A1628" }}>
              <p style={{ fontFamily: "var(--mono)", fontSize: ".64rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 5, color: i === 3 ? "#93C5FD" : "var(--blue)" }}>{p.w}</p>
              <p style={{ fontSize: ".93rem", fontWeight: 700, marginBottom: 10, lineHeight: 1.35 }}>{p.t}</p>
              {p.i.map((item, j) => <p key={j} style={{ fontSize: ".8rem", lineHeight: 1.5, paddingLeft: 13, position: "relative", color: i === 3 ? "rgba(255,255,255,.75)" : "#6B7280", marginBottom: 2 }}><span style={{ position: "absolute", left: 0, top: 2, fontSize: ".62rem", color: i === 3 ? "#60A5FA" : "var(--blue)" }}>▸</span>{item}</p>)}
            </div></FadeIn>)}
          </div>
          <FadeIn><p style={{ fontFamily: "var(--mono)", fontSize: ".7rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}><span style={{ width: 24, height: 2, background: "var(--blue)", borderRadius: 1 }} />Internship Phase — Weeks 5–8</p></FadeIn>
          <div className="g4">
            {gh.map((p, i) => <FadeIn key={i} delay={i * 0.05}><div style={{ background: i === 3 ? "linear-gradient(140deg,#0A1628,#132240)" : "#fff", borderRadius: 16, padding: "20px 18px", border: i === 3 ? "none" : "1px solid rgba(10,22,40,.06)", boxShadow: i === 3 ? "0 8px 24px rgba(10,22,40,.14)" : "0 1px 6px rgba(10,22,40,.03)", color: i === 3 ? "#fff" : "#0A1628" }}>
              <p style={{ fontFamily: "var(--mono)", fontSize: ".64rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 5, color: i === 3 ? "#93C5FD" : "var(--blue)" }}>{p.w}</p>
              <p style={{ fontSize: ".93rem", fontWeight: 700, marginBottom: 10, lineHeight: 1.35 }}>{p.t}</p>
              {p.i.map((item, j) => <p key={j} style={{ fontSize: ".8rem", lineHeight: 1.5, paddingLeft: 13, position: "relative", color: i === 3 ? "rgba(255,255,255,.75)" : "#6B7280", marginBottom: 2 }}><span style={{ position: "absolute", left: 0, top: 2, fontSize: ".62rem", color: i === 3 ? "#60A5FA" : "var(--blue)" }}>▸</span>{item}</p>)}
            </div></FadeIn>)}
          </div>
        </div>
      </section>

      {/* INTERNSHIP DARK SECTION */}
      <section id="Internship" className="sec dot" style={{ background: "linear-gradient(160deg,#0A1628,#132240)", color: "#fff", position: "relative" }}>
        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <div className="g2" style={{ gap: "clamp(28px,5vw,52px)", alignItems: "center" }}>
            <FadeIn>
              <Label light>Industry-Style Practical Internship</Label>
              <Title light>Live Project Internship Experience</Title>
              <p style={{ color: "rgba(255,255,255,.6)", lineHeight: 1.7, marginBottom: 10, fontSize: ".93rem" }}>During the 30-Day Internship, you'll work on a complete project simulation — preparing the same documentation expected in real BA roles.</p>
              <p style={{ color: "rgba(255,255,255,.4)", lineHeight: 1.6, marginBottom: 22, fontSize: ".82rem", fontStyle: "italic", borderLeft: "3px solid rgba(96,165,250,.3)", paddingLeft: 14 }}>Structured project-based internship conducted under Business Analysis Academy for practical learning purposes.</p>
              {["Work on one complete end-to-end project", "Prepare industry-style BA documentation", "Weekly one-on-one evaluation sessions", "Receive structured, actionable feedback", "Attend dedicated doubt-solving sessions", "Present final project to evaluation panel"].map((p, i) => <Check key={i} light>{p}</Check>)}
            </FadeIn>
            <FadeIn delay={0.1}>
              <p style={{ fontFamily: "var(--mono)", fontSize: ".66rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#93C5FD", marginBottom: 14 }}>Your Deliverables</p>
              <div className="g2" style={{ gap: 10 }}>
                {vh.map((p, i) => <div key={i} style={{ background: "rgba(255,255,255,.04)", borderRadius: 12, padding: "13px 15px", border: "1px solid rgba(255,255,255,.06)", fontSize: ".82rem", fontWeight: 500, color: "rgba(255,255,255,.8)", lineHeight: 1.4, display: "flex", alignItems: "flex-start", gap: 8 }}><span style={{ color: "#60A5FA", flexShrink: 0 }}>📄</span>{p}</div>)}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CAREER SUPPORT */}
      <section id="Career" className="sec" style={{ background: "#fff" }}>
        <div className="wrap">
          <FadeIn><div style={{ textAlign: "center", marginBottom: 44 }}><Label>Career Support</Label><Title>We Don't Just Train — We Prepare You</Title><p style={{ color: "#6B7280", maxWidth: 500, margin: "0 auto", lineHeight: 1.7, fontSize: ".93rem" }}>Dedicated support to help you prepare for and land your first Business Analyst role.</p></div></FadeIn>
          <div className="g3">
            {ph.map((p, i) => <FadeIn key={i} delay={i * 0.04}><div className="card" style={{ height: "100%" }}>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: "rgba(29,99,237,.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", marginBottom: 12 }}>{p.icon}</div>
              <p style={{ fontWeight: 700, fontSize: ".93rem", color: "#0A1628", marginBottom: 4 }}>{p.t}</p>
              <p style={{ fontSize: ".84rem", color: "#6B7280", lineHeight: 1.6 }}>{p.d}</p>
            </div></FadeIn>)}
          </div>
        </div>
      </section>

      {/* CERTIFICATION & RECOGNITION */}
      <section className="sec" style={{ background: "var(--bg)" }}>
        <div className="wrap" style={{ maxWidth: 880 }}>
          <FadeIn><div className="card" style={{ textAlign: "center", padding: "clamp(32px,5vw,52px) clamp(20px,4vw,38px)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg,#1D63ED,#60A5FA,#1D63ED)" }} />
            <Label>Dual Certification</Label><Title>Certification & Internship Recognition</Title>
            <p style={{ color: "#6B7280", maxWidth: 500, margin: "0 auto 28px", lineHeight: 1.7, fontSize: ".93rem" }}>Upon successful completion and final evaluation, you'll receive two certificates along with portfolio-ready project documentation.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
              <div className="g2" style={{ gap: 14 }}>
                {zh.map((p, i) => <div key={i} style={{ background: "linear-gradient(160deg,#0A1628,#132240)", borderRadius: 18, padding: "clamp(22px,3vw,30px) clamp(18px,3vw,26px)", color: "#fff", textAlign: "left" }}>
                  <div style={{ width: 42, height: 42, borderRadius: 11, background: "rgba(96,165,250,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", marginBottom: 12 }}>📜</div>
                  <p style={{ fontWeight: 800, fontSize: ".95rem", marginBottom: 3 }}>{p.t}</p>
                  <p style={{ fontFamily: "var(--mono)", fontSize: ".64rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#93C5FD", marginBottom: 8 }}>{p.s}</p>
                  <p style={{ fontSize: ".82rem", color: "rgba(255,255,255,.6)", lineHeight: 1.6 }}>{p.d}</p>
                </div>)}
              </div>
              <div style={{ background: "#fff", borderRadius: 16, padding: "20px 24px", border: "1.5px solid rgba(29,99,237,.1)", textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 11, background: "rgba(29,99,237,.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>📂</div>
                  <div>
                    <p style={{ fontWeight: 800, fontSize: ".95rem", color: "#0A1628", marginBottom: 3 }}>Portfolio-Ready Documentation</p>
                    <p style={{ fontFamily: "var(--mono)", fontSize: ".64rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 8 }}>Project Deliverables</p>
                    <p style={{ fontSize: ".82rem", color: "#6B7280", lineHeight: 1.6 }}>BRD, FRD, UML Diagrams, RTM, and Test Cases — ready to showcase in interviews and job applications</p>
                  </div>
                </div>
              </div>
            </div>
            <p style={{ fontSize: ".78rem", color: "#9CA3AF", marginTop: 22, lineHeight: 1.6, maxWidth: 480, margin: "22px auto 0", fontStyle: "italic" }}>Certificates are issued upon successful completion of training sessions, internship tasks, and final evaluation.</p>
          </div></FadeIn>
        </div>
      </section>

      {/* WHY THIS PROGRAM IS CAREER-FOCUSED */}
      <section className="sec" style={{ background: "var(--bg)" }}>
        <div className="wrap" style={{ maxWidth: 940 }}>
          <FadeIn><div style={{ textAlign: "center", marginBottom: 44 }}><Label>Why This Program</Label><Title>Why This Program Is Career-Focused</Title><p style={{ color: "#6B7280", maxWidth: 520, margin: "0 auto", lineHeight: 1.7, fontSize: ".93rem" }}>Practical approach focused on real documentation, live evaluation, and interview preparation.</p></div></FadeIn>
          <div className="g2" style={{ gap: 18 }}>
            {[
              {n:"01",t:"Practical Documentation Work",d:"You'll create real BRDs, FRDs, UML diagrams, and test cases — the same deliverables expected in actual BA roles."},
              {n:"02",t:"Live Project Simulation",d:"Work on a structured end-to-end project scenario during the internship phase with guided mentorship."},
              {n:"03",t:"Weekly One-on-One Evaluation",d:"Personalized feedback sessions every week to track your progress and improve your deliverables."},
              {n:"04",t:"AI Tools for Business Analysis",d:"Learn how to use AI tools for requirement drafting, documentation, and productivity in BA workflows."},
              {n:"05",t:"Resume & Interview Preparation",d:"Dedicated sessions for BA-focused resume building, LinkedIn optimization, and mock interview practice."},
              {n:"06",t:"Placement Assistance Support",d:"Job alerts, application support, and placement assistance to help you land BA roles. Not a job guarantee."}
            ].map((p, i) => <FadeIn key={i} delay={i * 0.04}><div style={{ display: "flex", gap: 13, alignItems: "flex-start" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: ".73rem", fontWeight: 700, color: "var(--blue)", background: "rgba(29,99,237,.07)", width: 42, height: 42, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{p.n}</div>
              <div><p style={{ fontWeight: 700, fontSize: ".93rem", color: "#0A1628", marginBottom: 3 }}>{p.t}</p><p style={{ fontSize: ".84rem", color: "#6B7280", lineHeight: 1.6 }}>{p.d}</p></div>
            </div></FadeIn>)}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="Pricing" className="sec" style={{ background: "#fff" }}>
        <div className="wrap" style={{ maxWidth: 520 }}>
          <FadeIn><div style={{ textAlign: "center", background: "linear-gradient(160deg,#0A1628,#132240)", borderRadius: 24, padding: "clamp(32px,5vw,48px) clamp(22px,4vw,36px)", color: "#fff", boxShadow: "0 20px 56px rgba(10,22,40,.22)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -60, right: -60, width: 190, height: 190, borderRadius: "50%", background: "rgba(29,99,237,.12)" }} />
            <div style={{ position: "absolute", bottom: -40, left: -40, width: 130, height: 130, borderRadius: "50%", background: "rgba(96,165,250,.06)" }} />
            <div style={{ position: "relative" }}>
              <p style={{ fontFamily: "var(--mono)", fontSize: ".68rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#93C5FD", marginBottom: 12 }}>Early Bird Offer</p>
              <p style={{ color: "rgba(255,255,255,.4)", fontSize: "1rem", textDecoration: "line-through", marginBottom: 2 }}>₹14,999</p>
              <p style={{ fontFamily: "var(--display)", fontSize: "clamp(2.2rem,6vw,3rem)", fontWeight: 900, marginBottom: 4 }}>₹5,999</p>
              <p style={{ color: "rgba(255,255,255,.5)", fontSize: ".84rem", marginBottom: 28 }}>One-time payment · Full program access</p>
              <div style={{ textAlign: "left", marginBottom: 24 }}>
                {Sh.map((p, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: i < 6 ? "1px solid rgba(255,255,255,.06)" : "none", fontSize: ".86rem", color: "rgba(255,255,255,.8)" }}>
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="rgba(96,165,250,.2)" /><path d="M5 8l2 2 4-4" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>{p}
                </div>)}
              </div>
              <button className="btn bw" onClick={() => openForm("enrollment")} style={{ width: "100%", fontSize: "1rem", padding: "16px 0" }}>Enroll Now — ₹5,999 →</button>
              <p style={{ fontFamily: "var(--mono)", marginTop: 12, fontSize: ".7rem", color: "rgba(255,255,255,.3)", letterSpacing: ".04em" }}>Only 10 Students Per Batch</p>
            </div>
          </div></FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section id="FAQ" className="sec" style={{ background: "var(--bg)" }}>
        <div className="wrap" style={{ maxWidth: 680 }}>
          <FadeIn><div style={{ textAlign: "center", marginBottom: 36 }}><Label>FAQ</Label><Title>Frequently Asked Questions</Title></div></FadeIn>
          <FadeIn delay={0.05}><div style={{ background: "#fff", borderRadius: 20, padding: "6px 0", border: "1px solid rgba(10,22,40,.06)", boxShadow: "0 2px 14px rgba(10,22,40,.03)" }}>
            {Od.map((p, i) => <div key={i} style={{ borderBottom: i < Od.length - 1 ? "1px solid rgba(10,22,40,.06)" : "none" }}>
              <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", fontFamily: "var(--body)", fontSize: ".9rem", fontWeight: 700, color: "#0A1628", textAlign: "left", lineHeight: 1.4, gap: 14 }}>
                {p.q}<span style={{ transform: faqOpen === i ? "rotate(180deg)" : "none", transition: "transform .3s", fontSize: ".78rem", flexShrink: 0, color: "#6B7280" }}>▾</span>
              </button>
              <div className={`faq-a ${faqOpen === i ? "on" : ""}`}><p style={{ color: "#6B7280", fontSize: ".86rem", lineHeight: 1.7 }}>{p.a}</p></div>
            </div>)}
          </div></FadeIn>
        </div>
      </section>

      {/* CONTACT */}
      <section id="Contact" className="sec" style={{ background: "#fff" }}>
        <div className="wrap">
          <div className="g2" style={{ gap: "clamp(28px,5vw,44px)", alignItems: "start" }}>
            <FadeIn>
              <Label>Get in Touch</Label><Title>Have Questions?</Title>
              <p style={{ color: "#6B7280", lineHeight: 1.7, marginBottom: 24, fontSize: ".93rem" }}>Reach out with any questions about the program, curriculum, or enrollment.</p>
              {[{ ic: "✉️", l: "Email us at", v: "hello@businessanalysis.in", h: "mailto:hello@businessanalysis.in" }, { ic: "📞", l: "Call us at", v: "8088434442", h: "tel:8088434442" }, { ic: "🌐", l: "Visit", v: "businessanalysis.in" }].map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 13, background: "rgba(29,99,237,.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{p.ic}</div>
                  <div><p style={{ fontSize: ".76rem", color: "#6B7280", fontWeight: 500 }}>{p.l}</p>{p.h ? <a href={p.h} style={{ fontWeight: 700, color: "#0A1628", fontSize: ".93rem", textDecoration: "none" }}>{p.v}</a> : <p style={{ fontWeight: 700, color: "#0A1628", fontSize: ".93rem" }}>{p.v}</p>}</div>
                </div>
              ))}
            </FadeIn>
            <FadeIn delay={0.08}>
              <div style={{ background: "var(--bg)", borderRadius: 20, padding: "clamp(20px,3vw,28px)", border: "1px solid rgba(10,22,40,.06)" }}>
                <div style={{ display: "grid", gap: 12 }}>
                  <div><label style={{ fontSize: ".82rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Full Name</label><input className="inp" placeholder="Your name" value={contactForm.name} onChange={e => setContactForm({ ...contactForm, name: e.target.value })} /></div>
                  <div className="g2" style={{ gap: 12 }}>
                    <div><label style={{ fontSize: ".82rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Email</label><input className="inp" placeholder="you@email.com" type="email" value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} /></div>
                    <div><label style={{ fontSize: ".82rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Phone</label><input className="inp" placeholder="+91 ..." value={contactForm.phone} onChange={e => setContactForm({ ...contactForm, phone: e.target.value })} /></div>
                  </div>
                  <div><label style={{ fontSize: ".82rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Message</label><textarea className="inp" placeholder="Your question..." rows={3} style={{ resize: "vertical" }} value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })} /></div>
                  <button className="btn bp" style={{ width: "100%", opacity: contactForm.name && contactForm.email && contactForm.phone ? 1 : 0.5, pointerEvents: contactForm.name && contactForm.email && contactForm.phone ? "auto" : "none" }} onClick={async () => { await submitForm({ ...contactForm, profession: "", experience: "", reason: "" }, "contact"); setContactForm({ name: "", email: "", phone: "", message: "" }); }}>Send Message →</button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="dot" style={{ padding: "clamp(48px,8vw,68px) 0", background: "linear-gradient(160deg,#0A1628,#132240)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle,rgba(29,99,237,.12) 0%,transparent 60%)" }} />
        <div className="wrap" style={{ textAlign: "center", position: "relative", zIndex: 2, maxWidth: 660 }}>
          <FadeIn>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(1.3rem,3.5vw,1.9rem)", fontWeight: 800, color: "#fff", marginBottom: 10, lineHeight: 1.2 }}>Ready to Start Your Business Analyst Journey?</h2>
            <p style={{ color: "rgba(255,255,255,.55)", fontSize: ".93rem", marginBottom: 24, lineHeight: 1.7, maxWidth: 480, margin: "0 auto 24px" }}>Talk to our team for free. Understand the program, ask your questions, and plan your career switch.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn bw" onClick={() => openForm("consultation")} style={{ fontSize: ".96rem", padding: "15px 34px" }}>Book Free Consultation →</button>
              <button className="btn bs" onClick={() => scrollTo("Pricing")} style={{ borderColor: "rgba(255,255,255,.25)", color: "rgba(255,255,255,.85)", fontSize: ".9rem" }}>View Pricing</button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0A1628", color: "#fff", padding: "44px 0 22px" }}>
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", flexWrap: "wrap", gap: 28, marginBottom: 32 }}>
            <div style={{ maxWidth: 280 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 26, height: 38, borderRadius: 10, background: "linear-gradient(160deg,#0F1E3C,#2563EB)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontFamily: "Georgia,serif", fontWeight: 700, fontSize: 11 }}>BA</span></div>
                <div style={{ lineHeight: 1.15 }}><div style={{ fontWeight: 800, fontSize: ".78rem", color: "#fff", textTransform: "uppercase", letterSpacing: ".02em" }}>Business Analysis</div><div style={{ fontWeight: 800, fontSize: ".78rem", color: "#93C5FD", textTransform: "uppercase", letterSpacing: ".06em" }}>Academy</div></div>
              </div>
              <p style={{ color: "rgba(255,255,255,.32)", fontSize: ".82rem", lineHeight: 1.6 }}>Structured Learning. Real Projects. Career Ready.</p>
              <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 5 }}>
                <a href="tel:8088434442" style={{ color: "rgba(255,255,255,.4)", fontSize: ".8rem", textDecoration: "none" }}>📞 8088434442</a>
                <a href="mailto:hello@businessanalysis.in" style={{ color: "rgba(255,255,255,.4)", fontSize: ".8rem", textDecoration: "none" }}>✉️ hello@businessanalysis.in</a>
              </div>
            </div>
            <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
              {mobileNavItems.map(p => <button key={p} onClick={() => scrollTo(p)} style={{ background: "none", border: "none", color: "rgba(255,255,255,.38)", fontFamily: "var(--body)", fontSize: ".82rem", cursor: "pointer", padding: 0 }}>{p}</button>)}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ color: "rgba(255,255,255,.2)", fontSize: ".76rem" }}>© 2026 Business Analysis Academy. All rights reserved.</p>
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
              {["Privacy Policy", "Refund Policy", "Terms & Conditions"].map(p => <button key={p} onClick={() => setLegalOpen(p)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.28)", fontSize: ".76rem", fontFamily: "var(--body)", padding: 0 }}>{p}</button>)}
            </div>
          </div>
        </div>
      </footer>

      {/* LEGAL MODAL */}
      {legalOpen && hf[legalOpen] && (
        <div className="ov" onClick={e => e.target === e.currentTarget && setLegalOpen(null)}>
          <div className="mb">
            <div style={{ padding: "22px 24px", borderBottom: "1px solid #F3F4F6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div><h3 style={{ fontFamily: "var(--display)", fontSize: "1.15rem", fontWeight: 800, color: "#0A1628" }}>{legalOpen}</h3><p style={{ fontFamily: "var(--mono)", fontSize: ".66rem", color: "var(--blue)", textTransform: "uppercase", letterSpacing: ".08em" }}>Effective from February 2026</p></div>
              <button onClick={() => setLegalOpen(null)} style={{ width: 34, height: 34, borderRadius: 10, border: "1.5px solid #E5E7EB", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".95rem", color: "#6B7280" }}>✕</button>
            </div>
            <div style={{ padding: "20px 24px" }}>
              {hf[legalOpen].sections.map((s, i) => (
                <div key={i} style={{ marginBottom: i < hf[legalOpen].sections.length - 1 ? 20 : 0 }}>
                  <p style={{ fontWeight: 700, fontSize: ".92rem", color: "#0A1628", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 22, height: 22, borderRadius: 7, background: "rgba(29,99,237,.08)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--mono)", fontSize: ".66rem", fontWeight: 700, color: "var(--blue)", flexShrink: 0 }}>{i + 1}</span>{s.h}
                  </p>
                  {s.items.map((item, j) => <p key={j} style={{ fontSize: ".85rem", color: "#6B7280", lineHeight: 1.7, paddingLeft: 30, position: "relative", marginBottom: 4 }}><span style={{ position: "absolute", left: 10, top: 8, width: 4, height: 4, borderRadius: "50%", background: "#D1D5DB" }} />{item}</p>)}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ENROLLMENT / CONSULTATION MODAL */}
      {formOpen && (
        <div className="ov" onClick={e => e.target === e.currentTarget && setFormOpen(false)}>
          <div className="mb">
            <div style={{ padding: "22px 24px", borderBottom: "1px solid #F3F4F6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div><h3 style={{ fontFamily: "var(--display)", fontSize: "1.12rem", fontWeight: 800, color: "#0A1628" }}>{formType === "enrollment" ? "Enroll Now — ₹5,999" : "Book Free Consultation"}</h3><p style={{ fontFamily: "var(--mono)", fontSize: ".66rem", color: "var(--blue)", textTransform: "uppercase", letterSpacing: ".08em" }}>We'll contact you within 24 hours</p></div>
              <button onClick={() => setFormOpen(false)} style={{ width: 34, height: 34, borderRadius: 10, border: "1.5px solid #E5E7EB", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".95rem", color: "#6B7280" }}>✕</button>
            </div>
            <div style={{ padding: "22px 24px" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "28px 0" }}>
                  <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(22,163,74,.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: "1.6rem" }}>✅</div>
                  <h4 style={{ fontFamily: "var(--display)", fontSize: "1.2rem", fontWeight: 800, color: "#0A1628", marginBottom: 8 }}>Thank You!</h4>
                  <p style={{ color: "#6B7280", fontSize: ".9rem", lineHeight: 1.7, maxWidth: 320, margin: "0 auto 20px" }}>{formType === "enrollment" ? "Our team will contact you within 24 hours to confirm your enrollment." : "Our team will contact you within 24 hours to schedule your consultation."}</p>
                  <button className="btn bp" onClick={() => setFormOpen(false)} style={{ padding: "11px 28px" }}>Close</button>
                </div>
              ) : (
                <div style={{ display: "grid", gap: 12 }}>
                  <div><label style={{ fontSize: ".82rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Full Name <span style={{ color: "#DC2626" }}>*</span></label><input className="inp" placeholder="Your name" value={modalForm.name} onChange={e => setModalForm({ ...modalForm, name: e.target.value })} /></div>
                  <div className="g2" style={{ gap: 12 }}>
                    <div><label style={{ fontSize: ".82rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Email <span style={{ color: "#DC2626" }}>*</span></label><input className="inp" placeholder="you@email.com" type="email" value={modalForm.email} onChange={e => setModalForm({ ...modalForm, email: e.target.value })} /></div>
                    <div><label style={{ fontSize: ".82rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Phone <span style={{ color: "#DC2626" }}>*</span></label><input className="inp" placeholder="+91 ..." value={modalForm.phone} onChange={e => setModalForm({ ...modalForm, phone: e.target.value })} /></div>
                  </div>
                  <div className="g2" style={{ gap: 12 }}>
                    <div><label style={{ fontSize: ".82rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Current Profession</label><input className="inp" placeholder="e.g. Software Tester" value={modalForm.profession} onChange={e => setModalForm({ ...modalForm, profession: e.target.value })} /></div>
                    <div><label style={{ fontSize: ".82rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Experience</label>
                      <select className="inp" value={modalForm.experience} onChange={e => setModalForm({ ...modalForm, experience: e.target.value })}>
                        <option value="">Select</option><option>Fresher (0 years)</option><option>1–2 years</option><option>3–5 years</option><option>5+ years</option>
                      </select>
                    </div>
                  </div>
                  <div><label style={{ fontSize: ".82rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Why become a Business Analyst?</label>
                    <select className="inp" value={modalForm.reason} onChange={e => setModalForm({ ...modalForm, reason: e.target.value })}>
                      <option value="">Select a reason</option><option>Career switch from another field</option><option>Upgrade my current skills</option><option>Fresh graduate entering IT</option><option>Transitioning from Testing to BA</option><option>Better career opportunities</option><option>Other</option>
                    </select>
                  </div>
                  <div><label style={{ fontSize: ".82rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Message <span style={{ color: "#9CA3AF", fontWeight: 400 }}>(optional)</span></label><textarea className="inp" placeholder="Any questions..." rows={2} style={{ resize: "vertical" }} value={modalForm.message} onChange={e => setModalForm({ ...modalForm, message: e.target.value })} /></div>
                  <button className="btn bp" style={{ width: "100%", marginTop: 2, opacity: modalForm.name && modalForm.email && modalForm.phone && !submitting ? 1 : 0.5, pointerEvents: modalForm.name && modalForm.email && modalForm.phone && !submitting ? "auto" : "none" }} onClick={() => submitForm(modalForm, formType)}>{submitting ? "Submitting..." : formType === "enrollment" ? "Submit Enrollment →" : "Request Consultation →"}</button>
                  <p style={{ textAlign: "center", fontSize: ".76rem", color: "#9CA3AF" }}>🔒 Your information is secure and will not be shared.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        className="wa-float"
        href="https://wa.me/918088434442?text=Hi%2C%20I%20am%20interested%20in%20the%2030%20Days%20Business%20Analyst%20Live%20Training%20%2B%2030%20Days%20Project-Based%20Internship.%20Please%20share%20details."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.926 15.926 0 0016.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.302 22.602c-.388 1.094-1.938 2.004-3.164 2.268-.84.178-1.938.32-5.632-1.21-4.726-1.956-7.77-6.756-8.006-7.07-.228-.314-1.866-2.486-1.866-4.744 0-2.258 1.18-3.368 1.6-3.828.388-.424.914-.6 1.218-.6.152 0 .29.008.414.014.42.018.63.042.906.706.346.83 1.188 2.898 1.292 3.11.106.212.212.492.072.778-.13.29-.244.468-.458.722-.214.254-.44.45-.654.726-.194.24-.412.496-.176.916.236.42 1.05 1.734 2.256 2.81 1.55 1.384 2.856 1.814 3.262 2.012.406.198.644.166.882-.1.24-.268 1.026-1.192 1.3-1.6.272-.41.544-.342.916-.206.374.136 2.372 1.12 2.778 1.324.406.204.676.306.776.476.098.17.098.984-.29 2.076z"/></svg>
      </a>
    </>
  );
}
