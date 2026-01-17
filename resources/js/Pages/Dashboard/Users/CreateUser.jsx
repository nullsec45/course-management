import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Link } from '@inertiajs/react'; 
import { AlertCircleIcon, Loader2, Save, UserPlus, CircleXIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from "@/Components/InputError"; 
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function CreateUser({ auth, memberships }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        role: '',
        membership_id: '',
    });

    function onSubmit(e) {
        e.preventDefault();
        post(route('dashboard.users.store'));
    }

    return (
        <AuthenticatedLayout 
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-3xl flex items-center gap-2">
                        <UserPlus className="text-blue-600 h-8 w-8" />
                        Tambah Pengguna Baru
                    </CardTitle>
                    <CardDescription>
                        Daftarkan pengguna baru dan tentukan peran serta paket membership mereka.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {errors.error && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertCircleIcon className="h-4 w-4" />
                            <AlertTitle>Gagal Menyimpan</AlertTitle>
                            <AlertDescription>{errors.error}</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={onSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama Lengkap</Label>
                                <Input 
                                    id="name"
                                    placeholder="Masukkan nama lengkap"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Alamat Email</Label>
                                <Input 
                                    id="email"
                                    type="email"
                                    placeholder="email@example.com"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input 
                                    id="password"
                                    type="password"
                                    placeholder="Min. 8 Karakter"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="space-y-2">
                                <Label>Peran (Role)</Label>
                                <Select onValueChange={(val) => setData('role', val)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Admin">Admin</SelectItem>
                                        <SelectItem value="Author">Author</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.role} />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-4 border-t">
                            <Button 
                                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors"
                                type="button" 
                                variant="outline"
                                asChild
                            >
                                <Link href={route('dashboard.users.index')}>
                                    <CircleXIcon className="mr-2 h-4 w-4" /> Batal
                                </Link>
                            </Button>

                            <Button 
                                type="submit" 
                                disabled={processing} 
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                            >
                                {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                Simpan
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}