import { about } from 'virtual:content';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About — Task2Flow</title>
        <meta name="description" content="Meet the team behind Task2Flow. We're building the workflow tool we always wished existed." />
        <meta property="og:title" content="About — Task2Flow" />
        <meta property="og:description" content="Meet the team behind Task2Flow." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <main>
        {/* HERO */}
        <section
          className="relative py-32 overflow-hidden"
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
              {about.hero.eyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            >
              {about.hero.headline}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              {about.hero.subheadline}
            </motion.p>
          </div>
        </section>

        {/* STATS */}
        <section className="py-16 bg-card border-y border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {about.stats.map((stat, i) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-center"
                >
                  <p
                    className="text-3xl sm:text-4xl font-bold mb-1"
                    style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* MISSION */}
        <section className="py-24 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">Mission</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">{about.mission.headline}</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">{about.mission.body}</p>
              </motion.div>

              <div className="space-y-6">
                {about.mission.values.map((v, i) => (
                  <motion.div
                    key={v.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="rounded-2xl p-px"
                    style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.15))' }}
                  >
                    <div className="rounded-2xl bg-card p-5">
                      <h3 className="font-bold text-foreground mb-1">{v.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="py-24" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">Team</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">The people building it</h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {about.team.map((member, i) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-2xl p-px"
                  style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.35), hsl(var(--accent) / 0.2))' }}
                >
                  <div className="rounded-2xl bg-card p-6 flex gap-4 items-start">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
                      style={{ background: 'var(--gradient-primary)' }}
                    >
                      {member.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{member.name}</p>
                      <p className="text-xs text-primary mb-2">{member.role}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 relative overflow-hidden" style={{ background: 'var(--gradient-cta)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, hsl(var(--accent) / 0.15) 0%, transparent 70%)' }} />
          <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{about.cta.headline}</h2>
              <p className="text-white/80 text-lg mb-8">{about.cta.body}</p>
              <Link
                to="/preorder"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-white hover:bg-white/90 transition-all duration-200 hover:scale-105"
                style={{ color: 'hsl(var(--primary))' }}
              >
                {about.cta.buttonText}
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
