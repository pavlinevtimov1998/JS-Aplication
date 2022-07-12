import { html } from "../lib.js";



const detailsTemplate = () => html`
<section id="movie-example" class="section">
    <div class="container">
        
    </div>
    </section>
`;

export function detailsPage(ctx) {
  ctx.render(detailsTemplate());
}