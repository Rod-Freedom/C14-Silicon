export const promptErr = (msg) => {
    const errDiv = document.querySelector('#err-prompt');
    const h1 = document.querySelector('#err-msg');

    h1.innerText = msg;
    errDiv.style.display = 'flex';
    
    setTimeout(() => {
        errDiv.style.display = 'none';
        h1.innerText = '';
    }, 3000);
};