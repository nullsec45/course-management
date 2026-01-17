import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    const handleOAuthRedirect = (provider) => {
        window.location.href = `/auth/${provider}`;
    };

    return (
        <GuestLayout>
            <Head title="Login" />

            <div className="flex items-center justify-center py-12">
                <Card className="mx-auto max-w-sm w-full">
                    <CardHeader className="text-center pb-4">
                        <div className="flex justify-center mb-6">
                            <img src="https://www.astronacci.com/images/2019/logo-navbar-header.png" alt="Astronacci" className="h-16" />
                        </div>
                        <CardTitle className="text-2xl font-headline">Login</CardTitle>
                        <CardDescription>
                            Masuk ke akun Anda untuk melanjutkan perjalanan trading
                        </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                        {status && (
                            <div className="mb-4 rounded-lg bg-green-50 p-4 text-sm font-medium text-green-700 border border-green-200">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="email@example.com"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        autoFocus
                                        autoComplete="email"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">Password</Label>
                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="text-xs font-semibold text-blue-600 hover:underline"
                                            >
                                                Lupa Password?
                                            </Link>
                                        )}
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Masukkan password Anda"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                        autoComplete="current-password"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                    />
                                    <label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                                        Ingat saya
                                    </label>
                                </div>

                                <Button type="submit" className="w-full" disabled={processing}>
                                    {processing ? 'Memproses...' : 'Login'}
                                </Button>
                            </div>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-slate-300"></span>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 text-slate-500">Atau login dengan</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => handleOAuthRedirect('google')}
                                    disabled={processing}
                                >
                                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                                        <path
                                            fill="#4285F4"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                    Google
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => handleOAuthRedirect('facebook')}
                                    disabled={processing}
                                >
                                   <svg className="h-5 w-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    Facebook
                                </Button>
                            </div>
                        </div>

                        <div className="mt-4 text-center text-sm">
                            Belum punya akun?{' '}
                            <Link href={route('register')} className="font-semibold text-blue-600 hover:underline">
                                Daftar di sini
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}
