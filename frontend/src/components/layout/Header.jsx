import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Menu, X, Sparkles, LayoutDashboard, CalendarDays, Users, Clock, Moon, Sun, LogOut, User } from "lucide-react";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { useAuth } from "../../contexts/AuthContext";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/events", label: "Events", icon: CalendarDays },
  { href: "/meetings", label: "Meetings", icon: Users },
  { href: "/availability", label: "Availability", icon: Clock },
];

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [now, setNow] = useState(new Date());
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formattedDate = now.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedTime = now.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      scrolled ? "glass shadow-elevated-sm" : "bg-background/80 backdrop-blur-md border-b border-border/50"
    )}>
      <nav className="container-custom">
        <div className="flex justify-between items-center gap-4 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="p-2 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-elevated-md group-hover:shadow-elevated-lg transition-shadow"
            >
              <Calendar className="h-5 w-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold gradient-text">Calenso</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {isAuthenticated && navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              return (
                <Link key={link.href} to={link.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className={cn(
                      "gap-2 relative",
                      isActive && "bg-primary/10 text-primary"
                    )}
                  >
                    <Icon size={16} />
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        initial={false}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Live Date & Time */}
            <div className="hidden md:flex flex-col items-end text-xs leading-tight text-muted-foreground">
              <span className="font-medium text-foreground text-sm">{formattedTime}</span>
              <span>{formattedDate}</span>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {isAuthenticated ? (
              <>
                {/* User Info */}
                <div className="hidden sm:flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10">
                    <User size={16} className="text-primary" />
                    <span className="text-sm font-medium">{user?.name || user?.email?.split('@')[0]}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={logout}
                    className="gap-2"
                  >
                    <LogOut size={16} />
                    <span className="hidden sm:inline">Logout</span>
                  </Button>
                </div>

                {/* Create Event Button */}
                <Link to="/events?create=true" className="hidden sm:block">
                  <Button size="sm" variant="gradient" className="gap-2 shadow-elevated-md hover:shadow-elevated-lg">
                    <CalendarDays size={16} />
                    Create Event
                  </Button>
                </Link>
              </>
            ) : (
              <>
                {/* Login/Signup Buttons */}
                <Link to="/login" className="hidden sm:block">
                  <Button size="sm" variant="ghost">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" className="hidden sm:block">
                  <Button size="sm" variant="gradient" className="gap-2 shadow-elevated-md hover:shadow-elevated-lg">
                    <Sparkles size={16} />
                    Sign Up
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {isAuthenticated && navLinks.map((link, index) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block"
                      >
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-start gap-3 h-12",
                            isActive && "bg-primary/10 text-primary"
                          )}
                        >
                          <Icon size={18} />
                          {link.label}
                        </Button>
                      </Link>
                    </motion.div>
                  );
                })}
                {isAuthenticated && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <Link to="/events?create=true" onClick={() => setMobileMenuOpen(false)} className="block">
                      <Button variant="gradient" className="w-full h-12 gap-2 shadow-elevated-md">
                        <CalendarDays size={18} />
                        Create Event
                      </Button>
                    </Link>
                  </motion.div>
                )}
                {!isAuthenticated && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 }}
                    >
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block">
                        <Button variant="ghost" className="w-full justify-start h-12 gap-3">
                          Login
                        </Button>
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="block">
                        <Button variant="gradient" className="w-full h-12 gap-2 shadow-elevated-md">
                          <Sparkles size={18} />
                          Sign Up
                        </Button>
                      </Link>
                    </motion.div>
                  </>
                )}
                {isAuthenticated && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full justify-start h-12 gap-3"
                    >
                      <LogOut size={18} />
                      Logout
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
