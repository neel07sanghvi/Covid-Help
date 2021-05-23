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

export { SignupAuthentication };