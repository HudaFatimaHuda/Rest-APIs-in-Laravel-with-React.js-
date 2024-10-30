import SignUp from "../Components/Auth/Signup";
import { redirect } from "react-router-dom";

const SignUpPage = () => {
    return <SignUp/>
}

export default SignUpPage; 

export async function action({request,params}){
    const data = await request.formData();

    const url = "http://localhost:8000/api/register";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept: 'application/json',
      },
      body: data,
    });

    var responseData = await response.json();

    console.log(responseData)   


    if (!response.ok) {
      return responseData;
    }
  
    else if (responseData.status === 1) {
      const token = responseData.token;
      const name = responseData.user.name;
      const id = responseData.user.id;

      // console.log('data');
      // console.log(token); 
      // console.log(name); 
      // console.log(id); 
    
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      localStorage.setItem("id", id);
      return redirect("/");
    }
  }
