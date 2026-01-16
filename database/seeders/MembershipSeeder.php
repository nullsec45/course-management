<?php

namespace Database\Seeders;

use App\Models\Membership;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MembershipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {
        $memberships = [
            [
                'name' => 'Bronze',
                'description' => 'Bronze membership package with limited access',
                'price' => 9.99,
                'article_limit' => 3,
                'video_limit' => 3,
            ],
            [
                'name' => 'Gold',
                'description' => 'Gold membership package with standard access',
                'price' => 29.99,
                'article_limit' => 10,
                'video_limit' => 10,
            ],
            [
                'name' => 'Platinum',
                'description' => 'Platinum membership package with unlimited access',
                'price' => 99.99,
                'article_limit' => NULL,
                'video_limit' => NULL,
            ],
        ];

        foreach ($memberships as $data) {
            // Ini memastikan jika nama sudah ada, dia cuma update, bukan bikin baru
            \App\Models\Membership::updateOrCreate(['name' => $data['name']], $data);
        }
    }
}
