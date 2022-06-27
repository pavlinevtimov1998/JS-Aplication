export function updateNav(navigation) {
    let user = JSON.parse(sessionStorage.getItem("user"));
  
    if (user) {
      navigation.children[1].style.display = "inline";
      navigation.children[2].style.display = "none";
      navigation.querySelector(".email span").textContent = user.email;
    } else {
      navigation.children[1].style.display = "none";
      navigation.children[2].style.display = "inline";
      navigation.querySelector(".email span").textContent = "Guest";
    }
  }