import { useState} from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

import { motion } from "framer-motion"; // <-- The magic engine
import {
  LayoutDashboard,
  Wallet,
  ArrowRightLeft,
  Settings,
  LogOut,
  Menu,
  TrendingUp,
  Tag,
 
} from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback} from "@/components/ui/avatar";
import { logout } from "@/api/auth";
import { useUser } from "@/hooks/useUser";

// 1. ADDED COLORS: Each icon now has a specific neon color assigned to it!
const sidebarItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
    color: "text-cyan-500 dark:text-cyan-400",
  },
  {
    icon: Wallet,
    label: "Accounts",
    href: "/wallets",
    color: "text-purple-500 dark:text-purple-400",
  },
  {
    icon: Tag,
    label: "Categories",
    href: "/categories",
    color: "text-pink-500 dark:text-pink-400",
  },
  {
    icon: ArrowRightLeft,
    label: "Transactions",
    href: "/transactions",
    color: "text-emerald-500 dark:text-emerald-400",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
    color: "text-amber-500 dark:text-amber-400",
  },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  

  const { data: user, isLoading } = useUser();

  

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-card/40 backdrop-blur-2xl border-r border-border/50">
      {/* Logo Area */}
      <div className="flex h-16 items-center border-b border-border/50 px-6">
        <Link
          to="/"
          className="flex items-center gap-2 group"
          onClick={() => setIsMobileOpen(false)}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
            <TrendingUp className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            FinanceTracker
          </span>
        </Link>
      </div>

      {/* Navigation Links with Magic Sliding Indicator */}
      <nav className="flex-1 space-y-1.5 px-3 py-6 relative">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setIsMobileOpen(false)}
              // 1. Made the link "relative" so the animated background stays inside it
              // 2. Added group-hover effects for the subtle background change
              className={`relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200 group overflow-hidden
                ${!isActive ? "hover:bg-muted/40" : ""}`}
            >
              {/* THE MAGIC PILL: This only renders on the active tab, but Framer Motion slides it automatically! */}
              {isActive && (
                <motion.div
                  layoutId="active-sidebar-tab"
                  className="absolute inset-0 z-0 rounded-xl bg-primary/15 border border-primary/30 backdrop-blur-md shadow-[0_0_15px_rgba(var(--primary),0.2)]"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30, // Bouncy but controlled
                  }}
                />
              )}

              {/* The Icon (Z-10 keeps it above the magic pill) */}
              <item.icon
                className={`relative z-10 h-5 w-5 transition-transform duration-300 group-hover:scale-110 
                  ${isActive ? item.color : `text-muted-foreground ${item.color.replace("text-", "group-hover:text-")}`}`}
                // The complex replace logic above ensures that on hover, a grey icon turns into its specific neon color!
              />

              {/* The Text (Z-10 keeps it above the magic pill) */}
              <span
                className={`relative z-10 transition-colors duration-200 ${isActive ? "text-foreground font-semibold" : "text-muted-foreground group-hover:text-foreground"}`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="border-t border-border/50 p-4 space-y-3">

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full flex justify-start gap-3 px-2 hover:bg-muted/50 h-14 rounded-xl group transition-colors"
            >
              <Avatar className="h-9 w-9 border border-border/50 group-hover:border-primary/50 transition-colors">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {user
                    ? `${user.firstName[0]}${user.lastName ? user.lastName[0] : ""}`
                    : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-sm">
                {isLoading ? (
                  <div className="space-y-1">
                    <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                    <div className="h-3 w-16 bg-muted/50 rounded animate-pulse" />
                  </div>
                ) : (
                  <>
                    <span className="font-medium text-foreground">
                      {user?.firstName} {user?.lastName}
                    </span>
                    <span className="text-xs text-muted-foreground truncate w-32 text-left">
                      {user?.email}
                    </span>
                  </>
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 glass-panel">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem
              onClick={() => navigate("/settings")}
              className="cursor-pointer"
            >
              <Settings className="mr-2 h-4 w-4" /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden selection:bg-primary/30">
      {/* THE AURORA LIGHTS */}
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

      <div className="relative z-10 flex min-h-screen">
        <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 md:block">
          <SidebarContent />
        </aside>

        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border/50 bg-card/40 backdrop-blur-xl px-4 md:hidden">
          <div className="flex items-center gap-2">
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="-ml-2 text-foreground"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="p-0 w-72 border-r-0 bg-transparent"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <span className="text-lg font-bold text-foreground">
              FinanceTracker
            </span>
          </div>
        </header>

        <main className="flex-1 md:pl-64 transition-all duration-300">
          <div className="container mx-auto max-w-7xl p-4 md:p-8">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
