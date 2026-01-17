import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Link } from '@inertiajs/react'; 
import { AlertCircleIcon, Loader2, ChevronLeft, Save, FolderPlus, CircleXIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import InputError from "@/Components/InputError"; 
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function CreateCategory({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    function onSubmit(e) {
        e.preventDefault();
        post(route('dashboard.categories.store'));
    }

    return (
        <AuthenticatedLayout 
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-3xl flex items-center gap-2">
                        <FolderPlus className="text-blue-600 h-8 w-8" />
                        Tambah Kategori Baru
                    </CardTitle>
                    <CardDescription>
                        Buat kategori baru untuk mengelompokkan konten video atau artikel Anda.
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
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama Kategori</Label>
                                <Input 
                                    id="name"
                                    placeholder="Contoh: Web Development, Mobile Design, dsb."
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    autoFocus
                                />
                                <InputError message={errors.name} />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-4 border-t">
                            <Button 
                                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors"
                                type="button" 
                                variant="outline"
                                asChild
                            >
                                <Link href={route('dashboard.categories.index')}>
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