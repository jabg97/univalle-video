<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->text('bio')->nullable();
            $table->string('banner', 200)->nullable();
            $table->string('profile', 200)->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        
        Schema::create('user_sub', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->unsigned();
        
            $table->unsignedBigInteger('sub_id')->unsigned();
        
            $table->foreign('user_id')->references('id')->on('users');
        
            $table->foreign('sub_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('user_sub');
    }
}
