import axios from 'axios';


// const handleSubmit = () => {
//     const access_token = localStorage.getItem('access')
//     const data = new FormData();
//     data.append('week', id)
//     data.append('question', question);
//     axios.post("http://127.0.0.1:8000/api/admin/Question", data, { headers: { "Authorization": `Bearer  ${access_token}` } }).then((res) => {
//         setAlertMessage(res.data.message);
//         handleClose()
//         setOpenalert(true);
//     })
// }


let BASE_URL ='http://127.0.0.1:8000/'



export const registerSubmit = (formdata) => {
    return new Promise(async (resolve, reject) => {
        await axios.post(BASE_URL+'register', formdata).then((data) => {
            console.log(data.data,'data')
            resolve(data.data)
        })
    })
}

export const loginSubmit=(formdata)=>{
    return new Promise(async (resolve, reject) => {
        await axios.post(BASE_URL+'login', formdata).then((data) => {
            console.log(data.data,'data')
            resolve(data.data)
        })
    })
}