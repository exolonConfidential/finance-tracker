import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  PieChart, 
  Wallet, 
  ShieldCheck, 
  ArrowRight, 
  TrendingUp, 
  Github 
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      
      {/* 1. TOP NAVIGATION */}
      <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
              <TrendingUp className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-brand-900">
              FinanceTracker
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-brand-600">Features</a>
            <a href="/about" className="text-sm font-medium text-gray-600 hover:text-brand-600">About</a>
            <span className="text-sm font-medium text-brand-600 bg-brand-50 px-3 py-1 rounded-full">100% Free</span>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-gray-600 hover:text-brand-700">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-200">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-32 md:pt-24 lg:pt-32">
        <div className="container mx-auto px-4 text-center md:px-6">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Financial freedom should be <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-brand-600 to-teal-500 bg-clip-text text-transparent">
                Free for Everyone
              </span>
            </h1>
            <p className="mb-8 text-lg text-gray-600 md:text-xl">
              No subscriptions. No hidden fees. Just a powerful, secure, and modern 
              way to track your wealth and manage your expenses.
            </p>
            
            {/* UPDATED BUTTONS */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/signup">
                <Button size="lg" className="h-12 bg-brand-600 px-8 text-lg hover:bg-brand-700 shadow-xl shadow-brand-200">
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="h-12 px-8 text-lg hover:bg-gray-50 border-gray-200 text-gray-700">
                  Login to Dashboard
                </Button>
              </Link>
            </div>
            
            <p className="mt-6 text-sm text-gray-400">
              Open Source • No Credit Card Required • Secure
            </p>
          </div>
        </div>
        
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 -z-10 h-full w-full bg-white">
            <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-brand-100 opacity-50 blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 right-auto top-auto h-[500px] w-[500px] -translate-x-[10%] translate-y-[20%] rounded-full bg-blue-50 opacity-50 blur-[80px]"></div>
        </div>
      </section>

      {/* 3. FEATURES GRID */}
      <section id="features" className="bg-gray-50 py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Premium features, zero cost
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We believe financial literacy is a right, not a product.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="group rounded-2xl border bg-white p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                <Wallet className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">Unlimited Wallets</h3>
              <p className="text-gray-600">
                Create as many wallets as you need. Track Cash, Bank Accounts, and Savings without limits.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-2xl border bg-white p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                <PieChart className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">Smart Analytics</h3>
              <p className="text-gray-600">
                Visualize your spending patterns with beautiful pie charts and monthly progress bars.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-2xl border bg-white p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">Private & Secure</h3>
              <p className="text-gray-600">
                Your data is yours. We use industry-standard encryption and never sell your information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="border-t bg-white py-12">
        <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-brand-600 text-white">
              <TrendingUp className="h-4 w-4" />
            </div>
            <span className="font-bold text-gray-900">FinanceTracker</span>
          </div>
          <p className="text-sm text-gray-500">
            © 2025 FinanceTracker. Open Source and Free Forever.
          </p>
          <div className="flex gap-6">
             {/* If you have a github repo, this is a great place for it */}
             <a href="#" className="text-gray-400 hover:text-gray-900">
                <Github className="h-5 w-5" />
             </a>
          </div>
        </div>
      </footer>
    </div>
  );
}