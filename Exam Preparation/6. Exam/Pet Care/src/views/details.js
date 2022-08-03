import { html, until } from "../lib.js";

const detailsTemplate = () => html`
  <!--Details Page-->
  <section id="detailsPage">
    <div class="details">
      <div class="animalPic">
        <img src="./images/Shiba-Inu.png" />
      </div>
      <div>
        <div class="animalInfo">
          <h1>Name: Max</h1>
          <h3>Breed: Shiba Inu</h3>
          <h4>Age: 2 years</h4>
          <h4>Weight: 5kg</h4>
          <h4 class="donation">Donation: 0$</h4>
        </div>
        <!-- if there is no registered user, do not display div-->
        <div class="actionBtn">
          <!-- Only for registered user and creator of the pets-->
          <a href="#" class="edit">Edit</a>
          <a href="#" class="remove">Delete</a>
          <!--(Bonus Part) Only for no creator and user-->
          <a href="#" class="donate">Donate</a>
        </div>
      </div>
    </div>
  </section>
`;

export const detailsPage = (ctx) => {
  ctx.render(detailsTemplate());
};
