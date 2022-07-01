import { addMovie } from "./api-calls.js";
import { showHome } from "./home.js";
import { isUser, hideAll } from "./util.js";


const createPage = document.querySelector('#add-movie');
const form = createPage.querySelector('form');

export const showCreate = () => {
    createPage.style.display = 'block';
}

form.addEventListener('submit', async e => {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);

    let [title, description, img] = [...formData.values()];

    if(title == '' || description == '' || img == '') {
        return alert('Empty input');
    }

    const data = await addMovie({title, description, img}, isUser().accessToken);

    showHome();
})
