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

async function AddComment(content,authorId,postId){

    // console.log(content,authorId,postId)
    return fetch('http://localhost:7000/api/post/addComment',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content:content,
            authorId: authorId,
            postId:postId
        })
    }).then(res => res.json()).then(data => data).catch(err => false)   
}

export {GetPost , AddPost, AddComment};