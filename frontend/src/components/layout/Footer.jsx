import { Link } from "react-router-dom";
import { Calendar, Heart, ExternalLink, MessageCircle, Users, Coffee, Link2, Linkedin, Instagram, Youtube, Send, ArrowUp } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const hardikSocials = [
  { label: "Portfolio", href: "https://hardik.thinkpixel.org/", icon: ExternalLink },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hardik-saxena-77b354271", icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com/_og.vamp_/", icon: Instagram },
  { label: "GitHub", href: "https://github.com/Vamp415", icon: ExternalLink },
  { label: "X", href: "https://x.com/hardiks57184721", icon: ExternalLink },
];

const thinkPixelSocials = [
  { label: "Website", href: "https://www.thinkpixel.org/", icon: ExternalLink },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/thinkpixeledu/", icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com/_think.pixel_", icon: Instagram },
  { label: "YouTube", href: "https://youtube.com/@thinkpixel-x9c", icon: Youtube },
  { label: "Telegram", href: "https://t.me/thinkpixeledu", icon: Send },
];

const communityLinks = [
  { label: "WhatsApp", href: "https://chat.whatsapp.com/LMYbdJ5i2zuCKCwtoOh6kU", icon: MessageCircle },
  { label: "Discord", href: "https://discord.gg/NKj5jRrTjP", icon: Users },
  { label: "Buy Me Coffee", href: "https://buymeacoffee.com/vamp415", icon: Coffee },
  { label: "Topmate", href: "https://topmate.io/hardik_saxena_001/", icon: ExternalLink },
  { label: "Linktree", href: "https://linktr.ee/hardik_saxena", icon: Link2 },
];

const supportLinks = [
  { label: "Help Center", href: "https://www.thinkpixel.org/" },
  { label: "Contact Us", href: "https://hardik.thinkpixel.org/" },
  { label: "Privacy Policy", href: "https://www.thinkpixel.org/" },
  { label: "Feedback Form", href: "https://forms.gle/W3WEVdkmm3YSvbZi6" },
];

const productLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/events", label: "Events" },
  { to: "/meetings", label: "Meetings" },
  { to: "/availability", label: "Availability" },
];

const companyLinks = [
  { label: "About Us", href: "https://www.thinkpixel.org/" },
  { label: "Careers", href: "https://www.thinkpixel.org/" },
  { label: "Blog", href: "https://www.thinkpixel.org/" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border/50 bg-gradient-to-b from-background to-muted/20">
      <div className="container-custom py-16">
        {/* Top Section - 5 columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-2 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-elevated-md"
              >
                <Calendar className="h-5 w-5 text-white" />
              </motion.div>
              <span className="text-xl font-bold gradient-text">Calenso</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Smart scheduling made simple. Find your next meeting slot or let others book time with you seamlessly.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Product</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Community</h4>
            <ul className="space-y-3">
              {communityLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm inline-flex items-center gap-2"
                    >
                      <Icon size={14} />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="mb-12 pt-8 border-t border-border/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Connect with Hardik */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Connect with Hardik</h4>
              <div className="flex flex-wrap gap-2">
                {hardikSocials.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border/50 bg-muted/30 hover:bg-muted hover:border-primary/30 transition-all text-sm text-muted-foreground hover:text-foreground"
                    >
                      <Icon size={14} />
                      {social.label}
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Think Pixel */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Think Pixel</h4>
              <div className="flex flex-wrap gap-2">
                {thinkPixelSocials.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border/50 bg-muted/30 hover:bg-muted hover:border-primary/30 transition-all text-sm text-muted-foreground hover:text-foreground"
                    >
                      <Icon size={14} />
                      {social.label}
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Calenso. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart size={14} className="text-destructive" /> by Hardik
            </p>
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollToTop}
              className="rounded-full"
            >
              <ArrowUp size={16} />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}