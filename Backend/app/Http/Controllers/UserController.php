<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;
use App\Models\Student;
use App\Models\DOB;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller{

    public function index()
    {
        $id = Auth::id();

        // $users = DB::select('SELECT users.name, users.score, users.id, birth_date.birth_date FROM users LEFT JOIN birth_date ON users.id=birth_date.user_id;');
        $users = DB::table('students')
                    ->join('birth_date', 'students.id', '=', 'birth_date.student_id')
                    ->select('students.name', 'students.score', 'students.id', 'birth_date.birth_date')
                    ->where('user_id', '=', "$id")
                    ->get();
        // $users = Student::with('birth_date')->where('user_id', $id)->get();
        // return $users;
        return view('dashboard', ['users' => $users]);

    }


    public function create()
    {
        return view('users.create');
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'score' => 'required',
            'dob' => 'required',
        ]);

        // DB::insert('insert into students (name, score, user_id) values (?, ?, ?)', [$request->input('name'), $request->input('score'), $request->input('user_id')]);
        DB::table('students')->insert(['name' => $request->input('name'), 'score' =>$request->input('score'), 'user_id' => $request->input('user_id')]);
        // $id = DB::getPdo()->lastInsertId();
        // DB::insert('insert into birth_date (user_id, birth_date) values (?, ?)', [$id, $request->input('dob')]);
        DB::table('birth_date')->insert(['birth_date' => $request->input('dob'), 'student_id'=>DB::getPdo()->lastInsertId()]);

        // User::create($request->post());
        return redirect()->route('users.index')->with('success','Student has been created successfully.');
    }


    // public function show(User $User)
    // {
    //     return view('users.show',compact('User'));
    // }


    public function edit(Student $user)
    {
        $user->load('dob');
        return view('users.edit', compact('user'));
        // compact function will return the data into an array
        // here it is getting data from binding and sending it to the
        // view by converting it an array
        // return $dob;
    }


    public function update(Request $request, Student $User)
    {
        // $User->fill($request->post())->save();
        // return redirect()->route('users.index')->with('success','Company Has Been updated successfully');

        $request->validate([
            'name' => 'required',
            'score' => 'required',
            'dob' => 'required',
        ]);

        $id = $request->input('id');
        // $user = User::find($id);

        // $user->name = $request->input('name');
        // $user->score = $request->input('score');

        // $user->save();
        // DB::update('update birth_date set birth_date = (?) where user_id = (?)', [$request->input('dob'), $id, ]);

        DB::table('students')
            ->where('id', "$id")
            ->update(
                ['name' => $request->input('name'),
                'score' =>$request->input('score')
            ]);

        DB::table('birth_date')
            ->where('student_id', "$id")
            ->update([
                'birth_date' => $request->input('dob')
            ]);

        return redirect()->route('users.index')->with('success','User has been updated successfully');
    }

    public function destroy(Student $User)
    //Laravel uses route model binding here, which automatically injects
    // the appropriate User model instance based on the route parameter.
    {
        $User->delete();
        // laravel has performed user model binding
        // $User is the instance of user from db where id is the given id
        return redirect()->route('users.index')->with('success','User has been deleted successfully');
    }

}
