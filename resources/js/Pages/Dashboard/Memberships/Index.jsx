import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash, Plus, FileText } from "lucide-react";
import { useEffect } from "react";
import Swal from 'sweetalert2'; 

export default function Index({ auth, memberships }) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: flash.success,
                timer: 3000,
                showConfirmButton: false
            });
        }
        if (flash.error) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: flash.error,
                timer: 3000,
                showConfirmButton: false
            });
        }
    }, [flash]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard - Membership</h2>}
        >
            <Head title="Dashboard - Membership" />

            <div>
                <div className="mb-8">
                    <h1 className="text-4xl font-bold font-headline text-slate-900">List Tipe Membership</h1>
                    <p className="text-muted-foreground">Kelola paket langganan untuk pengguna.</p>
                </div>
                
                <Button className="mb-5 bg-blue-600 hover:bg-blue-700 text-white" asChild>
                    <Link href="/dashboard/memberships/create">
                        <Plus className="mr-2 h-4 w-4" /> Tambah Tipe Membership
                    </Link>
                </Button>

                <Card className="shadow-sm border-slate-200">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-slate-50">
                                <TableRow>
                                    <TableHead>Tipe Paket</TableHead>
                                    <TableHead>Harga</TableHead>
                                    <TableHead>Limit Konten</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {memberships.data && memberships.data.length > 0 ? (
                                    memberships.data.map((item) => (
                                        <TableRow key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                            <TableCell className="font-medium text-slate-900">
                                                {item.name}
                                            </TableCell>
                                            <TableCell className="font-medium text-slate-700">
                                                Rp {new Intl.NumberFormat('id-ID').format(item.price)}
                                            </TableCell>
                                            <TableCell className="text-sm text-slate-600">
                                                {item.article_limit ?? 'Unlimited'} Artikel / {item.video_limit ?? 'Unlimited'} Video
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                   <Button 
                                                        size="sm" 
                                                        asChild 
                                                        className="h-8 bg-blue-600 text-white hover:bg-blue-700 border-none shadow-sm transition-colors"
                                                    >
                                                        <Link href={`/dashboard/memberships/${item.id}/edit`}>
                                                            <Pencil className="w-3.5 h-3.5 mr-2" />
                                                            Edit
                                                        </Link>
                                                    </Button>

                                                    <Button variant="destructive" size="sm" asChild className="h-8 text-white">
                                                        <Link 
                                                            href={`/dashboard/memberships/${item.id}`} 
                                                            method="delete" 
                                                            as="button"
                                                            preserveScroll
                                                            onBefore={() => confirm('Apakah Anda yakin ingin menghapus membership ini?')}
                                                        >
                                                            <Trash className="w-3.5 h-3.5 mr-2" />
                                                            Delete
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-64 text-center">
                                            <div className="flex flex-col items-center justify-center text-slate-500">
                                                <FileText className="w-10 h-10 mb-2 opacity-20" />
                                                <p>Belum ada data membership.</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <div className="mt-8">
                    <div className="flex flex-wrap justify-center gap-2">
                        {memberships.links.map((link, index) => {
                            const label = link.label
                                .replace('&laquo; Previous', 'Sebelumnya')
                                .replace('Next &raquo;', 'Selanjutnya');

                            return link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    preserveScroll
                                    className={`
                                        flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-all
                                        ${link.active 
                                            ? 'bg-blue-600 text-white shadow-md' 
                                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300'}
                                    `}
                                >
                                    <span dangerouslySetInnerHTML={{ __html: label }} />
                                </Link>
                            ) : (
                                <span
                                    key={index}
                                    className="flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md opacity-50 cursor-not-allowed border border-slate-200 bg-white text-slate-400"
                                    dangerouslySetInnerHTML={{ __html: label }}
                                />
                            );
                        })}
                    </div>
                    
                    <div className="text-center mt-4 text-xs text-slate-400">
                        Menampilkan {memberships.from || 0} sampai {memberships.to || 0} dari {memberships.total} data
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}