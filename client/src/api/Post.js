async function GetPost(){

    
    return fetch('http://localhost:7000/api/post/list').then(res => res.json()).then(data => {
        return data;
    }).catch(err => {
        return false;
    })
}
async function AddPost(description,country,state,city,userId){

    
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
            userId: userId
        })
    }).then(res => res.json()).then(data => {
        return data;
    }).catch(err => {
        return false;
    })
}

async function AddComment(content,authorId,postId){
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

async function EditPost(country, city, caption, state,id){
    return fetch(`http://localhost:7000/api/post/edit/${id}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            country: country,
            city: city,
            state: state,
            caption: caption
        })
    }).then(res => res.json()).then(data => data).catch(err => ({state: false, message: "Some Error Occured"}))  
}
async function DeletePost(id){
    return fetch(`http://localhost:7000/api/post/delete/${id}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => res.json()).then(data => data).catch(err => ({state: false, message: "Some Error Occured"}))  
}

export {GetPost , AddPost, AddComment, EditPost, DeletePost};