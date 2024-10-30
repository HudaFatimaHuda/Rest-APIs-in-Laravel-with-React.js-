<div class="container mb-5 mx-auto">
    <!-- <div>
        <h1 class="text-center">LARAVEL + MySQL CRUD Practice</h1>
        <p class="text-center text-secondary">Create, read, update, and delete records below</p>
    </div> -->
    @if(Route::current()->getName() == 'users.index')
    <div class="text-end col-lg-8 col-md-10 mx-auto">
        <a class="btn btn-primary" href="{{ route('users.create') }}"> Create User</a>
    </div>
    @endif

    @if ($message = Session::get('success'))
    <div class="alert alert-success my-4">
        <p>{{ $message }}</p>
    </div>
    @endif
    <div class="col-lg-8 col-md-10 mx-auto">
        <table class="table table-stripped table-hover table-responsive ">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th>Date of Birth</th>
                    <th scope="col">name</th>
                    <th scope="col">Score</th>
                    @if(Route::current()->getName() == 'users.index')<th></th><th></th>@endif
                </tr>
            </thead>
            <tbody>
                @if($users != null)
                @foreach ($users as $user)
                <tr>
                    <td>{{$user->id}}</td>
                    <td>{{$user->birth_date}}</td>
                    <td>{{$user->name}}</td>
                    <td>{{$user->score}}</td>
                    @if(Route::current()->getName() == 'users.index')
                    <td>
                        <a class="btn btn-primary" href="{{ route('users.edit',$user->id) }}">Update</a>
                    </td>
                    <td>
                        <form action="{{ route('users.destroy',$user->id) }}" method="Post">
                            @csrf
                            <!-- alternative to @csrf -->
                            <!-- <input type="hidden" name="_token" value="{{ csrf_token() }}"> -->
                            @method('DELETE')
                            <!-- alternative -->
                            <!-- <input type="hidden" name="_method" value="delete" /> -->
                            <!-- This blade directive is used to override the form submission method.
                            By default, HTML forms can only submit data using GET or POST methods.
                            Since we want to delete a record, which is not idempotent and should not
                            be done via a GET request, we use the DELETE method.
                            However, HTML forms don't support the DELETE method directly,
                            so Laravel's method spoofing feature allows us
                            to "fake" a DELETE request by including a hidden input field  -->
                            <input type="submit" class="btn btn-danger" value="Delete" style="background-color: red"/>
                        </form>
                    </td>
                    @endif
                </tr>
                @endforeach
                @else
                <tr class='text-center pt-1'>
                    <td colspan='5' class='text-danger'>No data found</td>
                </tr>
                @endif
            </tbody>
        </table>

    </div>

</div>
