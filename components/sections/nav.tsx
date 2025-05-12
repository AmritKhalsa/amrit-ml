"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown, Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const nav = [
  { name: "Home", link: "/dashboard" },
  { name: "Visualize", link: "/Visualize" },
  { name: "Models", link: "/models" },
  { name: "Data", link: "/dashboard/data" },
]
export default function Nav() {
  const [activeTab, setActiveTab] = React.useState("overview")
  return (
<header className="flex flex-col">
  <div className="border-b">
    <div className="flex h-16 items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4">
        {/* Logo and Brand */}
        <Link href="#" className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
            </svg>
          </div>
          <span className="text-xl font-semibold">Shadcn</span>
        </Link>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage alt="User" />
                <AvatarFallback>BG</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <div className="font-medium">
                  Bonnie <span className="hidden md:inline">Green</span>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-60">
            <DropdownMenuItem className="flex items-center gap-3 py-3 focus:bg-accent">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="Michael" />
                <AvatarFallback>MG</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <div className="font-medium">Michael Gough</div>
                <div className="text-sm text-muted-foreground">michael@company.com</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-3 py-3 focus:bg-accent">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="Roberta" />
                <AvatarFallback>RC</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <div className="font-medium">Roberta Casas</div>
                <div className="text-sm text-muted-foreground">roberta@company.com</div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-4">
        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <Link href="#" className="px-3 py-2 text-sm font-medium hover:text-primary">
            Changelog
          </Link>
          <Link href="#" className="px-3 py-2 text-sm font-medium hover:text-primary">
            Support
          </Link>
          <Link href="#" className="px-3 py-2 text-sm font-medium hover:text-primary">
            Docs
          </Link>
        </nav>

        {/* Feedback Button */}
        <Button variant="outline" className="hidden md:inline-flex">
          Feedback
        </Button>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-8">
              <Link href="#" className="px-3 py-2 text-sm font-medium hover:text-primary">
                Changelog
              </Link>
              <Link href="#" className="px-3 py-2 text-sm font-medium hover:text-primary">
                Support
              </Link>
              <Link href="#" className="px-3 py-2 text-sm font-medium hover:text-primary">
                Docs
              </Link>
              <Button variant="outline" className="mt-2">
                Feedback
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </div>

  <div className="border-b shadow-sm">
    <nav className="px-4 md:px-6">
      <ul className="flex flex-wrap -mb-px text-sm font-medium">
        {
          nav.map((tab) => (
            <li key={tab.name} className="mr-2">
              <Link
                href={tab.link}
                className={cn(
                  "inline-block py-3 px-4 border-b-2",
                  activeTab === tab.name.toLowerCase()
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground",
                )}
                onClick={() => setActiveTab(tab.name.toLowerCase())}
              >
                {tab.name}
              </Link>
            </li>
          ))
        }
      </ul>
    </nav>
  </div>
</header>

);
}