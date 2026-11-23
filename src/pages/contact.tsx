import { contact } from 'virtual:content';
import { useState, type FormEvent } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { Mail, MessageSquare, Zap } from 'lucide-react';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const channelIcons = [Mail, MessageSquare, Zap];

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    if (formData.get('_gotcha')) return;

    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const topic = String(formData.get('topic') ?? '');
    const message = String(formData.get('message') ?? '').trim();

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversation: {
            messages_attributes: [{ body: message || 'New contact form submission' }],
            data: {
              __gd_contact_form_title: 'Contact Us',
              'Topic': topic,
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
        <title>Contact — Task2Flow</title>
        <meta name="description" content="Get in touch with the Task2Flow team. We respond to every message." />
        <meta property="og:title" content="Contact — Task2Flow" />
        <meta property="og:description" content="Get in touch with the Task2Flow team." />
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
          <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-sm font-semibold text-primary uppercase tracking-wide mb-4"
            >
              {contact.hero.eyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-foreground mb-4 leading-tight"
            >
              {contact.hero.headline}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              {contact.hero.subheadline}
            </motion.p>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="py-24 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
              {/* Left info */}
              <div className="lg:col-span-2 space-y-6">
                {contact.channels.map((ch, i) => {
                  const Icon = channelIcons[i] ?? Mail;
                  return (
                    <motion.div
                      key={ch.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="rounded-2xl p-px"
                      style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.15))' }}
                    >
                      <div className="rounded-2xl bg-card p-6 flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                          <Icon size={18} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground mb-1">{ch.title}</p>
                          <p className="text-sm text-muted-foreground">{ch.detail}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-3 rounded-2xl p-px"
                style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.4), hsl(var(--accent) / 0.2))' }}
              >
                <div className="rounded-2xl bg-card p-8">
                  {status === 'success' ? (
                    <div className="text-center py-10" role="status">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{ background: 'var(--gradient-primary)' }}
                      >
                        <Mail size={28} className="text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{contact.form.successTitle}</h3>
                      <p className="text-muted-foreground text-sm">{contact.form.successBody}</p>
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

                      <h3 className="text-xl font-bold text-foreground mb-6">{contact.form.heading}</h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="ct-name" className="block text-sm font-medium text-foreground mb-1.5">
                            Name
                          </label>
                          <input
                            id="ct-name"
                            name="name"
                            type="text"
                            required
                            placeholder="Your name"
                            className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 text-sm transition-colors"
                          />
                        </div>
                        <div>
                          <label htmlFor="ct-email" className="block text-sm font-medium text-foreground mb-1.5">
                            Email
                          </label>
                          <input
                            id="ct-email"
                            name="email"
                            type="email"
                            required
                            placeholder="you@company.com"
                            className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 text-sm transition-colors"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="ct-topic" className="block text-sm font-medium text-foreground mb-1.5">
                          Topic
                        </label>
                        <select
                          id="ct-topic"
                          name="topic"
                          className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:border-primary/60 text-sm transition-colors"
                        >
                          <option value="General question">General question</option>
                          <option value="Pre-order inquiry">Pre-order inquiry</option>
                          <option value="Partnership">Partnership</option>
                          <option value="Press">Press</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="ct-message" className="block text-sm font-medium text-foreground mb-1.5">
                          Message
                        </label>
                        <textarea
                          id="ct-message"
                          name="message"
                          rows={5}
                          required
                          placeholder="What's on your mind?"
                          className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 text-sm transition-colors resize-none"
                        />
                      </div>

                      {status === 'error' && (
                        <p role="alert" className="mb-4 text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-3">
                          {errorMsg}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-200 hover:opacity-90 disabled:opacity-60"
                        style={{ background: 'var(--gradient-primary)' }}
                      >
                        {status === 'sending' ? contact.form.sendingLabel : contact.form.submitLabel}
                      </button>
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
