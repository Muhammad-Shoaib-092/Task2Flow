import { home } from 'virtual:content';
import { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Check, Star, Zap, Users, BarChart3, Puzzle, FileText, ChevronRight } from 'lucide-react';

function FloatingNode({ cx, cy, delay, size = 8 }: { cx: number; cy: number; delay: number; size?: number }) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={size}
      fill="none"
      stroke="hsl(var(--primary) / 0.6)"
      strokeWidth="1.5"
      animate={{ cy: [cy, cy - 18, cy] }}
      transition={{ duration: 7, delay, repeat: Infinity, ease: 'easeInOut' as const }}
    />
  );
}

function FloatingLine({ x1, y1, x2, y2, delay }: { x1: number; y1: number; x2: number; y2: number; delay: number }) {
  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="hsl(var(--primary) / 0.25)"
      strokeWidth="1"
      strokeDasharray="4 4"
      animate={{ opacity: [0.3, 0.8, 0.3] }}
      transition={{ duration: 4, delay, repeat: Infinity, ease: 'easeInOut' as const }}
    />
  );
}

function GradientCard({ children, className = '', accent = false }: { children: React.ReactNode; className?: string; accent?: boolean }) {
  return (
    <div
      className={`relative rounded-2xl p-px ${className}`}
      style={{ background: accent ? 'var(--gradient-primary)' : 'linear-gradient(135deg, hsl(var(--primary) / 0.4), hsl(var(--accent) / 0.2))' }}
    >
      <div className={`rounded-2xl h-full p-6 ${accent ? 'bg-primary/10' : 'bg-card'}`}>
        {children}
      </div>
    </div>
  );
}

const gradientWords = new Set(['Workflow.', 'Instantly.']);

const wordVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' as const },
  }),
};

export default function HomePage() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <Helmet>
        <title>Task2Flow — AI-Powered Workflow Automation</title>
        <meta name="description" content="Turn any task into a repeatable workflow instantly. Task2Flow uses AI to automate your processes so your team can focus on what matters." />
        <meta property="og:title" content="Task2Flow — AI-Powered Workflow Automation" />
        <meta property="og:description" content="Turn any task into a repeatable workflow instantly. Join 2,400+ teams on the waitlist." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://task2flow.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Task2Flow — AI-Powered Workflow Automation" />
        <meta name="twitter:description" content="Turn any task into a repeatable workflow instantly." />
      </Helmet>

      <main>
        {/* HERO */}
        <section
          id="hero"
          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
          style={{ background: 'var(--gradient-hero)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, hsl(var(--primary) / 0.18) 0%, transparent 70%)' }}
          />

          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1200 700"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <FloatingNode cx={120} cy={180} delay={0} size={10} />
            <FloatingNode cx={300} cy={120} delay={1.2} size={6} />
            <FloatingNode cx={900} cy={150} delay={0.6} size={8} />
            <FloatingNode cx={1080} cy={220} delay={2} size={12} />
            <FloatingNode cx={200} cy={500} delay={1.5} size={7} />
            <FloatingNode cx={1000} cy={480} delay={0.9} size={9} />
            <FloatingNode cx={600} cy={80} delay={2.5} size={5} />
            <FloatingNode cx={750} cy={580} delay={1.8} size={7} />
            <FloatingLine x1={120} y1={180} x2={300} y2={120} delay={0} />
            <FloatingLine x1={300} y1={120} x2={600} y2={80} delay={0.5} />
            <FloatingLine x1={900} y1={150} x2={1080} y2={220} delay={1} />
            <FloatingLine x1={200} y1={500} x2={120} y2={180} delay={1.5} />
            <FloatingLine x1={1000} y1={480} x2={1080} y2={220} delay={0.8} />
            <FloatingLine x1={750} y1={580} x2={1000} y2={480} delay={2} />
          </svg>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-sm font-medium text-foreground mb-8"
              style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.2)' }}
            >
              <span>🚀</span>
              <span>Now in Early Access</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
              {home.headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={wordVariants}
                  className="inline-block mr-3"
                  style={
                    gradientWords.has(word)
                      ? { background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }
                      : {}
                  }
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Task2Flow uses AI to transform any task description into a structured, repeatable workflow — in seconds. Stop managing chaos. Start flowing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
            >
              <motion.button
                onClick={() => document.querySelector('#preorder')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-xl font-bold text-white text-base transition-all duration-200 hover:opacity-90 hover:scale-105 flex items-center gap-2"
                style={{ background: 'var(--gradient-primary)', boxShadow: 'var(--glow-primary)' }}
                animate={{ boxShadow: ['var(--glow-primary)', '0 0 40px hsl(var(--primary) / 0.6), 0 0 80px hsl(var(--primary) / 0.3)', 'var(--glow-primary)'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
              >
                Pre-Order Now
                <ChevronRight size={18} />
              </motion.button>
              <button className="px-8 py-4 rounded-xl font-semibold text-foreground text-base border border-border hover:border-primary/60 hover:bg-primary/5 transition-all duration-200">
                Watch Demo
              </button>
            </motion.div>

            {/* Avatar stack */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex justify-center"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {home.avatars.map((av) => (
                    <div key={av.id} className={`w-8 h-8 rounded-full ${av.color} border-2 border-background flex items-center justify-center text-xs font-bold text-white`}>
                      {av.initial}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  Join <span className="text-foreground font-semibold">2,400+</span> teams on the waitlist
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">Features</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Everything you need to automate your work
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From AI-powered parsing to real-time analytics — Task2Flow gives your team the tools to build, run, and improve workflows at speed.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Large card — AI Parser */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0 }}
                className="md:col-span-2"
              >
                <GradientCard>
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                      <Zap size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">AI Task Parser</h3>
                      <p className="text-muted-foreground leading-relaxed max-w-2xl">
                        Describe any task in plain English. Task2Flow's AI instantly converts it into a structured, repeatable workflow — no setup, no templates, no friction.
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {['Describe task', '→', 'AI parses intent', '→', 'Steps generated', '→', 'Assign & launch'].map((step, i) => (
                          <span
                            key={i}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                              step === '→'
                                ? 'text-muted-foreground'
                                : 'bg-primary/10 text-foreground border border-primary/20'
                            }`}
                          >
                            {step}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GradientCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <GradientCard className="h-full">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                    <FileText size={24} className="text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">One-click Templates</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Launch with 100+ pre-built workflow templates for sales, ops, HR, and engineering.
                  </p>
                </GradientCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <GradientCard className="h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <Users size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Team Collaboration</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Assign steps, leave comments, and track progress together in real time.
                  </p>
                </GradientCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <GradientCard accent className="h-full">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                    <Puzzle size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Integrates with 50+ tools</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">
                    Slack, Notion, Jira, GitHub, Salesforce, and more — all connected.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Slack', 'Notion', 'Jira', 'GitHub', 'Salesforce'].map((tool) => (
                      <span key={tool} className="px-2 py-1 rounded-md bg-white/10 text-white text-xs font-medium">
                        {tool}
                      </span>
                    ))}
                  </div>
                </GradientCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <GradientCard className="h-full">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                    <BarChart3 size={24} className="text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Real-time Analytics</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    See where workflows stall, who's moving fast, and what to optimize next.
                  </p>
                </GradientCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-24" style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 0%, hsl(var(--primary) / 0.08) 0%, transparent 70%), hsl(var(--background))' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">Pricing</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Simple, transparent pricing
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Pre-order pricing locked in — prices increase at launch.
              </p>

              <div className="inline-flex items-center gap-3 bg-card border border-border rounded-xl p-1">
                <button
                  onClick={() => setAnnual(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${!annual ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setAnnual(true)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${annual ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Annual
                  <span className="text-xs bg-accent/20 text-accent px-1.5 py-0.5 rounded-md font-bold">-20%</span>
                </button>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {home.pricingTiers.map((tier, idx) => {
                const price = annual ? tier.priceAnnual : tier.priceMonthly;
                return (
                  <motion.div
                    key={tier.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: tier.popular ? 1.04 : 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative rounded-2xl p-px"
                    style={{
                      background: tier.popular
                        ? 'var(--gradient-primary)'
                        : 'linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.15))',
                      boxShadow: tier.popular ? 'var(--glow-primary)' : 'none',
                    }}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                        <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: 'var(--gradient-primary)' }}>
                          Most Popular
                        </span>
                      </div>
                    )}
                    <div className="rounded-2xl bg-card p-8 h-full flex flex-col">
                      <div className="mb-6">
                        <h3 className="text-lg font-bold text-foreground mb-1">{tier.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                        <div className="flex items-end gap-1">
                          <span className="text-4xl font-bold text-foreground">${price}</span>
                          <span className="text-muted-foreground mb-1">/mo</span>
                        </div>
                        {annual && (
                          <p className="text-xs text-accent mt-1">Billed annually</p>
                        )}
                      </div>
                      <ul className="space-y-3 flex-1 mb-8">
                        {tier.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check size={16} className="text-accent mt-0.5 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90"
                        style={
                          tier.popular
                            ? { background: 'var(--gradient-primary)', color: 'white', boxShadow: 'var(--glow-primary)' }
                            : { background: 'hsl(var(--muted))', color: 'hsl(var(--foreground))' }
                        }
                      >
                        {tier.cta}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8">
              🔒 Pre-order pricing locked in — prices increase at launch. Cancel anytime.
            </p>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">Testimonials</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Teams are already flowing
              </h2>
              <p className="text-lg text-muted-foreground">
                Early access users are saving hours every week.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {home.testimonials.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <GradientCard className="h-full">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star key={si} size={14} className="text-primary fill-primary" />
                      ))}
                    </div>
                    <p className="text-foreground text-sm leading-relaxed mb-6">"{t.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-sm font-bold text-primary">
                        {t.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}, {t.company}</p>
                      </div>
                    </div>
                  </GradientCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">FAQ</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Got questions?
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to know before you pre-order.
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-3">
              {home.faqs.map((faq, i) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <AccordionItem
                    value={`item-${i}`}
                    className="border border-border rounded-xl bg-card px-6 data-[state=open]:border-primary/40"
                  >
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </section>

        {/* PRE-ORDER CTA */}
        <section id="preorder" className="py-24 relative overflow-hidden" style={{ background: 'var(--gradient-cta)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, hsl(var(--accent) / 0.15) 0%, transparent 70%)' }} />

          <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
                Stop managing tasks.<br />Start flowing.
              </h2>
              <p className="text-white/80 text-lg mb-10">
                Lock in your early bird price before December 31, 2026.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
                <input
                  type="email"
                  placeholder="Enter your work email"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/50 text-sm"
                />
                <button
                  className="px-6 py-3 rounded-xl font-bold text-sm bg-white transition-all duration-200 hover:bg-white/90 hover:scale-105 shrink-0"
                  style={{ color: 'hsl(var(--primary))' }}
                >
                  Pre-Order Now
                </button>
              </div>

              <p className="text-white/60 text-sm">
                🔒 Early bird pricing ends December 31, 2026 · No credit card required
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
