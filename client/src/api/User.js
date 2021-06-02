import { BehaviorSubject } from 'rxjs';


let getUser = () => {
    let token = localStorage.getItem("UserToken") || null;
    if(token === null){
        return null;
    }
    else{
        let payload = JSON.parse(atob(token.split('.')[1]));
        return payload;
    }
} 

const currentUser = new BehaviorSubject(getUser());




async function SignupAuthentication(password,username,name,email,mobile) {
    return fetch('http://localhost:7000/api/user/register',{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            password: password,
            username: username,
            name: name,
            email: email,
            mobile: mobile,
        })
    }).then(res => res.json()).then(data => {
        return data;
    }).catch(err => {
        return false;
    })
}

async function login(usernameOREmail,password){
    return fetch('http://localhost:7000/api/user/login',{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            usernameOREmail: usernameOREmail,
            password: password
        })
    }).then(res => res.json()).then(data => {
        if(data.status){
            localStorage.setItem("UserToken",data.token);
            currentUser.next(getUser());
        }
        return {
            status: data.status,
            message: data.message
        }
    }).catch(err => ({
        status: false,
        message: "Something went wrong"
    }))
}

async function logout() {
    window.localStorage.removeItem("UserToken");
    currentUser.next(getUser());
}

export { SignupAuthentication, login, currentUser,logout };