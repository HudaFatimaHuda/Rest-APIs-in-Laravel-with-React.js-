import Login from "../Components/Auth/Login";
import { redirect } from "react-router-dom";

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;

export async function action({ request, params }) {
  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const url = "http://localhost:8000/api/login";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  const responseData = await response.json();
  // console.log("response");
  // console.log(responseData);


  if (!response.ok) {
    // console.log(response)
    return responseData;
  }

  else if (responseData.status === 1) {

  const token = responseData.token;
  const name = responseData.user.name;
  const id = responseData.user.id;

  localStorage.setItem("token", token);
  localStorage.setItem("name", name);
  localStorage.setItem("id", id);
  // const expiration = new Date();
  // expiration.setHours(expiration.getHours() + 1);
  // localStorage.setItem("expiration", expiration.toISOString());
  //handling the data token
  return redirect("/");
}

}
