const logoutFunc = async () => {
    const route = '/api/users/logout';

    try {
        const res = await fetch(route, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
        
        if (!res.ok) throw new Error(res)
        else document.location.replace('/login')

    } catch (err) {
        return promptErr('Incorrect email or password.\nPlease try again!');
    }
};

const startLogic = () => {
    if (document.location.pathname === '/login') return

    const btnLogout = document.querySelector('#btn-logout');
   
    btnLogout.addEventListener('click', logoutFunc);
};

window.onload = startLogic();