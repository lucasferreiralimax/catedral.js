import { CatedralComponent } from "../core/core.js";

export default class CatedralTabs extends CatedralComponent {
  static get observedAttributes() {
    return ["active-tab"]; // Observa o atributo para a aba ativa
  }

  constructor() {
    super();
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  handleTabClick(event) {
    const clickedTab = event.target;
    const tabId = clickedTab.getAttribute("data-tab");

    if (tabId) {
      this.setAttribute("active-tab", tabId); // Atualiza a aba ativa
    }
  }

  template() {
    const activeTab = this.getAttribute("active-tab") || "1"; // Aba ativa padrão
    const tabs = Array.from(this.querySelectorAll("[slot^='tab-']"));
    const panels = Array.from(this.querySelectorAll("[slot^='panel-']"));

    return `
      <style>
        .tabs {
          display: flex;
          border-bottom: 2px solid #ccc;
        }
        .tab {
          padding: 10px 20px;
          cursor: pointer;
          border: none;
          background: none;
          font-size: 16px;
          border-bottom: 2px solid transparent;
          transition: border-color 0.3s ease;
        }
        .tab.active {
          border-bottom: 2px solid #007bff;
          font-weight: bold;
        }
        .tab:hover {
          border-bottom: 2px solid #007bff;
        }
        .panels {
          background: #fff;
          padding: 20px;
          border: 1px solid #ccc;
          border-top: none;
        }
        .panel {
          display: none;
        }
        .panel.active {
          display: block;
        }
      </style>
      <div class="tabs">
        ${tabs
          .map(
            (tab, index) => `
          <button class="tab ${activeTab === `${index + 1}` ? "active" : ""}" data-tab="${index + 1}">
            ${tab.innerHTML}
          </button>
        `
          )
          .join("")}
      </div>
      <div class="panels">
        ${panels
          .map(
            (panel, index) => `
          <div class="panel ${activeTab === `${index + 1}` ? "active" : ""}">
            ${panel.innerHTML}
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }

  afterRender() {
    const tabs = this.shadowRoot.querySelectorAll(".tab");
    tabs.forEach((tab) => tab.addEventListener("click", this.handleTabClick));
  }

  disconnectedCallback() {
    const tabs = this.shadowRoot.querySelectorAll(".tab");
    tabs.forEach((tab) => tab.removeEventListener("click", this.handleTabClick));
  }
}

customElements.define("catedral-tabs", CatedralTabs);