import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */
const ENDPOINT = "https://script.google.com/macros/s/AKfycbz7vWWFdx6FEVA8T6xZGEU71KP6Mr-J0CDe1isKVOqdRIHauhW6mLAxGZ8jb6Mt5kc/exec";

const TRAINING = ["Live interactive training sessions","Assignments, quizzes & doubt-solving","Requirement Engineering & Documentation","SDLC, Agile & Scrum frameworks","UML Diagrams — Use Case, Activity, Sequence","BRD, FRD, SRS & RTM mastery","Test Case Writing & UAT Process","AI in Business Analysis","Tools — Jira, Excel, SQL Basics"];

const INTERNSHIP = ["Work on a complete end-to-end project","Prepare BRD from scratch","Prepare FRD with specifications","Create professional UML Diagrams","Write industry-standard Test Cases","UAT simulation & validation","Weekly one-on-one evaluation sessions","Final project presentation to panel","Structured feedback at every stage"];

const WEEKS = [
  {w:"Week 1",t:"BA Foundations & SDLC",i:["Business Analyst role & responsibilities","SDLC — Waterfall, Agile, Scrum","Stakeholder identification & management","Introduction to requirement types"]},
  {w:"Week 2",t:"Requirement Engineering",i:["Elicitation techniques","User Stories & Acceptance Criteria","BRD, FRD & SRS documentation","Prioritization frameworks (MoSCoW)"]},
  {w:"Week 3",t:"UML, RTM & Modeling",i:["Use Case Diagrams","Activity & Sequence Diagrams","Requirements Traceability Matrix","Process flow documentation"]},
  {w:"Week 4",t:"Testing, Tools & AI in BA",i:["Test Case writing & UAT process","Jira, Excel & UML tool overview","AI for requirement drafting & docs","Interview prep & resume strategies"]},
  {w:"Week 5",t:"Stakeholders & BRD",i:["Understand project brief","Identify stakeholders & roles","Gather & document requirements","Draft end-to-end BRD"]},
  {w:"Week 6",t:"FRD & Use Cases",i:["Functional specifications","Use case narratives","Edge cases & validations","One-on-one evaluation"]},
  {w:"Week 7",t:"UML + RTM + Test Cases",i:["Create UML diagrams","Build traceability matrix","Write professional test cases","Peer review sessions"]},
  {w:"Week 8",t:"UAT + Final Evaluation",i:["UAT simulation","Fix documentation gaps","Final project presentation","Panel evaluation & certificates"]}
];

const DELIVERABLES = ["Business Requirements Document","Functional Requirements Document","Traceability Matrix (RTM)","Use Case Diagram","Activity Diagram","Sequence Diagram","Test Case Document","Internship Certificate"];

const PREPARES = [
  {icon:"📄",t:"Practical Documentation",d:"Create real BRDs, FRDs, UML diagrams, and test cases — the same deliverables expected in actual BA roles."},
  {icon:"🎯",t:"Live Project Simulation",d:"Work on a structured end-to-end project during the internship with guided mentorship."},
  {icon:"📊",t:"Weekly Evaluation",d:"Personalized one-on-one feedback sessions every week to improve your deliverables."},
  {icon:"🤖",t:"AI Tools for BA",d:"Learn AI tools for requirement drafting, documentation, and productivity."},
  {icon:"📝",t:"Resume & Interview Prep",d:"BA-focused resume building, LinkedIn optimization, and mock interview practice."},
  {icon:"🔗",t:"Placement Assistance",d:"Job alerts, application support, and placement help. Not a job guarantee."}
];

const PRICING = ["30 Days Live Training","30 Days Project Internship","Dual Certification","Resume & Interview Support","Placement Assistance (No Job Guarantee)","Only 10 Students Per Batch","AI in Business Analysis Module"];

const FAQS = [
  {q:"Is this a job guarantee program?",a:"No. This is a structured training + internship program. We provide placement assistance and career support, but this is not a job guarantee program."},
  {q:"Are sessions live?",a:"Yes. All training sessions are live and instructor-led with interactive discussions, Q&A, and doubt-solving support."},
  {q:"Will there be one-on-one evaluation?",a:"Yes. The internship phase includes personalized one-on-one evaluation sessions every week, with structured feedback on your deliverables."},
  {q:"Is AI covered in the training?",a:"Yes. You'll learn how to use AI tools for requirement drafting, documentation support, analysis, and productivity enhancement."},
  {q:"Will I receive certificates?",a:"Yes. Upon successful completion and evaluation, you will receive both a Course Completion Certificate and a Project-Based Internship Certificate."},
  {q:"Is prior coding knowledge required?",a:"No. The program is designed for non-technical professionals and beginners. SQL basics and tool overviews are included in the curriculum."}
];

const CERTS = [
  {t:"Business Analysis Course Completion Certificate",s:"Live Training Program",d:"Validates your training in BA fundamentals, requirement engineering, UML documentation, and AI-assisted analysis"},
  {t:"Project-Based Internship Completion Certificate",s:"Internship Program",d:"Certifies your hands-on project work including BRD, FRD, RTM, UML diagrams, test cases, and UAT simulation"}
];

const LEGAL = {
  "Refund Policy":{sections:[{h:"Refund Eligibility",items:["Full refund if requested at least 3 days before batch start.","No refund once live sessions have started.","No refund after course material access provided."]},{h:"Non-Refundable Scenarios",items:["Schedule conflicts or change of mind after sessions begin.","Payment gateway charges may be deducted."]},{h:"How to Request",items:["Email hello@businessanalysis.in with name, email, batch details.","Processed within 7\u201310 business days."]}]},
  "Privacy Policy":{sections:[{h:"Information We Collect",items:["Name, email, phone during registration.","Payment info processed securely via third-party gateway."]},{h:"How We Use Your Data",items:["Communication, enrollment processing, program updates.","Relevant updates about upcoming batches."]},{h:"Data Protection",items:["We never sell or share your data with third parties.","By using this site, you consent to this policy."]}]},
  "Terms & Conditions":{sections:[{h:"Program Nature",items:["Structured training + project-based internship.","Not an employment contract.","Not a job guarantee program."]},{h:"Student Responsibilities",items:["Attend all sessions and complete assignments on time.","Certification requires completion of both phases."]},{h:"Intellectual Property",items:["All materials are property of Business Analysis Academy.","Cannot be redistributed without written permission."]},{h:"Updates",items:["Academy reserves right to update curriculum and schedule."]}]}
};

/* ═══════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════ */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(18px)", transition: `opacity .45s ease ${delay}s, transform .45s ease ${delay}s` }}>
      {children}
    </div>
  );
}

const Chk = ({ children, light }) => (
  <div className="chk">
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill={light?"rgba(96,165,250,.18)":"rgba(29,99,237,.1)"}/><path d="M5 8l2 2 4-4" stroke={light?"#93C5FD":"#1D63ED"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    <span className={light ? "chk-lt" : ""}>{children}</span>
  </div>
);

const Tag = ({ children, light }) => <p className={`tag ${light?"tag-lt":""}`}>{children}</p>;
const H2 = ({ children, light }) => <h2 className={`h2 ${light?"h2-lt":""}`}>{children}</h2>;

/* ═══════════════════════════════════════════
   APP
   ═══════════════════════════════════════════ */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);
  const [faqI, setFaqI] = useState(null);
  const [weekI, setWeekI] = useState(null);
  const [legalK, setLegalK] = useState(null);
  const [modal, setModal] = useState(false);
  const [mType, setMType] = useState("consultation");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [cf, setCf] = useState({ name:"",email:"",phone:"",message:"" });
  const [mf, setMf] = useState({ name:"",email:"",phone:"",profession:"",experience:"",reason:"",message:"" });

  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => { document.body.style.overflow = (legalK||modal||mob)?"hidden":""; return () => { document.body.style.overflow = ""; }; }, [legalK, modal, mob]);

  const go = id => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth", block:"start" }); setMob(false); };
  const open = (t="consultation") => { setMType(t); setDone(false); setBusy(false); setMf({name:"",email:"",phone:"",profession:"",experience:"",reason:"",message:""}); setModal(true); setMob(false); };
  const send = async (d,s) => { try { setBusy(true); await fetch(ENDPOINT,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({...d,source:s,timestamp:new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"})})}); setDone(true); } catch { setDone(true); } finally { setBusy(false); } };

  return (
    <>
      {/* ═══ STYLES ═══ */}
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=Fraunces:opsz,wght@9..144,700;9..144,800;9..144,900&family=JetBrains+Mono:wght@500;600;700&display=swap');

/* --- Reset & Tokens --- */
:root{--fd:'Fraunces',serif;--fb:'DM Sans',sans-serif;--fm:'JetBrains Mono',monospace;--blue:#1D63ED;--blue-dk:#1550C7;--navy:#0A1628;--bg:#F7F8FC;--gray:#6B7280;--text:#374151;--sp:40px;--gap:14px;--mx:1140px}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;scroll-padding-top:64px}
body{font-family:var(--fb);background:var(--bg);color:var(--navy);-webkit-font-smoothing:antialiased;overflow-x:hidden}
::selection{background:var(--blue);color:#fff}

/* --- Layout --- */
.w{width:100%;max-width:var(--mx);margin:0 auto;padding:0 16px}
.s{padding:var(--sp) 0}
.s-w{background:#fff}.s-b{background:var(--bg)}
.s-d{background:linear-gradient(160deg,#0A1628,#132240);color:#fff}
.tc{text-align:center}

@media(min-width:640px){.w{padding:0 28px}:root{--gap:16px}}
@media(min-width:768px){:root{--sp:60px;--gap:18px}}
@media(min-width:1024px){:root{--sp:72px;--gap:20px}.w{padding:0 32px}}

/* --- Typography --- */
.tag{font-family:var(--fm);font-size:.67rem;font-weight:700;letter-spacing:.11em;text-transform:uppercase;color:var(--blue);margin-bottom:8px}
.tag-lt{color:#93C5FD}
.h2{font-family:var(--fd);font-size:clamp(1.35rem,3.6vw,2.1rem);font-weight:800;line-height:1.15;margin-bottom:8px;color:var(--navy)}
.h2-lt{color:#fff}
.sub{color:var(--gray);font-size:.9rem;line-height:1.6;max-width:480px}
.sub-c{margin-left:auto;margin-right:auto}

/* --- Buttons --- */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:none;border-radius:12px;font-family:var(--fb);font-weight:700;cursor:pointer;transition:all .22s;min-height:46px;text-decoration:none;line-height:1.2;font-size:.9rem;width:100%}
.bp{background:var(--blue);color:#fff;padding:13px 26px;box-shadow:0 3px 16px rgba(29,99,237,.22)}.bp:hover{background:var(--blue-dk);transform:translateY(-1px);box-shadow:0 5px 22px rgba(29,99,237,.3)}
.bs{background:transparent;color:var(--blue);border:2px solid var(--blue);padding:11px 24px}.bs:hover{background:var(--blue);color:#fff}
.bw{background:#fff;color:var(--navy);padding:13px 26px;box-shadow:0 3px 12px rgba(0,0,0,.07)}.bw:hover{transform:translateY(-1px);box-shadow:0 5px 18px rgba(0,0,0,.1)}
@media(min-width:480px){.btn{width:auto}}

/* --- Inputs --- */
.inp{width:100%;padding:11px 14px;border:2px solid #E5E7EB;border-radius:10px;font-family:var(--fb);font-size:.9rem;background:#fff;color:var(--navy);outline:none;transition:border .2s;min-height:44px}
.inp:focus{border-color:var(--blue)}.inp::placeholder{color:#9CA3AF}
select.inp{cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 5l3 3 3-3' stroke='%236B7280' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center}

/* --- Cards --- */
.cd{background:#fff;border:1.5px solid rgba(10,22,40,.05);border-radius:14px;padding:16px 14px;transition:all .22s}
.cd:hover{border-color:rgba(29,99,237,.1);box-shadow:0 4px 18px rgba(29,99,237,.04);transform:translateY(-1px)}
@media(min-width:768px){.cd{padding:20px 18px}}

/* --- Grids --- */
.g2{display:grid;grid-template-columns:1fr;gap:var(--gap)}
.g3{display:grid;grid-template-columns:1fr;gap:var(--gap)}
@media(min-width:640px){.g3{grid-template-columns:1fr 1fr}}
@media(min-width:768px){.g2{grid-template-columns:1fr 1fr}}
@media(min-width:1024px){.g3{grid-template-columns:1fr 1fr 1fr}}

/* --- Check list --- */
.chk{display:flex;align-items:flex-start;gap:7px;margin-bottom:5px}
.chk span{font-size:.82rem;line-height:1.5;color:#4B5563}
.chk .chk-lt{color:rgba(255,255,255,.75)}
.chk svg{margin-top:2px;flex-shrink:0}

/* --- Nav --- */
.nav{position:fixed;top:0;left:0;right:0;z-index:100;transition:all .3s;height:56px;background:rgba(247,248,252,.4);backdrop-filter:blur(14px)}
.nav-s{background:rgba(255,255,255,.96)!important;backdrop-filter:blur(16px)!important;box-shadow:0 1px 6px rgba(10,22,40,.04);border-bottom:1px solid rgba(10,22,40,.05)}
.nav-in{display:flex;justify-content:space-between;align-items:center;height:56px}
.logo{display:flex;align-items:center;gap:7px;cursor:pointer}
.logo-b{width:28px;height:40px;border-radius:9px;background:linear-gradient(160deg,#0F1E3C,#2563EB);display:flex;align-items:center;justify-content:center;color:#fff;font-family:Georgia,serif;font-weight:700;font-size:12px;letter-spacing:.5px}
.logo-t{line-height:1.1}
.logo-t div{font-weight:800;font-size:.72rem;text-transform:uppercase;letter-spacing:.02em}
.logo-t .ac{color:var(--blue);letter-spacing:.04em}
.nl{display:none;align-items:center;gap:3px}
.nb{background:none;border:none;cursor:pointer;font-family:var(--fb);font-size:.8rem;font-weight:600;color:var(--gray);padding:5px 10px;border-radius:7px;transition:all .2s}
.nb:hover{color:var(--blue);background:rgba(29,99,237,.04)}
.nc{padding:7px 16px;font-size:.78rem;border-radius:8px;min-height:34px;width:auto}
.nph{display:flex;align-items:center;gap:4px;text-decoration:none;font-size:.8rem;font-weight:600;color:var(--navy)}
.nsep{width:1px;height:18px;background:#E5E7EB;margin:0 3px}
.nmob{display:flex;align-items:center;gap:6px}
.nmob-ph{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:8px;background:rgba(29,99,237,.06);color:var(--blue);text-decoration:none}
@media(min-width:768px){.nl{display:flex}.nmob{display:none}}

/* --- Hamburger --- */
.ham{background:none;border:none;cursor:pointer;padding:5px;display:flex;flex-direction:column;gap:5px}
.ham span{display:block;width:19px;height:2px;background:var(--navy);border-radius:2px;transition:all .3s}
.ham.on span:nth-child(1){transform:translateY(7px) rotate(45deg)}.ham.on span:nth-child(2){opacity:0}.ham.on span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}

/* --- Mobile Menu --- */
.mm{position:fixed;top:56px;left:0;right:0;bottom:0;background:#fff;z-index:150;padding:16px;display:flex;flex-direction:column;gap:1px;transform:translateX(100%);transition:transform .3s cubic-bezier(.4,0,.2,1);overflow-y:auto}
.mm.on{transform:translateX(0)}
.ml{background:none;border:none;text-align:left;padding:13px 6px;font-family:var(--fb);font-size:.95rem;font-weight:600;color:var(--text);border-bottom:1px solid #F3F4F6;cursor:pointer}

/* --- Accordion --- */
.ab{width:100%;background:none;border:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;padding:12px 14px;font-family:var(--fb);font-size:.86rem;font-weight:700;color:var(--navy);text-align:left;line-height:1.3;gap:10px}
.aa{transition:transform .3s;font-size:.7rem;color:var(--gray);flex-shrink:0}
.aa.on{transform:rotate(180deg)}
.ap{max-height:0;overflow:hidden;transition:max-height .3s ease,padding .3s ease;padding:0 14px}
.ap.on{max-height:280px;padding:0 14px 12px}

/* --- Overlay / Modal --- */
.ov{position:fixed;inset:0;z-index:200;background:rgba(10,22,40,.4);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:16px;animation:fi .2s ease}
.md{background:#fff;border-radius:18px;width:100%;max-width:500px;max-height:90vh;overflow-y:auto;box-shadow:0 18px 44px rgba(10,22,40,.16);animation:su .25s cubic-bezier(.22,1,.36,1)}
@keyframes fi{from{opacity:0}to{opacity:1}}
@keyframes su{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}

/* --- Hero --- */
.hero{min-height:100dvh;display:flex;align-items:center;background:linear-gradient(175deg,#F7F8FC 0%,#E8EEFF 40%,#D4E2FF 100%);position:relative;overflow:hidden;padding:76px 0 36px}
@media(min-width:768px){.hero{padding:92px 0 52px}}
.hero-gp{position:absolute;inset:0;background-image:linear-gradient(rgba(10,22,40,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(10,22,40,.025) 1px,transparent 1px);background-size:48px 48px}
.hero-o{position:absolute;border-radius:50%;animation:fl 7s ease-in-out infinite}
.hero-o1{top:5%;right:-5%;width:300px;height:300px;background:radial-gradient(circle,rgba(29,99,237,.06) 0%,transparent 60%)}
.hero-o2{bottom:8%;left:2%;width:180px;height:180px;background:radial-gradient(circle,rgba(29,99,237,.04) 0%,transparent 60%);animation-delay:2s;animation-duration:9s}
@keyframes fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes pd{0%,100%{opacity:.4}50%{opacity:1}}
.hero-c{position:relative;z-index:2;max-width:640px}
.hero-bd{display:inline-flex;align-items:center;gap:6px;background:rgba(29,99,237,.06);border-radius:99px;padding:7px 16px;font-size:.8rem;font-weight:600;color:var(--blue);margin-bottom:16px}
.hero-dt{width:6px;height:6px;border-radius:50%;background:var(--blue);animation:pd 2s infinite}
.hero h1{font-family:var(--fd);font-size:clamp(1.6rem,4.8vw,2.9rem);font-weight:800;line-height:1.13;color:var(--navy);margin-bottom:14px;letter-spacing:-.01em}
.hero h1 em{color:var(--blue);font-style:normal}
.hero-p{font-size:clamp(.88rem,1.8vw,1.02rem);line-height:1.7;color:var(--text);margin-bottom:12px;max-width:500px}
.hero-tg{display:inline-flex;align-items:center;gap:7px;background:rgba(22,163,74,.05);border:1px solid rgba(22,163,74,.1);border-radius:99px;padding:6px 14px;margin-bottom:16px}
.hero-tg span{font-size:.78rem;font-weight:600;color:#15803D}
.hero-tg .sp{width:1px;height:12px;background:rgba(22,163,74,.15)}
.hero-pl{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px}
.pill{display:inline-flex;align-items:center;gap:4px;background:rgba(29,99,237,.04);border-radius:99px;padding:5px 11px;font-size:.74rem;font-weight:600;color:#132240}
.hero-bt{display:flex;flex-direction:column;gap:8px}
@media(min-width:480px){.hero-bt{flex-direction:row}}

/* --- Dot pattern --- */
.dot{background-image:radial-gradient(circle at 1px 1px,rgba(255,255,255,.05) 1px,transparent 0);background-size:28px 28px}

/* --- Phase cards --- */
.ph-d{background:linear-gradient(160deg,#0A1628,#132240);border-radius:16px;padding:20px 18px;color:#fff;position:relative;overflow:hidden}
.ph-d .orb{position:absolute;top:-35px;right:-35px;width:110px;height:110px;border-radius:50%;background:rgba(29,99,237,.08)}
.ph-lb{font-family:var(--fm);font-size:.64rem;letter-spacing:.1em;text-transform:uppercase;font-weight:700;margin-bottom:5px}
.ph-tt{font-family:var(--fd);font-size:clamp(1.05rem,2.2vw,1.28rem);font-weight:800;margin-bottom:5px}
.ph-sb{font-size:.82rem;margin-bottom:12px;line-height:1.5}
@media(min-width:768px){.ph-d{padding:28px 24px}}

/* --- Curriculum accordion --- */
.ci{background:#fff;border:1px solid rgba(10,22,40,.05);border-radius:10px;margin-bottom:6px;overflow:hidden;transition:box-shadow .2s}
.ci:hover{box-shadow:0 1px 8px rgba(10,22,40,.03)}
.ci.dk{background:linear-gradient(140deg,#0A1628,#132240);border:none;color:#fff}
.cw{font-family:var(--fm);font-size:.6rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--blue)}
.ci.dk .cw{color:#93C5FD}
.ct{font-size:.85rem;font-weight:700;margin-top:1px}
.cx{font-size:.76rem;line-height:1.4;padding-left:11px;position:relative;color:var(--gray);margin-bottom:2px}
.cx::before{content:'▸';position:absolute;left:0;top:0;font-size:.58rem;color:var(--blue)}
.ci.dk .cx{color:rgba(255,255,255,.65)}.ci.dk .cx::before{color:#60A5FA}

/* --- WhatsApp --- */
.wa{position:fixed;bottom:18px;right:14px;z-index:90;width:50px;height:50px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 12px rgba(37,211,102,.28);cursor:pointer;transition:all .25s;text-decoration:none;border:none}
.wa:hover{transform:scale(1.05) translateY(-1px);box-shadow:0 5px 18px rgba(37,211,102,.36)}
.wa svg{width:23px;height:23px;fill:#fff}
@media(min-width:768px){.wa{bottom:22px;right:22px;width:54px;height:54px}.wa svg{width:25px;height:25px}}
      `}</style>

      {/* ═══ NAV ═══ */}
      <nav className={`nav ${scrolled?"nav-s":""}`}>
        <div className="w nav-in">
          <div className="logo" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>
            <div className="logo-b">BA</div>
            <div className="logo-t"><div>Business Analysis</div><div className="ac">Academy</div></div>
          </div>
          <div className="nl">
            {["Program","Curriculum","Pricing","FAQ"].map(n=><button key={n} className="nb" onClick={()=>go(n)}>{n}</button>)}
            <div className="nsep"/>
            <a href="tel:8088434442" className="nph"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>8088434442</a>
            <div className="nsep"/>
            <button className="btn bp nc" onClick={()=>open("consultation")}>Free Consultation</button>
          </div>
          <div className="nmob">
            <a href="tel:8088434442" className="nmob-ph"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></a>
            <button className={`ham ${mob?"on":""}`} onClick={()=>setMob(!mob)}><span/><span/><span/></button>
          </div>
        </div>
      </nav>

      {/* ═══ MOBILE MENU ═══ */}
      <div className={`mm ${mob?"on":""}`}>
        {["Program","Curriculum","Internship","Career","Pricing","FAQ","Contact"].map(n=><button key={n} className="ml" onClick={()=>go(n)}>{n}</button>)}
        <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:8}}>
          <button className="btn bp" onClick={()=>open("consultation")}>Book Free Consultation \u2192</button>
          <button className="btn bs" onClick={()=>open("enrollment")}>Enroll Now \u2014 \u20B95,999</button>
        </div>
      </div>

      {/* ═══ HERO ═══ */}
      <section className="hero">
        <div className="hero-o hero-o1"/><div className="hero-o hero-o2"/><div className="hero-gp"/>
        <div className="w"><div className="hero-c">
          <Reveal><div className="hero-bd"><span className="hero-dt"/>Admissions Open \u2014 Only 10 Students Per Batch</div></Reveal>
          <Reveal delay={.05}><h1>30 Days Live Training <em>+</em> 30 Days Project Internship</h1></Reveal>
          <Reveal delay={.09}><p className="hero-p">Become Job-Ready as a Business Analyst through Structured Live Sessions, Real Project Experience, and Career Support.</p></Reveal>
          <Reveal delay={.12}><div className="hero-tg"><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#16A34A" fillOpacity=".13"/><path d="M5 8l2 2 4-4" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg><span>No Coding Required</span><span className="sp"/><span>Open to All Backgrounds</span></div></Reveal>
          <Reveal delay={.14}><div className="hero-pl">{["Live Training + Internship","Only 10 Per Batch","AI in BA","1-on-1 Evaluation","Dual Certification","Interview Prep"].map((p,i)=><span key={i} className="pill"><svg width="11" height="11" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#1D63ED" fillOpacity=".1"/><path d="M5 8l2 2 4-4" stroke="#1D63ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>{p}</span>)}</div></Reveal>
          <Reveal delay={.17}><div className="hero-bt"><button className="btn bp" onClick={()=>open("consultation")}>Book Free Consultation \u2192</button><button className="btn bs" onClick={()=>open("enrollment")}>Enroll Now \u2014 \u20B95,999</button></div></Reveal>
        </div></div>
      </section>

      {/* ═══ PROGRAM OVERVIEW ═══ */}
      <section id="Program" className="s s-w">
        <div className="w">
          <Reveal><div className="tc" style={{marginBottom:24}}><Tag>Program Overview</Tag><H2>60 Days to Launch Your BA Career</H2><p className="sub sub-c">Structured training designed to prepare you for real Business Analyst roles \u2014 from documentation to interviews.</p></div></Reveal>
          <div className="g2">
            <Reveal delay={.04}>
              <div className="ph-d"><div className="orb"/>
                <p className="ph-lb" style={{color:"#93C5FD"}}>Phase 1 \u2014 30 Days</p>
                <h3 className="ph-tt">Live Instructor-Led Training</h3>
                <p className="ph-sb" style={{color:"rgba(255,255,255,.45)"}}>Practical approach focused on real documentation and interview preparation</p>
                {TRAINING.map((p,i)=><Chk key={i} light>{p}</Chk>)}
              </div>
            </Reveal>
            <Reveal delay={.08}>
              <div className="cd" style={{padding:"20px 18px",height:"100%"}}>
                <p className="ph-lb" style={{color:"var(--blue)"}}>Phase 2 \u2014 30 Days</p>
                <h3 className="ph-tt" style={{color:"var(--navy)"}}>Project-Based Internship</h3>
                <p className="ph-sb" style={{color:"var(--gray)"}}>Work on real project documentation under guided mentorship</p>
                <p style={{color:"var(--gray)",fontSize:".72rem",marginBottom:12,lineHeight:1.45,fontStyle:"italic",borderLeft:"3px solid rgba(29,99,237,.15)",paddingLeft:10,opacity:.8}}>Structured project-based internship conducted under Business Analysis Academy.</p>
                {INTERNSHIP.map((p,i)=><Chk key={i}>{p}</Chk>)}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ HOW THIS PROGRAM PREPARES YOU (merged) ═══ */}
      <section className="s s-b">
        <div className="w" style={{maxWidth:900}}>
          <Reveal><div className="tc" style={{marginBottom:24}}><Tag>Why This Program</Tag><H2>How This Program Prepares You</H2><p className="sub sub-c">Practical approach focused on real documentation, live evaluation, and interview preparation.</p></div></Reveal>
          <div className="g3">{PREPARES.map((p,i)=><Reveal key={i} delay={i*.03}><div className="cd" style={{display:"flex",gap:11,alignItems:"flex-start",height:"100%"}}>
            <div style={{width:38,height:38,borderRadius:10,background:"rgba(29,99,237,.05)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem",flexShrink:0}}>{p.icon}</div>
            <div><p style={{fontWeight:700,fontSize:".88rem",color:"var(--navy)",marginBottom:2}}>{p.t}</p><p style={{fontSize:".8rem",color:"var(--gray)",lineHeight:1.5}}>{p.d}</p></div>
          </div></Reveal>)}</div>
        </div>
      </section>

      {/* ═══ BLUE CTA ═══ */}
      <section style={{padding:"clamp(26px,4.5vw,40px) 0",background:"linear-gradient(135deg,#1D63ED,#1550C7)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-45,right:-45,width:130,height:130,borderRadius:"50%",background:"rgba(255,255,255,.04)"}}/>
        <div className="w tc" style={{position:"relative",zIndex:2}}>
          <Reveal>
            <h3 style={{fontFamily:"var(--fd)",fontSize:"clamp(1.05rem,2.8vw,1.4rem)",fontWeight:800,color:"#fff",marginBottom:5,lineHeight:1.25}}>Not Sure If This Program Is Right for You?</h3>
            <p style={{color:"rgba(255,255,255,.6)",fontSize:".86rem",marginBottom:16,lineHeight:1.55,maxWidth:440,margin:"0 auto 16px"}}>Book a free one-on-one consultation. We'll help you understand the program and plan your career switch.</p>
            <button className="btn bw" style={{width:"auto",margin:"0 auto"}} onClick={()=>open("consultation")}>Book Free Consultation \u2192</button>
          </Reveal>
        </div>
      </section>

      {/* ═══ CURRICULUM ACCORDION ═══ */}
      <section id="Curriculum" className="s s-b">
        <div className="w">
          <Reveal><div className="tc" style={{marginBottom:24}}><Tag>Detailed Curriculum</Tag><H2>8 Weeks. Structured. Practical.</H2></div></Reveal>
          <Reveal><p className="tag" style={{display:"flex",alignItems:"center",gap:7,marginBottom:10}}><span style={{width:18,height:2,background:"var(--blue)",borderRadius:1}}/>Training Phase \u2014 Weeks 1\u20134</p></Reveal>
          {WEEKS.slice(0,4).map((w,i)=>{const o=weekI===i;const d=i===3;return<div key={i} className={`ci ${d?"dk":""}`}><button className="ab" onClick={()=>setWeekI(o?null:i)} style={d?{color:"#fff"}:{}}><div><span className="cw">{w.w}</span><div className="ct">{w.t}</div></div><span className={`aa ${o?"on":""}`} style={d?{color:"#93C5FD"}:{}}>&#x25BE;</span></button><div className={`ap ${o?"on":""}`}>{w.i.map((t,j)=><p key={j} className="cx">{t}</p>)}</div></div>})}
          <Reveal><p className="tag" style={{display:"flex",alignItems:"center",gap:7,marginTop:20,marginBottom:10}}><span style={{width:18,height:2,background:"var(--blue)",borderRadius:1}}/>Internship Phase \u2014 Weeks 5\u20138</p></Reveal>
          {WEEKS.slice(4).map((w,i)=>{const idx=i+4;const o=weekI===idx;const d=i===3;return<div key={idx} className={`ci ${d?"dk":""}`}><button className="ab" onClick={()=>setWeekI(o?null:idx)} style={d?{color:"#fff"}:{}}><div><span className="cw">{w.w}</span><div className="ct">{w.t}</div></div><span className={`aa ${o?"on":""}`} style={d?{color:"#93C5FD"}:{}}>&#x25BE;</span></button><div className={`ap ${o?"on":""}`}>{w.i.map((t,j)=><p key={j} className="cx">{t}</p>)}</div></div>})}
        </div>
      </section>

      {/* ═══ INTERNSHIP ═══ */}
      <section id="Internship" className="s s-d dot">
        <div className="w" style={{position:"relative",zIndex:2}}>
          <div className="g2" style={{gap:"clamp(20px,3.5vw,40px)",alignItems:"center"}}>
            <Reveal>
              <Tag light>Practical Internship</Tag><H2 light>Live Project Internship Experience</H2>
              <p style={{color:"rgba(255,255,255,.5)",lineHeight:1.6,marginBottom:6,fontSize:".88rem"}}>During the 30-Day Internship, you'll work on a complete project simulation \u2014 preparing the same documentation expected in real BA roles.</p>
              <p style={{color:"rgba(255,255,255,.3)",fontSize:".76rem",marginBottom:14,fontStyle:"italic",borderLeft:"3px solid rgba(96,165,250,.2)",paddingLeft:10}}>Structured project-based internship conducted under Business Analysis Academy for practical learning purposes.</p>
              {["Work on one complete end-to-end project","Prepare industry-style BA documentation","Weekly one-on-one evaluation sessions","Receive structured, actionable feedback","Attend dedicated doubt-solving sessions","Present final project to evaluation panel"].map((p,i)=><Chk key={i} light>{p}</Chk>)}
            </Reveal>
            <Reveal delay={.06}>
              <p style={{fontFamily:"var(--fm)",fontSize:".62rem",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#93C5FD",marginBottom:10}}>Your Deliverables</p>
              <div className="g2" style={{gap:7}}>{DELIVERABLES.map((p,i)=><div key={i} style={{background:"rgba(255,255,255,.03)",borderRadius:9,padding:"10px 12px",border:"1px solid rgba(255,255,255,.05)",fontSize:".78rem",fontWeight:500,color:"rgba(255,255,255,.7)",display:"flex",alignItems:"flex-start",gap:6}}><span style={{color:"#60A5FA",flexShrink:0}}>\uD83D\uDCC4</span>{p}</div>)}</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ CAREER SUPPORT ═══ */}
      <section id="Career" className="s s-w">
        <div className="w">
          <Reveal><div className="tc" style={{marginBottom:24}}><Tag>Career Support</Tag><H2>We Don't Just Train \u2014 We Prepare You</H2><p className="sub sub-c">Dedicated support to help you prepare for and land your first Business Analyst role.</p></div></Reveal>
          <div className="g3">{[{icon:"\uD83D\uDCDD",t:"Resume Building Workshop",d:"Craft a BA-focused resume highlighting your project experience and skills"},{icon:"\uD83D\uDCBC",t:"LinkedIn Profile Optimization",d:"Optimize your profile to attract recruiters in the BA space"},{icon:"\uD83C\uDFAF",t:"Interview Preparation",d:"Structured sessions covering HR & technical BA interview questions"},{icon:"\uD83D\uDDE3\uFE0F",t:"Mock Interviews",d:"Practice with realistic mock interviews and receive actionable feedback"},{icon:"\uD83D\uDD17",t:"Placement Assistance",d:"Job alerts, application support \u2014 not a job guarantee"},{icon:"\uD83D\uDCEC",t:"Job Alerts & Support",d:"Curated BA opportunities matched to your profile and location"}].map((p,i)=><Reveal key={i} delay={i*.03}><div className="cd" style={{height:"100%"}}>
            <div style={{width:40,height:40,borderRadius:10,background:"rgba(29,99,237,.05)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem",marginBottom:8}}>{p.icon}</div>
            <p style={{fontWeight:700,fontSize:".88rem",color:"var(--navy)",marginBottom:2}}>{p.t}</p>
            <p style={{fontSize:".8rem",color:"var(--gray)",lineHeight:1.5}}>{p.d}</p>
          </div></Reveal>)}</div>
        </div>
      </section>

      {/* ═══ CERTIFICATION ═══ */}
      <section className="s s-b">
        <div className="w" style={{maxWidth:820}}>
          <Reveal><div className="cd" style={{textAlign:"center",padding:"clamp(24px,4vw,40px) clamp(16px,3vw,28px)",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,#1D63ED,#60A5FA,#1D63ED)"}}/>
            <Tag>Dual Certification</Tag><H2>Certification & Internship Recognition</H2>
            <p className="sub sub-c" style={{marginBottom:20}}>Upon successful completion, you'll receive two certificates along with portfolio-ready documentation.</p>
            <div className="g2" style={{gap:10,marginBottom:10}}>{CERTS.map((c,i)=><div key={i} style={{background:"linear-gradient(160deg,#0A1628,#132240)",borderRadius:12,padding:"18px 16px",color:"#fff",textAlign:"left"}}>
              <div style={{width:36,height:36,borderRadius:9,background:"rgba(96,165,250,.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1rem",marginBottom:8}}>\uD83D\uDCDC</div>
              <p style={{fontWeight:800,fontSize:".88rem",marginBottom:2}}>{c.t}</p>
              <p style={{fontFamily:"var(--fm)",fontSize:".58rem",fontWeight:600,letterSpacing:".07em",textTransform:"uppercase",color:"#93C5FD",marginBottom:5}}>{c.s}</p>
              <p style={{fontSize:".78rem",color:"rgba(255,255,255,.5)",lineHeight:1.5}}>{c.d}</p>
            </div>)}</div>
            <div style={{background:"#fff",borderRadius:10,padding:"14px 16px",border:"1.5px solid rgba(29,99,237,.07)",textAlign:"left",display:"flex",alignItems:"flex-start",gap:10}}>
              <div style={{width:36,height:36,borderRadius:9,background:"rgba(29,99,237,.05)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1rem",flexShrink:0}}>\uD83D\uDCC2</div>
              <div><p style={{fontWeight:800,fontSize:".88rem",color:"var(--navy)",marginBottom:2}}>Portfolio-Ready Documentation</p><p style={{fontSize:".78rem",color:"var(--gray)",lineHeight:1.5}}>BRD, FRD, UML Diagrams, RTM, and Test Cases \u2014 ready to showcase in interviews</p></div>
            </div>
            <p style={{fontSize:".72rem",color:"#9CA3AF",marginTop:16,lineHeight:1.5,fontStyle:"italic"}}>Certificates are issued upon successful completion of training sessions, internship tasks, and final evaluation.</p>
          </div></Reveal>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="Pricing" className="s s-w">
        <div className="w" style={{maxWidth:460}}>
          <Reveal><div style={{textAlign:"center",background:"linear-gradient(160deg,#0A1628,#132240)",borderRadius:18,padding:"clamp(24px,4.5vw,40px) clamp(18px,3.5vw,28px)",color:"#fff",boxShadow:"0 14px 38px rgba(10,22,40,.18)",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:-45,right:-45,width:140,height:140,borderRadius:"50%",background:"rgba(29,99,237,.09)"}}/>
            <div style={{position:"absolute",bottom:-28,left:-28,width:90,height:90,borderRadius:"50%",background:"rgba(96,165,250,.04)"}}/>
            <div style={{position:"relative"}}>
              <p style={{fontFamily:"var(--fm)",fontSize:".64rem",fontWeight:700,letterSpacing:".09em",textTransform:"uppercase",color:"#93C5FD",marginBottom:8}}>Early Bird Offer</p>
              <p style={{color:"rgba(255,255,255,.3)",fontSize:".92rem",textDecoration:"line-through",marginBottom:2}}>\u20B914,999</p>
              <p style={{fontFamily:"var(--fd)",fontSize:"clamp(1.9rem,5.5vw,2.6rem)",fontWeight:900,marginBottom:3}}>\u20B95,999</p>
              <p style={{color:"rgba(255,255,255,.4)",fontSize:".8rem",marginBottom:20}}>One-time payment \u00B7 Full program access</p>
              <div style={{textAlign:"left",marginBottom:18}}>{PRICING.map((p,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderBottom:i<6?"1px solid rgba(255,255,255,.04)":"none",fontSize:".82rem",color:"rgba(255,255,255,.72)"}}>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="rgba(96,165,250,.16)"/><path d="M5 8l2 2 4-4" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>{p}
              </div>)}</div>
              <button className="btn bw" onClick={()=>open("enrollment")} style={{fontSize:".92rem",padding:"13px 0"}}>Enroll Now \u2014 \u20B95,999 \u2192</button>
              <p style={{fontFamily:"var(--fm)",marginTop:9,fontSize:".64rem",color:"rgba(255,255,255,.22)",letterSpacing:".03em"}}>Only 10 Students Per Batch</p>
            </div>
          </div></Reveal>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="FAQ" className="s s-b">
        <div className="w" style={{maxWidth:620}}>
          <Reveal><div className="tc" style={{marginBottom:20}}><Tag>FAQ</Tag><H2>Frequently Asked Questions</H2></div></Reveal>
          <Reveal delay={.03}><div style={{background:"#fff",borderRadius:14,border:"1px solid rgba(10,22,40,.05)",overflow:"hidden"}}>
            {FAQS.map((q,i)=><div key={i} style={{borderBottom:i<FAQS.length-1?"1px solid rgba(10,22,40,.05)":"none"}}>
              <button className="ab" onClick={()=>setFaqI(faqI===i?null:i)}>{q.q}<span className={`aa ${faqI===i?"on":""}`}>&#x25BE;</span></button>
              <div className={`ap ${faqI===i?"on":""}`}><p style={{color:"var(--gray)",fontSize:".82rem",lineHeight:1.6}}>{q.a}</p></div>
            </div>)}
          </div></Reveal>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="Contact" className="s s-w">
        <div className="w">
          <div className="g2" style={{gap:"clamp(20px,3.5vw,32px)",alignItems:"start"}}>
            <Reveal>
              <Tag>Get in Touch</Tag><H2>Have Questions?</H2>
              <p style={{color:"var(--gray)",lineHeight:1.6,marginBottom:18,fontSize:".88rem"}}>Reach out with any questions about the program, curriculum, or enrollment.</p>
              {[{ic:"\u2709\uFE0F",l:"Email us at",v:"hello@businessanalysis.in",h:"mailto:hello@businessanalysis.in"},{ic:"\uD83D\uDCDE",l:"Call us at",v:"8088434442",h:"tel:8088434442"},{ic:"\uD83C\uDF10",l:"Visit",v:"businessanalysis.in"}].map((c,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:9,marginBottom:12}}>
                <div style={{width:40,height:40,borderRadius:10,background:"rgba(29,99,237,.05)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".95rem",flexShrink:0}}>{c.ic}</div>
                <div><p style={{fontSize:".72rem",color:"var(--gray)",fontWeight:500}}>{c.l}</p>{c.h?<a href={c.h} style={{fontWeight:700,color:"var(--navy)",fontSize:".88rem",textDecoration:"none"}}>{c.v}</a>:<p style={{fontWeight:700,color:"var(--navy)",fontSize:".88rem"}}>{c.v}</p>}</div>
              </div>)}
            </Reveal>
            <Reveal delay={.05}>
              <div style={{background:"var(--bg)",borderRadius:14,padding:"clamp(14px,2.5vw,22px)",border:"1px solid rgba(10,22,40,.05)"}}>
                <div style={{display:"grid",gap:9}}>
                  <div><label style={{fontSize:".78rem",fontWeight:600,color:"var(--text)",display:"block",marginBottom:3}}>Full Name</label><input className="inp" placeholder="Your name" value={cf.name} onChange={e=>setCf({...cf,name:e.target.value})}/></div>
                  <div className="g2" style={{gap:9}}><div><label style={{fontSize:".78rem",fontWeight:600,color:"var(--text)",display:"block",marginBottom:3}}>Email</label><input className="inp" placeholder="you@email.com" type="email" value={cf.email} onChange={e=>setCf({...cf,email:e.target.value})}/></div><div><label style={{fontSize:".78rem",fontWeight:600,color:"var(--text)",display:"block",marginBottom:3}}>Phone</label><input className="inp" placeholder="+91 ..." value={cf.phone} onChange={e=>setCf({...cf,phone:e.target.value})}/></div></div>
                  <div><label style={{fontSize:".78rem",fontWeight:600,color:"var(--text)",display:"block",marginBottom:3}}>Message</label><textarea className="inp" placeholder="Your question..." rows={3} style={{resize:"vertical"}} value={cf.message} onChange={e=>setCf({...cf,message:e.target.value})}/></div>
                  <button className="btn bp" style={{opacity:cf.name&&cf.email&&cf.phone?1:.5,pointerEvents:cf.name&&cf.email&&cf.phone?"auto":"none"}} onClick={async()=>{await send({...cf,profession:"",experience:"",reason:""},"contact");setCf({name:"",email:"",phone:"",message:""});}}>Send Message \u2192</button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="dot" style={{padding:"clamp(36px,6vw,56px) 0",background:"linear-gradient(160deg,#0A1628,#132240)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-50,left:"50%",transform:"translateX(-50%)",width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(29,99,237,.08) 0%,transparent 55%)"}}/>
        <div className="w tc" style={{position:"relative",zIndex:2,maxWidth:560}}>
          <Reveal>
            <h2 style={{fontFamily:"var(--fd)",fontSize:"clamp(1.15rem,3.2vw,1.65rem)",fontWeight:800,color:"#fff",marginBottom:6,lineHeight:1.2}}>Ready to Start Your Business Analyst Journey?</h2>
            <p style={{color:"rgba(255,255,255,.45)",fontSize:".88rem",marginBottom:18,lineHeight:1.6,maxWidth:420,margin:"0 auto 18px"}}>Talk to our team for free. Understand the program, ask your questions, and plan your career switch.</p>
            <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}><button className="btn bw" style={{width:"auto"}} onClick={()=>open("consultation")}>Book Free Consultation \u2192</button><button className="btn bs" style={{borderColor:"rgba(255,255,255,.15)",color:"rgba(255,255,255,.75)",width:"auto"}} onClick={()=>go("Pricing")}>View Pricing</button></div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{background:"#0A1628",color:"#fff",padding:"30px 0 14px"}}>
        <div className="w">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",flexWrap:"wrap",gap:20,marginBottom:22}}>
            <div style={{maxWidth:240}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}><div style={{width:22,height:32,borderRadius:7,background:"linear-gradient(160deg,#0F1E3C,#2563EB)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontFamily:"Georgia,serif",fontWeight:700,fontSize:10}}>BA</div><div style={{lineHeight:1.1}}><div style={{fontWeight:800,fontSize:".7rem",textTransform:"uppercase",letterSpacing:".02em"}}>Business Analysis</div><div style={{fontWeight:800,fontSize:".7rem",color:"#93C5FD",textTransform:"uppercase",letterSpacing:".04em"}}>Academy</div></div></div>
              <p style={{color:"rgba(255,255,255,.25)",fontSize:".76rem",lineHeight:1.5}}>Structured Learning. Real Projects. Career Ready.</p>
              <div style={{marginTop:6,display:"flex",flexDirection:"column",gap:3}}><a href="tel:8088434442" style={{color:"rgba(255,255,255,.3)",fontSize:".74rem",textDecoration:"none"}}>\uD83D\uDCDE 8088434442</a><a href="mailto:hello@businessanalysis.in" style={{color:"rgba(255,255,255,.3)",fontSize:".74rem",textDecoration:"none"}}>\u2709\uFE0F hello@businessanalysis.in</a></div>
            </div>
            <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>{["Program","Curriculum","Internship","Career","Pricing","FAQ","Contact"].map(n=><button key={n} onClick={()=>go(n)} style={{background:"none",border:"none",color:"rgba(255,255,255,.3)",fontFamily:"var(--fb)",fontSize:".76rem",cursor:"pointer",padding:0}}>{n}</button>)}</div>
          </div>
          <div style={{borderTop:"1px solid rgba(255,255,255,.05)",paddingTop:12,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
            <p style={{color:"rgba(255,255,255,.15)",fontSize:".7rem"}}>\u00A9 2026 Business Analysis Academy. All rights reserved.</p>
            <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>{["Privacy Policy","Refund Policy","Terms & Conditions"].map(p=><button key={p} onClick={()=>setLegalK(p)} style={{background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,.2)",fontSize:".7rem",fontFamily:"var(--fb)",padding:0}}>{p}</button>)}</div>
          </div>
        </div>
      </footer>

      {/* ═══ LEGAL MODAL ═══ */}
      {legalK&&LEGAL[legalK]&&<div className="ov" onClick={e=>e.target===e.currentTarget&&setLegalK(null)}><div className="md">
        <div style={{padding:"16px 18px",borderBottom:"1px solid #F3F4F6",display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><h3 style={{fontFamily:"var(--fd)",fontSize:"1rem",fontWeight:800,color:"var(--navy)"}}>{legalK}</h3><p style={{fontFamily:"var(--fm)",fontSize:".6rem",color:"var(--blue)",textTransform:"uppercase",letterSpacing:".06em"}}>Effective from February 2026</p></div><button onClick={()=>setLegalK(null)} style={{width:30,height:30,borderRadius:8,border:"1.5px solid #E5E7EB",background:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".85rem",color:"var(--gray)"}}>\u2715</button></div>
        <div style={{padding:"14px 18px"}}>{LEGAL[legalK].sections.map((s,i)=><div key={i} style={{marginBottom:i<LEGAL[legalK].sections.length-1?14:0}}><p style={{fontWeight:700,fontSize:".86rem",color:"var(--navy)",marginBottom:5,display:"flex",alignItems:"center",gap:6}}><span style={{width:18,height:18,borderRadius:5,background:"rgba(29,99,237,.06)",display:"inline-flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--fm)",fontSize:".58rem",fontWeight:700,color:"var(--blue)",flexShrink:0}}>{i+1}</span>{s.h}</p>{s.items.map((it,j)=><p key={j} style={{fontSize:".8rem",color:"var(--gray)",lineHeight:1.6,paddingLeft:24,position:"relative",marginBottom:2}}><span style={{position:"absolute",left:7,top:7,width:3,height:3,borderRadius:"50%",background:"#D1D5DB"}}/>{it}</p>)}</div>)}</div>
      </div></div>}

      {/* ═══ FORM MODAL ═══ */}
      {modal&&<div className="ov" onClick={e=>e.target===e.currentTarget&&setModal(false)}><div className="md">
        <div style={{padding:"16px 18px",borderBottom:"1px solid #F3F4F6",display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><h3 style={{fontFamily:"var(--fd)",fontSize:"1rem",fontWeight:800,color:"var(--navy)"}}>{mType==="enrollment"?"Enroll Now \u2014 \u20B95,999":"Book Free Consultation"}</h3><p style={{fontFamily:"var(--fm)",fontSize:".6rem",color:"var(--blue)",textTransform:"uppercase",letterSpacing:".06em"}}>We'll contact you within 24 hours</p></div><button onClick={()=>setModal(false)} style={{width:30,height:30,borderRadius:8,border:"1.5px solid #E5E7EB",background:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".85rem",color:"var(--gray)"}}>\u2715</button></div>
        <div style={{padding:"16px 18px"}}>{done?<div className="tc" style={{padding:"20px 0"}}>
          <div style={{width:50,height:50,borderRadius:"50%",background:"rgba(22,163,74,.07)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px",fontSize:"1.3rem"}}>\u2705</div>
          <h4 style={{fontFamily:"var(--fd)",fontSize:"1.05rem",fontWeight:800,color:"var(--navy)",marginBottom:5}}>Thank You!</h4>
          <p style={{color:"var(--gray)",fontSize:".84rem",lineHeight:1.6,maxWidth:280,margin:"0 auto 14px"}}>{mType==="enrollment"?"Our team will contact you within 24 hours to confirm your enrollment.":"Our team will contact you within 24 hours to schedule your consultation."}</p>
          <button className="btn bp" onClick={()=>setModal(false)} style={{padding:"9px 22px"}}>Close</button>
        </div>:<div style={{display:"grid",gap:9}}>
          <div><label style={{fontSize:".78rem",fontWeight:600,color:"var(--text)",display:"block",marginBottom:3}}>Full Name <span style={{color:"#DC2626"}}>*</span></label><input className="inp" placeholder="Your name" value={mf.name} onChange={e=>setMf({...mf,name:e.target.value})}/></div>
          <div className="g2" style={{gap:9}}><div><label style={{fontSize:".78rem",fontWeight:600,color:"var(--text)",display:"block",marginBottom:3}}>Email <span style={{color:"#DC2626"}}>*</span></label><input className="inp" placeholder="you@email.com" type="email" value={mf.email} onChange={e=>setMf({...mf,email:e.target.value})}/></div><div><label style={{fontSize:".78rem",fontWeight:600,color:"var(--text)",display:"block",marginBottom:3}}>Phone <span style={{color:"#DC2626"}}>*</span></label><input className="inp" placeholder="+91 ..." value={mf.phone} onChange={e=>setMf({...mf,phone:e.target.value})}/></div></div>
          <div className="g2" style={{gap:9}}><div><label style={{fontSize:".78rem",fontWeight:600,color:"var(--text)",display:"block",marginBottom:3}}>Current Profession</label><input className="inp" placeholder="e.g. Software Tester" value={mf.profession} onChange={e=>setMf({...mf,profession:e.target.value})}/></div><div><label style={{fontSize:".78rem",fontWeight:600,color:"var(--text)",display:"block",marginBottom:3}}>Experience</label><select className="inp" value={mf.experience} onChange={e=>setMf({...mf,experience:e.target.value})}><option value="">Select</option><option>Fresher (0 years)</option><option>1\u20132 years</option><option>3\u20135 years</option><option>5+ years</option></select></div></div>
          <div><label style={{fontSize:".78rem",fontWeight:600,color:"var(--text)",display:"block",marginBottom:3}}>Why become a Business Analyst?</label><select className="inp" value={mf.reason} onChange={e=>setMf({...mf,reason:e.target.value})}><option value="">Select a reason</option><option>Career switch from another field</option><option>Upgrade my current skills</option><option>Fresh graduate entering IT</option><option>Transitioning from Testing to BA</option><option>Better career opportunities</option><option>Other</option></select></div>
          <div><label style={{fontSize:".78rem",fontWeight:600,color:"var(--text)",display:"block",marginBottom:3}}>Message <span style={{color:"#9CA3AF",fontWeight:400}}>(optional)</span></label><textarea className="inp" placeholder="Any questions..." rows={2} style={{resize:"vertical"}} value={mf.message} onChange={e=>setMf({...mf,message:e.target.value})}/></div>
          <button className="btn bp" style={{marginTop:2,opacity:mf.name&&mf.email&&mf.phone&&!busy?1:.5,pointerEvents:mf.name&&mf.email&&mf.phone&&!busy?"auto":"none"}} onClick={()=>send(mf,mType)}>{busy?"Submitting...":mType==="enrollment"?"Submit Enrollment \u2192":"Request Consultation \u2192"}</button>
          <p className="tc" style={{fontSize:".7rem",color:"#9CA3AF"}}>\uD83D\uDD12 Your information is secure and will not be shared.</p>
        </div>}</div>
      </div></div>}

      {/* ═══ WHATSAPP ═══ */}
      <a className="wa" href="https://wa.me/918088434442?text=Hi%2C%20I%20am%20interested%20in%20the%2030%20Days%20Business%20Analyst%20Live%20Training%20%2B%2030%20Days%20Project-Based%20Internship.%20Please%20share%20details." target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"><svg viewBox="0 0 32 32"><path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.926 15.926 0 0016.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.302 22.602c-.388 1.094-1.938 2.004-3.164 2.268-.84.178-1.938.32-5.632-1.21-4.726-1.956-7.77-6.756-8.006-7.07-.228-.314-1.866-2.486-1.866-4.744 0-2.258 1.18-3.368 1.6-3.828.388-.424.914-.6 1.218-.6.152 0 .29.008.414.014.42.018.63.042.906.706.346.83 1.188 2.898 1.292 3.11.106.212.212.492.072.778-.13.29-.244.468-.458.722-.214.254-.44.45-.654.726-.194.24-.412.496-.176.916.236.42 1.05 1.734 2.256 2.81 1.55 1.384 2.856 1.814 3.262 2.012.406.198.644.166.882-.1.24-.268 1.026-1.192 1.3-1.6.272-.41.544-.342.916-.206.374.136 2.372 1.12 2.778 1.324.406.204.676.306.776.476.098.17.098.984-.29 2.076z"/></svg></a>
    </>
  );
}
