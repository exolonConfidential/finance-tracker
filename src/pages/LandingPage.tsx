
import { Link } from "react-router-dom";

import { motion, type Variants } from "framer-motion"; // <-- Add Variants here
import { Button } from "@/components/ui/button";
import { 
  PieChart, 
  Wallet, 
  ShieldCheck, 
  ArrowRight, 
  TrendingUp, 
  Github,
} from "lucide-react";

// Explicitly type them as Variants!
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 24 } 
  }
};

export default function LandingPage() {
  

  return (
    <div className="relative min-h-screen w-full bg-background font-sans text-foreground overflow-hidden selection:bg-primary/30">
      
      {/* 0. THE AURORA LIGHTS (Background Engine) */}
      {/* 0. THE FLUID AURORA ENGINE */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        
        {/* Orb 1: Top Left - Morphs Indigo <-> Cyan and floats */}
        <motion.div 
          className="absolute top-[-20%] left-[-10%] h-[800px] w-[800px] rounded-full mix-blend-screen blur-[120px] opacity-60 dark:opacity-40"
          animate={{
            x: [0, 150, -50, 0],
            y: [0, 100, 50, 0],
            backgroundColor: [
              "rgba(79, 70, 229, 0.4)",  // Indigo
              "rgba(6, 182, 212, 0.3)",  // Cyan
              "rgba(147, 51, 234, 0.4)", // Purple
              "rgba(79, 70, 229, 0.4)"   // Back to Indigo
            ],
            scale: [1, 1.2, 0.9, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />

        {/* Orb 2: Bottom Right - Morphs Purple <-> Pink and floats oppositely */}
        <motion.div 
          className="absolute bottom-[-20%] right-[-10%] h-[900px] w-[900px] rounded-full mix-blend-screen blur-[150px] opacity-60 dark:opacity-40"
          animate={{
            x: [0, -150, 100, 0],
            y: [0, -100, -50, 0],
            backgroundColor: [
              "rgba(147, 51, 234, 0.3)", // Purple
              "rgba(236, 72, 153, 0.3)", // Pink
              "rgba(79, 70, 229, 0.3)",  // Indigo
              "rgba(147, 51, 234, 0.3)"  // Back to Purple
            ],
            scale: [1, 0.8, 1.1, 1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />

        {/* Orb 3: Center Core - Slow pulse to bind them together */}
        <motion.div 
          className="absolute top-[30%] left-[40%] h-[600px] w-[600px] rounded-full mix-blend-screen blur-[120px] opacity-40 dark:opacity-20"
          animate={{
            backgroundColor: [
              "rgba(6, 182, 212, 0.2)", // Cyan
              "rgba(147, 51, 234, 0.2)",// Purple
              "rgba(6, 182, 212, 0.2)"  // Cyan
            ],
            scale: [1, 1.5, 1]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </div>

      {/* 1. TOP NAVIGATION (Glassmorphic) */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/50 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-r from-primary to-purple-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)] transition-transform group-hover:scale-110">
              <TrendingUp className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground/90 group-hover:text-foreground transition-colors">
              FinanceTracker
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</a>
            <span className="text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.1)]">
              100% Free
            </span>
          </div>

          {/* Actions & Auth */}
          <div className="flex items-center gap-2 sm:gap-4">
           

            <Link to="/login" className="hidden sm:block">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-white/5">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_rgba(79,70,229,0.4)] transition-all hover:shadow-[0_0_25px_rgba(79,70,229,0.6)]">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative z-10">
        {/* 2. HERO SECTION */}
        <section className="pt-20 pb-32 md:pt-25 lg:pt-30">
          <motion.div 
            className="container mx-auto px-4 text-center md:px-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <div className="mx-auto max-w-4xl">
              <motion.h1 variants={itemVariants} className="mb-6 text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl leading-tight">
                Financial freedom should be <br className="hidden md:block" />
                <span className="bg-linear-to-r from-cyan-400 via-primary to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(79,70,229,0.3)]">
                  Free for Everyone
                </span>
              </motion.h1>
              
              <motion.p variants={itemVariants} className="mb-10 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto leading-relaxed">
                No subscriptions. No hidden fees. Just a powerful, secure, and beautiful 
                way to track your wealth and manage your expenses.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link to="/signup">
                  <Button size="lg" className="h-14 bg-primary px-8 text-lg hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all hover:shadow-[0_0_35px_rgba(79,70,229,0.6)] hover:-translate-y-1 rounded-xl">
                    Create Free Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="h-14 px-8 text-lg border-white/10 bg-card/30 backdrop-blur-md hover:bg-white/5 text-foreground rounded-xl transition-all hover:-translate-y-1">
                    Login to Dashboard
                  </Button>
                </Link>
              </motion.div>
              
              <motion.p variants={itemVariants} className="mt-8 text-sm font-medium text-muted-foreground tracking-wide uppercase">
                Open Source • No Credit Card Required • Secure
              </motion.p>
            </div>
          </motion.div>
        </section>

        {/* 3. FEATURES GRID (Glassmorphic Cards) */}
        <section id="features" className="py-24 relative ">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16 text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Premium features, zero cost
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                We believe financial literacy is a right, not a product.
              </p>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="grid gap-6 md:grid-cols-3"
            >
              {/* Feature 1 */}
              <motion.div variants={itemVariants} className="group rounded-3xl border border-white/5 bg-card/40 backdrop-blur-xl p-8 shadow-2xl transition-all duration-300 hover:border-purple-500/30 hover:bg-card/60 hover:-translate-y-2">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300">
                  <Wallet className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-foreground">Unlimited Accounts</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Create as many wallets as you need. Track Cash, Bank Accounts, and Savings without limits.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div variants={itemVariants} className="group rounded-3xl border border-white/5 bg-card/40 backdrop-blur-xl p-8 shadow-2xl transition-all duration-300 hover:border-cyan-500/30 hover:bg-card/60 hover:-translate-y-2">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300">
                  <PieChart className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-foreground">Smart Analytics</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Visualize your spending patterns with beautiful glowing charts and monthly progress bars.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div variants={itemVariants} className="group rounded-3xl border border-white/5 bg-card/40 backdrop-blur-xl p-8 shadow-2xl transition-all duration-300 hover:border-emerald-500/30 hover:bg-card/60 hover:-translate-y-2">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-foreground">Private & Secure</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your data is yours. We use industry-standard encryption and never sell your information.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 4. FOOTER */}
        <footer className="border-t border-white/5 bg-black/20 backdrop-blur-md py-12 mt-12">
          <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-6">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-white shadow-[0_0_10px_rgba(79,70,229,0.3)] transition-transform group-hover:scale-110">
                <TrendingUp className="h-4 w-4" />
              </div>
              <span className="font-bold text-foreground/90 group-hover:text-foreground transition-colors">FinanceTracker</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} FinanceTracker. Open Source and Free Forever.
            </p>
            <div className="flex gap-6">
               <a href="#" className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110">
                  <Github className="h-5 w-5" />
               </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}