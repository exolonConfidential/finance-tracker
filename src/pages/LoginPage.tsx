import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { login, setToken } from "@/api/auth"
import { useNavigate, Link } from "react-router-dom"
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
import { useState } from "react"
import { Loader2, TrendingUp, ArrowLeft } from "lucide-react"

// Validation Schema
const formSchema = z.object({
  email: z.email(),
  password: z.string().min(1, { message: "Password is required" }),
})

export default function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="flex min-h-screen w-full">
      
      {/* 1. LEFT SIDE - THE FORM */}
      <div className="flex w-full flex-col justify-center px-8 sm:w-[500px] lg:px-8 xl:px-12 bg-white">
        
        {/* Back Button */}
        <div className="absolute top-8 left-8">
            <Link to="/" className="flex items-center text-sm font-medium text-gray-500 hover:text-brand-600 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
            </Link>
        </div>

        <div className="mx-auto w-full max-w-[380px]">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome back</h1>
            <p className="mt-2 text-sm text-gray-500">
              Enter your email to sign in to your account
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} className="h-11" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                        <Link to="#" className="text-xs font-medium text-brand-600 hover:underline">Forgot password?</Link>
                    </div>
                    <FormControl>
                      <Input type="password" placeholder="••••••" {...field} className="h-11" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-500 border border-red-100">
                    {error}
                </div>
              )}

              <Button type="submit" className="h-11 w-full bg-brand-600 hover:bg-brand-700 text-white font-medium" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign In"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-500">
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold text-brand-600 hover:underline hover:text-brand-700">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* 2. RIGHT SIDE - BRANDING (Hidden on Mobile) */}
      <div className="hidden min-h-screen w-full bg-gray-50 lg:flex items-center justify-center bg-gradient-to-br from-brand-600 to-teal-700 p-12 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/4 rounded-full bg-white/10 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/3 translate-y-1/4 rounded-full bg-brand-900/20 blur-[100px]"></div>

        <div className="relative z-10 max-w-lg text-white">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <TrendingUp className="h-7 w-7 text-white" />
            </div>
            <h2 className="mb-6 text-3xl font-bold leading-tight">
                "Financial freedom is available to those who learn about it and work for it."
            </h2>
            <p className="text-lg text-brand-100">
                Join thousands of users tracking their wealth with FinanceTracker.
            </p>
        </div>
      </div>
    </div>
  )
}