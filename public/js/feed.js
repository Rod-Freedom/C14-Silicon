import { promptErr } from "./utils/errorMsg.js";
import { Meths } from "./utils/dataObjs.js";

const btnNewPost = document.querySelector('#new-post');
const newPostPrompt = document.querySelector('#new-post-prompt');

const sendLike = async (body) => {
    const route = '/api/likes';

    try {
        const res = await fetch(route, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) return true
        else throw new Error(res)

    } catch (err) {
        promptErr('Your session has expired\nPlease log in!');
        setTimeout(() => document.location.reload(), 2000);
    }
}

const likeFunc = async (e) => {
    const { target, target: { classList, dataset: { liked, postLike: post_id } } } = e;

    if (!classList.contains('btn-like')) return;
    
    try {
        const likeConfirm = await sendLike({ post_id });
        if (!likeConfirm) return;

        const postEl = document.querySelector(`[data-post='${post_id}']`);
        const likeCountEl = postEl.querySelector('.like-count');
        let likeCount = Number(likeCountEl.dataset.likes);


        if (liked === 'false') {
            target.classList.add('liked');
            target.dataset.liked = true;
            likeCount++;
            
        } else {
            target.classList.remove('liked');
            target.dataset.liked = false;
            likeCount--;
            
        }

        likeCountEl.innerText = Meths.binaryLikes(likeCount);
        likeCountEl.dataset.likes = likeCount;
        
    } catch (err) {
        console.log(err);
    }

}

const postFunc = async (body) => {
    const route = '/api/posts';

    try {
        const res = await fetch(route, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) throw new Error(res)
        document.location.reload()

    } catch (err) {
        promptErr('Your session has expired\nPlease log in!');
        setTimeout(() => document.location.reload(), 2000);
    }
}

const validateFunc = async () => {
    const title = document.querySelector('#post-title').value;
    const body = document.querySelector('#post-content').value;

    if (title === '') return promptErr('Add a title\nto your post!')
    if (body === '') return promptErr('You forgot\nto write something...')

    postFunc({title, body});
    newPostPrompt.style.display = 'none';
};

const closeNewPostPrompt = (e) => {
    const { target } = e;

    if (!newPostPrompt.contains(target)) {
        newPostPrompt.style.display = 'none';
        document.removeEventListener('click', closeNewPostPrompt);
        btnNewPost.addEventListener('click', openNewPostPrompt);
    }
};

const openNewPostPrompt = () => {
    newPostPrompt.style.removeProperty('display');
    newPostPrompt.style.display = 'flex';
    btnNewPost.removeEventListener('click', openNewPostPrompt);
    setTimeout(() => document.addEventListener('click', closeNewPostPrompt), 500)
};

const startFeed = () => {
    if (document.location.pathname === '/login') return

    const btnPost = document.querySelector('#btn-post');

    document.addEventListener('click', likeFunc);
    btnNewPost.addEventListener('click', openNewPostPrompt);
    btnPost.addEventListener('click', validateFunc);
};

window.onload = startFeed();