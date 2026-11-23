import { preorder } from 'virtual:content';
import { useState, type FormEvent } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { Check, Clock, Users, Zap, Map } from 'lucide-react';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const perkIcons = [Check, Clock, Users, Map];

export default function PreorderPage() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    if (formData.get('_gotcha')) return;

    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const plan = String(formData.get('plan') ?? '');
    const teamSize = String(formData.get('teamSize') ?? '');

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversation: {
            messages_attributes: [{ body: 'New pre-order submission' }],
            data: {
              __gd_contact_form_title: 'Pre-order',
              'Interested plan': plan,
              'Team size': teamSize,
            },
          },
          user: { email, name },
        }),
      });

      const json = await res.json();
      if (json.success) {
        setStatus('success');
        form.reset();
      } else {
        throw new Error(json.error || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  return (
    <>
      <Helmet>
        <title>Pre-order — Task2Flow</title>
        <meta name="description" content="Lock in your early-bird price before launch. Pre-order Task2Flow and get lifetime pricing, priority access, and a dedicated onboarding session." />
        <meta property="og:title" content="Pre-order — Task2Flow" />
        <meta property="og:description" content="Lock in your early-bird price before launch." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <main>
        {/* HERO */}
        <section
          className="relative py-28 overflow-hidden"
          style={{ background: 'var(--gradient-hero)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, hsl(var(--primary) / 0.2) 0%, transparent 70%)' }}
          />
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-sm font-semibold text-primary uppercase tracking-wide mb-4"
            >
              {preorder.hero.eyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            >
              {preorder.hero.headline}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              {preorder.hero.subheadline}
            </motion.p>

            {/* Urgency bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-flex items-center gap-2 mt-8 px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-sm font-medium text-foreground"
            >
              <Zap size={14} className="text-primary" />
              <span>Only <strong>{preorder.fomo.spotsLeft}</strong> early-bird spots left · Offer ends {preorder.fomo.deadline}</span>
            </motion.div>
          </div>
        </section>

        {/* PERKS + FORM */}
        <section className="py-24 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Perks */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-8">What you get</h2>
                <div className="space-y-5">
                  {preorder.perks.map((perk, i) => {
                    const Icon = perkIcons[i] ?? Check;
                    return (
                      <motion.div
                        key={perk.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="flex gap-4 items-start"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                          <Icon size={18} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground mb-0.5">{perk.title}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">{perk.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl p-px"
                style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.5), hsl(var(--accent) / 0.3))', boxShadow: 'var(--glow-primary)' }}
              >
                <div className="rounded-2xl bg-card p-8">
                  {status === 'success' ? (
                    <div className="text-center py-8" role="status">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{ background: 'var(--gradient-primary)' }}
                      >
                        <Check size={28} className="text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">You're on the list!</h3>
                      <p className="text-muted-foreground text-sm">
                        We'll email you as soon as we launch. Your early-bird price is locked in.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate>
                      <input
                        type="text"
                        name="_gotcha"
                        tabIndex={-1}
                        autoComplete="off"
                        style={{ position: 'absolute', left: '-9999px' }}
                        aria-hidden="true"
                      />

                      <h3 className="text-xl font-bold text-foreground mb-6">Reserve your spot</h3>

                      <div className="space-y-4">
                        <div>
                          <label htmlFor="po-name" className="block text-sm font-medium text-foreground mb-1.5">
                            Full name
                          </label>
                          <input
                            id="po-name"
                            name="name"
                            type="text"
                            required
                            placeholder="Your name"
                            className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 text-sm transition-colors"
                          />
                        </div>

                        <div>
                          <label htmlFor="po-email" className="block text-sm font-medium text-foreground mb-1.5">
                            Work email
                          </label>
                          <input
                            id="po-email"
                            name="email"
                            type="email"
                            required
                            placeholder="you@company.com"
                            className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 text-sm transition-colors"
                          />
                        </div>

                        <div>
                          <label htmlFor="po-plan" className="block text-sm font-medium text-foreground mb-1.5">
                            Interested plan
                          </label>
                          <select
                            id="po-plan"
                            name="plan"
                            className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:border-primary/60 text-sm transition-colors"
                          >
                            <option value="Starter">Starter (Free)</option>
                            <option value="Pro">Pro ($29/mo)</option>
                            <option value="Team">Team ($79/mo)</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="po-team" className="block text-sm font-medium text-foreground mb-1.5">
                            Team size
                          </label>
                          <select
                            id="po-team"
                            name="teamSize"
                            className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:border-primary/60 text-sm transition-colors"
                          >
                            <option value="Just me">Just me</option>
                            <option value="2–10">2–10 people</option>
                            <option value="11–50">11–50 people</option>
                            <option value="50+">50+ people</option>
                          </select>
                        </div>
                      </div>

                      {status === 'error' && (
                        <p role="alert" className="mt-4 text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-3">
                          {errorMsg}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full mt-6 py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-200 hover:opacity-90 disabled:opacity-60"
                        style={{ background: 'var(--gradient-primary)', boxShadow: 'var(--glow-primary)' }}
                      >
                        {status === 'sending' ? 'Reserving your spot…' : 'Reserve my spot →'}
                      </button>

                      <p className="text-center text-xs text-muted-foreground mt-3">
                        🔒 No credit card required · Cancel anytime
                      </p>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
