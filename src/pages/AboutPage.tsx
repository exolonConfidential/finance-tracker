
import { Link } from "react-router-dom";

import { motion,type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Code2, 
  Database, 
  Server, 
  Shield, 
  Github, 
  Linkedin,
  TrendingUp,
  
} from "lucide-react";

// Framer Motion Variants for staggered animations
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function AboutPage() {
 
 

  return (
    <div className="relative min-h-screen w-full bg-background font-sans text-foreground overflow-hidden selection:bg-primary/30">
      
      {/* 0. THE FLUID AURORA ENGINE */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-[-20%] left-[-10%] h-[800px] w-[800px] rounded-full mix-blend-screen blur-[120px] opacity-40 dark:opacity-20"
          animate={{
            x: [0, 150, -50, 0],
            y: [0, 100, 50, 0],
            backgroundColor: ["rgba(79, 70, 229, 0.4)", "rgba(6, 182, 212, 0.3)", "rgba(147, 51, 234, 0.4)", "rgba(79, 70, 229, 0.4)"],
            scale: [1, 1.2, 0.9, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[-20%] right-[-10%] h-[900px] w-[900px] rounded-full mix-blend-screen blur-[150px] opacity-40 dark:opacity-20"
          animate={{
            x: [0, -150, 100, 0],
            y: [0, -100, -50, 0],
            backgroundColor: ["rgba(147, 51, 234, 0.3)", "rgba(236, 72, 153, 0.3)", "rgba(79, 70, 229, 0.3)", "rgba(147, 51, 234, 0.3)"],
            scale: [1, 0.8, 1.1, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* 1. GLASS NAVIGATION */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/50 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          
          <div className="flex items-center gap-2 group cursor-pointer absolute left-1/2 -translate-x-1/2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-purple-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)] transition-transform group-hover:scale-110">
              <TrendingUp className="h-5 w-5" />
            </div>
            <span className="hidden sm:inline-block text-xl font-bold tracking-tight text-foreground/90 group-hover:text-foreground transition-colors">
              FinanceTracker
            </span>
          </div>

          
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="relative z-10">
        
        {/* 2. HERO: The Mission */}
        <section className="pt-24 pb-20 md:pt-32 md:pb-32">
          <motion.div 
            className="container mx-auto px-4 text-center md:px-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.h1 variants={itemVariants} className="mb-6 text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl">
              Built for <span className="bg-linear-to-br from-cyan-400 to-primary bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">Transparency.</span><br />
              Engineered for <span className="bg-linear-to-br from-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]">Speed.</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              FinanceTracker wasn't built to sell ads or data. It was built to solve a simple problem: 
              taking control of your financial life shouldn't cost money.
            </motion.p>
          </motion.div>
        </section>

        {/* 3. THE STORY (Split Layout) */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              className="grid gap-12 lg:grid-cols-2 lg:items-center"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              
              {/* Left: Text */}
              <div className="space-y-6">
                <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  The Story
                </motion.h2>
                <motion.p variants={itemVariants} className="text-lg text-muted-foreground leading-relaxed">
                  Most finance apps today are cluttered with ads, premium subscriptions, and confusing interfaces. 
                  I wanted to build something different.
                </motion.p>
                <motion.p variants={itemVariants} className="text-lg text-muted-foreground leading-relaxed">
                  This project started as a challenge: Could I build a bank-grade financial tool that is completely free?
                  The result is a platform that respects your privacy, loads instantly, and gives you the raw numbers you need to grow.
                </motion.p>
                
                {/* Creator Socials */}
                <motion.div variants={itemVariants} className="pt-6 flex flex-wrap gap-4">
                  <Button variant="outline" className="h-12 px-6 gap-2 border-white/10 bg-card/30 backdrop-blur-md hover:bg-white/5 text-foreground rounded-xl transition-all hover:-translate-y-1">
                      <Github className="h-5 w-5" />
                      View Source Code
                  </Button>
                  <Button className="h-12 px-6 gap-2 bg-[#0A66C2] hover:bg-[#004182] text-white shadow-[0_0_15px_rgba(10,102,194,0.3)] hover:shadow-[0_0_25px_rgba(10,102,194,0.5)] rounded-xl transition-all hover:-translate-y-1">
                      <Linkedin className="h-5 w-5" />
                      Connect with Developer
                  </Button>
                </motion.div>
              </div>

              {/* Right: Abstract Glass Visual */}
              <motion.div variants={itemVariants} className="relative mx-auto aspect-video w-full max-w-lg overflow-hidden rounded-3xl bg-card/20 border border-white/10 backdrop-blur-2xl shadow-[0_0_50px_rgba(79,70,229,0.15)] group">
                  <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-purple-500/10 to-cyan-500/20 opacity-50 transition-opacity duration-500 group-hover:opacity-80"></div>
                  <div className="flex h-full flex-col justify-center items-center text-foreground text-center relative z-10 p-8">
                      <motion.div 
                        animate={{ y: [0, -10, 0] }} 
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="p-4 rounded-2xl bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)] mb-6"
                      >
                        <Shield className="h-12 w-12 text-primary" />
                      </motion.div>
                      <h3 className="text-3xl font-bold tracking-tight">Privacy First</h3>
                      <p className="text-muted-foreground mt-3 text-lg">No trackers. No hidden fees.</p>
                  </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 4. TECH STACK (Glassmorphic Cards) */}
        <section className="py-24">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              className="mb-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Under the Hood</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Modern architecture designed for performance and scalability.
              </p>
            </motion.div>

            <motion.div 
              className="grid gap-6 md:grid-cols-3"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
            >
              {/* Card 1: Backend */}
              <motion.div variants={itemVariants} className="group rounded-3xl border border-white/5 bg-card/40 backdrop-blur-xl p-8 shadow-xl transition-all duration-300 hover:border-purple-500/30 hover:bg-card/60 hover:-translate-y-2">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:bg-purple-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300">
                      <Server className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-foreground">Backend Engine</h3>
                  <p className="mb-6 text-muted-foreground leading-relaxed">
                      Robust logic processing and data security.
                  </p>
                  <ul className="space-y-3 text-sm text-foreground/80 font-medium">
                      <li className="flex items-center gap-3"><div className="h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>Java 17</li>
                      <li className="flex items-center gap-3"><div className="h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>Spring Boot 3</li>
                      <li className="flex items-center gap-3"><div className="h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>Spring Security (JWT)</li>
                  </ul>
              </motion.div>

              {/* Card 2: Frontend */}
              <motion.div variants={itemVariants} className="group rounded-3xl border border-white/5 bg-card/40 backdrop-blur-xl p-8 shadow-xl transition-all duration-300 hover:border-cyan-500/30 hover:bg-card/60 hover:-translate-y-2">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300">
                      <Code2 className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-foreground">Frontend Interface</h3>
                  <p className="mb-6 text-muted-foreground leading-relaxed">
                      Responsive, type-safe, and lightning fast.
                  </p>
                  <ul className="space-y-3 text-sm text-foreground/80 font-medium">
                      <li className="flex items-center gap-3"><div className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>React + Vite</li>
                      <li className="flex items-center gap-3"><div className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>TypeScript</li>
                      <li className="flex items-center gap-3"><div className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>Tailwind v4 + Shadcn</li>
                  </ul>
              </motion.div>

              {/* Card 3: Database */}
              <motion.div variants={itemVariants} className="group rounded-3xl border border-white/5 bg-card/40 backdrop-blur-xl p-8 shadow-xl transition-all duration-300 hover:border-emerald-500/30 hover:bg-card/60 hover:-translate-y-2">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300">
                      <Database className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-foreground">Data & Deployment</h3>
                  <p className="mb-6 text-muted-foreground leading-relaxed">
                      Reliable storage and seamless uptime.
                  </p>
                  <ul className="space-y-3 text-sm text-foreground/80 font-medium">
                      <li className="flex items-center gap-3"><div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>PostgreSQL</li>
                      <li className="flex items-center gap-3"><div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>Docker Containers</li>
                      <li className="flex items-center gap-3"><div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>Hibernate / JPA</li>
                  </ul>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 5. FOOTER CTA */}
        <section className="border-t border-white/5 bg-black/10 backdrop-blur-md py-24 text-center mt-12">
          <motion.div 
            className="container mx-auto px-4"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
              <h2 className="mb-8 text-3xl font-bold text-foreground sm:text-4xl">Ready to take control?</h2>
              <Link to="/signup">
                  <Button size="lg" className="h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] transition-all hover:-translate-y-1 rounded-xl px-10 text-lg">
                      Create Free Account
                  </Button>
              </Link>
          </motion.div>
        </section>

      </div>
    </div>
  );
}