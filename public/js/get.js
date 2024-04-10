const title = document.querySelector('#title')
const body = document.querySelector('#slug')
const btn = document.querySelector('#btn-category')

console.log(title,body)

let post = require('/models/post')

        post.all().then((posts)=>{
        console.log(posts)
        })

module.exports = {
        title,
        body
    }
