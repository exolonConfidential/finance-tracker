import { useState} from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { login, setToken } from "@/api/auth"
import { useNavigate, Link } from "react-router-dom"

import { motion,type Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2, TrendingUp, ArrowLeft,EyeOff, Eye } from "lucide-react"

// Validation Schema
const formSchema = z.object({
  email: z.email(),
  password: z.string().min(1, { message: "Password is required" }),
})

// Framer Motion Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

export default function LoginPage() {
  const navigate = useNavigate();
  
 
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      setError(null);
      const token = await login(values);
      setToken(token);
      navigate("/dashboard");
    } catch (err: any) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen w-full bg-background text-foreground overflow-hidden selection:bg-primary/30">
      
      {/* THE FLUID AURORA ENGINE (Background) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-[-20%] left-[-10%] h-[800px] w-[800px] rounded-full mix-blend-screen blur-[120px] opacity-50 dark:opacity-30"
          animate={{
            x: [0, 150, -50, 0],
            y: [0, 100, 50, 0],
            backgroundColor: [
              "rgba(79, 70, 229, 0.4)",
              "rgba(6, 182, 212, 0.3)",
              "rgba(147, 51, 234, 0.4)",
              "rgba(79, 70, 229, 0.4)"
            ],
            scale: [1, 1.2, 0.9, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[-20%] right-[-10%] h-[900px] w-[900px] rounded-full mix-blend-screen blur-[150px] opacity-50 dark:opacity-30"
          animate={{
            x: [0, -150, 100, 0],
            y: [0, -100, -50, 0],
            backgroundColor: [
              "rgba(147, 51, 234, 0.3)",
              "rgba(236, 72, 153, 0.3)",
              "rgba(79, 70, 229, 0.3)",
              "rgba(147, 51, 234, 0.3)"
            ],
            scale: [1, 0.8, 1.1, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>


      {/* 1. LEFT SIDE - THE GLASS FORM */}
      <div className="relative z-10 flex w-full flex-col justify-center px-8 sm:w-[500px] lg:w-[600px] bg-card/40 backdrop-blur-2xl border-r border-white/5 shadow-2xl xl:px-16">
        
        {/* Back Button */}
        <div className="absolute top-8 left-8 xl:left-16">
            <Link to="/" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Home
            </Link>
        </div>

        <motion.div 
          className="mx-auto w-full max-w-[380px]"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants} className="mb-8 text-center sm:text-left">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary to-purple-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your email to sign in to your account
            </p>
          </motion.div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/80">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="name@example.com" {...field} className="h-12 bg-background/50 backdrop-blur-sm border-white/10 focus-visible:ring-primary focus-visible:border-primary transition-all" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                          <FormLabel className="text-foreground/80">Password</FormLabel>
                          <Link to="#" className="text-xs font-medium text-primary hover:text-primary/80 hover:underline">Forgot password?</Link>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••"
                            {...field}
                            // Add extra padding on the right so text doesn't type *under* the icon
                            className="pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {error && (
                <motion.div variants={itemVariants} className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20 backdrop-blur-sm">
                    {error}
                </motion.div>
              )}

              <motion.div variants={itemVariants}>
                <Button type="submit" className="h-12 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all rounded-xl" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Sign In"}
                </Button>
              </motion.div>
            </form>
          </Form>

          <motion.div variants={itemVariants} className="mt-8 text-center text-sm">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold text-primary hover:text-primary/80 hover:underline transition-colors">
                Sign up
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* 2. RIGHT SIDE - BRANDING (Hidden on Mobile) */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative z-10 p-12">
        {/* Floating Glass Quote Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          className="relative max-w-lg p-10 rounded-3xl bg-card/20 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
        >
            <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-foreground drop-shadow-md">
                "Financial freedom is available to those who learn about it and work for it."
            </h2>
            <div className="flex items-center gap-4 mt-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`h-10 w-10 rounded-full border-2 border-background bg-muted flex items-center justify-center shadow-sm z-[${10-i}]`}>
                     <span className="text-xs font-medium text-muted-foreground">U{i}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                  Join <span className="text-foreground">10,000+</span> users tracking wealth.
              </p>
            </div>
        </motion.div>
      </div>
    </div>
  )
}