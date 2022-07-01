const sections = document.querySelectorAll('.section');
const navigationLinks = document.querySelectorAll('.nav-link');

export const hideAll = () => {
    [...sections].forEach(s => s.style.display = 'none');
    console.log(sections);
}

export const navAction = (user) => {
    if(user) {
        navigationLinks[2].style.display = 'none';
        navigationLinks[3].style.display = 'none';
        navigationLinks[1],style.display = 'block';
    } else {
        navigationLinks[2].style.display = 'block';
        navigationLinks[3].style.display = 'block';
        navigationLinks[1].style.display = 'none';
    }
} 

export const userStorige = () => {
    let user = sessionStorage.getItem('user');

    return user;
}