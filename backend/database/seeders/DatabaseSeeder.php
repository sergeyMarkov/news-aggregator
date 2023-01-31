<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('addresses')->truncate();
        DB::table('users')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        \App\Models\User::factory()->create([
            'id' => '97d224d7-7df2-4aa6-b116-3deef04c175b',
            'name' => 'Test User',
            'email' => 'sergey@example.com',
            'password' => bcrypt('password')
        ]);

        \App\Models\User::factory()->create([
            'id' => '97d224d7-7df2-4aa6-b116-3deef0411111',
            'name' => 'User with no addresses',
            'email' => 'norecord@example.com',
            'password' => bcrypt('password')
        ]);
    }
}
