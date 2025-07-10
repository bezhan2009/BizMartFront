
"use client";

import Link from 'next/link';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, User, Heart, MessageSquare, LogOut, LogIn, LayoutDashboard } from 'lucide-react';
import Logo from './logo';
import SearchBar from './search-bar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import { ThemeToggle } from './theme-toggle';

const navLinks = [
  { href: '/favorites', label: 'Favorites', icon: Heart, roles: ['customer', 'provider'] },
  { href: '/chat', label: 'Messages', icon: MessageSquare, roles: ['customer', 'provider'] },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['provider'] },
];

export default function Header() {
  const { user, logout, role } = useAuth();

  const getNavLinks = () => {
      if (!user) return [];
      return navLinks.filter(link => link.roles.includes(role || 'customer'));
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <div className="hidden md:block">
            <Logo />
          </div>
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-6 p-4">
                <Logo />
                <nav className="flex flex-col gap-4">
                  {user && getNavLinks().map(({ href, label, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-lg font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      <Icon className="h-5 w-5" />
                      {label}
                    </Link>
                  ))}
                   {!user && (
                     <>
                      <Link href="/login" className="flex items-center gap-2 rounded-md px-3 py-2 text-lg font-medium hover:bg-accent hover:text-accent-foreground">
                        <LogIn className="h-5 w-5" />
                        Log In
                      </Link>
                      <Link href="/register" className="flex items-center gap-2 rounded-md px-3 py-2 text-lg font-medium hover:bg-accent hover:text-accent-foreground">
                        <User className="h-5 w-5" />
                        Sign Up
                      </Link>
                     </>
                   )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          {/* Desktop Nav */}
          <nav className="hidden items-center gap-4 md:flex">
            {user && getNavLinks().map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex-1 mx-4 md:mx-8 max-w-md">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} data-ai-hint={user.avatarHint} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">@{user.username}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/profile/${user.username}`}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                 {getNavLinks().map((link) => (
                   <DropdownMenuItem key={link.href} asChild>
                     <Link href={link.href}>
                       <link.icon className="mr-2 h-4 w-4" />
                       <span>{link.label}</span>
                     </Link>
                   </DropdownMenuItem>
                 ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
             <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
