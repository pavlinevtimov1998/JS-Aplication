function attachEvents() {
  const postsUrl = "http://localhost:3030/jsonstore/blog/posts";
  const commentsUrl = "http://localhost:3030/jsonstore/blog/comments";

  const posts = document.getElementById("posts");
  const postDetails = document.getElementById("post-title");
  const postContent = document.getElementById("post-body");
  const postComments = document.getElementById("post-comments");

  document
    .getElementById("btnLoadPosts")
    .addEventListener("click", postsLoading);

  document.getElementById("btnViewPost").addEventListener("click", viewPost);

  async function postsLoading(e) {
    posts.innerHTML = "";

    const response = await fetch(postsUrl);
    const data = await response.json();

    for (let key in data) {
      const option = createElement("option");
      option.setAttribute("value", key);
      option.textContent = data[key].title;
      posts.append(option);
    }
  }

  async function viewPost(e) {
    postComments.innerHTML = "";

    let selected = [...posts.children].find((opt) => opt.selected == true);

    const res = await fetch(`${postsUrl}/${selected.value}`);
    const data = await res.json();

    const commentsRes = await fetch(commentsUrl);
    const commentsData = await commentsRes.json();

    postDetails.textContent = data.title;
    postContent.textContent = data.body;

    Object.values(commentsData).forEach((d) => {
      console.log(d);
      if (data.id === d.postId) {
        const liElement = createElement("li");
        liElement.textContent = d.text;
        postComments.append(liElement);
      }
    });
  }

  function createElement(el, text, className) {
    let element = document.createElement(el);

    if (text) {
      element.textContent = text;
    }

    if (className) {
      element.classList.add(className);
    }

    return element;
  }
}

attachEvents();
