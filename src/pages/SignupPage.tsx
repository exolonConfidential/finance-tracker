import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { setToken, signup } from "@/api/auth"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Loader2, ArrowLeft, TrendingUp } from "lucide-react"
import { SelectTrigger, Select, SelectItem, SelectContent, SelectValue } from "@/components/ui/select"

// 1. Data & Validation
// ------------------------------------------------
const countries = [
  { name: "India", code: "IN", currency: "INR" },
  { name: "USA", code: "US", currency: "USD" },
  // Add more countries here later
]

const signupSchema = z.object({
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().optional(),
  email: z.email({error:"Invalid email address"}),
  password: z.string().min(6, "Password must be at least 6 characters"),
  // Note: Select values return strings in HTML/React, so we validate as string
  countryIndex: z.string({ error: "Please select a country" }),
})

export default function SignupPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      // We don't set a default index so the placeholder shows
    },
  })

  // 2. Submit Logic
  // ------------------------------------------------
  async function onSubmit(values: z.infer<typeof signupSchema>) {
    try {
      setIsLoading(true);
      setError(null);

      // Convert the string index back to a number to access the array
      const index = parseInt(values.countryIndex);
      const selectedCountry = countries[index];

      // Prepare payload for Backend
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        currency: selectedCountry.currency,
        country: selectedCountry.code
      };
   
      const token = await signup(payload);
      setToken(token);
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Signup Failed", err);
      const msg = err.response?.data?.message || "Signup failed. Please try again.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }

  // 3. The UI
  // ------------------------------------------------
  return (
    <div className="flex min-h-screen w-full">
      
      {/* LEFT SIDE - FORM */}
      <div className="flex w-full flex-col justify-center px-8 sm:w-[500px] lg:px-8 xl:px-12 bg-white">
        
        {/* Back Button */}
        <div className="absolute top-8 left-8">
            <Link to="/" className="flex items-center text-sm font-medium text-gray-500 hover:text-brand-600 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
            </Link>
        </div>

        <div className="mx-auto w-full max-w-[380px] py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create Account</h1>
            <p className="mt-2 text-sm text-gray-500">
              Start tracking your finances today.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              
              {/* Row: Names */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} className="h-11" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} className="h-11" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} className="h-11" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••" {...field} className="h-11" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Country Select */}
              <FormField
                control={form.control}
                name="countryIndex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries.map((item, index) => (
                          <SelectItem key={index} value={String(index)}>
                            {item.name} ({item.currency})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                 <div className="rounded-md bg-red-50 p-3 text-sm text-red-500 border border-red-100 text-center">
                    {error}
                </div>
              )}

              <Button type="submit" className="h-11 w-full bg-brand-600 hover:bg-brand-700 text-white font-medium" disabled={isLoading}>
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account...</> : "Sign Up"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-brand-600 hover:underline hover:text-brand-700">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - BRANDING (Hidden on Mobile) */}
      <div className="hidden min-h-screen w-full bg-gray-50 lg:flex items-center justify-center bg-linear-to-br from-brand-600 to-teal-700 p-12 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/4 rounded-full bg-white/10 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/3 translate-y-1/4 rounded-full bg-brand-900/20 blur-[100px]"></div>

        <div className="relative z-10 max-w-lg text-white">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <TrendingUp className="h-7 w-7 text-white" />
            </div>
            <h2 className="mb-6 text-3xl font-bold leading-tight">
                "The journey to financial independence starts with a single step."
            </h2>
            <p className="text-lg text-brand-100">
                Create your free account today and join a community of smart savers.
            </p>
        </div>
      </div>
    </div>
  )
}