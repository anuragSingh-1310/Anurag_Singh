import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ArrowRight,
  ExternalLink,
  FileText,
  Award,
  BookOpen,
  Briefcase,
  Code,
  Cpu,
  Heart,
  User,
  CheckCircle2,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  Search,
  Database,
  Terminal,
  Volume2,
  FileBadge,
  Calendar,
  Moon
} from 'lucide-react';
import ClickSpark from './components/ClickSpark';
import ShapeBlur from './components/ShapeBlur';
import ThemeToggle from './components/ThemeToggle';
import SleepScreen from './components/SleepScreen';
import LoadingScreen from './components/LoadingScreen';
import ScrollReveal from './components/ScrollReveal';
import DotField from './components/DotField';
import { useLenis } from 'lenis/react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'ai' | 'web' | 'other'>('all');
  const lenis = useLenis();

  // Block scroll when loading screen is active
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = 'unset';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = 'unset';
      lenis?.start();
    };
  }, [isLoading, lenis]);
  
  // Interactive Widgets State
  const [activeDiagnostic, setActiveDiagnostic] = useState<string | null>(null);
  const [diagnosticProgress, setDiagnosticProgress] = useState(0);
  const [diagnosticResult, setDiagnosticResult] = useState<any | null>(null);
  
  const [fnsCart, setFnsCart] = useState<any[]>([]);
  const [fnsSyncing, setFnsSyncing] = useState(false);
  const [fnsSyncLogs, setFnsSyncLogs] = useState<string[]>(['Firebase listener initialized...']);
  
  const [selectedQA, setSelectedQA] = useState<number | null>(null);

  // Smooth scroll to sections using Lenis
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      if (lenis) {
        lenis.scrollTo(element, { offset: -30, duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Diagnostic Analyzer handler (VaidyaSetu simulation)
  const runDiagnostic = (symptomClusterId: string, disease: string, confidence: string) => {
    setActiveDiagnostic(symptomClusterId);
    setDiagnosticProgress(0);
    setDiagnosticResult(null);

    const interval = setInterval(() => {
      setDiagnosticProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDiagnosticResult({
            disease,
            confidence,
            classificationTime: '1.24s',
            accuracyRate: '96%',
            recs: ['Consult primary care physician', 'Monitor vitals daily', 'Maintain standard rest and hydration']
          });
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  // FNS Cart Add handler
  const addToFnsCart = (itemName: string, price: number) => {
    const newItem = { id: Date.now(), name: itemName, price };
    setFnsCart((prev) => [...prev, newItem]);
    setFnsSyncing(true);
    setFnsSyncLogs((prev) => [
      `Writing doc: users/guest/cart/${newItem.id} (Firestore payload)`,
      ...prev
    ]);

    setTimeout(() => {
      setFnsSyncing(false);
      setFnsSyncLogs((prev) => [
        `✓ [Success] Document written. Sync complete. (latency: 180ms)`,
        `Security Rules Verified: read/write allowed under rules.v2`,
        ...prev
      ]);
    }, 400);
  };

  // FNS Cart Remove handler
  const removeFromFnsCart = (id: number) => {
    setFnsCart((prev) => prev.filter((item) => item.id !== id));
    setFnsSyncing(true);
    setFnsSyncLogs((prev) => [
      `Deleting doc: users/guest/cart/${id}`,
      ...prev
    ]);

    setTimeout(() => {
      setFnsSyncing(false);
      setFnsSyncLogs((prev) => [
        `✓ [Success] Document deleted. Sync complete. (latency: 120ms)`,
        ...prev
      ]);
    }, 300);
  };

  // Static Q&A Data
  const qaData = [
    {
      q: 'What is your current focus and target opportunities?',
      a: 'I am currently in my Bachelor of Technology program in CSE (2023-27) at VIT Bhopal. I am looking for software development or AI engineering roles where I can leverage my React, Node.js, and AI API experience to deliver high-quality production applications.'
    },
    {
      q: 'Can you outline your deep learning expertise?',
      a: 'Through my personal project VaidyaSetu, I trained a deep learning model on a Kaggle dataset containing 10,000+ labeled medical images to classify diseases with 96% validation accuracy. I coupled this with Flask and Hugging Face APIs to build a robust client-server interface with sub-2s response times.'
    },
    {
      q: 'What did you build during your internship at QpiAI?',
      a: 'As a Web Development Intern, I developed the frontend of a complex, production-grade Production Planning Web Application for an automotive manufacturer. I utilized React.js, HTML5, CSS3, and RESTful APIs, optimized asset delivery to slash frontend load times by 20%, and integrated WebSockets.'
    }
  ];

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <ClickSpark
        sparkColor="#C85A32"
        sparkSize={10}
        sparkRadius={16}
        sparkCount={8}
        duration={400}
      >
      <div className="min-h-screen bg-art-bg text-art-text font-sans selection:bg-art-accent/15 selection:text-art-accent transition-colors duration-300 relative w-full overflow-x-hidden">
        
        {/* Dynamic interactive background dots */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden select-none dot-field-wrapper z-0">
          <DotField
            dotRadius={1.4}
            dotSpacing={22.6}
            bulgeStrength={50}
            glowRadius={170}
            sparkle={false}
            waveAmplitude={0}
          />
        </div>
        
        {/* Decorative soft glowing spots */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-art-accent/5 blur-3xl pointer-events-none" />
        <div className="absolute top-80 right-20 w-80 h-80 rounded-full bg-art-accent-ter/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-40 left-1/3 w-96 h-96 rounded-full bg-art-gold/5 blur-3xl pointer-events-none" />

        {/* Navigation Bar */}
        <header className="sticky top-0 z-50 border-b border-art-border/40 backdrop-blur-md bg-art-bg/85 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            
            {/* Logo / Brand */}
            <div
              className="flex items-center gap-1.5 sm:gap-2 cursor-pointer"
              onClick={() => {
                if (lenis) {
                  lenis.scrollTo(0, { duration: 1.2 });
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <span className="font-display text-sm sm:text-base md:text-lg font-black tracking-wider text-art-text whitespace-nowrap">
                ANURAG<span className="text-art-accent font-serif italic">.</span>SINGH
              </span>
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-art-accent animate-pulse" />
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('about')} className="text-sm font-semibold text-art-text-muted hover:text-art-accent transition-colors">About</button>
              <button onClick={() => scrollToSection('education')} className="text-sm font-semibold text-art-text-muted hover:text-art-accent transition-colors">Education</button>
              <button onClick={() => scrollToSection('experience')} className="text-sm font-semibold text-art-text-muted hover:text-art-accent transition-colors">Experience</button>
              <button onClick={() => scrollToSection('projects')} className="text-sm font-semibold text-art-text-muted hover:text-art-accent transition-colors">Projects</button>
              <button onClick={() => scrollToSection('skills')} className="text-sm font-semibold text-art-text-muted hover:text-art-accent transition-colors">Skills</button>
              <button onClick={() => scrollToSection('achievements')} className="text-sm font-semibold text-art-text-muted hover:text-art-accent transition-colors">Achievements</button>
            </nav>

            {/* Right widgets (Theme toggle & mobile menu trigger) */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg md:hidden hover:bg-art-sec text-art-text-muted hover:text-art-text transition-colors border border-art-border/50"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-art-border bg-art-card px-4 py-4 space-y-3 overflow-hidden"
            >
              <button onClick={() => { scrollToSection('about'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-sm font-semibold text-art-text-muted hover:text-art-accent transition-colors">About</button>
              <button onClick={() => { scrollToSection('education'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-sm font-semibold text-art-text-muted hover:text-art-accent transition-colors">Education</button>
              <button onClick={() => { scrollToSection('experience'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-sm font-semibold text-art-text-muted hover:text-art-accent transition-colors">Experience</button>
              <button onClick={() => { scrollToSection('projects'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-sm font-semibold text-art-text-muted hover:text-art-accent transition-colors">Projects</button>
              <button onClick={() => { scrollToSection('skills'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-sm font-semibold text-art-text-muted hover:text-art-accent transition-colors">Skills</button>
              <button onClick={() => { scrollToSection('achievements'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-sm font-semibold text-art-text-muted hover:text-art-accent transition-colors">Achievements</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <section id="about" className="relative pt-16 pb-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,var(--color-art-accent)/4,transparent)]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Profile Details Card on Scroll */}
              <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
                
                {/* Visual Label */}
                <ScrollReveal direction="up" delay={0.05}>
                  <div className="inline-flex items-center gap-1.5 self-start px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider bg-art-accent/10 text-art-accent border border-art-accent/20">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI & FULL-STACK SOFTWARE DEVELOPER
                  </div>
                </ScrollReveal>

                <ScrollReveal mode="letters" delay={0.15} staggerDelay={0.015}>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-art-text leading-[1.15]">
                    Hi, I am <span className="text-art-accent font-serif italic font-medium">Anurag Singh</span>
                  </h1>
                </ScrollReveal>

                <ScrollReveal mode="words" delay={0.4} staggerDelay={0.008}>
                  <p className="text-lg sm:text-xl text-art-text-muted max-w-2xl font-light leading-relaxed font-sans">
                    B.Tech CSE scholar at <strong className="font-semibold text-art-text">VIT Bhopal University</strong> (CGPA: 8.5). I architect high-performance React frontends, deploy robust deep learning applications, and integrate cloud-native server architectures.
                  </p>
                </ScrollReveal>

                {/* Direct Contact Handles */}
                <ScrollReveal direction="up" delay={0.65}>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href="mailto:anuragtomar1113@gmail.com"
                      className="flex items-center gap-2 px-5 py-3 bg-art-accent hover:bg-art-accent/90 text-art-card rounded-2xl text-sm font-semibold shadow-md shadow-art-accent/15 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 border border-art-accent/10"
                    >
                      <Mail className="w-4 h-4" />
                      Email Me
                    </a>
                    <a
                      href="https://github.com/anuragSingh-1310"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-3 bg-art-sec hover:bg-art-card text-art-text hover:text-art-accent rounded-2xl text-sm font-semibold border border-art-border/80 hover:border-art-accent/30 shadow-xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-3 bg-art-sec hover:bg-art-card text-art-text hover:text-art-accent rounded-2xl text-sm font-semibold border border-art-border/80 hover:border-art-accent/30 shadow-xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  </div>
                </ScrollReveal>

                {/* Secondary Contact Info line */}
                <ScrollReveal direction="up" delay={0.75}>
                  <div className="flex flex-wrap gap-4 text-xs font-mono text-art-text-muted pt-3 border-t border-art-border/60">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-art-accent" />
                      <span>+91-8827672003</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-art-accent" />
                      <span>VIT Bhopal CSE (2023-27)</span>
                    </div>
                  </div>
                </ScrollReveal>

              </div>

              {/* Interactive Photo Box with ShapeBlur Hover Effect */}
              <ScrollReveal direction="up" delay={0.25} className="lg:col-span-5 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-radial-gradient(circle_at_center,var(--color-art-accent)/8,transparent_60%) pointer-events-none" />
                
                <div className="relative group w-full max-w-[435px] aspect-square flex items-center justify-center select-none">
                  {/* WebGL ShapeBlur component for interactive cursor highlight (brought in front of image) */}
                  <div className="absolute inset-0 z-20 pointer-events-none">
                    <ShapeBlur
                      variation={0}
                      shapeSize={1.45}
                      roundness={0.4}
                      borderSize={0.05}
                      circleSize={0.3}
                      circleEdge={0.5}
                    />
                  </div>

                  {/* High contrast visual avatar positioned slightly higher with a minimal hover zoom effect */}
                  <img
                    src="https://lh3.googleusercontent.com/d/1YxtLzT62Ld6VV3sF0VZNseBs1wbgbUVg"
                    alt="Anurag Tomar"
                    className="absolute z-10 w-[84%] h-[84%] object-contain rounded-3xl filter drop-shadow-[0_12px_25px_rgba(0,0,0,0.4)] -translate-y-2.5 scale-[0.90] transition-transform duration-500 ease-out pointer-events-none"
                    style={{ clipPath: 'inset(0px 0px 0.2cm 0px round 1.5rem)' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/anurag_avatar.svg";
                    }}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </ScrollReveal>

            </div>
          </div>
        </section>

        {/* Quick Highlights Metrics Bar */}
        <section className="py-10 bg-art-sec/40 border-y border-art-border/60 backdrop-blur-xs relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient(circle_at_center,var(--border-color)/5,transparent_75%) pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal direction="up" className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4">
                <span className="block text-4xl font-extrabold text-art-accent font-display tracking-tight">8.5</span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-art-text-muted mt-2 block">VIT Bhopal CGPA</span>
              </div>
              <div className="p-4 border-l border-art-border/50">
                <span className="block text-4xl font-extrabold text-art-accent font-display tracking-tight">90.4%</span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-art-text-muted mt-2 block">12th Percentage</span>
              </div>
              <div className="p-4 border-l-0 md:border-l border-art-border/50">
                <span className="block text-4xl font-extrabold text-art-accent font-display tracking-tight">1120</span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-art-text-muted mt-2 block">Codeforces Rating</span>
              </div>
              <div className="p-4 border-l border-art-border/50">
                <span className="block text-3xl sm:text-4xl font-extrabold text-art-accent font-display tracking-tight">QpiAI</span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-art-text-muted mt-2 block">Web Intern</span>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Education Timeline */}
        <section id="education" className="py-24 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center space-y-3 mb-16">
              <ScrollReveal direction="up" delay={0.05}>
                <span className="text-xs font-mono font-bold tracking-widest text-art-accent uppercase">Educational Journey</span>
              </ScrollReveal>
              <ScrollReveal mode="letters" delay={0.15}>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-art-text">Academic Background</h2>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.4}>
                <div className="h-[3px] w-16 bg-art-accent rounded-full opacity-80" />
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" delay={0.2} className="relative border-l-2 border-art-border max-w-3xl mx-auto ml-7 mr-3 sm:mx-auto pl-5 sm:pl-8 space-y-12">
              
              {/* VIT Bhopal */}
              <div className="relative">
                <div className="absolute -left-[19px] mt-1 bg-art-card border-4 border-art-accent rounded-full p-1.5 text-art-accent z-10 shadow-xs">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="bg-art-card border border-art-border p-6 rounded-3xl shadow-xs hover:shadow-md hover:border-art-accent/20 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h3 className="text-lg font-bold text-art-text">VIT Bhopal University, Bhopal</h3>
                    <span className="inline-block px-3 py-1 bg-art-sec text-art-text-muted border border-art-border/40 text-xs font-mono rounded-full self-start">2023 - 2027</span>
                  </div>
                  <p className="text-art-accent font-semibold text-sm">B.Tech in Computer Science & Engineering</p>
                  <p className="text-art-text-muted text-sm mt-2 leading-relaxed">
                    Developing high level competency in engineering topics. Current cumulative grade point average (CGPA) is <strong className="font-semibold text-art-text">8.5</strong>. Active in campus activities and fine arts technical lead.
                  </p>
                  <div className="mt-4 pt-4 border-t border-art-border/50 flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 bg-art-accent/10 text-art-accent border border-art-accent/20 rounded-lg text-xs font-mono font-bold">GPA: 8.5</span>
                    <span className="px-2.5 py-1 bg-art-sec text-art-text-muted border border-art-border/30 rounded-lg text-xs font-mono">Data Structures</span>
                    <span className="px-2.5 py-1 bg-art-sec text-art-text-muted border border-art-border/30 rounded-lg text-xs font-mono">DBMS</span>
                    <span className="px-2.5 py-1 bg-art-sec text-art-text-muted border border-art-border/30 rounded-lg text-xs font-mono">OS</span>
                  </div>
                </div>
              </div>

              {/* APS XII */}
              <div className="relative">
                <div className="absolute -left-[19px] mt-1 bg-art-card border-4 border-art-border rounded-full p-1.5 text-art-text-muted z-10">
                  <Award className="w-4 h-4" />
                </div>
                <div className="bg-art-card border border-art-border p-6 rounded-3xl shadow-xs hover:shadow-md hover:border-art-accent/20 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h3 className="text-lg font-bold text-art-text">Army Public School, Gwalior</h3>
                    <span className="inline-block px-3 py-1 bg-art-sec text-art-text-muted border border-art-border/40 text-xs font-mono rounded-full self-start">2021 - 2022</span>
                  </div>
                  <p className="text-art-text-muted text-sm">Class XII | Central Board of Secondary Education (CBSE)</p>
                  <p className="text-art-text-muted text-sm mt-1 leading-relaxed">
                    Graduated with first class distinction. Obtained overall scoring rate of <strong className="font-semibold text-art-text">90.4%</strong>. Proudly served as the <strong className="font-semibold text-art-accent">Headboy of Army Public School Gwalior</strong>.
                  </p>
                </div>
              </div>

              {/* APS X */}
              <div className="relative">
                <div className="absolute -left-[19px] mt-1 bg-art-card border-4 border-art-border rounded-full p-1.5 text-art-text-muted z-10">
                  <Award className="w-4 h-4" />
                </div>
                <div className="bg-art-card border border-art-border p-6 rounded-3xl shadow-xs hover:shadow-md hover:border-art-accent/20 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h3 className="text-lg font-bold text-art-text">Army Public School, Gwalior</h3>
                    <span className="inline-block px-3 py-1 bg-art-sec text-art-text-muted border border-art-border/40 text-xs font-mono rounded-full self-start">2019 - 2020</span>
                  </div>
                  <p className="text-art-text-muted text-sm">Class X | Central Board of Secondary Education (CBSE)</p>
                  <p className="text-art-text-muted text-sm mt-1 leading-relaxed">
                    Obtained overall scoring rate of <strong className="font-semibold text-art-text">89.8%</strong>.
                  </p>
                </div>
              </div>

            </ScrollReveal>
          </div>
        </section>

        {/* Professional Experience */}
        <section id="experience" className="py-24 bg-art-sec/30 border-y border-art-border/45 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center space-y-3 mb-16">
              <ScrollReveal direction="up" delay={0.05}>
                <span className="text-xs font-mono font-bold tracking-widest text-art-accent uppercase">Industry Exposure</span>
              </ScrollReveal>
              <ScrollReveal mode="letters" delay={0.15}>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-art-text">Work Experience</h2>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.4}>
                <div className="h-[3px] w-16 bg-art-accent rounded-full opacity-80" />
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" delay={0.2} className="max-w-3xl mx-auto">
              <div className="bg-art-card border border-art-border p-6 sm:p-8 rounded-[2rem] shadow-sm hover:shadow-md hover:border-art-accent/20 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2.5 h-full bg-art-accent" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-display font-extrabold text-art-text">Web Development Intern</h3>
                    <p className="text-art-accent font-semibold text-sm mt-0.5">QpiAI</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-art-accent/10 text-art-accent border border-art-accent/20 text-xs font-mono font-bold rounded-full mb-1">
                      <Calendar className="w-3.5 h-3.5" />
                      May - June 2025
                    </span>
                    <p className="text-xs text-art-text-muted font-mono">Remote / Online</p>
                  </div>
                </div>

                <ul className="space-y-3 text-art-text-muted text-sm leading-relaxed mt-4 list-none pl-0">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-art-accent shrink-0 mt-0.5" />
                    <span>Developed the frontend of a high-complexity production scheduling and planning web application for an automotive manufacturing business. Took ownership of core React layouts.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-art-accent shrink-0 mt-0.5" />
                    <span>Implemented responsive client interfaces with React.js, HTML5, CSS3, and JavaScript, cleanly managing over 100+ complex daily data mutations and interactions.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-art-accent shrink-0 mt-0.5" />
                    <span>Configured RESTful API bridges to synchronize database updates, achieving sub-500ms server response thresholds.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-art-accent shrink-0 mt-0.5" />
                    <span>Analyzed codebase architectures, identified structural load bottlenecks, and resolved visual defects, driving down total web asset loading latency by <strong className="font-semibold text-art-text">20%</strong>.</span>
                  </li>
                </ul>

                <div className="mt-6 pt-6 border-t border-art-border flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 bg-art-sec text-art-text-muted border border-art-border/40 rounded-lg text-xs font-mono font-medium">React.js</span>
                  <span className="px-2.5 py-1 bg-art-sec text-art-text-muted border border-art-border/40 rounded-lg text-xs font-mono font-medium">HTML5/CSS3</span>
                  <span className="px-2.5 py-1 bg-art-sec text-art-text-muted border border-art-border/40 rounded-lg text-xs font-mono font-medium">RESTful APIs</span>
                  <span className="px-2.5 py-1 bg-art-sec text-art-text-muted border border-art-border/40 rounded-lg text-xs font-mono font-medium">UI Optimization</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col items-center text-center space-y-3 mb-12">
              <ScrollReveal direction="up" delay={0.05}>
                <span className="text-xs font-mono font-bold tracking-widest text-art-accent uppercase">Portfolio Core</span>
              </ScrollReveal>
              <ScrollReveal mode="letters" delay={0.15}>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-art-text">Featured Projects</h2>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.4}>
                <div className="h-[3px] w-16 bg-art-accent rounded-full opacity-80" />
              </ScrollReveal>
              <ScrollReveal mode="words" delay={0.45}>
                <p className="text-sm text-art-text-muted max-w-lg">Interactive simulations are embedded directly within cards below. Give them a spin!</p>
              </ScrollReveal>
            </div>

            {/* Tab Controllers */}
            <div className="flex justify-center gap-2 mb-12">
              {(['all', 'ai', 'web', 'other'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-300 border ${
                    activeTab === tab
                      ? 'bg-art-accent text-art-bg border-art-accent shadow-md shadow-art-accent/15'
                      : 'bg-art-sec text-art-text-muted border-art-border/40 hover:text-art-text hover:bg-art-sec/80'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <ScrollReveal direction="up" delay={0.15} className="grid grid-cols-1 lg:grid-cols-2 gap-10">

              {/* PROJECT 1: VaidyaSetu (AI / HEALTH) */}
              {(activeTab === 'all' || activeTab === 'ai') && (
                <div className="bg-art-card border border-art-border rounded-[2rem] overflow-hidden shadow-xs hover:shadow-md hover:border-art-accent/20 transition-all duration-300 flex flex-col justify-between">
                  <div className="p-6 sm:p-8 space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-art-accent-ter/10 text-art-accent-ter border border-art-accent-ter/20 text-xs font-mono font-semibold uppercase rounded-full">AI Medical Companion</span>
                      <span className="text-xs font-mono text-art-text-muted">Deep Learning Model</span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-display font-extrabold text-art-text">VaidyaSetu</h3>
                      <p className="text-xs text-art-text-muted italic mt-0.5">A collaborative hackathon group project delivering an online health companion.</p>
                    </div>

                    <p className="text-sm text-art-text-muted leading-relaxed">
                      Collaborated in a fast-paced hackathon group project to build a smart diagnostic companion. Personally engineered and designed the entire <strong className="font-semibold text-art-text">responsive web frontend</strong> utilizing semantic <strong className="font-semibold text-art-text">HTML5, custom CSS3 stylesheets, and dynamic interactive JavaScript (ES6)</strong>. Integrated seamless client dashboard layouts with external APIs for responsive live symptom classification previews.
                    </p>

                    {/* INTERACTIVE WIDGET: Symptom Diagnostic Panel */}
                    <div className="mt-4 p-4 rounded-2xl bg-art-bg/60 border border-art-border">
                      <div className="flex items-center gap-2 mb-3">
                        <Terminal className="w-4 h-4 text-art-accent" />
                        <span className="text-xs font-mono font-bold text-art-text">VaidyaSetu Diagnosis Sandbox</span>
                      </div>

                      <p className="text-xs text-art-text-muted mb-3">Select symptoms below to query the deep learning classifier model:</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                        <button
                          onClick={() => runDiagnostic('cough_fever', 'Acute Bronchitis', '97.2%')}
                          className="px-2.5 py-2 text-left text-xs rounded-lg border border-art-border/60 hover:border-art-accent/40 bg-art-card hover:bg-art-sec text-art-text-muted hover:text-art-accent font-semibold transition-all"
                        >
                          🤒 High Fever & Cough
                        </button>
                        <button
                          onClick={() => runDiagnostic('chest_pain', 'Cardiac Stress Alert', '95.8%')}
                          className="px-2.5 py-2 text-left text-xs rounded-lg border border-art-border/60 hover:border-art-accent/40 bg-art-card hover:bg-art-sec text-art-text-muted hover:text-art-accent font-semibold transition-all"
                        >
                          🫁 Chest Pressure / Pain
                        </button>
                        <button
                          onClick={() => runDiagnostic('skin_rash', 'Allergic Dermatitis', '98.1%')}
                          className="px-2.5 py-2 text-left text-xs rounded-lg border border-art-border/60 hover:border-art-accent/40 bg-art-card hover:bg-art-sec text-art-text-muted hover:text-art-accent font-semibold transition-all"
                        >
                          🧼 Rash & Intense Itching
                        </button>
                        <button
                          onClick={() => runDiagnostic('joint_pain', 'Inflammatory Arthritis', '94.3%')}
                          className="px-2.5 py-2 text-left text-xs rounded-lg border border-art-border/60 hover:border-art-accent/40 bg-art-card hover:bg-art-sec text-art-text-muted hover:text-art-accent font-semibold transition-all"
                        >
                          🦵 Joint Pain & Stiffness
                        </button>
                      </div>

                      {/* Diagnostic running UI */}
                      {activeDiagnostic && (
                        <div className="p-3 bg-art-card rounded-xl border border-art-border">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-mono font-medium text-art-text-muted">Classifying symptoms...</span>
                            <span className="text-xs font-mono text-art-accent font-bold">{diagnosticProgress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-art-sec rounded-full overflow-hidden mb-3">
                            <div className="h-full bg-art-accent transition-all duration-150" style={{ width: `${diagnosticProgress}%` }} />
                          </div>

                          {diagnosticResult && (
                            <div className="space-y-2 animate-fade-in">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                <span className="text-xs font-bold text-art-text">
                                  Prediction: {diagnosticResult.disease}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-art-text-muted">
                                <div>Confidence: <span className="text-art-accent font-bold">{diagnosticResult.confidence}</span></div>
                                <div>Latency: <span>{diagnosticResult.classificationTime}</span></div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 bg-art-sec/40 border-t border-art-border/60 flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="px-2.5 py-1 bg-art-sec text-art-text-muted border border-art-border/40 rounded-lg text-xs font-mono font-medium">HTML5</span>
                      <span className="px-2.5 py-1 bg-art-sec text-art-text-muted border border-art-border/40 rounded-lg text-xs font-mono font-medium">CSS3</span>
                      <span className="px-2.5 py-1 bg-art-sec text-art-text-muted border border-art-border/40 rounded-lg text-xs font-mono font-medium">JavaScript</span>
                    </div>
                    <a href="https://github.com/anuragSingh-1310/Vaidya-Setu" target="_blank" rel="noreferrer" className="text-art-text-muted hover:text-art-accent transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              )}

              {/* PROJECT 2: FNS – Friendly Neighbourhood Store (AI / WEB) */}
              {(activeTab === 'all' || activeTab === 'ai' || activeTab === 'web') && (
                <div className="bg-art-card border border-art-border rounded-[2rem] overflow-hidden shadow-xs hover:shadow-md hover:border-art-accent/20 transition-all duration-300 flex flex-col justify-between">
                  <div className="p-6 sm:p-8 space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-art-accent/10 text-art-accent border border-art-accent/20 text-xs font-mono font-semibold uppercase rounded-full">Friendly Neighbourhood Store</span>
                      <span className="text-xs font-mono text-art-text-muted">Full-Stack Application</span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-display font-extrabold text-art-text">FNS – Local Digitization</h3>
                      <p className="text-xs text-art-text-muted italic mt-0.5">AI-assisted full-stack web application for local store digitization.</p>
                    </div>

                    <p className="text-sm text-art-text-muted leading-relaxed">
                      Constructed a responsive full-stack platform using <strong className="font-semibold text-art-text">React (TypeScript) & Firebase</strong>, facilitating secure customer logins, cloud catalogs, and real-time transaction synchronization serving 100+ concurrent connections. Utilized Firebase Firestore and Auth, and integrated custom Firestore security rules ensuring secure database transactions.
                    </p>

                    {/* INTERACTIVE WIDGET: FNS cart syncing engine */}
                    <div className="mt-4 p-4 rounded-2xl bg-art-bg/60 border border-art-border">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Database className="w-4 h-4 text-art-accent" />
                          <span className="text-xs font-mono font-bold text-art-text">Firestore Real-time Sync Sandbox</span>
                        </div>
                        {fnsSyncing && (
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 mb-4">
                        <button
                          onClick={() => addToFnsCart('Organic Apples (1kg)', 4.99)}
                          className="w-full sm:w-auto justify-center px-3 py-1.5 bg-art-card border border-art-border/60 hover:border-art-accent/40 hover:text-art-accent hover:bg-art-sec text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          🍎 Add Apples ($4.99)
                        </button>
                        <button
                          onClick={() => addToFnsCart('Avo-Milk Shake (500ml)', 6.49)}
                          className="w-full sm:w-auto justify-center px-3 py-1.5 bg-art-card border border-art-border/60 hover:border-art-accent/40 hover:text-art-accent hover:bg-art-sec text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          🥑 Add Shake ($6.49)
                        </button>
                      </div>

                      {/* Display Local Sync Cart */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                        <div className="bg-art-card p-3 rounded-xl border border-art-border max-h-[140px] overflow-y-auto">
                          <div className="text-[10px] uppercase tracking-wider text-art-text-muted font-mono font-bold mb-1">Your Cart Items:</div>
                          {fnsCart.length === 0 ? (
                            <p className="text-[11px] text-art-text-muted italic">No items. Tap above to add and fire Firestore events.</p>
                          ) : (
                            <ul className="space-y-1.5 pl-0 m-0 list-none">
                              {fnsCart.map((item) => (
                                <li key={item.id} className="flex items-center justify-between text-xs">
                                  <span className="text-art-text truncate max-w-[120px]">{item.name}</span>
                                  <div className="flex items-center gap-2 font-mono text-art-text-muted">
                                    <span>${item.price}</span>
                                    <button onClick={() => removeFromFnsCart(item.id)} className="text-art-accent hover:text-art-accent-ter font-bold font-sans">×</button>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <div className="bg-art-sec/60 p-3 rounded-xl border border-art-border/80 max-h-[140px] overflow-y-auto font-mono text-[9px] text-emerald-400 space-y-1">
                          <div className="text-art-text-muted border-b border-art-border pb-0.5 mb-1 flex items-center justify-between">
                            <span>FIRESTORE DEB_LOGS</span>
                            <span className="font-bold">{fnsSyncing ? 'SYNCING...' : 'IDLE'}</span>
                          </div>
                          {fnsSyncLogs.slice(0, 4).map((log, idx) => (
                            <div key={idx} className="truncate">{log}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 bg-art-sec/40 border-t border-art-border/60 flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="px-2.5 py-1 bg-art-sec text-art-text-muted border border-art-border/40 rounded-lg text-xs font-mono font-medium">React TS</span>
                      <span className="px-2.5 py-1 bg-art-sec text-art-text-muted border border-art-border/40 rounded-lg text-xs font-mono font-medium">Firebase</span>
                      <span className="px-2.5 py-1 bg-art-sec text-art-text-muted border border-art-border/40 rounded-lg text-xs font-mono font-medium">NoSQL</span>
                    </div>
                    <a href="https://github.com/anuragSingh-1310/FNS" target="_blank" rel="noreferrer" className="text-art-text-muted hover:text-art-accent transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              )}

              {/* SECONDARY PROJECTS */}
              {(activeTab === 'all' || activeTab === 'web' || activeTab === 'other') && (
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  
                  {/* Theft-Detector */}
                  <div className="bg-art-card border border-art-border p-6 rounded-3xl shadow-xs hover:shadow-md hover:border-art-accent/20 transition-all duration-300 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="h-8 w-8 rounded-lg bg-art-accent/10 text-art-accent border border-art-accent/20 flex items-center justify-center">
                        <Cpu className="w-4.5 h-4.5" />
                      </div>
                      <h4 className="text-md font-display font-extrabold text-art-text">Theft-Detector</h4>
                      <p className="text-xs text-art-text-muted leading-relaxed">
                        A smart hardware security system built using an Arduino microcontroller, active physical motion sensors, and hardware security triggers to secure physical environments.
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-art-border/50 flex items-center justify-between text-xs font-mono">
                      <span className="text-art-text-muted">Arduino / Embedded C</span>
                      <a href="https://github.com/anuragSingh-1310/Theft-Detector" target="_blank" rel="noreferrer" className="text-art-text-muted hover:text-art-accent transition-colors"><Github className="w-4 h-4" /></a>
                    </div>
                  </div>

                  {/* Weather Application */}
                  <div className="bg-art-card border border-art-border p-6 rounded-3xl shadow-xs hover:shadow-md hover:border-art-accent/20 transition-all duration-300 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="h-8 w-8 rounded-lg bg-art-accent/10 text-art-accent border border-art-accent/20 flex items-center justify-center">
                        <Database className="w-4.5 h-4.5" />
                      </div>
                      <h4 className="text-md font-display font-extrabold text-art-text">Weather Application</h4>
                      <p className="text-xs text-art-text-muted leading-relaxed">
                        A responsive forecasting application built entirely using Java with JFrame for the custom desktop frontend and integrating Google Weather API for real-time local forecast data.
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-art-border/50 flex items-center justify-between text-xs font-mono">
                      <span className="text-art-text-muted">Java / JFrame / Google API</span>
                      <a href="https://github.com/anuragSingh-1310/Weather-Application" target="_blank" rel="noreferrer" className="text-art-text-muted hover:text-art-accent transition-colors"><Github className="w-4 h-4" /></a>
                    </div>
                  </div>

                  {/* Virtual Mouse */}
                  <div className="bg-art-card border border-art-border p-6 rounded-3xl shadow-xs hover:shadow-md hover:border-art-accent/20 transition-all duration-300 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="h-8 w-8 rounded-lg bg-art-accent/10 text-art-accent border border-art-accent/20 flex items-center justify-center">
                        <Terminal className="w-4.5 h-4.5" />
                      </div>
                      <h4 className="text-md font-display font-extrabold text-art-text">Virtual Mouse</h4>
                      <p className="text-xs text-art-text-muted leading-relaxed">
                        Allows natural cursor control of local screen paths by executing real-time spatial coordinate mapping of hand gestures and movements tracked via camera captures.
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-art-border/50 flex items-center justify-between text-xs font-mono">
                      <span className="text-art-text-muted">Python / MediaPipe</span>
                      <a href="https://github.com/anuragSingh-1310/Virtual-Mouse" target="_blank" rel="noreferrer" className="text-art-text-muted hover:text-art-accent transition-colors"><Github className="w-4 h-4" /></a>
                    </div>
                  </div>

                </div>
              )}

            </ScrollReveal>
          </div>
        </section>

        {/* Technical Skills Map */}
        <section id="skills" className="py-24 bg-art-sec/30 border-y border-art-border/45 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center space-y-3 mb-16">
              <ScrollReveal direction="up" delay={0.05}>
                <span className="text-xs font-mono font-bold tracking-widest text-art-accent uppercase">Core Competencies</span>
              </ScrollReveal>
              <ScrollReveal mode="letters" delay={0.15}>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-art-text">Technical Skills</h2>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.4}>
                <div className="h-[3px] w-16 bg-art-accent rounded-full opacity-80" />
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" delay={0.2} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Languages */}
              <div className="bg-art-card p-6 rounded-3xl border border-art-border shadow-xs space-y-4 hover:border-art-accent/20 transition-all">
                <div className="flex items-center gap-2 border-b border-art-border/40 pb-3">
                  <div className="p-1.5 bg-art-accent/10 text-art-accent border border-art-accent/20 rounded-lg">
                    <Code className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-sm text-art-text uppercase tracking-wider font-mono">Languages</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Java', 'Python', 'JavaScript', 'HTML5', 'CSS3'].map((lang) => (
                    <span key={lang} className="px-3 py-1.5 bg-art-sec text-art-text-muted text-xs font-mono rounded-lg border border-art-border/40 font-semibold">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Frameworks & Libraries */}
              <div className="bg-art-card p-6 rounded-3xl border border-art-border shadow-xs space-y-4 hover:border-art-accent/20 transition-all">
                <div className="flex items-center gap-2 border-b border-art-border/40 pb-3">
                  <div className="p-1.5 bg-art-accent/10 text-art-accent border border-art-accent/20 rounded-lg">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-sm text-art-text uppercase tracking-wider font-mono">Frameworks / Libs</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['React.js', 'Pandas', 'WebSocket', 'Java Swing', 'Express'].map((lib) => (
                    <span key={lib} className="px-3 py-1.5 bg-art-sec text-art-text-muted text-xs font-mono rounded-lg border border-art-border/40 font-semibold">
                      {lib}
                    </span>
                  ))}
                </div>
              </div>

              {/* Web Dev Tools */}
              <div className="bg-art-card p-6 rounded-3xl border border-art-border shadow-xs space-y-4 hover:border-art-accent/20 transition-all">
                <div className="flex items-center gap-2 border-b border-art-border/40 pb-3">
                  <div className="p-1.5 bg-art-accent/10 text-art-accent border border-art-accent/20 rounded-lg">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-sm text-art-text uppercase tracking-wider font-mono">Tools & Environments</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['VS Code', 'GitHub', 'Canva', 'Vercel', 'Vite'].map((tool) => (
                    <span key={tool} className="px-3 py-1.5 bg-art-sec text-art-text-muted text-xs font-mono rounded-lg border border-art-border/40 font-semibold">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cloud & Databases */}
              <div className="bg-art-card p-6 rounded-3xl border border-art-border shadow-xs space-y-4 hover:border-art-accent/20 transition-all">
                <div className="flex items-center gap-2 border-b border-art-border/40 pb-3">
                  <div className="p-1.5 bg-art-accent/10 text-art-accent border border-art-accent/20 rounded-lg">
                    <Database className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-sm text-art-text uppercase tracking-wider font-mono">Cloud / Database</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['MySQL', 'Firebase', 'Firestore', 'Firebase Auth', 'Firebase Rules'].map((db) => (
                    <span key={db} className="px-3 py-1.5 bg-art-sec text-art-text-muted text-xs font-mono rounded-lg border border-art-border/40 font-semibold">
                      {db}
                    </span>
                  ))}
                </div>
              </div>

            </ScrollReveal>

            {/* Coursework details */}
            <ScrollReveal direction="up" delay={0.35} className="mt-12 bg-art-card p-6 rounded-3xl border border-art-border max-w-4xl mx-auto">
              <h4 className="font-bold text-sm text-art-text-muted uppercase tracking-widest font-mono text-center mb-4">Relevant Coursework</h4>
              <div className="flex flex-wrap justify-center gap-2.5">
                {['Data Structures & Algorithms', 'Operating Systems', 'Object Oriented Programming', 'Database Management System', 'Software Engineering'].map((course) => (
                  <span key={course} className="px-3.5 py-1.5 bg-art-accent/10 text-art-accent border border-art-accent/20 text-xs rounded-xl font-bold">
                    {course}
                  </span>
                ))}
              </div>
            </ScrollReveal>

          </div>
        </section>

        {/* Positions of Responsibility & Achievements Section */}
        <section id="achievements" className="py-24 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Positions of Responsibility */}
              <ScrollReveal direction="pop" className="lg:col-span-6 space-y-8">
                <div className="space-y-2">
                  <ScrollReveal direction="up" delay={0.05}>
                    <span className="text-xs font-mono font-bold tracking-widest text-art-accent uppercase">Leadership</span>
                  </ScrollReveal>
                  <ScrollReveal mode="letters" delay={0.15}>
                    <h2 className="text-3xl font-display font-extrabold tracking-tight text-art-text">Positions of Responsibility</h2>
                  </ScrollReveal>
                  <ScrollReveal direction="up" delay={0.45}>
                    <div className="h-[3px] w-16 bg-art-accent rounded-full opacity-80" />
                  </ScrollReveal>
                </div>

                <div className="bg-art-card p-6 sm:p-8 rounded-[2rem] border border-art-border shadow-xs space-y-4 relative overflow-hidden hover:border-art-accent/20 transition-all">
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <Volume2 className="w-24 h-24 text-art-accent" />
                  </div>
                  
                  <div>
                    <span className="text-xs font-mono text-art-accent font-bold uppercase">Fine Arts Technical Lead</span>
                    <h3 className="text-xl font-display font-extrabold text-art-text mt-1">Lead of Teach Team | Meraki</h3>
                    <p className="text-xs text-art-text-muted font-mono mt-0.5">August 2025 - present</p>
                  </div>

                  <p className="text-sm text-art-text-muted leading-relaxed">
                    Directed and managed end-to-end technical production setups for <strong className="font-semibold text-art-text">5+ large-scale campus events</strong>. Controlled and troubleshooted complex configurations of digital projection, professional theater sound stages, spatial lighting layouts, and local network topologies supporting <strong className="font-semibold text-art-text">200+ active attendees</strong>.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono text-art-text-muted">
                    <span>• Audio Engineering</span>
                    <span>• Network Operations</span>
                    <span>• Stage Management</span>
                  </div>
                </div>
              </ScrollReveal>

              {/* Achievements & Certifications */}
              <ScrollReveal direction="pop" delay={0.1} className="lg:col-span-6 space-y-8">
                <div className="space-y-2">
                  <ScrollReveal direction="up" delay={0.15}>
                    <span className="text-xs font-mono font-bold tracking-widest text-art-accent uppercase">Honors & Proofs</span>
                  </ScrollReveal>
                  <ScrollReveal mode="letters" delay={0.25}>
                    <h2 className="text-3xl font-display font-extrabold tracking-tight text-art-text">Achievements & Badges</h2>
                  </ScrollReveal>
                  <ScrollReveal direction="up" delay={0.5}>
                    <div className="h-[3px] w-16 bg-art-accent rounded-full opacity-80" />
                  </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Item 1 */}
                  <div className="bg-art-card p-5 rounded-3xl border border-art-border flex gap-3 items-start hover:border-art-accent/20 transition-all">
                    <div className="p-2 bg-art-accent/10 text-art-accent border border-art-accent/20 rounded-xl shrink-0">
                      <FileBadge className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-art-text">Azure Data Fundamentals</h4>
                      <p className="text-xs text-art-text-muted mt-1">Certified cloud concepts, cloud relational/NoSQL DB structures.</p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="bg-art-card p-5 rounded-3xl border border-art-border flex gap-3 items-start hover:border-art-accent/20 transition-all">
                    <div className="p-2 bg-art-accent/10 text-art-accent border border-art-accent/20 rounded-xl shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-art-text">Health Hack Hackathon</h4>
                      <p className="text-xs text-art-text-muted mt-1">JHU Health Hack competitor. Developed bio-tech mock modules.</p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="bg-art-card p-5 rounded-3xl border border-art-border flex gap-3 items-start hover:border-art-accent/20 transition-all">
                    <div className="p-2 bg-art-accent/10 text-art-accent border border-art-accent/20 rounded-xl shrink-0">
                      <Code className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-art-text">Codeforces & LeetCode</h4>
                      <p className="text-xs text-art-text-muted mt-1">1120 Max Rating on Codeforces. Active solver of algorithms.</p>
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div className="bg-art-card p-5 rounded-3xl border border-art-border flex gap-3 items-start hover:border-art-accent/20 transition-all">
                    <div className="p-2 bg-art-accent/10 text-art-accent border border-art-accent/20 rounded-xl shrink-0">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-art-text">Hackatron Competitor</h4>
                      <p className="text-xs text-art-text-muted mt-1">Participated in regional hackathon at ABV-IIIT Gwalior.</p>
                    </div>
                  </div>

                </div>
              </ScrollReveal>

            </div>
          </div>
        </section>

        {/* Q&A / Developer FAQ Section */}
        <section className="py-20 bg-art-sec/30 border-t border-art-border/45">
          <div className="max-w-4xl mx-auto px-4">
            <ScrollReveal direction="up" className="flex flex-col items-center text-center space-y-3 mb-12">
              <span className="text-xs font-mono font-bold tracking-widest text-art-accent uppercase">Q&A Terminal</span>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-art-text">Ask Anurag (Interviewer FAQ)</h3>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2} className="space-y-4">
              {qaData.map((qa, index) => {
                const isOpen = selectedQA === index;
                return (
                  <div
                    key={index}
                    className="bg-art-card border border-art-border rounded-2xl overflow-hidden hover:border-art-accent/20 transition-all duration-300 shadow-xs"
                  >
                    <button
                      onClick={() => setSelectedQA(isOpen ? null : index)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-art-sec/40 transition-colors"
                    >
                      <span className="font-semibold text-sm sm:text-base text-art-text pr-4">{qa.q}</span>
                      <ChevronRight className={`w-5 h-5 text-art-accent shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="px-6 pb-5 pt-1 text-sm text-art-text-muted leading-relaxed border-t border-art-border/40 font-sans">
                            {qa.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </ScrollReveal>
          </div>
        </section>

        {/* Footer Contact Info block */}
        <footer className="bg-art-bg border-t border-art-border py-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              
              <div className="text-center md:text-left">
                <span className="font-display text-md font-black tracking-wider text-art-text">
                  ANURAG SINGH<span className="text-art-accent font-serif italic">.</span>PORTFOLIO
                </span>
                <p className="text-xs text-art-text-muted mt-1.5 font-light">
                  VIT Bhopal University, CSE student. Graduating class of 2027.
                </p>
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-4">
                <a
                  href="mailto:anuragtomar1113@gmail.com"
                  className="p-2.5 rounded-full bg-art-sec hover:bg-art-accent hover:text-art-bg text-art-text-muted border border-art-border/50 transition-all duration-300"
                  title="Mail direct link"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/anuragSingh-1310"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-art-sec hover:bg-art-accent hover:text-art-bg text-art-text-muted border border-art-border/50 transition-all duration-300"
                  title="GitHub profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-art-sec hover:bg-art-accent hover:text-art-bg text-art-text-muted border border-art-border/50 transition-all duration-300"
                  title="LinkedIn profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>

              <div className="text-center md:text-right font-mono text-[11px] text-art-text-muted">
                <span>© 2026 Anurag Singh. All rights reserved.</span>
              </div>

            </div>
          </div>
        </footer>

        <SleepScreen />
      </div>
    </ClickSpark>
  </>
);
}
