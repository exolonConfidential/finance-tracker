import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Code2, 
  Database, 
  Server, 
  Shield, 
  Github, 
  Linkedin,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      
      {/* 1. NAVIGATION (Simplified) */}
      <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <span className="text-xl font-bold tracking-tight text-brand-900">
            FinanceTracker
          </span>
          <div className="w-20"></div> {/* Spacer for balance */}
        </div>
      </nav>

      {/* 2. HERO: The Mission */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center md:px-6">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Built for <span className="text-brand-600">Transparency.</span><br />
            Engineered for <span className="text-brand-600">Speed.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            FinanceTracker wasn't built to sell ads or data. It was built to solve a simple problem: 
            taking control of your financial life shouldn't cost money.
          </p>
        </div>
      </section>

      {/* 3. THE STORY (Split Layout) */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            
            {/* Left: Text */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">The Story</h2>
              <p className="text-lg text-gray-600">
                Most finance apps today are cluttered with ads, premium subscriptions, and confusing interfaces. 
                I wanted to build something different.
              </p>
              <p className="text-lg text-gray-600">
                This project started as a challenge: Could I build a bank-grade financial tool that is completely free?
                The result is a platform that respects your privacy, loads instantly, and gives you the raw numbers you need to grow.
              </p>
              
              {/* Creator Socials */}
              <div className="pt-4 flex gap-4">
                <Button variant="outline" size="sm" className="gap-2">
                    <Github className="h-4 w-4" />
                    View Source Code
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                    <Linkedin className="h-4 w-4" />
                    Connect with Developer
                </Button>
              </div>
            </div>

            {/* Right: Abstract Visual */}
            <div className="relative mx-auto aspect-video w-full max-w-lg overflow-hidden rounded-2xl bg-linear-to-br from-brand-500 to-teal-600 p-8 shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="flex h-full flex-col justify-center items-center text-white text-center">
                    <Shield className="h-16 w-16 mb-4 opacity-90" />
                    <h3 className="text-2xl font-bold">Privacy First</h3>
                    <p className="text-brand-100 mt-2">No trackers. No hidden fees.</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TECH STACK (The "Flex" Section) */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Under the Hood</h2>
            <p className="mt-4 text-gray-600">
              Modern architecture designed for performance and scalability.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1: Backend */}
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                    <Server className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-bold">Backend Engine</h3>
                <p className="mb-4 text-sm text-gray-500">
                    Robust logic processing and data security.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-brand-500"></div>Java 17</li>
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-brand-500"></div>Spring Boot 3</li>
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-brand-500"></div>Spring Security (JWT)</li>
                </ul>
            </div>

            {/* Card 2: Frontend */}
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <Code2 className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-bold">Frontend Interface</h3>
                <p className="mb-4 text-sm text-gray-500">
                    Responsive, type-safe, and lightning fast.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-brand-500"></div>React + Vite</li>
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-brand-500"></div>TypeScript</li>
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-brand-500"></div>Tailwind CSS + Shadcn</li>
                </ul>
            </div>

            {/* Card 3: Database */}
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                    <Database className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-bold">Data & Deployment</h3>
                <p className="mb-4 text-sm text-gray-500">
                    Reliable storage and seamless uptime.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-brand-500"></div>PostgreSQL / MySQL</li>
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-brand-500"></div>Docker Support</li>
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-brand-500"></div>Hibernate / JPA</li>
                </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER CTA */}
      <section className="border-t border-gray-100 bg-gray-50 py-20 text-center">
        <div className="container mx-auto px-4">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Ready to take control?</h2>
            <Link to="/signup">
                <Button size="lg" className="bg-brand-600 hover:bg-brand-700 text-white px-8">
                    Create Free Account
                </Button>
            </Link>
        </div>
      </section>
    </div>
  );
}