import { CatedralComponent } from "../core/core.js";

class CatedralLogo extends CatedralComponent {
  constructor() {
    super();
  }

  template() {
    return `
      <style>
        h1 {
          font-family: "Licorice", cursive;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 5rem;
          margin: 0;
          font-weight: 400;
          color: #f00;
          flex-direction: column;
          user-select: none;
        }
        svg {
          fill: #000000;
          min-width: 77px;
          height: 77px;
          transform: translateY(30px);
        }
        .text-black {
          color: #000;
        }
        .text-red {
          color: #f00;
        }
      </style>
      <h1>
        <svg
          fill="#000000"
          width="33px"
          height="33px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 22v-4a2 2 0 0 1 4 0v4h4V12a1 1 0 0 0-.485-.857L13 8.434V6h2V4h-2V2h-2v2H9v2h2v2.434l-4.515 2.709A1 1 0 0 0 6 12v10h4zm-7 0h2v-8.118l-2.447 1.224A.998.998 0 0 0 2 16v5a1 1 0 0 0 1 1zm18.447-6.895L19 13.882V22h2a1 1 0 0 0 1-1v-5c0-.379-.214-.725-.553-.895z"
          />
        </svg>
        <span class="text-red">
          Catedral<span class="text-black">.</span>js
        </span>
      </h1>
    `;
  }
}

customElements.define("catedral-logo", CatedralLogo);

export default CatedralLogo;
