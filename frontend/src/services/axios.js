import Axios from "axios";


export const getToken = () =>{
    return localStorage.getItem("token")
}

export const setToken = (token) =>{
    localStorage.setItem("token",token)
}

export const axiosInstance = Axios.create({ 
    // baseURL: "https://tumira-cash-backend.herokuapp.com/",
    // baseURL: "http://localhost:5000/",
    // baseURL: "https://tumira-cash-backend.onrender.com/",
    baseURL: "https://tumira-cash.herokuapp.com/",
    headers: {
        'Authorization': `Bearer `+ getToken(),
        // "Access-Control-Allow-Origin": "*"
    }
 });

 export const cashaxiosInstance = Axios.create({ 
    // baseURL: "https://tumira-cash-backend.herokuapp.com/",
    // baseURL: "http://localhost:5000/",
    // baseURL: "https://tumira-cash-backend.onrender.com/",
    baseURL: "https://tumira-cash.herokuapp.com/",

    headers: {
        'Authorization': `Bearer `+ getToken(),
        // "Access-Control-Allow-Origin": "*"
    }
 });

 export const smsInstance = Axios.create({ 
    // baseURL: "https://tumira-cash-backend.herokuapp.com/",
    // baseURL: "http://localhost:5000/",
    // baseURL: "https://tumira-cash-backend.onrender.com/",
    baseURL: "https://tumira-cash.herokuapp.com/",


 });


//  export const smsInstance = Axios.create({ 
//     baseURL: "https://mobile.esolutions.co.zw/bmg/",

//         auth: {
//           username: 'FANSETAPI',
//           password: 'duXxDXpg'
//         }
//  });


