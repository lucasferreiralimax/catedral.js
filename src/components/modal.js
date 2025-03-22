import { CatedralComponent } from "../core/core.js";
import hubStore from "../stores/hub.store.js";

export default class CatedralModal extends CatedralComponent {
  static get observedAttributes() {
    return ["title", "id", "open-label"];
  }

  constructor() {
    super();
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleOpenClick = this.handleOpenClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleConfirmClick = this.handleConfirmClick.bind(this);
    this.state = { show: false };
  }

  async connectedCallback() {
    super.connectedCallback();
    console.log("🔄 Conectando componente CatedralModal...");

    this.modalId = this.getAttribute("id");

    // **Chamar render antes de buscar os elementos**
    await this.render();

    // **Esperar pelo shadowRoot antes de buscar elementos**
    requestAnimationFrame(() => {
      this.overlay = this.shadowRoot.querySelector(".catedral-modal__container");
      this.closeButton = this.shadowRoot.querySelector(".close-button");
      this.openButton = this.shadowRoot.querySelector(".open-button");
      this.cancelButton = this.shadowRoot.querySelector(".cancel-button");
      this.confirmButton = this.shadowRoot.querySelector(".confirm-button");

      console.log("🔍 Elementos encontrados:");
      console.log("overlay:", this.overlay);
      console.log("closeButton:", this.closeButton);
      console.log("openButton:", this.openButton);
      console.log("cancelButton:", this.cancelButton);
      console.log("confirmButton:", this.confirmButton);

      if (this.overlay) {
        this.overlay.addEventListener("click", this.handleOverlayClick);
        console.log("✅ Listener adicionado: Overlay click");
      } else {
        console.error("❌ Erro: overlay não encontrado");
      }

      if (this.closeButton) {
        this.closeButton.addEventListener("click", this.handleCloseClick);
        console.log("✅ Listener adicionado: Close button click");
      } else {
        console.error("❌ Erro: closeButton não encontrado");
      }

      if (this.openButton) {
        this.openButton.addEventListener("click", this.handleOpenClick);
        console.log("✅ Listener adicionado: Open button click");
      } else {
        console.error("❌ Erro: openButton não encontrado");
      }

      if (this.cancelButton) {
        this.cancelButton.addEventListener("click", this.handleCancelClick);
        console.log("✅ Listener adicionado: Cancel button click");
      } else {
        console.error("❌ Erro: cancelButton não encontrado");
      }

      if (this.confirmButton) {
        this.confirmButton.addEventListener("click", this.handleConfirmClick);
        console.log("✅ Listener adicionado: Confirm button click");
      } else {
        console.error("❌ Erro: confirmButton não encontrado");
      }

      this.loadInitialState();

      hubStore.globalStoreLocal.subscribe("show-" + this.modalId, (newState) => {
        console.log("🔔 Subscrição ativa para", this.modalId, ":", newState);
        this.updateState(newState);
      });
    });
  }

  disconnectedCallback() {
    if (this.overlay) this.overlay.removeEventListener("click", this.handleOverlayClick);
    if (this.closeButton) this.closeButton.removeEventListener("click", this.handleCloseClick);
    if (this.openButton) this.openButton.removeEventListener("click", this.handleOpenClick);
    if (this.cancelButton) this.cancelButton.removeEventListener("click", this.handleCancelClick);
    if (this.confirmButton) this.confirmButton.removeEventListener("click", this.handleConfirmClick);

    console.log("🛑 Event listeners removidos.");
  }

  async loadInitialState() {
    const globalState = hubStore.globalStoreLocal.getState();
    const initialShowState = globalState?.["show-" + this.modalId] || false;
    this.updateState(initialShowState);
  }

  updateState(show) {
    this.state.show = show;
    if (this.overlay) {
      this.overlay.classList.toggle("active", show);
    }
    console.log("🔄 Estado do componente atualizado:", this.state);
  }

  handleOverlayClick(event) {
    console.log("🖱️ Click detectado no overlay");
    if (event.target === this.overlay) {
      this.toggleModal();
    }
  }

  handleCloseClick() {
    console.log("❌ Botão de fechar clicado");
    this.toggleModal();
  }

  handleOpenClick() {
    console.log("📂 Botão de abrir clicado");
    this.toggleModal();
  }

  handleCancelClick() {
    console.log("❌ Botão de cancelar clicado");
    this.toggleModal();
    this.dispatchEvent(new CustomEvent("cancel", { bubbles: true, composed: true }));
  }

  handleConfirmClick() {
    console.log("✅ Botão de confirmar clicado");
    this.toggleModal();
    this.dispatchEvent(new CustomEvent("confirm", { bubbles: true, composed: true }));
  }

  toggleModal() {
    const newShowState = !this.state.show;
    console.log("✍️ Atualizando estado no store para:", newShowState);
    hubStore.globalStoreLocal.setState("show-" + this.modalId, newShowState);

    this.dispatchEvent(
      new CustomEvent("modalToggled", {
        detail: { id: this.modalId, show: newShowState },
        bubbles: true,
        composed: true,
      })
    );
  }

  template() {
    return `
      <style>
        .catedral-modal__container {
          position: fixed;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          z-index: 111;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0,0,0, .5);
          backdrop-filter: grayscale(1) blur(6px);
          opacity: 0;
          transition: .3s opacity;
          pointer-events: none;
        }
        .catedral-modal__container.active {
          opacity: 1;
          pointer-events: all;
        }
        .catedral-modal {
          border-radius: 6px;
          padding: 1rem;
          background: #fff;
          position: relative;
          width: 90%;
          max-width: 600px;
        }
        .catedral-modal h1 {
          margin: 0;
        }
        .content {
          padding: 1rem 0;
        }
        .close-button, .open-button, .cancel-button, .confirm-button {
          background: #00a12e;
          color: white;
          border: none;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          border-radius: 5px;
          transition: background 0.3s ease;
        }
        .cancel-button,
        .close-button:hover,
        .close-button:active,
        .cancel-button:active {
          background: red;
          color: white;
        }
        .open-button {
          width: 100%;
        }
        .open-button:active, .confirm-button:active {
          background: #015d1b;
        }
        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: transparent;
          color: #333;
          font-size: 24px;
          border: none;
          cursor: pointer;
        }
        .close-button:focus {
          outline: 3px solid red;
        }
        footer {
          display: flex;
          justify-content: flex-end;
        }
        footer button {
          margin-right: 10px;
        }
      </style>
      <div class="catedral-modal__container" role="dialog" aria-labelledby="modal-title" aria-hidden="true">
        <section class="catedral-modal">
          <header>
            <slot name="header">
              <button class="close-button" aria-label="Fechar modal">&times;</button>
              <h1 id="modal-title">${this.getAttribute("title")}</h1>
            </slot>
          </header>
          <div class="content">
            <slot></slot>
          </div>
          <footer>
            <slot name="footer">
              <button class="cancel-button">Cancelar</button>
              <button class="confirm-button">Confirmar</button>
            </slot>
          </footer>
        </section>
      </div>
      <button class="open-button">${this.getAttribute("open-label") || "Abrir modal"}</button>
    `;
  }
}

customElements.define("catedral-modal", CatedralModal);
