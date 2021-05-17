async function GetPost(){

    
    return fetch('http://localhost:7000/api/post/list').then(res => res.json()).then(data => {
        return data;
    }).catch(err => {
        return false;
    })
}

export {GetPost}