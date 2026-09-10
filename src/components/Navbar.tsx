import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ExternalLink, ChevronDown } from "lucide-react";
import AgroPathLogo from "./AgroPathLogo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const primaryLinks: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Trainings", href: "/trainings" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const credentialLinks: { label: string; href: string }[] = [
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Articles", href: "#articles" },
];

const BLOG_URL = "https://pathosolutions.lovable.app/";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [credentialsOpen, setCredentialsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  // On pages other than the homepage, hash links must include the home path
  // so they actually navigate back instead of only changing the hash.
  const resolveHref = (href: string) =>
    href.startsWith("#") && !isHome ? `/${href}` : href;

  const closeAll = () => {
    setIsOpen(false);
    setCredentialsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" onClick={closeAll} className="flex items-center gap-2">
            <Leaf className="w-7 h-7 text-primary" />
            <span className="font-heading font-bold text-xl text-foreground">AgroPath</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {primaryLinks.map((link) => (
              <Link
                key={link.label}
                to={resolveHref(link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 outline-none">
                Credentials
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border">
                {credentialLinks.map((link) => (
                  <DropdownMenuItem key={link.label} asChild>
                    <Link to={resolveHref(link.href)} className="cursor-pointer">
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <a
              href={BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              Blog <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-foreground hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {primaryLinks.map((link) => (
                <Link
                  key={link.label}
                  to={resolveHref(link.href)}
                  onClick={closeAll}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-secondary transition-colors min-h-[44px]"
                >
                  {link.label}
                </Link>
              ))}

              <button
                onClick={() => setCredentialsOpen((v) => !v)}
                aria-expanded={credentialsOpen}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-secondary transition-colors min-h-[44px]"
              >
                Credentials
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${credentialsOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {credentialsOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-4 space-y-1">
                      {credentialLinks.map((link) => (
                        <Link
                          key={link.label}
                          to={resolveHref(link.href)}
                          onClick={closeAll}
                          className="flex items-center gap-2 px-4 py-3 rounded-lg text-base text-muted-foreground hover:bg-secondary hover:text-primary transition-colors min-h-[44px]"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <a
                href={BLOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeAll}
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-base font-medium text-primary hover:bg-secondary transition-colors min-h-[44px]"
              >
                Blog <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
