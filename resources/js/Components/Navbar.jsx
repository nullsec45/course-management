import { Link, usePage } from '@inertiajs/react'; 
import { LayoutDashboardIcon, LogIn, UserPlus, CreditCard, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const { auth } = usePage().props;

  return (
   <header className="bg-card border-b sticky top-0 z-50 shadow-sm backdrop-blur-md bg-white/95">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group">
            <img 
                src="https://www.astronacci.com/images/2019/logo-navbar-header.png" 
                alt="Astronacci" 
                className="h-10 group-hover:opacity-80 transition-opacity" 
            />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 flex items-center gap-1 transition-colors">
              <Home className="w-4 h-4" />
              Beranda
            </Link>
            <Link href="/membership" className="text-sm font-medium text-slate-600 hover:text-blue-600 flex items-center gap-1 transition-colors">
              <CreditCard className="w-4 h-4" />
              Pricing
            </Link>
            
            <div className="h-6 w-[1px] bg-slate-200 mx-2"></div>

            <div className="flex items-center gap-2">
              {auth.user ? (
                /* Jika Sudah Login: Tampilkan Tombol Dashboard */
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/dashboard">
                    <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
              ) : (
                /* Jika Belum Login: Tampilkan Login & Register */
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/login">
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </Link>
                  </Button>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-100">
                    <Link href="/register">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Daftar Sekarang
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Trigger (Opsional - Bisa ditambahkan sheet/drawer nantinya) */}
          <div className="md:hidden">
            <Button variant="outline" size="icon">
               <span className="sr-only">Open Menu</span>
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}