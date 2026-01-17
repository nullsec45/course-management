<?php

namespace App\Http\Controllers;

use App\Models\Membership;
use App\Http\Requests\MembershipRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class MembershipController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $memberships = Membership::paginate(10);

        return Inertia::render('Dashboard/Memberships/Index', ['memberships' => $memberships]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Dashboard/Memberships/CreateMembership');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MembershipRequest $request)
    {
        DB::beginTransaction();

        try {
            $data = $request->validated();

            Membership::create($data);

            DB::commit();

            return redirect()->route('dashboard.memberships.index')->with('success', 'Membership berhasil dibuat.');
        } catch (\Throwable $err) {
            DB::rollBack();

            return back()->withInput()->withErrors(['error' => $err->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $membership = Membership::findOrFail($id);

        return Inertia::render('Dashboard/Memberships/Show', ['membership' => $membership]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $membership = Membership::findOrFail($id);

        return Inertia::render('Dashboard/Memberships/EditMembership', ['membership' => $membership]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(MembershipRequest $request, string $id)
    {
        DB::beginTransaction();

        try {
            $data = $request->validated();

            $membership = Membership::findOrFail($id);
            $membership->update($data);

            DB::commit();

            return redirect()->route('dashboard.memberships.index')->with('success', 'Membership berhasil diubah.');
        } catch (\Throwable $err) {
            DB::rollBack();

            return back()->withInput()->withErrors(['error' => $err->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        DB::beginTransaction();

        try {
            $membership = Membership::findOrFail($id);

            $membership->delete();

            DB::commit();

            return redirect()->route('dashboard.memberships.index')->with('success', 'Membership berhasil dihapus.');
        } catch (\Throwable $err) {
            DB::rollBack();

            return back()->withInput()->withErrors(['error' => $err->getMessage()]);
        }
    }
}
