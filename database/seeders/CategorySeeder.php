<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Technical Analysis', 'slug' => 'technical-analysis'],
            ['name' => 'Fundamental Analysis', 'slug' => 'fundamental-analysis'],
            ['name' => 'Trading Strategies', 'slug' => 'trading-strategies'],
            ['name' => 'Risk Management', 'slug' => 'risk-management'],
            ['name' => 'Market Psychology', 'slug' => 'market-psychology'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
