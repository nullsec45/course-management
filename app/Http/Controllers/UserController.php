<?php

namespace App\Http\Controllers;


use App\Http\Requests\UserRequest;
use App\Models\User;
use App\Models\Membership;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('membership')->latest()->paginate(10);

        return Inertia::render('Dashboard/Users/Index', [
            'users' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $memberships = Membership::select('id', 'name')->get();

        return Inertia::render('Dashboard/Users/CreateUser', [
            'memberships' => $memberships
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'membership_id' => NULL,
        ]);

        return redirect()->route('dashboard.users.index')->with('message', 'User berhasil ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $user = User::findOrFail($id);
        $memberships = Membership::select('id', 'name')->get();

        return Inertia::render('Dashboard/Users/EditUser', [
            'user' => $user,
            'memberships' => $memberships
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, string $id)
    {
        $user = User::findOrFail($id);


        $updateData = [
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'membership_id' => $request->membership_id,
        ];

        if ($request->filled('password')) {
            $updateData['password'] = Hash::make($request->password);
        }

        $user->update($updateData);

        return redirect()->route('dashboard.users.index')->with('message', 'Data user berhasil diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);

        if ($user->id === Auth::user()->id) {
            return redirect()->back()->with('error', 'Anda tidak diperbolehkan menghapus akun yang sedang aktif.');
        }

        $user->delete();

        return redirect()->route('dashboard.users.index')->with('message', 'Data pengguna telah berhasil dihapus.');
    }
}
