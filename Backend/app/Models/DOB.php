<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DOB extends Model
{
    use HasFactory;
    protected $table = "birth_date";
    protected $primaryKey = 'student_id';
    protected $fillable = ['birth_date', 'student_id'];

    public function student()
    {
        //  return $this->belongsTo(User::class, 'foreign_key', 'owner_key');
        return $this->belongsTo(Student::class, 'student_id', 'id');
    }
}
