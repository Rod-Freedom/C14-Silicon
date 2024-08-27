import { UserObj } from "./utils/dataObjs.js";
import { promptErr } from "./utils/errorMsg.js";

const optLogin = document.querySelector('#log-title');
const optSignup = document.querySelector('#sign-title');
const loginSecc = document.querySelector('#login-input');
const signupSecc = document.querySelector('#signup-input');
const loginDiv = document.querySelector('#login-div');
const signupDiv = document.querySelector('#signup-div');

const loginFunc = async (body, signup) => {
    const route = signup ? '/api/users' : '/api/users/login';

    try {
        const res = await fetch(route, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) setTimeout(() => document.location.replace('/'), 500)
        else throw new Error(res)

    } catch (err) {
        return promptErr('Incorrect email or password.\nPlease try again!');
    }
};

const submitUser = (e) => {
    const userLogin = document.querySelector('#log-user');
    const passLogin = document.querySelector('#log-pass');
    const userSignup = document.querySelector('#sign-user');
    const passSignup = document.querySelector('#sign-pass');
    const { target: { id } } = e;

    
    if (id === 'btn-login') {
        if (!passLogin.value) return promptErr('You\'re missing\nthe password!')
        if (!userLogin.value) return promptErr('You\'re missing\nthe username!')

        const data = new UserObj(userLogin.value, passLogin.value);
        return loginFunc(data, false);
        
    } else {
        if (!passSignup.value) return promptErr('You\'re missing\nthe password!')
        if (!userSignup.value) return promptErr('You\'re missing\nthe username!')
        
        const data = new UserObj(userSignup.value, passSignup.value);
        return loginFunc(data, true);
    }
};

const openLoginSignup = ({ target }) => {
    if (target === optLogin) {
        loginSecc.style.display = 'flex';
        signupSecc.style.display = 'none';
    } else if (target === optSignup) {
        signupSecc.style.display = 'flex';
        loginSecc.style.display = 'none';
    } else if (!loginDiv.contains(target) && !signupDiv.contains(target)) {
        signupSecc.style.display = 'none';
        loginSecc.style.display = 'none';
    }
};

const startLogin = () => {
    if (document.location.pathname !== '/login') return

    const btnLogin = document.querySelector('#btn-login');
    const btnSignup = document.querySelector('#btn-signup');

    document.addEventListener('click', openLoginSignup);
    btnLogin.addEventListener('click', submitUser);
    btnSignup.addEventListener('click', submitUser);
};

window.onload = startLogin();