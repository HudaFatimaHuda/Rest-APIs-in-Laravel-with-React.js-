<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;
    protected $table = 'students';
    protected $fillable = ['name', 'score', 'user_id'];
    public function dob()
    {
        // return $this->hasOne(DOB::class, 'foreign_key', 'local_key');
        return $this->hasOne(DOB::class, 'student_id', 'id');
    }
}
