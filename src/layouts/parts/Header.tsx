import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const location = useLocation();
  const isHome = location.pathname === '/';

  const scrollItems = [
    { href: '#features', label: 'Features' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#faq', label: 'FAQ' },
  ];

  const pageItems = [
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const handleScrollClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (isHome) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/' + href;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center shrink-0">
            <img
              src="/airo-assets/images/logo/horizontal"
              alt="Task2Flow"
              className="block h-auto max-h-9 w-auto max-w-[160px] object-contain self-center"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {scrollItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleScrollClick(item.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            {pageItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/preorder"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
              style={{ background: 'var(--gradient-primary)', boxShadow: 'var(--glow-primary)' }}
            >
              Pre-Order
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4 bg-background/95 backdrop-blur-md">
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {scrollItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleScrollClick(item.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 px-2 text-left cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              {pageItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 px-2"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/preorder"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-3 px-4 py-2 rounded-lg text-sm font-semibold text-white text-center"
                style={{ background: 'var(--gradient-primary)' }}
              >
                Pre-Order
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
