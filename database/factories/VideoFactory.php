<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Video>
 */
class VideoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence();

        return [
            'title' => $title,
            'description' => fake()->text(300),
            'slug' => Str::slug($title),
            'status' => fake()->randomElement(['draft', 'published', 'archived']),
            'author' => User::factory(),
            'category_id' => Category::inRandomOrder()->first()?->id,
        ];
    }

    /**
     * Indicate that the video should be published.
     */
    public function published(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'published',
        ]);
    }

    /**
     * Indicate that the video should be draft.
     */
    public function draft(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'draft',
        ]);
    }

    /**
     * Indicate that the video should be archived.
     */
    public function archived(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'archived',
        ]);
    }
}
