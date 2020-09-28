<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserSub extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'user_sub';

    /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = ['user_id','sub_id'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [];

    protected $dates = [];
}
