"use client";

import { Home, Compass, Box, TrendingUp, Bell } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Compass, label: "Discover", path: "/discover" },
  { icon: Box, label: "Spaces", path: "/spaces" },
  { icon: TrendingUp, label: "Finance", path: "/finance" },
];

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 z-50 shadow-sm">
      {/* Logo */}
      <div className="w-10 h-10 mb-8 flex items-center justify-center animate-glow">
        <svg viewBox="0 0 40 40" className="w-full h-full text-[#20c997]" fill="currentColor">
          <path d="M20 4L4 12v8c0 10 6.5 19.34 16 22 9.5-2.66 16-12 16-22v-8L20 4zm0 4.18l12 6.69v7.63c0 8.08-5.17 15.67-12 18.33-6.83-2.66-12-10.25-12-18.33v-7.63l12-6.69z"/>
        </svg>
      </div>

      {/* New Thread Button */}
      <button className="w-12 h-12 mb-6 rounded-xl bg-gradient-to-br from-[#20c997] to-[#1bb589] hover:from-[#1bb589] hover:to-[#16a085] text-white flex items-center justify-center transition-all hover:scale-105 shadow-md hover:shadow-lg" title="New Thread">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2 w-full px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`w-full h-12 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive
                  ? "bg-[#e6f9f4] text-[#20c997]"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }`}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[9px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Notifications */}
      <button className="w-12 h-12 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-700 flex items-center justify-center transition-colors">
        <Bell className="w-5 h-5" />
      </button>
    </aside>
  );
}
