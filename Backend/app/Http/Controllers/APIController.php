<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\API\CreateUserAPIRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;
use App\Models\Student;
use App\Models\DOB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class APIController extends Controller
{
// chunk() is more suitable when dealing with large datasets
// since it retrieves records in smaller batches, preventing memory issues.
// eg we have 100 records. chunk() will retrieve/load 10 records at a time
// and it will return 100 records at once.

// On the other hand, paginate() is more suitable when dealing with smaller datasets
// since it retrieves all records in a single query.
// it retrieve 10 records per page. we need to perform 10 queries to get all results.
// it will always only load 10 records in memory and return them.

// the chunk() and paginate() methods in Laravel provide different approaches for
// retrieving and processing large amounts of data from your database.
// The chunk() method is best used when you need to process the data in batches,
// while the paginate() method is best used when you need to display the data in a paginated view

    public function index(){
        $userId = Auth::id();
        if($userId){
            $students = Student::where('user_id', $userId, )->with('dob')->get();
            return response()->json(['message' => 'Records found successfully!', 'data' => $students], 200);
        }
        else{
            return response()->json(['message' => 'Unauthenticated user'], 404);
        }
    }

    public function store(CreateUserAPIRequest $request){
        $userId = Auth::id();

        $params = $request->validated(); //it will validate and will return the data as an array
        // $params = $request->toArray(); // no need to this anymore

        $params['user_id'] = $userId;
        $student = Student::create($params);
        $dob = DOB::create([
            'student_id' => $student->id,
            'birth_date' => $params['dob']
        ]);

        $students = Student::where('user_id', $userId, )->with('dob')->get();
        return response()->json(['message' => 'Record created Successfully!', 'data' => $students], 200);
    }

    public function show($id){
        $student = Student::with('dob')->find($id);
        if(empty($student)){
            return response()->json(['message' => 'Record found!'], 200);
        }else{
            return response()->json(['message' => 'Record not found!', 'data' => $student], 404);
        }
    }

    public function update(CreateUserAPIRequest $request, $id){
        $student = Student::find($id);
        if($student){
            // Student::where('id', $id)->update(['name'=> $request->name])
            // can be done directly with params as we have done with save function
            // it will update only the column that has been provided in the input data
            // we can pass only one parameter in the request
            $request->validated();
            $student->name = is_null($request->name) ? $student->name : $request->name;
            $student->score = is_null($request->score) ? $student->score : $request->score;
            $student->save();

            $dob = DOB::where('student_id', $id)->first();
            if ($dob) {
                $dob->birth_date = is_null($request->dob) ? $dob->birth_date : $request->dob;
                $dob->save();
            }
            $userId = Auth::id();
            $students = Student::where('user_id', $userId, )->with('dob')->get();
            return response()->json(['message' => 'Record updated Successfully!', 'data' => $students], 200);
        }
        return response()->json(['message' => 'Record not found!'], 404);
    }

    public function destroy($id){
        $student = Student::find($id);
        if($student){
            $dob = DOB::where('student_id', $id)->first();
            if ($dob) {
                $dob->delete();
            }
            // Delete the student record
            $student->delete();
            $userId = Auth::id();
            $students = Student::where('user_id', $userId, )->with('dob')->get();
            return response()->json(['message' => 'Record deleted Successfully!', 'data' => $students], 200);
        }
        else{
            return response()->json(['message' => 'Record not found!'], 404);
        }
    }

}
