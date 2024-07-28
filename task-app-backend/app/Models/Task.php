<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Laravel\Sanctum\HasApiTokens;;

class Task extends Model
{
    use HasFactory , HasApiTokens;
    protected $fillable = [
        'userid',
        'title',
        'description',
        'level',
        'duedate'
    ];
    protected $casts = [
        'date'=>'date'
     ];

     public function user(){
        return $this->belongsTo(User::class);
     }
}
