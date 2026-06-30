import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'privacy' | 'terms' | 'booking' | null
  const [bookingService, setBookingService] = useState(''); // Selected service in booking form
  const [qrCafeExpanded, setQrCafeExpanded] = useState(false); // Manage QR Cafe project dropdown state
  const [activeFaq, setActiveFaq] = useState(null); // Manage FAQ accordion state
  
  // Main Contact Form State
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    message: '',
    agree: false
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState('');

  // Booking Modal Form State
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    projectType: 'Website Design & Development',
    timeline: 'Standard (2-4 weeks)',
    budget: '₹25,000 - ₹50,000',
    details: '',
    agree: false
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingError, setBookingError] = useState('');

  // Track scroll state for glass header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for scroll-reveal animations
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Remove hidden state, add visible state
            entry.target.classList.remove('will-animate');
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px' }
    );
    // Enroll each element: add hidden class THEN start observing
    els.forEach((el) => {
      el.classList.add('will-animate');
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Mouse Listener helper for Spotlight Grid/Cards
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  // Smooth scroll handler
  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleContactChange = (e) => {
    const { name, value, type, checked } = e.target;
    setContactData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBookingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactData.name || !contactData.email || !contactData.phone || !contactData.message) {
      setContactError('Please fill in all required fields.');
      return;
    }
    if (!contactData.agree) {
      setContactError('You must agree to the Privacy Policy and Terms of Service.');
      return;
    }
    setContactError('');
    setContactSubmitted(true);
    console.log('Contact inquiry submitted:', contactData);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingData.name || !bookingData.email || !bookingData.phone || !bookingData.details) {
      setBookingError('Please fill in all required fields.');
      return;
    }
    if (!bookingData.agree) {
      setBookingError('You must agree to the privacy terms.');
      return;
    }
    setBookingError('');
    setBookingSubmitted(true);
    console.log('Service booking request submitted:', bookingData);
  };

  const openBookingModal = (service = 'Website Design & Development') => {
    setBookingData(prev => ({
      ...prev,
      projectType: service
    }));
    setBookingSubmitted(false);
    setBookingError('');
    setActiveModal('booking');
  };

  return (
    <div className="min-h-screen bg-[#0F0D1A] text-[#e5e2e3] relative overflow-x-hidden selection:bg-[#d0bcff] selection:text-[#3c0091]">
      
      {/* Background glow spots */}
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-[#d0bcff]/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-[#4edea3]/3 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* Top Navigation */}
      <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'backdrop-blur-xl border-b border-[#494454]/30 bg-surface-glass py-3 shadow-lg' : 'bg-transparent py-5'}`}>
        <div className="flex justify-between items-center px-6 py-2 max-w-[1280px] mx-auto md:px-12">
          
          {/* Logo brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/nexora_logo_transparent.png" alt="Nexora transparent logo" className="h-9 w-9 object-contain" />
            <span className="text-xl font-semibold tracking-tight text-on-surface lowercase">nexora</span>
          </div>

          {/* Desktop Nav links */}
          <nav className="hidden md:flex gap-8 items-center">
            <a onClick={(e) => handleScrollTo(e, 'work')} className="font-label-mono text-sm tracking-wider text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="#work">WORK</a>
            <a onClick={(e) => handleScrollTo(e, 'services')} className="font-label-mono text-sm tracking-wider text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="#services">SERVICES</a>
            <a onClick={(e) => handleScrollTo(e, 'process')} className="font-label-mono text-sm tracking-wider text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="#process">PROCESS</a>
            <a onClick={(e) => handleScrollTo(e, 'about')} className="font-label-mono text-sm tracking-wider text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="#about">ABOUT</a>
            <button 
              onClick={() => openBookingModal()}
              className="font-label-mono text-sm tracking-wider bg-primary text-on-primary px-5 py-2.5 rounded-lg glow-button font-bold cursor-pointer"
            >
              BOOK NOW
            </button>
          </nav>

          {/* Mobile Booking Trigger button */}
          <div className="md:hidden">
            <button 
              onClick={() => openBookingModal()} 
              className="bg-primary text-on-primary text-xs font-bold px-4 py-2 rounded-lg glow-button cursor-pointer"
            >
              BOOK NOW
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center pt-32 pb-[120px] px-6 relative overflow-hidden">
          <div className="max-w-[1280px] mx-auto text-center z-10">
            
            {/* Live Eyebrow Tag */}
            <div 
              data-reveal
              className="reveal inline-flex items-center gap-2.5 px-4.5 py-1.5 glass-panel rounded-full mb-6 border-primary/20 hover-spotlight cursor-pointer stagger-1"
              onMouseMove={handleMouseMove}
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-mono text-xs text-primary uppercase tracking-widest">Focused on Local Businesses</span>
            </div>

            {/* Headline */}
            <h1
              data-reveal
              className="reveal stagger-2 text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 max-w-4xl mx-auto leading-[1.05] text-[#F4F2FA]"
            >
              Professional websites built <span className="text-primary animate-glow-pulse">faster & fairer.</span>
            </h1>

            {/* Subheadline */}
            <p
              data-reveal
              className="reveal stagger-3 font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10 text-lg md:text-xl leading-relaxed"
            >
              We use AI-assisted development to build fast, beautiful websites for cafes, clinics, and shops. Top-tier craftsmanship at a transparent flat price.
            </p>

            {/* CTAs */}
            <div
              data-reveal
              className="reveal stagger-4 flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button 
                onClick={() => openBookingModal('Website Build (₹9,999)')}
                className="w-full sm:w-auto px-8 py-4 bg-primary text-on-primary font-bold rounded-xl glow-button text-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                Get Your Website — ₹9,999 Flat
                <span className="material-symbols-outlined text-sm font-semibold">arrow_forward</span>
              </button>
              <a 
                onClick={(e) => handleScrollTo(e, 'work')}
                className="w-full sm:w-auto px-8 py-4 border border-outline-variant/30 text-on-surface font-medium rounded-xl hover:bg-surface-variant/30 transition-colors text-lg cursor-pointer" 
                href="#work"
              >
                See the QR Café Demo
              </a>
            </div>
          </div>

          {/* Browser Mockup — floats gently */}
          <div 
            data-reveal
            className="reveal stagger-5 animate-float mt-20 w-full max-w-5xl mx-auto px-4 relative hover-spotlight rounded-2xl"
            onMouseMove={handleMouseMove}
          >
            <div className="glass-panel rounded-t-2xl border-b-0 overflow-hidden shadow-2xl relative z-10">
              {/* Browser navigation control bar */}
              <div className="h-10 bg-[#201f20] flex items-center px-4 gap-2 border-b border-outline-variant/30">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-error/40"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4edea3]/40"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-primary/40"></div>
                </div>
                <div className="mx-auto bg-[#1c1b1c] px-4 py-1 rounded text-[10px] font-label-mono text-on-surface-variant/60 w-1/3 text-center">
                  nexora.digital/client-success
                </div>
              </div>

              {/* Viewport mockup image */}
              <div className="h-[280px] sm:h-[450px] bg-background relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                <img 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
                  alt="A clean, minimalist UI dashboard mockup displayed on a dark website background"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAak1e2jTmGrrS5-huna9L_9GwoJtRzQfnfZ7LNRfWBJqvBzJRWdWUEv5UADsJqZz-L4yO4dZCq8HRcqTxxL7dQUjeMWAwCs_T49aWkf_Nau1EwrFOC5LF1TQZ-oC4lcPzXVy9tccPL_AiCmnsWapK414w2IWKRoVxJf0U5NrVLUkTxI6Eq14WV9OfAkzGtAAkw5rCZ696sjnpPa_u3yp-vT-ACbtaUn9U2pU3o79h6m2MlpUYyRyKzdfQRM43PO-GvzHJ14IhHYbI"
                />
                
                {/* Embedded Score Card */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="glass-panel p-6 rounded-2xl border-primary/30 flex flex-col items-center shadow-2xl backdrop-blur-md">
                    <span className="material-symbols-outlined text-primary text-5xl mb-2">speed</span>
                    <span className="text-3xl font-bold tracking-tight text-on-surface">100/100</span>
                    <span className="font-label-mono text-xs uppercase tracking-wider text-on-surface-variant mt-1">Lighthouse Score</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section (Bento Grid) */}
        <section className="py-[120px] px-6 max-w-[1280px] mx-auto section-glow-top" id="services">
          <div className="mb-16 text-left">
            <span
              data-reveal
              className="reveal stagger-1 font-label-mono text-primary text-sm uppercase mb-4 block tracking-widest"
            >Expertise</span>
            <h2
              data-reveal
              className="reveal stagger-2 animate-glow-pulse text-3xl sm:text-5xl font-bold tracking-tighter"
            >What We Do</h2>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
            
            {/* Bento Card 1: Main service (8 cols) */}
            <div 
              data-reveal
              className="reveal stagger-3 md:col-span-8 glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden group hover-spotlight shimmer-card"
              onMouseMove={handleMouseMove}
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-8xl text-primary">terminal</span>
              </div>
              <div className="relative z-10 space-y-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-on-surface">Local Business Websites</h3>
                <p className="font-body-md text-on-surface-variant max-w-lg mb-8 leading-relaxed">
                  We specialize in one thing: building fast, professional websites for local businesses using AI-assisted development. This means faster turnaround and lower cost than traditional agencies, without sacrificing quality.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  {[
                    { icon: 'responsive_layout', label: 'Looks perfect on the phone — where most of your customers will find you' },
                    { icon: 'bolt', label: 'Loads instantly so customers don\'t leave before seeing what you offer' },
                    { icon: 'rocket_launch', label: 'Live in days, not weeks — thanks to AI-assisted build process' },
                    { icon: 'payments', label: 'Flat ₹9,999 pricing — no surprise invoices' }
                  ].map((feat, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">{feat.icon}</span>
                      <span className="text-sm text-on-surface-variant leading-relaxed">{feat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bento Card 2: Performance/Uptime (4 cols) */}
            <div 
              data-reveal
              className="reveal stagger-4 md:col-span-4 glass-panel p-8 rounded-3xl flex flex-col justify-between border-tertiary/20 hover-spotlight shimmer-card"
              onMouseMove={handleMouseMove}
            >
              <div>
                <h3 className="text-2xl font-bold text-tertiary mb-3">Performance First</h3>
                <p className="font-body-md text-on-surface-variant mb-6 text-sm leading-relaxed">
                  We don't just build websites; we build high-speed performance machines optimized for search engines and user conversion rates.
                </p>
              </div>
              <div className="w-full h-40 bg-[#1c1b1c] rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 grid-accent opacity-30"></div>
                <div className="relative z-10 text-center animate-stat-reveal">
                  <div className="text-5xl font-extrabold text-on-surface">99.9%</div>
                  <div className="font-label-mono text-xs uppercase tracking-wider text-on-surface-variant mt-2">UPTIME RECORD</div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-[120px] bg-[#0e0e0f]/50 relative border-y border-[#494454]/20 section-glow-top overflow-hidden">
          <div className="absolute inset-0 grid-accent opacity-15"></div>
          {/* Ambient blobs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none animate-blob"></div>
          <div className="max-w-[1280px] mx-auto px-6 relative z-10">
            
            <div className="text-center mb-16">
              <span
                data-reveal
                className="reveal stagger-1 font-label-mono text-primary text-sm uppercase mb-4 block tracking-widest"
              >Execution</span>
              <h2
                data-reveal
                className="reveal stagger-2 animate-glow-pulse text-3xl sm:text-5xl font-bold tracking-tighter"
              >How It Works</h2>
            </div>

            {/* Step Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
              {[
                {
                  num: "01",
                  title: "Tell us about your business",
                  desc: "We start with a detailed discovery session to understand your goals, audience, and market landscape.",
                  border: "border-primary/40",
                  stagger: "stagger-3"
                },
                {
                  num: "02",
                  title: "We design and build",
                  desc: "Our team engineers your custom solution using modern frameworks, focusing on speed and clean UI.",
                  border: "border-tertiary/40",
                  stagger: "stagger-4"
                },
                {
                  num: "03",
                  title: "Review and launch",
                  desc: "Final polish, testing across all devices, and we flip the switch to go live with your new high-speed HQ.",
                  border: "border-primary/40",
                  stagger: "stagger-5"
                }
              ].map((step, idx) => (
                <div 
                  key={idx}
                  data-reveal
                  className={`reveal ${step.stagger} flex flex-col items-center text-center p-6 hover-spotlight rounded-2xl glass-panel shimmer-card`}
                  onMouseMove={handleMouseMove}
                >
                  <div className={`w-16 h-16 rounded-2xl glass-panel border ${step.border} flex items-center justify-center mb-6 transform rotate-3 hover:rotate-0 transition-transform duration-300`}>
                    <span className="text-2xl font-bold text-on-surface">{step.num}</span>
                  </div>
                  <h4 className="text-xl font-bold mb-4 text-[#F4F2FA]">{step.title}</h4>
                  <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-[120px] px-6 max-w-[1280px] mx-auto section-glow-top" id="pricing">
          <div className="mb-16 text-center">
            <span
              data-reveal
              className="reveal stagger-1 font-label-mono text-primary text-sm uppercase mb-4 block tracking-widest"
            >Pricing</span>
            <h2
              data-reveal
              className="reveal stagger-2 animate-glow-pulse text-3xl sm:text-5xl font-bold tracking-tighter"
            >Clear & Transparent</h2>
            <p
              data-reveal
              className="reveal stagger-3 font-body-md text-on-surface-variant mt-4 text-sm leading-relaxed max-w-lg mx-auto"
            >
              No hidden costs. No long contracts. Pay once, own your site.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
            {/* Website Build Card */}
            <div 
              data-reveal
              className="reveal stagger-4 glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden group hover-spotlight shimmer-card border border-primary/40"
              onMouseMove={handleMouseMove}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 blur-[40px] rounded-full pointer-events-none"></div>
              <h3 className="text-2xl font-bold text-[#F4F2FA] mb-2">Website Build</h3>
              <div className="text-4xl font-extrabold text-primary mb-6">₹9,999 <span className="text-lg font-normal text-on-surface-variant">flat</span></div>
              <p className="font-body-md text-on-surface-variant text-sm leading-relaxed mb-8">
                A fully designed, mobile-responsive, fast-loading business website, built and deployed.
              </p>
              <button 
                onClick={() => openBookingModal('Website Build (₹9,999)')}
                className="w-full py-3 bg-primary text-on-primary font-bold rounded-xl glow-button text-sm cursor-pointer"
              >
                Get Started
              </button>
            </div>
            
            {/* Monthly Care Plan Card */}
            <div 
              data-reveal
              className="reveal stagger-5 glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden group hover-spotlight shimmer-card"
              onMouseMove={handleMouseMove}
            >
              <h3 className="text-2xl font-bold text-[#F4F2FA] mb-2">Monthly Care Plan</h3>
              <div className="text-4xl font-extrabold text-tertiary mb-6">₹599 <span className="text-lg font-normal text-on-surface-variant">/month</span></div>
              <div className="inline-block px-3 py-1 bg-tertiary/10 border border-tertiary/20 text-tertiary text-[10px] font-label-mono uppercase tracking-wider rounded-full mb-4">Optional</div>
              <p className="font-body-md text-on-surface-variant text-sm leading-relaxed mb-8">
                Ongoing content updates, small changes, and basic monitoring. No lock-in, cancel anytime.
              </p>
              <button 
                onClick={() => openBookingModal('Monthly Care Plan (₹599/m)')}
                className="w-full py-3 border border-outline-variant/30 text-on-surface font-medium rounded-xl hover:bg-surface-variant/30 transition-colors text-sm cursor-pointer"
              >
                Add to Plan
              </button>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-[120px] px-6 max-w-[1280px] mx-auto section-glow-top" id="work">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4 text-left">
            <div>
              <span
                data-reveal
                className="reveal stagger-1 font-label-mono text-primary text-sm uppercase mb-4 block tracking-widest"
              >Portfolio</span>
              <h2
                data-reveal
                className="reveal stagger-2 animate-glow-pulse text-3xl sm:text-5xl font-bold tracking-tighter"
              >Recent Work</h2>
            </div>
            <div
              data-reveal
              className="reveal stagger-3 font-label-mono text-on-surface-variant italic text-sm tracking-wide"
            >
              More projects coming soon
            </div>
          </div>

          {/* Grid of Work (3 Columns on Desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left" data-reveal>
            
            {/* Card 1: QR Café (Fully built out, expandable) */}
            <div 
              data-reveal
              className="reveal stagger-3 group hover-spotlight rounded-2xl p-4 glass-panel border-outline-variant/30 flex flex-col justify-between shimmer-card"
              onMouseMove={handleMouseMove}
            >
              <div>
                {/* CSS Only Browser Mockup with Dot Grid and Gradient */}
                <div className="rounded-xl overflow-hidden border border-outline-variant/30 mb-6 relative z-10 shadow-lg bg-[#121021]">
                  <div className="h-8 bg-[#201f20] flex items-center px-4 gap-1.5 border-b border-outline-variant/30">
                    <div className="w-2 h-2 rounded-full bg-error/40"></div>
                    <div className="w-2 h-2 rounded-full bg-[#4edea3]/40"></div>
                    <div className="w-2 h-2 rounded-full bg-primary/40"></div>
                  </div>
                  <div className="aspect-video bg-gradient-to-br from-[#8B7CF6]/20 to-[#4edea3]/15 flex items-center justify-center relative">
                    {/* CSS Dot Grid Overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1.5px,transparent_1.5px)] bg-[size:16px_16px]"></div>
                    <div className="text-center relative z-10">
                      <span className="material-symbols-outlined text-primary text-4xl mb-1 animate-pulse">qr_code_2</span>
                      <div className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider">LIVE SYSTEM MOCKUP</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pl-1 pr-1">
                  <h3 className="text-xl font-bold text-on-surface group-hover:text-primary transition-colors">QR Café — Live Restaurant Ordering System</h3>
                  <p className="text-sm font-semibold text-tertiary italic">Built to prove what we can ship, not just promise.</p>
                  <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
                    A full-stack ordering system with 4 connected interfaces: customer table ordering via QR, admin dashboard, kitchen display, and waiter interface.
                  </p>
                  
                  {/* Tech Tag Row */}
                  <div className="flex flex-wrap gap-2 pt-1.5 pb-2 items-center">
                    <span className="bg-[#4edea3]/20 text-tertiary border border-tertiary/30 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
                      Self-built Demo
                    </span>
                    <span className="text-[10px] font-label-mono bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-md">
                      Open for new clients
                    </span>
                  </div>
                </div>
              </div>

              {/* View Project Button and Collapsible Dropdown */}
              <div className="mt-4 pt-2 border-t border-outline-variant/10">
                <button 
                  onClick={() => setQrCafeExpanded(!qrCafeExpanded)}
                  className="w-full flex items-center justify-between font-label-mono text-xs uppercase tracking-wider text-primary hover:text-primary-container transition-colors py-2 cursor-pointer"
                >
                  <span>{qrCafeExpanded ? 'Hide Project Demos' : 'View Project Demos'}</span>
                  <span className={`material-symbols-outlined transition-transform duration-300 ${qrCafeExpanded ? 'rotate-180' : ''}`}>
                    keyboard_arrow_down
                  </span>
                </button>

                {/* Collapsible content */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${qrCafeExpanded ? 'max-h-[300px] opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                  <div className="space-y-2.5 pb-2">
                    {[
                      { label: "🍽️ Table 1 (Customer View)", url: "https://qr-cafe-1.vercel.app/app/t/T1" },
                      { label: "⚙️ Owner / Admin Panel", url: "https://qr-cafe-1.vercel.app/admin/" },
                      { label: "👨‍🍳 Kitchen Display", url: "https://qr-cafe-1.vercel.app/staff/kitchen" },
                      { label: "🛎️ Waiter Dashboard", url: "https://qr-cafe-1.vercel.app/staff/waiter" }
                    ].map((link, idx) => (
                      <a 
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between bg-[#1c1b1c]/70 border border-outline-variant/20 hover:border-primary/40 px-3.5 py-2.5 rounded-lg text-xs font-medium text-on-surface hover:bg-[#2a2a2b] transition-all cursor-pointer group/link"
                      >
                        <span>{link.label}</span>
                        <span className="material-symbols-outlined text-xs text-on-surface-variant group-hover/link:text-primary transition-colors">
                          north_east
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* (Removed Local Business Placeholder Card) */}

            {/* Card 3: Your Project Here (Placeholder, client acquisition) */}
            <div 
              data-reveal
              className="reveal stagger-5 group hover-spotlight rounded-2xl p-4 glass-panel border-outline-variant/30 flex flex-col justify-between shimmer-card"
              onMouseMove={handleMouseMove}
            >
              <div>
                {/* CSS Only Browser Mockup */}
                <div className="rounded-xl overflow-hidden border border-outline-variant/30 mb-6 relative z-10 shadow-lg bg-[#121021]">
                  <div className="h-8 bg-[#201f20] flex items-center px-4 gap-1.5 border-b border-outline-variant/30">
                    <div className="w-2 h-2 rounded-full bg-outline/20"></div>
                    <div className="w-2 h-2 rounded-full bg-outline/20"></div>
                    <div className="w-2 h-2 rounded-full bg-outline/20"></div>
                  </div>
                  <div className="aspect-video bg-gradient-to-br from-[#8B7CF6]/10 to-[#0A0A0B] flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1)_1px,transparent_0)] bg-[size:30px_30px]"></div>
                    <div className="text-center relative z-10">
                      <span className="material-symbols-outlined text-[#4edea3]/40 text-4xl mb-1">add_circle</span>
                      <div className="font-label-mono text-[10px] text-on-surface-variant/60 uppercase tracking-wider">YOUR SPECIFICATIONS</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pl-1 pr-1">
                  <h3 className="text-xl font-bold text-on-surface">Your Project Here</h3>
                  <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
                    We're currently taking on new clients. Get in touch to discuss your website and schedule a release date.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-2 border-t border-outline-variant/10">
                <button 
                  onClick={(e) => handleScrollTo(e, 'contact')}
                  className="w-full bg-[#1c1b1c] border border-outline-variant/30 hover:border-primary/40 hover:bg-surface-variant/30 text-on-surface font-semibold py-2.5 rounded-lg transition-all text-center text-xs uppercase tracking-wider font-label-mono cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Start a Project</span>
                  <span className="material-symbols-outlined text-xs">arrow_downward</span>
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-[120px] px-6 max-w-4xl mx-auto section-glow-top" id="faq">
          <div className="mb-12 text-center">
            <span
              data-reveal
              className="reveal stagger-1 font-label-mono text-primary text-sm uppercase mb-4 block tracking-widest"
            >FAQ</span>
            <h2
              data-reveal
              className="reveal stagger-2 animate-glow-pulse text-3xl sm:text-5xl font-bold tracking-tighter"
            >Common Questions</h2>
          </div>
          
          <div className="space-y-4 text-left">
            {[
              { q: "Why is it only ₹9,999 — what's the catch?", a: "AI-assisted development lets us build faster without cutting corners on design or performance, so we pass the savings to you." },
              { q: "What's included in the ₹9,999 price?", a: "A fully designed, custom, mobile-responsive website tailored to your business, perfectly optimized for speed and SEO. Hosting setup and deployment are included." },
              { q: "Is the ₹599/month plan mandatory?", a: "No, fully optional, cancel anytime. It's just there if you want us to handle ongoing text/image updates for you." },
              { q: "Will you still be around to support this later?", a: "Yes. We build long-term relationships with our clients and will be available for updates, rebuilds, or scaling up." },
              { q: "Do I own the website after payment?", a: "100%. Once paid, the website and its codebase are completely yours. No hostage situations." },
              { q: "How long does it take to go live?", a: "Typically 3 to 7 days depending on how fast you can provide your business details and content." }
            ].map((faq, idx) => (
              <div 
                key={idx}
                data-reveal
                className="reveal stagger-3 glass-panel rounded-2xl overflow-hidden border border-outline-variant/30"
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-[#F4F2FA] pr-4">{faq.q}</span>
                  <span className={`material-symbols-outlined text-primary transition-transform duration-300 shrink-0 ${activeFaq === idx ? 'rotate-180' : ''}`}>
                    keyboard_arrow_down
                  </span>
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === idx ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/10 pt-4">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="py-[120px] bg-[#201f20]/40 px-6 border-t border-[#494454]/20 section-glow-top overflow-hidden" id="about">
          {/* Background glow blob */}
          <div className="absolute right-0 top-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none animate-blob"></div>
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
            
            {/* Story details */}
            <div className="text-left space-y-6">
              <span
                data-reveal
                className="reveal-left stagger-1 font-label-mono text-primary text-sm uppercase mb-2 block tracking-widest"
              >Our Story</span>
              <h2
                data-reveal
                className="reveal-left stagger-2 animate-glow-pulse text-3xl sm:text-5xl font-bold tracking-tighter"
              >Built by Developers Who Use AI to Move Fast and Charge Fair</h2>
              <p
                data-reveal
                className="reveal-left stagger-3 font-body-lg text-on-surface-variant mb-10 leading-relaxed text-[#cbc3d7]"
              >
                Nexora was founded by two BTech students from Hyderabad. We saw small businesses paying bloated agencies for slow delivery, so we changed the model. We use AI as a deliberate efficiency advantage to write high-quality code and ship incredibly fast — without cutting corners. The QR Cafe system is our proof of the real engineering capability driving that speed.
              </p>
              
              {/* Profile grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                
                {/* Founder 1 */}
                <div 
                  data-reveal
                  className="reveal stagger-4 flex items-center gap-4 hover-spotlight p-3.5 rounded-xl border border-outline-variant/10 glass-panel shimmer-card"
                  onMouseMove={handleMouseMove}
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/50 shrink-0 bg-[#1c1b1c]">
                    <img 
                      src="/founder1.png" 
                      alt="P. Nishank" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.innerHTML = '<div class="w-full h-full flex items-center justify-center text-lg font-bold text-primary bg-[#1c1b1c]">PN</div>';
                      }}
                    />
                  </div>
                  <div>
                    <h5 className="font-bold text-on-surface">P. NISHANK</h5>
                    <p className="text-xs text-on-surface-variant uppercase font-label-mono tracking-wider text-primary mt-0.5">Developer • Hyd</p>
                  </div>
                </div>

                {/* Founder 2 */}
                <div 
                  data-reveal
                  className="reveal stagger-5 flex items-center gap-4 hover-spotlight p-3.5 rounded-xl border border-outline-variant/10 glass-panel shimmer-card"
                  onMouseMove={handleMouseMove}
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-tertiary/50 shrink-0 bg-[#1c1b1c] flex items-center justify-center text-lg font-bold text-tertiary">
                    VA
                  </div>
                  <div>
                    <h5 className="font-bold text-on-surface">V. ABHILASH</h5>
                    <p className="text-xs text-on-surface-variant uppercase font-label-mono tracking-wider text-tertiary mt-0.5">Strategy • Hyd</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Context brand image block */}
            <div
              data-reveal
              className="reveal-right stagger-2 relative"
            >
              <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
              <div 
                className="relative glass-panel p-4 rounded-3xl rotate-2 hover:rotate-0 transition-transform duration-500 hover-spotlight shimmer-card"
                onMouseMove={handleMouseMove}
              >
                <img 
                  alt="Nexora Brand Context" 
                  className="rounded-2xl w-full h-auto object-cover grayscale opacity-80 border border-outline-variant/30 relative z-10" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC33ojTe3A1OY4SEc1Y4z1gR1qdcvErQLPQfRYd4nRMgUpLjPU_eS-iwcXkJDZUUFAvAtJL1cDHrp-0WBYRkfjnY-0cHMD01FIcKPD-wWHauBS1y0ZzG4P6FYgxvSK6itAIBxggsa6BUTZ7cFq5_kcuFx2SsMhlB-jb2v7zRfbWHK9cEezNcWptw2en8_bGLgn7oY5E6zvzYIphDqTbraFuYmIH6u57PLg980EORBgw5RjiLlK_EIY0HIX2fUT4REq-G6A-ca_My2w"
                />
              </div>
            </div>

          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-[120px] px-6 section-glow-top" id="contact">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span
                data-reveal
                className="reveal stagger-1 font-label-mono text-primary text-sm uppercase mb-4 block tracking-widest"
              >Connect</span>
              <h2
                data-reveal
                className="reveal stagger-2 animate-glow-pulse text-3xl sm:text-5xl font-bold tracking-tighter"
              >Let's Build Something</h2>
              <p
                data-reveal
                className="reveal stagger-3 font-body-md text-on-surface-variant mt-3 text-sm leading-relaxed"
              >
                Fill out the form below or reach out via WhatsApp for a faster response.
              </p>
            </div>

            <div 
              data-reveal
              className="reveal stagger-4 glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden hover-spotlight shimmer-card"
              onMouseMove={handleMouseMove}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-tertiary to-primary z-10"></div>
              
              {contactSubmitted ? (
                <div className="text-center py-12 space-y-6 relative z-10">
                  <div className="w-16 h-16 bg-[#8B7CF6]/10 rounded-full flex items-center justify-center text-primary mx-auto animate-bounce border border-primary/20">
                    <span className="material-symbols-outlined text-3xl">check_circle</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-[#F4F2FA]">Message Sent Successfully!</h3>
                    <p className="text-sm text-[#7C7693] max-w-md mx-auto">
                      Thank you for contacting Nexora. We have received your project details and we will reply to you within 12 hours.
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactData({ name: '', email: '', phone: '', businessName: '', message: '', agree: false });
                    }}
                    className="text-xs text-primary font-semibold underline hover:text-[#8B7CF6] cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6 relative z-10 text-left">
                  {contactError && (
                    <div className="bg-error/10 border border-error/20 text-error text-xs p-3 rounded-lg font-medium">
                      {contactError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-label-mono text-xs uppercase text-on-surface-variant">Name *</label>
                      <input 
                        name="name"
                        value={contactData.name}
                        onChange={handleContactChange}
                        required
                        className="w-full bg-[#0A0A0B] border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary px-4 py-3 text-on-surface text-sm transition-all" 
                        placeholder="John Doe" 
                        type="text"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-label-mono text-xs uppercase text-on-surface-variant">Email *</label>
                      <input 
                        name="email"
                        value={contactData.email}
                        onChange={handleContactChange}
                        required
                        className="w-full bg-[#0A0A0B] border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary px-4 py-3 text-on-surface text-sm transition-all" 
                        placeholder="john@example.com" 
                        type="email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-label-mono text-xs uppercase text-on-surface-variant">Phone *</label>
                      <input 
                        name="phone"
                        value={contactData.phone}
                        onChange={handleContactChange}
                        required
                        className="w-full bg-[#0A0A0B] border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary px-4 py-3 text-on-surface text-sm transition-all" 
                        placeholder="+91 98765 43210" 
                        type="tel"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-label-mono text-xs uppercase text-on-surface-variant">Business Name</label>
                      <input 
                        name="businessName"
                        value={contactData.businessName}
                        onChange={handleContactChange}
                        className="w-full bg-[#0A0A0B] border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary px-4 py-3 text-on-surface text-sm transition-all" 
                        placeholder="Your Ventures Ltd." 
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-label-mono text-xs uppercase text-on-surface-variant">Message *</label>
                    <textarea 
                      name="message"
                      value={contactData.message}
                      onChange={handleContactChange}
                      required
                      className="w-full bg-[#0A0A0B] border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary px-4 py-3 text-on-surface text-sm resize-none transition-all" 
                      placeholder="Tell us about your project..." 
                      rows="4"
                    ></textarea>
                  </div>

                  {/* DPDP Legal compliance */}
                  <div className="flex items-start gap-3">
                    <input 
                      id="privacy_checkbox"
                      name="agree"
                      checked={contactData.agree}
                      onChange={handleContactChange}
                      required
                      className="mt-1 h-4 w-4 rounded bg-[#0A0A0B] border-outline-variant/30 text-primary focus:ring-primary cursor-pointer" 
                      type="checkbox"
                    />
                    <label className="text-xs text-on-surface-variant leading-relaxed select-none cursor-pointer" htmlFor="privacy_checkbox">
                      I agree to the processing of my personal data according to the Digital Personal Data Protection (DPDP) Act and Nexora's{' '}
                      <button 
                        type="button" 
                        onClick={() => setActiveModal('privacy')}
                        className="text-primary font-bold hover:underline bg-transparent border-0 p-0 cursor-pointer"
                      >
                        Privacy Policy
                      </button>.
                    </label>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 items-center pt-4">
                    <button 
                      className="w-full md:w-auto px-10 py-4 bg-primary text-on-primary font-bold rounded-xl glow-button cursor-pointer text-sm" 
                      type="submit"
                    >
                      Send Message
                    </button>
                    
                    {/* Primary WhatsApp Link */}
                    <a 
                      className="w-full md:w-auto px-10 py-4 glass-panel text-on-surface font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-surface-variant/35 transition-colors cursor-pointer text-sm" 
                      href="https://wa.me/9177067613?text=Hi%20Nexora,%20I'd%20like%20to%20know%20more%20about%20your%20services!"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <svg className="w-5 h-5 fill-current text-[#25D366]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.12l-1.01 2.393 2.503-.984c.859.537 1.838.831 3.251.832h.001c3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.761-5.77-5.761zm3.395 8.336c-.19.477-1.12.91-1.54 1.011-.421.1-.963.151-2.996-.665-2.031-.816-3.341-2.887-3.441-3.021-.1-.134-.81-1.073-.81-2.062 0-.989.505-1.474.685-1.674.18-.2.391-.251.521-.251.13 0 .261 0 .37.005.111.005.261-.041.407.311.146.352.5.121.611.121s.221.05.321.15c.1.1.4.4.49.58.09.18.15.39.06.57-.09.18-.13.3-.26.45s-.27.34-.39.46c-.12.12-.24.26-.1.5.14.24.62 1.02 1.33 1.65.91.81 1.68 1.06 1.92 1.18.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.39.65 1.63.77.24.12.4.18.46.28.06.1.06.57-.13 1.05z"></path>
                      </svg>
                      <span>WhatsApp Us</span>
                    </a>
                  </div>
                </form>
              )}

            </div>
          </div>
        </section>

        {/* Legal Policies Quick View section */}
        <section className="py-20 border-t border-outline-variant/30 px-6">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 text-left">
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-on-surface">
                <span className="material-symbols-outlined text-primary">policy</span>
                Privacy Policy
              </h3>
              <div className="font-body-md text-on-surface-variant/80 text-sm space-y-4 leading-relaxed">
                <p>At Nexora, we value your privacy. We only collect essential information required to contact you and understand your project needs. We never sell your data to third parties.</p>
                <p>Under the DPDP Act of India, you have the right to access, update, and request deletion of your personal data stored with us. We use industry-standard encryption for all form submissions.</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-on-surface">
                <span className="material-symbols-outlined text-primary">gavel</span>
                Terms of Service
              </h3>
              <div className="font-body-md text-on-surface-variant/80 text-sm space-y-4 leading-relaxed">
                <p>All projects are subject to a mutually agreed-upon scope of work and payment schedule. Intellectual property of the custom code transfers to the client upon final payment.</p>
                <p>Our operations are governed by the laws of India, specifically within the jurisdiction of Hyderabad, Telangana. We aim for 100% client satisfaction through transparency.</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full pt-[64px] pb-10 bg-[#0e0e0f]/80 border-t border-grid-line relative z-10 text-left">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <span className="text-3xl font-extrabold tracking-tighter text-on-surface">NEXORA</span>
              <p className="font-label-mono text-on-surface-variant text-xs mt-2 uppercase tracking-wider">HIGH-PERFORMANCE DIGITAL CRAFTSMANSHIP</p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <a className="font-label-mono text-on-surface-variant hover:text-primary transition-all duration-500 underline decoration-primary/30 underline-offset-4" href="#">INSTAGRAM</a>
              <a className="font-label-mono text-on-surface-variant hover:text-primary transition-all duration-500 underline decoration-primary/30 underline-offset-4" href="#">LINKEDIN</a>
              <a className="font-label-mono text-on-surface-variant hover:text-primary transition-all duration-500 underline decoration-primary/30 underline-offset-4" href="#">DRIBBBLE</a>
              <button onClick={() => setActiveModal('privacy')} className="font-label-mono text-on-surface-variant hover:text-primary transition-all duration-500 underline decoration-primary/30 underline-offset-4 cursor-pointer bg-transparent border-0 p-0">PRIVACY</button>
            </div>
          </div>
          <div className="pt-8 border-t border-[#494454]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant font-label-mono">
            <p className="tracking-widest uppercase">
              ©2026 NEXORA DIGITAL. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-primary text-lg">code</span>
              <span className="material-symbols-outlined text-primary text-lg">electric_bolt</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 w-full z-30 backdrop-blur-xl rounded-t-xl bg-surface-glass border-t border-outline-variant/30 flex justify-around items-center h-20 px-4 pb-safe shadow-[0_-10px_20px_rgba(139,92,246,0.15)]">
        <a 
          className="flex flex-col items-center justify-center text-primary bg-primary/10 rounded-xl px-4 py-1.5 shadow-[0_0_15px_rgba(208,188,255,0.3)] transition-all scale-110" 
          href="#"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="material-symbols-outlined">grid_view</span>
          <span className="font-label-mono text-[10px] mt-1">HOME</span>
        </a>
        <a 
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all duration-300" 
          href="#work"
          onClick={(e) => handleScrollTo(e, 'work')}
        >
          <span className="material-symbols-outlined">auto_awesome</span>
          <span className="font-label-mono text-[10px] mt-1">WORK</span>
        </a>
        <a 
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all duration-300" 
          href="#services"
          onClick={(e) => handleScrollTo(e, 'services')}
        >
          <span className="material-symbols-outlined">layers</span>
          <span className="font-label-mono text-[10px] mt-1">SERVICES</span>
        </a>
        <a 
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all duration-300" 
          href="#contact"
          onClick={(e) => handleScrollTo(e, 'contact')}
        >
          <span className="material-symbols-outlined">mail</span>
          <span className="font-label-mono text-[10px] mt-1">CONTACT</span>
        </a>
      </nav>

      {/* ========================================================
          Compliance & Booking Modals
          ======================================================== */}
      
      {activeModal === 'booking' && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0F0D1A]/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121021] border border-[#2C274C] rounded-2xl w-full max-w-xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-tertiary to-primary z-10"></div>
            
            {/* Modal Header */}
            <div className="px-6 py-4 flex justify-between items-center border-b border-[#2C274C] bg-[#121021]/95">
              <div>
                <h3 className="text-xl font-bold text-[#F4F2FA]">Book Web Development</h3>
                <p className="text-xs text-on-surface-variant mt-0.5">Let's coordinate details to get started.</p>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-[#7C7693] hover:text-[#F4F2FA] p-1.5 rounded-lg hover:bg-[#1C1A2E] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 text-left max-h-[70vh] overflow-y-auto">
              {bookingSubmitted ? (
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 bg-[#4edea3]/10 rounded-full flex items-center justify-center text-tertiary mx-auto animate-bounce border border-tertiary/20">
                    <span className="material-symbols-outlined text-3xl">check_circle</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-[#F4F2FA]">Booking Request Placed!</h3>
                    <p className="text-sm text-[#7C7693] max-w-sm mx-auto">
                      P. Nishank and V. Abhilash will review your requested specifications and contact you via phone or email within a few hours.
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveModal(null)}
                    className="px-6 py-2.5 bg-primary text-on-primary font-bold rounded-lg glow-button cursor-pointer text-xs"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  {bookingError && (
                    <div className="bg-error/10 border border-error/20 text-error text-xs p-2.5 rounded-lg font-medium">
                      {bookingError}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="font-label-mono text-xs uppercase text-on-surface-variant">Name *</label>
                    <input 
                      name="name"
                      value={bookingData.name}
                      onChange={handleBookingChange}
                      required
                      className="w-full bg-[#0A0A0B] border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary px-4 py-2.5 text-on-surface text-sm" 
                      placeholder="John Doe" 
                      type="text"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-label-mono text-xs uppercase text-on-surface-variant">Email *</label>
                      <input 
                        name="email"
                        value={bookingData.email}
                        onChange={handleBookingChange}
                        required
                        className="w-full bg-[#0A0A0B] border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary px-4 py-2.5 text-on-surface text-sm" 
                        placeholder="john@example.com" 
                        type="email"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-label-mono text-xs uppercase text-on-surface-variant">Phone *</label>
                      <input 
                        name="phone"
                        value={bookingData.phone}
                        onChange={handleBookingChange}
                        required
                        className="w-full bg-[#0A0A0B] border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary px-4 py-2.5 text-on-surface text-sm" 
                        placeholder="+91 98765 43210" 
                        type="tel"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-label-mono text-xs uppercase text-on-surface-variant">Business / Project Name</label>
                    <input 
                      name="businessName"
                      value={bookingData.businessName}
                      onChange={handleBookingChange}
                      className="w-full bg-[#0A0A0B] border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary px-4 py-2.5 text-on-surface text-sm" 
                      placeholder="My Company LLC" 
                      type="text"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-label-mono text-xs uppercase text-on-surface-variant">Timeline</label>
                      <select 
                        name="timeline"
                        value={bookingData.timeline}
                        onChange={handleBookingChange}
                        className="w-full bg-[#0A0A0B] border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary px-3 py-2.5 text-on-surface text-sm cursor-pointer"
                      >
                        <option>Urgent (3-5 days)</option>
                        <option>Standard (2-4 weeks)</option>
                        <option>Flexible (1+ month)</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-label-mono text-xs uppercase text-on-surface-variant">Estimated Budget</label>
                      <select 
                        name="budget"
                        value={bookingData.budget}
                        onChange={handleBookingChange}
                        className="w-full bg-[#0A0A0B] border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary px-3 py-2.5 text-on-surface text-sm cursor-pointer"
                      >
                        <option>₹15,000 - ₹25,000</option>
                        <option>₹25,000 - ₹50,000</option>
                        <option>₹50,000 - ₹1,00,000</option>
                        <option>₹1,00,000+</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-label-mono text-xs uppercase text-on-surface-variant">Project Specifications *</label>
                    <textarea 
                      name="details"
                      value={bookingData.details}
                      onChange={handleBookingChange}
                      required
                      className="w-full bg-[#0A0A0B] border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary px-4 py-2.5 text-on-surface text-sm resize-none" 
                      placeholder="Please details key features like payment gateway, catalog size, preferred pages..." 
                      rows="3"
                    ></textarea>
                  </div>

                  <div className="flex items-start gap-2.5 pt-2">
                    <input 
                      id="booking_agree"
                      name="agree"
                      checked={bookingData.agree}
                      onChange={handleBookingChange}
                      required
                      className="mt-0.5 h-4 w-4 rounded bg-[#0A0A0B] border-outline-variant/30 text-primary focus:ring-primary cursor-pointer" 
                      type="checkbox"
                    />
                    <label className="text-[11px] text-on-surface-variant leading-normal select-none cursor-pointer" htmlFor="booking_agree">
                      I agree to share my information with Nexora to schedule website design and development services.
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-primary text-on-primary font-bold py-3.5 rounded-xl glow-button text-sm mt-4 cursor-pointer"
                  >
                    Confirm Booking Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {activeModal && activeModal !== 'booking' && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0F0D1A]/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121021] border border-[#2C274C] rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#121021]/95 border-b border-[#2C274C] px-6 py-4 flex justify-between items-center backdrop-blur-sm">
              <h3 className="text-xl font-bold text-on-surface">
                {activeModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-[#7C7693] hover:text-[#F4F2FA] p-1 rounded-lg hover:bg-[#1C1A2E] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 text-sm text-[#cbc3d7] space-y-6 leading-relaxed text-left">
              {activeModal === 'privacy' ? (
                <>
                  <div className="text-xs font-semibold text-primary mb-2">Last updated: June 30, 2026</div>
                  <ul className="space-y-3 list-disc pl-5 text-[#F4F2FA]">
                    <li>We only collect info needed to contact you and understand your project</li>
                    <li>We never sell your data to third parties</li>
                    <li>We use analytics tools to understand site usage; no personal data is shared externally</li>
                    <li>Under India's DPDP Act, you can request access, update, or deletion of your data anytime</li>
                    <li>All form submissions are encrypted</li>
                  </ul>
                </>
              ) : (
                <>
                  <div className="text-xs font-semibold text-primary mb-2">Last updated: June 30, 2026</div>
                  <ul className="space-y-3 list-disc pl-5 text-[#F4F2FA]">
                    <li>All projects follow a mutually agreed scope and payment schedule</li>
                    <li>Code ownership transfers to the client upon final payment</li>
                    <li>We may showcase completed projects in our portfolio unless agreed otherwise</li>
                    <li>Clients must own the rights to any logos, images, or text they provide us</li>
                    <li>Our process may involve AI-assisted tools; all work is reviewed by us before delivery</li>
                    <li>Refunds are case-by-case based on project stage at cancellation</li>
                    <li>We're not liable for indirect losses (e.g. downtime, lost revenue) from the delivered site</li>
                    <li>Governed by the laws of India, jurisdiction: Hyderabad, Telangana</li>
                  </ul>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-[#121021]/95 border-t border-[#2C274C] px-6 py-4 flex justify-end backdrop-blur-sm">
              <button 
                onClick={() => setActiveModal(null)}
                className="bg-primary text-on-primary font-bold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
