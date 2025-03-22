import { CatedralComponent } from "../core/core.js";
import hubStore from "../stores/hub.store.js";

export default class CatedralButton extends CatedralComponent {
  static get observedAttributes() {
    return ["label"];
  }

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this); // Garantindo o contexto correto
    this.state = { count: 0 }; // Estado inicial padrão
  }

  async connectedCallback() {
    super.connectedCallback();
    console.log("🔄 Conectando componente CatedralButton...");

    this.addEventListener("click", this.handleClick); // Adicionando o ouvinte de clique

    // Carrega o estado inicial do store
    await this.loadInitialState();

    // Subscrição para escutar alterações no store global
    hubStore.globalStoreLocal.subscribe("count", (newState) => {
      console.log("🔔 Subscrição ativa para a chave 'count':", newState);
      this.updateState(newState);
    });
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick); // Removendo o ouvinte ao desconectar
    console.log("🛑 Event listener removido do botão.");
  }

  async loadInitialState() {
    const globalState = hubStore.globalStoreLocal.getState();
    console.log("📥 Estado inicial recuperado do hubStore:", globalState);

    // Atualiza o estado local com o valor do store, se existir
    this.state = { count: globalState?.count || 0 };
    console.log("📥 Estado inicial do componente:", this.state);

    this.render(); // Renderiza o componente com o estado inicial
  }

  updateState(newCount) {
    if (this.state.count !== newCount) {
      this.state = { count: newCount };
      console.log("🔄 Estado do componente atualizado:", this.state);
      this.render(); // Re-renderiza o componente apenas se o estado mudar
    }
  }

  handleClick() {
    console.log("🖱️ Botão clicado!");

    // Atualiza o estado no store
    const newCount = this.state.count + 1;
    console.log("✍️ Atualizando estado no store para:", newCount);
    hubStore.globalStoreLocal.setState("count", newCount);

    // Emitindo um evento customizado
    this.dispatchEvent(
      new CustomEvent("buttonClicked", {
        detail: { message: "O botão foi clicado!", count: newCount },
        bubbles: true,
        composed: true,
      })
    );
  }

  template() {
    return `
      <style>
        button {
          background: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          border-radius: 5px;
          transition: background 0.3s ease;
          margin-bottom: 1rem;
        }
        button:hover {
          background: #0056b3;
        }
        button:active {
          background: #003f7f;
        }
      </style>
      <button>
        ${this.getAttribute("label") || "Clique aqui"}
      </button>
    `;
  }
}

customElements.define("catedral-button", CatedralButton);
