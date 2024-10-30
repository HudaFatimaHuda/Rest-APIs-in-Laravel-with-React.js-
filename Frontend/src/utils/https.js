const https = async({token, url, method, body}) => {
    // const token = localStorage.getItem('token');
    if(token){
        // const url = `http://localhost:8000/api/users`;
        const response = await fetch(url, {
          method: method ? method : "GET",
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

export default https; 