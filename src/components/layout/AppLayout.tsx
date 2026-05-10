import { type ReactNode } from "react";
import { motion } from "framer-motion";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden text-foreground selection:bg-brand-500/30">
      
      {/* THE AURORA EFFECT 
        These are absolutely positioned, heavily blurred glowing orbs.
        They sit behind the content. Because our Shadcn cards are now 
        semi-transparent (glass-panel), these colors will bleed through beautifully.
      */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Top Left Neon Purple Orb */}
        <div className="absolute -top-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px] dark:bg-purple-600/30 mix-blend-screen" />
        
        {/* Bottom Right Neon Blue Orb */}
        <div className="absolute -bottom-[10%] -right-[10%] h-[600px] w-[600px] rounded-full bg-brand-600/20 blur-[150px] dark:bg-brand-600/20 mix-blend-screen" />
      </div>

      {/* MAIN CONTENT WITH PAGE TRANSITIONS 
        This applies a smooth fade and slide-up animation every time 
        the route changes.
      */}
      <div className="relative z-10 flex min-h-screen">
        
        {/* TODO: We will put the Side Navigation Bar here next */}
        <aside className="w-64 border-r border-border/50 glass-panel hidden md:block">
           <div className="p-6">Sidebar Placeholder</div>
        </aside>

        <main className="flex-1 p-6 lg:p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mx-auto max-w-7xl h-full"
          >
            {children}
          </motion.div>
        </main>

      </div>
    </div>
  );
}