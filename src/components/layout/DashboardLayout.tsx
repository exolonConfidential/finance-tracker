import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  ArrowRightLeft,
  Settings,
  LogOut,
  Menu,
  TrendingUp,
  Tag
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/api/auth";
import { useUser } from "@/hooks/useUser";
// 1. Navigation Configuration
const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Wallet, label: 'Wallets', href: '/wallets' },
  { icon: Tag, label: 'Categories', href: '/categories' }, // Add this!
  { icon: ArrowRightLeft, label: 'Transactions', href: '/transactions' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const { data: user, isLoading } = useUser();

  // Helper to handle logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // 2. The Internal Sidebar Component (Reused for Desktop & Mobile)
  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-white">
      {/* Logo Area */}
      <div className="flex h-16 items-center border-b px-6">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setIsMobileOpen(false)}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
            <TrendingUp className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            FinanceTracker
          </span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 px-3 py-6">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setIsMobileOpen(false)} // Close mobile menu on click
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-brand-50 text-brand-700 shadow-sm ring-1 ring-brand-200" // Active Style
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900" // Inactive Style
                }`}
            >
              <item.icon
                className={`h-5 w-5 ${
                  isActive ? "text-brand-600" : "text-gray-400"
                }`}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer (User Profile & Logout) */}
      <div className="border-t p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full flex justify-start gap-3 px-2 hover:bg-gray-100 h-14"
            >
              <Avatar className="h-9 w-9 border">
                {/* If we had an avatar URL, we'd use it here. For now, use initials. */}
                <AvatarImage src="" />
                <AvatarFallback className="bg-brand-100 text-brand-700">
                  {user
                    ? `${user.firstName[0]}${
                        user.lastName ? user.lastName[0] : ""
                      }`
                    : "U"}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-start text-sm">
                {/* SHOW LOADING SKELETON OR NAME */}
                {isLoading ? (
                  <div className="space-y-1">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
                  </div>
                ) : (
                  <>
                    <span className="font-medium text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </span>
                    <span className="text-xs text-gray-500 truncate w-32 text-left">
                      {user?.email}
                    </span>
                  </>
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600 focus:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 3. DESKTOP SIDEBAR (Hidden on Mobile) */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 border-r bg-white shadow-sm md:block">
        <SidebarContent />
      </aside>

      {/* 4. MOBILE TOPBAR (Visible on Mobile) */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white/80 backdrop-blur-md px-4 md:hidden">
        <div className="flex items-center gap-2">
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="-ml-2">
                <Menu className="h-6 w-6 text-gray-700" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>{" "}
              {/* Accessibility Fix */}
              <SidebarContent />
            </SheetContent>
          </Sheet>
          <span className="text-lg font-bold text-gray-900">
            FinanceTracker
          </span>
        </div>

        {/* Mobile Profile Icon */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/settings")}
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-brand-100 text-brand-700 text-xs">
              US
            </AvatarFallback>
          </Avatar>
        </Button>
      </header>

      {/* 5. MAIN CONTENT AREA */}
      <main className="md:pl-64 transition-all duration-300">
        <div className="container mx-auto max-w-7xl p-4 md:p-8">
          {/* The individual page content renders here */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}
