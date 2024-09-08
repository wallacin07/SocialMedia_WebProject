const changeTheme = () => {
    const body = document.querySelector(`body`);

    if(localStorage.getItem(`theme`) === undefined) {
        return
    }
    
    body.className = localStorage.getItem(`theme`);
}
try {
    const theme = document.getElementById(`theme`)
    
    theme.addEventListener(`click`, () => {
        if(!localStorage.getItem(`theme`)) {
            localStorage.setItem(`theme`, `dark`);
            changeTheme();
            return
        }
        localStorage.setItem(`theme`, localStorage.getItem(`theme`) === `dark` ? `` : `dark`);
        changeTheme();
    });
} catch {}

changeTheme();