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
import { Pencil, Trash, Plus, UserCircle, BadgeCheck, CircleXIcon } from "lucide-react";
import { useEffect } from "react";
import Swal from 'sweetalert2'; 

export default function Index({ auth, users }) {
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Pengguna</h2>}
        >
            <Head title="List Pengguna" />

            <div className="py-2">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-900">List Pengguna</h1>
                    <p className="text-slate-500 mt-1">Kelola data akun, peran, dan status membership pengguna.</p>
                </div>
                
                <div className="flex justify-between items-center mb-6">
                    <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                        <Link href={route('dashboard.users.create')}>
                            <Plus className="mr-2 h-4 w-4" /> Tambah Pengguna
                        </Link>
                    </Button>
                </div>

                <Card className="shadow-sm border-slate-200 overflow-hidden">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-slate-50">
                                <TableRow>
                                    <TableHead>Pengguna</TableHead>
                                    <TableHead>Peran</TableHead>
                                    <TableHead>Status Membership</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.data.length > 0 ? (
                                    users.data.map((item, index) => (
                                        <TableRow key={item.id} className="hover:bg-slate-50/50">
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-900">{item.name}</span>
                                                    <span className="text-xs text-slate-500">{item.email}</span>
                                                </div>
                                            </TableCell>
                                           <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                    item.role === 'Admin' 
                                                        ? 'bg-green-100 text-green-700' 
                                                        : item.role === 'Author'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : item.role === 'Membership'
                                                        ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' // Emas
                                                        : 'bg-slate-100 text-slate-700'
                                                }`}>
                                                    {item.role}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                {item.membership && item.role == 'Membership' ? (
                                                    <div className="flex items-center gap-1.5 text-blue-600 font-semibold text-sm">
                                                        <BadgeCheck className="w-4 h-4" />
                                                        {item.membership.name}
                                                    </div>
                                                ) : (
                                                     <div className="flex items-center gap-1.5 text-red-600 font-semibold text-sm">
                                                        <CircleXIcon className="w-4 h-4" />
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button 
                                                        size="sm" 
                                                        asChild
                                                        disabled={item.role == 'Membership' || item.role == 'Non Membership'}
                                                        className="h-8 bg-blue-600 text-white hover:bg-blue-700 border-none shadow-sm transition-colors disabled:pointer-events-none disabled:opacity-50"
                                                    >
                                                        <Link 
                                                            href={`/dashboard/users/${item.id}/edit`}
                                                            as="button"
                                                        >
                                                            <Pencil className="w-3.5 h-3.5 mr-2" />
                                                            Edit
                                                        </Link>
                                                    </Button>
                                                    <Button 
                                                        variant="destructive" 
                                                        size="sm" 
                                                        asChild
                                                        disabled={item.id === auth.user.id}
                                                        className="h-8 text-white"
                                                    >
                                                        <Link 
                                                            href={route('dashboard.users.destroy', item.id)} 
                                                            method="delete" 
                                                            as="button"
                                                            onBefore={() => confirm('Apakah Anda yakin ingin menghapus pengguna ini?')}
                                                        >
                                                            <Trash className="w-3.5 h-3.5 mr-1" /> Hapus
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-40 text-center text-slate-400">
                                            <UserCircle className="mx-auto h-8 w-8 opacity-20 mb-2" />
                                            Belum ada data pengguna.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <div className="mt-8 flex flex-col items-center">
                    <div className="flex flex-wrap justify-center gap-2">
                        {users.links.map((link, index) => (
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    preserveScroll
                                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                                        link.active 
                                            ? 'bg-blue-600 text-white shadow-md' 
                                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300'
                                    }`}
                                    dangerouslySetInnerHTML={{ 
                                        __html: link.label
                                            .replace('&laquo; Previous', 'Sebelumnya')
                                            .replace('Next &raquo;', 'Selanjutnya') 
                                    }}
                                />
                            ) : (
                                <span
                                    key={index}
                                    className="px-4 py-2 text-sm font-medium rounded-md opacity-40 border border-slate-100 text-slate-300 cursor-not-allowed"
                                    dangerouslySetInnerHTML={{ 
                                        __html: link.label
                                            .replace('&laquo; Previous', 'Sebelumnya')
                                            .replace('Next &raquo;', 'Selanjutnya') 
                                    }}
                                />
                            )
                        ))}
                    </div>
                    <p className="mt-4 text-xs text-slate-400">
                        Menampilkan {users.from || 0} sampai {users.to || 0} dari {users.total} pengguna
                    </p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}