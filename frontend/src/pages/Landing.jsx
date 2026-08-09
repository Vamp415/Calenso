import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  Users, 
  Zap, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  Globe,
  Shield,
  BarChart3,
  ChevronDown,
  HelpCircle,
  Play,
  TrendingUp
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Section } from "../components/ui/Section";
import { Badge } from "../components/ui/Badge";
import { Surface } from "../components/ui/Surface";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const features = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Create custom event types with flexible duration and availability settings.",
  },
  {
    icon: Clock,
    title: "Time Zone Magic",
    description: "Automatic time zone detection ensures everyone sees the right time.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share your booking page and let clients schedule meetings effortlessly.",
  },
  {
    icon: Zap,
    title: "Instant Confirmations",
    description: "Automatic confirmations with calendar invites and meeting links.",
  },
  {
    icon: Globe,
    title: "Public Booking Pages",
    description: "Beautiful, shareable booking pages that match your brand.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Enterprise-grade security to protect your scheduling data.",
  },
];

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "500K+", label: "Meetings Scheduled" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.9/5", label: "User Rating" },
];

const faqs = [
  {
    question: "What is Calenso?",
    answer: "Calenso is a free online scheduling software that helps you create events, set your availability, and let others book time with you seamlessly. It eliminates the back-and-forth emails typically required to schedule meetings.",
  },
  {
    question: "Is Calenso free to use?",
    answer: "Yes, Calenso is completely free to use. You can create unlimited events, set your availability, and share your booking page without any cost.",
  },
  {
    question: "How do I share my booking page?",
    answer: "After creating your account and setting up events, you get a personalized booking page URL (calenso.thinkpixel.org/yourusername) that you can share with clients, colleagues, or anyone who needs to book time with you.",
  },
  {
    question: "Does Calenso support different time zones?",
    answer: "Yes, Calenso automatically detects and handles time zones. When someone books a meeting, they see available slots in their local time zone, ensuring no confusion about meeting times.",
  },
  {
    question: "Can I create different types of events?",
    answer: "Absolutely! You can create multiple event types with different durations (15 min, 30 min, 1 hour, etc.), descriptions, and availability settings. This is perfect for offering various meeting types like consultations, demos, or quick calls.",
  },
  {
    question: "How do meeting confirmations work?",
    answer: "When someone books a meeting, both you and the attendee receive instant confirmation emails with all the meeting details including the date, time, and video meeting link.",
  },
];

export function Landing() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <Section spacing="lg" minHeight="default">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="secondary" className="mb-8 gap-2">
                <Sparkles size={14} />
                <span>The future of scheduling is here</span>
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="heading-hero text-5xl md:text-7xl mb-6"
            >
              Schedule meetings{" "}
              <span className="gradient-text">without the hassle</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="body-large text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              Calenso helps you manage your time effectively. Create events, set your availability, 
              and let others book time with you seamlessly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/signup">
                <Button size="xl" variant="gradient" className="gap-2 w-full sm:w-auto shadow-elevated-lg hover:shadow-elevated-xl">
                  <Sparkles size={20} />
                  Sign Up Free
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="xl" variant="outline" className="gap-2 w-full sm:w-auto">
                  Login
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mt-20"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Features Section */}
      <Section spacing="lg" background="muted">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-hero text-3xl md:text-5xl mb-4"
            >
              Everything you need to{" "}
              <span className="gradient-text">schedule smarter</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="body-large text-muted-foreground max-w-2xl mx-auto"
            >
              Powerful features designed to save you time and make scheduling effortless.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card variant="interactive" className="h-full group">
                    <CardContent className="p-6">
                      <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="heading-card text-lg mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* How it Works */}
      <Section spacing="lg">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-hero text-3xl md:text-5xl mb-4"
            >
              How it <span className="gradient-text">works</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Create Your Events",
                description: "Set up different event types with custom durations and descriptions.",
              },
              {
                step: "02",
                title: "Set Your Availability",
                description: "Define when you're available for meetings throughout the week.",
              },
              {
                step: "03",
                title: "Share & Get Booked",
                description: "Share your booking link and let others schedule time with you.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center group"
              >
                <div className="text-7xl font-bold text-primary/10 mb-4 group-hover:text-primary/20 transition-colors">{item.step}</div>
                <h3 className="heading-card text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section spacing="lg" background="muted" id="faq">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            >
              <HelpCircle size={16} />
              <span>Got questions?</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-hero text-3xl md:text-5xl mb-4"
            >
              Frequently Asked <span className="gradient-text">Questions</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="body-large text-muted-foreground max-w-2xl mx-auto"
            >
              Everything you need to know about Calenso scheduling software.
            </motion.p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card variant="elevated" className="hover:shadow-elevated-md transition-all">
                  <CardContent className="p-6">
                    <h3 className="heading-card text-lg mb-3 flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-semibold">
                        {i + 1}
                      </span>
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed pl-10">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section spacing="lg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl gradient-bg p-12 md:p-20 text-center overflow-hidden shadow-elevated-xl"
          >
            <div className="absolute inset-0 bg-grid-white/10" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent to-black/20" />
            <div className="relative z-10">
              <h2 className="heading-hero text-3xl md:text-5xl text-white mb-6">
                Ready to simplify your scheduling?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of professionals who trust Calenso for their scheduling needs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/signup">
                  <Button size="xl" variant="glass" className="bg-white/10 hover:bg-white/20 text-white border-white/20 gap-2 shadow-elevated-lg">
                    Start for Free
                    <ArrowRight size={20} />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="xl" variant="glass" className="bg-white/10 hover:bg-white/20 text-white border-white/20 gap-2 shadow-elevated-lg">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}