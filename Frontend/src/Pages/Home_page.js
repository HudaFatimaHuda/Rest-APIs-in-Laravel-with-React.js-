import Students from "../Components/Students/Students";


const HomePage = () => {
    return <Students/>
}

export default HomePage; 

export async function loader({request, params}){
    const token = localStorage.getItem('token');
    if(token){
        const url = `http://localhost:8000/api/users`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token,
          },
        });

        const responseData = await response.json();

        if (!response.ok) {
        //   throw new Error("Something went wrong!");
        return responseData
        }
        return responseData.data;
       }
       else{
        return('User should be logged in');
       }
}