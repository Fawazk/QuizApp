import axios from 'axios';



let BASE_URL = 'http://127.0.0.1:8000/'
const token = localStorage.getItem('token');

export const setAxiosAuthToken =()=> {
    if (typeof token !== "undefined" && token) {
      // Apply for every request
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
      // Delete auth header
      delete axios.defaults.headers.common["Authorization"];
    }
  };


export const registerSubmit = (formdata) => {
    return new Promise(async (resolve, reject) => {
        await axios.post(BASE_URL + 'register', formdata).then((data) => {
            console.log(data.data, 'data')
            resolve(data.data)
        })
    })
}

export const loginSubmit = (formdata) => {
    return new Promise(async (resolve, reject) => {
        await axios.post(BASE_URL + 'login', formdata).then((data) => {
            console.log(data.data, 'data')
            resolve(data.data)
        })
    })
}


export const getQuestion = (number) => {
    
    setAxiosAuthToken()
    console.log(number)
    return new Promise(async (resolve, reject) => {
        await axios.get(BASE_URL + 'question-answer/' + number
        , {
            headers: {
                'Authorization': token
            }
        }
        ).then((data) => {
            console.log(data.data, 'data')
            resolve(data.data)
        })
    })
}



export const sendEmail = (markData) => {
    setAxiosAuthToken()
    return new Promise(async (resolve, reject) => {
        await axios.get(BASE_URL + 'send-email?mark='+markData.mark+'&totalQuestions='+markData.totalQuestions,
        {
            headers: {
                'Authorization': token
            }
        }
        )
    })
}