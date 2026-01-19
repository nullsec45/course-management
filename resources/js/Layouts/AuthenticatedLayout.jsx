import { Link, router } from '@inertiajs/react';
import {
  Users,
  FileText,
  PanelLeft,
  Search,
  LogOut,
  Home,
  BarChart,
  Megaphone,
  Settings,
  User
} from "lucide-react";
import { usePage } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";  
import { cn } from '@/lib/utils';
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AuthenticatedLayout({ user, children }) {
    const { url } = usePage();
    
    const navItems = user.role === 'Admin' 
        ? [
            { href: "/dashboard", icon: Home, label: "Dashboard" },
            { href: "/dashboard/memberships", icon: User, label: "Tipe Membership" },
            { href: "/dashboard/categories", icon: BarChart, label: "Category" },
            { href: "/dashboard/videos", icon: Megaphone, label: "Video" },
            { href: "/dashboard/articles", icon: FileText, label: "Article" },
            { href: "/dashboard/users", icon: Users, label: "User" }
          ]
        : [
            { href: "/dashboard", icon: Home, label: "Dashboard" },
            { href: "/dashboard/videos", icon: Megaphone, label: "Video" },
            { href: "/dashboard/articles", icon: FileText, label: "Article" },
          ];


    return (
        <div className="flex min-h-screen w-full bg-muted/40">
            <aside className="hidden md:flex w-80 flex-col  border-r bg-background">
                <div className="flex h-16 items-center border-b px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <img 
                            src="https://www.astronacci.com/images/2019/logo-navbar-header.png" 
                            alt="Logo" 
                            className="h-8 w-auto object-contain"/> 
                    </Link>
                </div>
                <nav className="flex-1 flex flex-col gap-1 p-4">
                    {navItems.map(item => {
                        const isActive = item.href === "/dashboard"  ? url === "/dashboard" : url.startsWith(item.href);

                        return (    
                            <Button
                                key={item.href}
                                asChild
                                variant={isActive ? "secondary" : "ghost"}
                                className="justify-start"
                            >
                                <Link
                                href={item.href}
                                >
                                    <item.icon className="mr-2 h-5 w-5" />
                                    {item.label}
                                </Link>
                            </Button>
                    )
                    } )}
                </nav>  
            </aside>
            <div className="flex flex-col flex-1">
                <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                        >
                            <PanelLeft className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                        <nav className="grid gap-2 text-lg font-medium">
                            <Link
                                href="#"
                                className="flex items-center gap-2 text-lg font-semibold mb-4"
                            >
                                 <img 
                                src="https://www.astronacci.com/images/2019/logo-navbar-header.png" 
                                alt="Logo" 
                                className="h-8 w-auto object-contain"/> 
                            </Link>
                            {navItems.map(item => {
                                const isActive = item.href === "/dashboard"  ? url === "/dashboard" : url.startsWith(item.href);

                                return (
                                    <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                                        isActive && "bg-muted text-foreground"
                                    )}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {item.label}
                                    </Link>
                                )
                            })}
                        </nav>
                        <div className="mt-auto">
                           <Button 
                                variant="ghost" 
                                className="w-full justify-start"
                                onClick={() => router.post('/logout')} 
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </Button>
                        </div>
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                type="search"
                                placeholder="Search..."
                                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                                />
                            </div>
                        </form>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <Avatar>
                                    <AvatarImage src="https://picsum.photos/seed/1/100/100" alt="User" />
                                    <AvatarFallback>OP</AvatarFallback>
                                </Avatar>
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            
                            <DropdownMenuItem asChild>
                                <Link href="/profile" className="cursor-pointer w-full flex items-center">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />
                            
                            <DropdownMenuItem asChild>
                                <Link 
                                    href="/logout" 
                                    method="post" 
                                    as="button" 
                                    className="cursor-pointer w-full flex items-center text-red-600 focus:text-red-600"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Logout</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex-1 p-4 md:p-8">{children}</main>
            </div>
        </div>
    );
}
