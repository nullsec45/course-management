<?php

namespace Database\Seeders;

use App\Models\Membership;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = ['Admin', 'Author', 'Non Membership', 'Membership'];
        $memberships = Membership::pluck('id')->toArray();

        foreach ($roles as $role) {
            for ($i = 0; $i < 3; $i++) {
                $membershipId = null;
                
                // Hanya set membership_id jika role adalah 'Membership'
                if ($role === 'Membership' && !empty($memberships)) {
                    $membershipId = $memberships[array_rand($memberships)];
                }

                User::factory()->create([
                    'name' => "{$role} User " . ($i + 1),
                    'email' => strtolower("{$role}_user_" . ($i + 1) . "@example.com"),
                    'role' => $role,
                    'membership_id' => $membershipId,
                ]);
            }
        }

        // Create 1 more user to make it 13 total (3*4 + 1)
        User::factory()->create();
    }
}