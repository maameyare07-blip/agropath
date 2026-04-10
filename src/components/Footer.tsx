import { Leaf, Linkedin, Twitter, Github } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-2 mb-4">
          <Leaf className="w-6 h-6 text-primary" />
          <span className="font-heading font-bold text-lg text-background">AgroPath</span>
        </div>
        <p className="text-background/60 text-sm mb-6 max-w-md">
          Advancing sustainable agriculture through science, innovation, and community empowerment.
        </p>

        <div className="flex items-center gap-4 mb-8">
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
            className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
            <Linkedin className="w-5 h-5 text-background/80" />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
            className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
            <Twitter className="w-5 h-5 text-background/80" />
          </a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
            className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
            <Github className="w-5 h-5 text-background/80" />
          </a>
        </div>

        <div className="border-t border-background/10 pt-6 w-full">
          <p className="text-background/40 text-sm">
            © {new Date().getFullYear()} Mohamed Mohamud SH Hassan. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
