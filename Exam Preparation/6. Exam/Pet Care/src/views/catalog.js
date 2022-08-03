import { html, until } from "../lib.js";

const catalogTemplate = () => html`
 
`;

export const catalogPage = (ctx) => {
  ctx.render(catalogTemplate());
};
