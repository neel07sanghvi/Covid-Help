async function GetPost(){

    
    return fetch('http://localhost:7000/api/post/list').then(res => res.json()).then(data => {
        return data;
    }).catch(err => {
        return false;
    })
}
async function AddPost(description,country,state,city){

    
    return fetch('http://localhost:7000/api/post/insert',{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            caption: description,
            country: country,
            state: state,
            city: city,
        })
    }).then(res => res.json()).then(data => {
        return data;
    }).catch(err => {
        return false;
    })
}

export {GetPost , AddPost};