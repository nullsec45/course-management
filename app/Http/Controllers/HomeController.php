<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Membership;
use App\Http\Requests\CheckoutRequest;
use Illuminate\Support\Facades\Auth;
use Psy\ManualUpdater\Checker;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Home/Index');
    }

    public function membership()
    {
        $memberships = Membership::all();

        return Inertia::render('Home/ListMembership', ['memberships' => $memberships]);
    }

    public function checkoutPage($id)
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $membership = Membership::findOrFail($id);

        return Inertia::render('Home/Checkout', [
            'membership' => $membership
        ]);
    }

    public function processCheckout(CheckoutRequest $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->update([
            'membership_id' => $request->membership_id,
            'role' => 'Membership'
        ]);

        return redirect()->route('dashboard.index')->with('message', 'Pembayaran berhasil, selamat belajar!');
    }
}
