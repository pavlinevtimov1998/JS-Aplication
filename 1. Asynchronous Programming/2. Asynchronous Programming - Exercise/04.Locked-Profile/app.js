function lockedProfile() {
  const main = document.getElementById("main");
  const profile = document.querySelector(".profile");
  profile.remove();

  const url = "http://localhost:3030/jsonstore/advanced/profiles";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      for (let key in data) {
        main.append(
          createProfile(
            data[key].username,
            data[key].email,
            data[key].age,
            data[key]._id
          )
        );
      }
    });

  function createProfile(name, email, age, id) {
    const divProfile = createElement("div", undefined, "profile");
    const img = createElement("img", undefined, "userIcon");
    img.setAttribute("src", "./iconProfile2.png");
    const label = createElement("label", "Lock");
    const inputLock = createElement("input");
    inputLock.setAttribute("type", "radio");
    inputLock.setAttribute("name", id);
    inputLock.setAttribute("value", "lock");
    inputLock.checked = true;
    const labelUnlock = createElement("label", "Unlock");
    const inputUnlock = createElement("input");
    inputUnlock.setAttribute("type", "radio");
    inputUnlock.setAttribute("name", id);
    inputUnlock.setAttribute("value", "unlock");
    const br = createElement("br");
    const hr = createElement("hr");
    const labelUsername = createElement("label", "Username");
    const inputUser = createElement("input");
    inputUser.setAttribute("type", "text");
    inputUser.setAttribute("name", id);
    inputUser.setAttribute("value", name);
    inputUser.disabled = true;
    inputUser.readOnly = true;
    const divHidden = createElement("div", undefined, "hiddenInfo");
    const hrHidden = createElement("hr");
    const labelEmail = createElement("label", "Email:");
    const inputEmail = createElement("input");
    inputEmail.setAttribute("type", "email");
    inputEmail.setAttribute("name", id);
    inputEmail.setAttribute("value", email);
    inputEmail.disabled = true;
    inputEmail.readOnly = true;
    const labelAge = createElement("label", "Age:");
    const inputAge = createElement("input");
    inputAge.setAttribute("type", "email");
    inputAge.setAttribute("name", id);
    inputAge.setAttribute("value", age);
    inputAge.disabled = true;
    inputAge.readOnly = true;
    const button = createElement("button", "Show more");
    button.addEventListener("click", showProfile);

    divHidden.append(hrHidden, labelEmail, inputEmail, labelAge, inputAge);
    divProfile.append(
      img,
      label,
      inputLock,
      labelUnlock,
      inputUnlock,
      br,
      hr,
      labelUsername,
      inputUser,
      divHidden,
      button
    );

    return divProfile;
  }

  function showProfile(e) {
    let lock = e.target.parentNode.querySelector('input[value="lock"]');
    let hiddenInfo = e.target.parentNode.children[9];
    console.log(hiddenInfo.classList.contains("hiddenInfo"));
    console.log(lock.checked);
    if (
      lock.checked == false &&
      hiddenInfo.classList.contains("hiddenInfo") == true
    ) {
      hiddenInfo.classList.remove("hiddenInfo");
    } else if (
      lock.checked == false &&
      hiddenInfo.classList.contains("hiddenInfo") == false
    ) {
      hiddenInfo.classList.add("hiddenInfo");
    }
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
