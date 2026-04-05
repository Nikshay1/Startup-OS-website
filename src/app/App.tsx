import { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  ArrowRight, 
  Check, 
  ChevronDown, 
  Sparkles,
  Lock,
  Zap,
  TrendingUp,
  Target,
  DollarSign,
  Scale,
  Users,
  Code,
  Share2,
  Repeat,
  Brain,
  ArrowDown
} from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

type WaitlistFormData = {
  name: string;
  email: string;
  company: string;
  stage: string;
  bottleneck: string;
  plan: string;
};

const initialFormData: WaitlistFormData = {
  name: '',
  email: '',
  company: '',
  stage: '',
  bottleneck: '',
  plan: ''
};

export default function App() {
  const [formData, setFormData] = useState(initialFormData);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    if (!isSupabaseConfigured || !supabase) {
      setSubmitError('Supabase is not configured yet. Add your project URL and anon key in `.env` first.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        company: formData.company.trim() || null,
        stage: formData.stage,
        bottleneck: formData.bottleneck || null,
        plan: formData.plan
      };

      const { error } = await supabase.from('waitlist_signups').insert(payload);

      if (error) {
        if (error.code === '23505') {
          setSubmitError('That email is already on the waitlist.');
        } else {
          setSubmitError('We could not save your spot right now. Please try again in a minute.');
        }
        return;
      }

      setFormData(initialFormData);
      setShowThankYou(true);
    } catch {
      setSubmitError('We could not save your spot right now. Please try again in a minute.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5 z-50"
      >
        <div className="max-w-[1400px] mx-auto px-8 py-5 flex items-center justify-between">
          <motion.div 
            className="text-2xl tracking-tight"
            whileHover={{ scale: 1.05 }}
          >
            Built<span className="text-[#F5A623]">o</span>
          </motion.div>
          <div className="hidden md:flex items-center gap-10">
            <a href="#why" className="text-sm text-gray-400 hover:text-white transition-colors">Why Builto</a>
            <a href="#how" className="text-sm text-gray-400 hover:text-white transition-colors">How it works</a>
            <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="text-sm text-gray-400 hover:text-white transition-colors">FAQ</a>
            <motion.a 
              href="#waitlist" 
              className="bg-[#F5A623] text-black px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#E09515] transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join the waitlist →
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-8 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -top-1/2 -left-1/2 w-[1000px] h-[1000px] bg-[#F5A623]/5 rounded-full blur-[120px]"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute -bottom-1/2 -right-1/2 w-[1000px] h-[1000px] bg-purple-500/5 rounded-full blur-[120px]"
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="relative max-w-[1200px] w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[80px] md:text-[120px] leading-[0.9] font-bold mb-8 tracking-tight">
              The startup OS<br />
              <span className="text-gray-500">for founders</span><br />
              <span className="text-gray-500">who </span>
              <span className="text-[#F5A623]">won't </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-700" style={{
                WebkitTextStroke: '1px rgba(255,255,255,0.3)'
              }}>fail</span>
            </h1>
            
            <motion.p 
              className="text-xl text-gray-400 max-w-3xl mb-12 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Builto is the first system that connects every layer of your startup, 
              <span className="text-white font-medium"> market, business, financials, build, legal, investors, distribution </span>
              and lets them talk to each other. Not a copilot. Not a planner. An operating system.
            </motion.p>
            
            <motion.a 
              href="#waitlist"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#F5A623] text-black rounded-xl font-medium hover:bg-[#E09515] transition-all"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Reserve my spot
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            
            <motion.p 
              className="text-sm text-gray-600 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <span className="text-[#F5A623] font-medium">Only for first 1000</span> · No spam, ever
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          style={{ opacity }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-gray-600" />
        </motion.div>
      </section>

      {/* Problem Section */}
      <section id="why" className="py-32 px-8">
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            className="max-w-4xl mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              The real<br />problem
            </h2>
            <p className="text-2xl text-gray-400 leading-relaxed">
              <span className="text-[#F5A623]">90%</span> of startups don't fail because founders can't build.
              They fail because every tool they use is <span className="text-white">blind to what the others are doing.</span>
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                num: "01",
                title: "The context gap",
                desc: "AI builds code without knowing if the market exists, if pricing is viable, or if the infra will bankrupt you. Every domain is an isolated silo."
              },
              {
                num: "02",
                title: "The prototype trap",
                desc: "You build fast and build confidently then discover you built the wrong thing, for the wrong market, at the wrong price. Months lost."
              },
              {
                num: "03",
                title: "The distribution void",
                desc: "The product ships. Nothing happens. No launch strategy, no user acquisition, no demand signal. Most builders never had a plan here at all."
              },
              {
                num: "04",
                title: "The legal blindspot",
                desc: "Fintech, health, and consumer data products built without GDPR, HIPAA, or PCI compliance. Discovered months after launch. Company-ending."
              },
              {
                num: "05",
                title: "Funding misalignment",
                desc: "Founders pitch 50 investors whose thesis, stage, and sector are all wrong. Months of rejection with zero signal on why."
              },
              {
                num: "06",
                title: "Team composition error",
                desc: "Wrong founding team for the product type. A solo coder building a sales-heavy enterprise SaaS. Realized only after multiple expensive pivots."
              }
            ].map((failure, idx) => (
              <motion.div 
                key={idx} 
                className="group bg-white/[0.02] p-8 rounded-2xl border border-white/5 hover:border-[#F5A623]/20 hover:bg-white/[0.04] transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-[#F5A623] text-sm font-mono mb-4">{failure.num}</div>
                <h3 className="text-xl font-medium mb-3">{failure.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{failure.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-32 px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#F5A623]/5 rounded-full blur-[100px]" />
        </div>
        
        <div className="relative max-w-[1400px] mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              One system.<br />
              Every layer.<br />
              <span className="text-[#F5A623]">Connected.</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Builto is a bi-directional intelligent startup OS. When your financial model breaks, it reshapes your architecture. 
              When validation signals are weak, it stops you before you build.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {[
              { number: "11", label: "Connected stages" },
              { number: "4", label: "Feedback loops" },
              { number: "0", label: "Direct competitors" },
              { number: "90%", label: "Failure rate we cut" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                className="text-center p-8 bg-white/[0.02] rounded-2xl border border-white/5"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-5xl font-bold text-[#F5A623] mb-2">{stat.number}</div>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Not a chatbot. Not a copilot.",
                desc: "Chatbots answer. Copilots assist. Builto orchestrates. It holds the full context of your startup and makes every stage smarter."
              },
              {
                icon: Lock,
                title: "Human always in control.",
                desc: "AI generates options and surfaces trade-offs. You decide and advance. Every stage transition requires your approval."
              },
              {
                icon: Zap,
                title: "Memory that compounds.",
                desc: "Builto remembers every decision, pivot, and preference. After 90 days, it knows your founding instincts better than any partner could."
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                className="text-center p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="w-16 h-16 bg-[#F5A623]/10 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="w-8 h-8 text-[#F5A623]" />
                </motion.div>
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Vertical Flowchart */}
      <section id="how" className="py-32 px-8">
        <div className="max-w-[900px] mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-7xl font-bold mb-6">How it works</h2>
            <p className="text-2xl text-gray-400">From raw idea to funded, distributed startup.</p>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[29px] top-16 bottom-16 w-[2px] bg-gradient-to-b from-[#F5A623]/50 via-[#F5A623]/20 to-transparent" />
            
            <div className="space-y-6">
              {[
                { stage: "01", title: "Validate", subtitle: "Real-world signals", icon: Target, desc: "Live OSINT, fake-door tests, micro-ad experiments. Demand measured empirically before you write code." },
                { stage: "02", title: "Strategize", subtitle: "ICP, pricing, GTM", icon: TrendingUp, desc: "Ideal customer profile, go-to-market strategy, and dynamic execution roadmap grounded in validation." },
                { stage: "03", title: "Quantify", subtitle: "Financial reality", icon: DollarSign, desc: "Revenue simulation, cloud cost estimation, unit economics. If it doesn't pencil out, we tell you before you build." },
                { stage: "04", title: "Match", subtitle: "Investor targeting", icon: Target, desc: "Matched against investor thesis, stage preference, sector fit. Ranked list with cold outreach templates ready to send." },
                { stage: "05", title: "Architect", subtitle: "System design", icon: Code, desc: "Tech architecture constrained by your financials. Pre-audited, secure boilerplates. No hallucinated infrastructure." },
                { stage: "06", title: "Legal", subtitle: "Compliance radar", icon: Scale, desc: "GDPR, HIPAA, PCI-DSS, FDA detected from your business model before you build. Checklist embedded into Stage 7." },
                { stage: "07", title: "Build", subtitle: "Aligned development", icon: Code, desc: "Context-aware code generation. Build this given everything we know about your market, finances, and legal requirements." },
                { stage: "08", title: "Distribute", subtitle: "Launch engine", icon: Share2, desc: "Viral content, community targeting, launch strategy, growth loops. The stage your competitors don't even know they're missing." },
                { stage: "09", title: "Team", subtitle: "Gap analysis", icon: Users, desc: "Identifies co-founder archetypes and first-hire profiles based on your actual product, GTM motion, and tech stack." },
                { stage: "10", title: "Execute", subtitle: "Tracking OS", icon: Repeat, desc: "Daily execution tasks, burn rate monitoring, milestone tracking. Your plan becomes a living system, not a static doc." },
                { stage: "11", title: "Remember", subtitle: "Founder memory", icon: Brain, desc: "Every decision, pivot, and preference stored in encrypted memory. Builto gets smarter with every project." }
              ].map((stage, idx) => (
                <motion.div 
                  key={idx}
                  className="relative flex gap-6"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {/* Stage number circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div 
                      className="w-[60px] h-[60px] bg-[#F5A623]/10 border-2 border-[#F5A623]/30 text-[#F5A623] rounded-full flex items-center justify-center font-bold text-lg"
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(245, 166, 35, 0.2)' }}
                    >
                      {stage.stage}
                    </motion.div>
                  </div>
                  
                  {/* Content */}
                  <motion.div 
                    className="flex-1 bg-white/[0.02] p-6 rounded-2xl border border-white/5 hover:border-[#F5A623]/30 hover:bg-white/[0.04] transition-all duration-500"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-medium mb-1">{stage.title}</h3>
                        <p className="text-sm text-gray-500">{stage.subtitle}</p>
                      </div>
                      <stage.icon className="w-5 h-5 text-[#F5A623]/50 flex-shrink-0" />
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">{stage.desc}</p>
                  </motion.div>
                  
                  {/* Arrow indicator */}
                  {idx < 10 && (
                    <motion.div 
                      className="absolute left-[29px] top-[75px] z-0"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 + 0.3 }}
                      viewport={{ once: true }}
                    >
                      <ArrowDown className="w-4 h-4 text-[#F5A623]/30" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-[1400px] mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-7xl font-bold mb-6">Pricing</h2>
            <p className="text-xl text-gray-400">Simple, honest pricing. Cancel anytime.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic */}
            <motion.div 
              className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="mb-8">
                <div className="text-sm text-gray-500 uppercase tracking-wider mb-4">Basic</div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold">Basic</span>
                </div>
                <p className="text-sm text-gray-500">For founders exploring.</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Stages 1-2 (Validate + Strategize)",
                  "1 active project",
                  "OSINT competitor mapping",
                  "3 validation runs/month"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-400">
                    <Check className="w-5 h-5 text-[#F5A623] flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <motion.a 
                href="#waitlist"
                className="block w-full text-center px-6 py-3 border border-white/10 rounded-xl font-medium hover:bg-white/5 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Join waitlist
              </motion.a>
            </motion.div>

            {/* Pro - Featured */}
            <motion.div 
              className="bg-gradient-to-br from-[#F5A623]/20 to-[#F5A623]/5 border-2 border-[#F5A623]/30 rounded-3xl p-8 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F5A623] text-black text-xs px-4 py-1.5 rounded-full font-bold uppercase tracking-wider">
                Most Popular
              </div>
              
              <div className="mb-8">
                <div className="text-sm text-[#F5A623] uppercase tracking-wider mb-4">Pro</div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold">Pro</span>
                </div>
                <p className="text-sm text-gray-400">For founders building seriously.</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {[
                  "All 11 stages unlocked",
                  "5 active projects",
                  "Investor match engine",
                  "Legal & compliance radar",
                  "Team gap analyzer",
                  "Founder memory system",
                  "Distribution engine",
                  "Unlimited validation runs"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-[#F5A623] flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <motion.a 
                href="#waitlist"
                className="block w-full text-center px-6 py-3 bg-[#F5A623] text-black rounded-xl font-medium hover:bg-[#E09515] transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Reserve Pro access →
              </motion.a>
            </motion.div>

            {/* Studio */}
            <motion.div 
              className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="mb-8">
                <div className="text-sm text-gray-500 uppercase tracking-wider mb-4">Studio</div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold">Studio</span>
                </div>
                <p className="text-sm text-gray-500">For venture builders.</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Everything in Pro",
                  "Unlimited projects",
                  "API access",
                  "White-label option",
                  "Team collaboration",
                  "Priority support"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-400">
                    <Check className="w-5 h-5 text-[#F5A623] flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <motion.a 
                href="#waitlist"
                className="block w-full text-center px-6 py-3 border border-white/10 rounded-xl font-medium hover:bg-white/5 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Join waitlist
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-8">
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-4">What founders are saying</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "I've used Bolt, Cursor, ValidatorAI, Notion. I still had to manually connect every piece myself. Builto is the first thing I've seen that actually connects them.",
                role: "Founder, EdTech SaaS"
              },
              {
                quote: "The distribution gap is real. I launched 3 products that were technically solid and went absolutely nowhere. If Builto solves that, it's the most important tool I'll ever use.",
                role: "Solo founder, 4th startup"
              },
              {
                quote: "The investor match feature alone is worth the subscription. I spent 4 months pitching to investors who had no thesis overlap with my sector.",
                role: "Pre-seed founder"
              }
            ].map((testimonial, idx) => (
              <motion.div 
                key={idx}
                className="bg-white/[0.02] p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <p className="text-sm text-gray-400 mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
                <div className="border-t border-white/5 pt-4">
                  <p className="text-xs text-gray-600">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-4">FAQ</h2>
            <p className="text-xl text-gray-400">Questions we know you're thinking.</p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: "How is Builto different from ChatGPT, Cursor, or Bolt?",
                answer: "General AI tools and coding copilots are stateless. Every prompt starts from zero. They write code in a vacuum, completely blind to your business model. Builto is a bi-directional operating system. It holds the persistent memory of your entire startup. If a financial constraint is established in Stage 3, it actively alters the Next.js architecture generated in Stage 5. It doesn't just assist; it orchestrates."
              },
              {
                question: "Do I need to be a software engineer to use Builto?",
                answer: "No. Non-technical founders are actually the primary target. You supply the domain knowledge, strategic decisions, and direction. Builto handles the architecture, technical trade-offs, and code generation. For technical founders, Builto acts as a strategic safeguard, ensuring the code you write is financially scalable and legally compliant."
              },
              {
                question: "Can I use Builto for a startup I have already launched?",
                answer: "Yes. While Builto shines when taking a raw idea from Stage 1 (Validation) to Stage 11, existing startups can enter the pipeline at any point. You can drop in at Stage 8 to build a Distribution Engine, Stage 6 to run a Legal & Compliance audit on your existing MVP, or Stage 4 to use the Investor Match Engine for your seed round."
              },
              {
                question: "What does \"real-world validation\" actually mean?",
                answer: "Most AI tools tell you if an idea is good based on their training data. That is synthetic reasoning, not signal. Builto's validation stage runs actual experiments: auto-generated landing pages to capture intent, fake-door tests to measure click-throughs, and micro-ad experiments targeting your ICP. We measure actual human demand before you write a single line of code."
              },
              {
                question: "What happens to my startup data and IP?",
                answer: "Your Founder Memory Core is encrypted with AES-256 and stored with keys only you control. It never leaves your account without explicit permission. We never use your startup data to train foundational LLMs or share it with third parties. Your competitive advantage remains entirely yours."
              }
            ].map((faq, idx) => (
              <motion.div 
                key={idx}
                className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/[0.02] transition-all"
                >
                  <span className="font-medium pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFaq === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === idx ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-6">
                    <p className="text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA with Form */}
      <section id="waitlist" className="py-32 px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F5A623]/10 rounded-full blur-[120px]" />
        </div>

        <motion.div 
          className="relative max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-6xl md:text-7xl font-bold mb-6">
              Your idea deserves<br />
              <span className="text-[#F5A623]">a real shot</span>
            </h2>
            <p className="text-xl text-gray-400 mb-4">
              Join founders building with more intelligence.
            </p>
            <motion.div 
              className="inline-flex items-center gap-2 bg-[#F5A623]/10 border border-[#F5A623]/20 px-4 py-2 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <Lock className="w-4 h-4 text-[#F5A623]" />
              <span className="text-sm text-[#F5A623] font-medium">Reserved for first 1000 people · Closed beta</span>
            </motion.div>
          </div>
          
          <form onSubmit={handleFormSubmit} className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Name</label>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#F5A623]/50 focus:bg-white/10 transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#F5A623]/50 focus:bg-white/10 transition-all"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Company / Startup (Optional)</label>
              <input 
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                placeholder="Acme Inc."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#F5A623]/50 focus:bg-white/10 transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">What stage are you at?</label>
              <select 
                value={formData.stage}
                onChange={(e) => setFormData({...formData, stage: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F5A623]/50 focus:bg-white/10 transition-all"
                required
              >
                <option value="" className="bg-[#0A0A0A]">Select stage</option>
                <option value="idea" className="bg-[#0A0A0A]">Just an idea</option>
                <option value="validating" className="bg-[#0A0A0A]">Validating</option>
                <option value="building" className="bg-[#0A0A0A]">Building MVP</option>
                <option value="launched" className="bg-[#0A0A0A]">Already launched</option>
                <option value="scaling" className="bg-[#0A0A0A]">Scaling</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Which plan are you interested in?</label>
              <select 
                value={formData.plan}
                onChange={(e) => setFormData({...formData, plan: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F5A623]/50 focus:bg-white/10 transition-all"
                required
              >
                <option value="" className="bg-[#0A0A0A]">Select plan</option>
                <option value="basic" className="bg-[#0A0A0A]">Basic</option>
                <option value="pro" className="bg-[#0A0A0A]">Pro</option>
                <option value="studio" className="bg-[#0A0A0A]">Studio</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Biggest bottleneck right now? (Optional)</label>
              <select 
                value={formData.bottleneck}
                onChange={(e) => setFormData({...formData, bottleneck: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F5A623]/50 focus:bg-white/10 transition-all"
              >
                <option value="" className="bg-[#0A0A0A]">Select biggest challenge</option>
                <option value="technical" className="bg-[#0A0A0A]">Technical execution / Coding</option>
                <option value="validation" className="bg-[#0A0A0A]">Validating real market demand</option>
                <option value="financial" className="bg-[#0A0A0A]">Financial modeling & unit economics</option>
                <option value="legal" className="bg-[#0A0A0A]">Legal & compliance requirements</option>
                <option value="distribution" className="bg-[#0A0A0A]">Distribution & getting users</option>
                <option value="investors" className="bg-[#0A0A0A]">Finding the right investors</option>
              </select>
            </div>

            {submitError && (
              <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {submitError}
              </p>
            )}
            
            <motion.button 
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-[#F5A623] text-black rounded-xl font-medium hover:bg-[#E09515] transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Saving your spot...' : 'Claim my spot'}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <p className="text-sm text-gray-600 text-center">No spam. No sales pressure. Unsubscribe anytime.</p>
          </form>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <div className="text-2xl tracking-tight mb-2">
              Built<span className="text-[#F5A623]">o</span>
            </div>
            <p className="text-sm text-gray-600">The startup operating system</p>
          </div>
          <div className="text-sm text-gray-600">
            © 2026 Builto. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Thank You Modal */}
      {showThankYou && (
        <motion.div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowThankYou(false)}
        >
          <motion.div 
            className="bg-[#0A0A0A] border border-[#F5A623]/30 rounded-3xl p-8 max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <motion.div 
                className="w-16 h-16 bg-[#F5A623]/10 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <Check className="w-8 h-8 text-[#F5A623]" />
              </motion.div>
              <h3 className="text-3xl font-bold mb-4">Thanks for joining!</h3>
              <p className="text-gray-400 mb-8">
                We'll reach out to you soon with early access details and updates on your spot in the waitlist.
              </p>
              <motion.button 
                onClick={() => setShowThankYou(false)}
                className="w-full px-8 py-3 bg-[#F5A623] text-black rounded-xl font-medium hover:bg-[#E09515] transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
