import CatedralInputValidator from "./input.validator.js";
import hubStore from "../stores/hub.store.js";

export default class CatedralInputLocalSession extends CatedralInputValidator {
  static get observedAttributes() {
    return ["id", "placeholder", "label", "type", "data-encrypt", "data-store", "required", "minlength", "maxlength", "pattern"];
  }

  constructor() {
    super();
    this.state = {}; // Estado inicial vazio
    this.debounceTimeout = null;

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async beforeRender() {
    const componentName = "CatedralInputLocalSession"; // Nome do componente para logs
    console.log(`🔄 [${componentName}] Preparando para renderizar o componente Local/Session...`);
    await this.initStore(); // Inicializa a store e carrega o estado
  }

  async afterRender() {
    const componentName = "CatedralInputLocalSession"; // Nome do componente para logs
    console.log(`✨ [${componentName}] Componente Local/Session renderizado. Inicializando listeners...`);
    this.initializeListeners();
    this.subscribeToStore();
    this.updateInputValue(); // Atualiza o valor do input após a renderização
  }

  async initStore() {
    const componentName = "CatedralInputLocalSession"; // Nome do componente para logs
    const useEncryptedStore = this.getAttribute("data-encrypt") === "true";
    const storeType = this.getAttribute("data-store") || "local";

    // Seleciona o store com base no tipo e se está criptografado
    this.store = useEncryptedStore
      ? {
          local: hubStore.globalStoreLocalEncrypt,
          session: hubStore.globalStoreSessionEncrypt,
        }[storeType]
      : {
          local: hubStore.globalStoreLocal,
          session: hubStore.globalStoreSession,
        }[storeType];

    // Gera a chave dinâmica com base no ID do input
    this.storeKey = this.generateStoreKey(this.getAttribute("id"));

    console.log(`📦 [${componentName}] Store inicializado: ${storeType}, Criptografado: ${useEncryptedStore}, Chave: ${this.storeKey}`);
    await this.loadStateFromStore();
  }

  async loadStateFromStore() {
    const componentName = "CatedralInputLocalSession"; // Nome do componente para logs
    try {
      console.log(`📂 [${componentName}] Carregando estado do Local/Session Storage para a chave: ${this.storeKey}...`);
      const globalState = await this.store.getState(this.storeKey); // Recupera o estado usando a chave dinâmica
      console.log(`✅ [${componentName}] Estado carregado do Local/Session Storage (${this.storeKey}):`, globalState);

      this.state = { [this.storeKey]: globalState || "" };
      this.updateInputValue(); // Atualiza o input com o estado carregado
    } catch (error) {
      console.error(`❌ [${componentName}] Erro ao carregar estado do Local/Session Storage (${this.storeKey}):`, error);
    }
  }

  initializeListeners() {
    const componentName = "CatedralInputLocalSession"; // Nome do componente para logs
    const inputElement = this.shadowRoot?.querySelector("input");

    if (inputElement) {
      inputElement.addEventListener("input", this.handleInputChange);
      console.log(`🎧 [${componentName}] Listener de input inicializado.`);
    } else {
      console.warn(`⚠️ [${componentName}] Elemento input não encontrado.`);
    }
  }

  subscribeToStore() {
    const componentName = "CatedralInputLocalSession"; // Nome do componente para logs
    this.store.subscribe((newState) => {
      console.log(`🔄 [${componentName}] Subscrição ativa para Local/Session Storage (${this.storeKey}):`, newState);
      this.state = { ...this.state, [this.storeKey]: newState?.[this.storeKey] || "" };
      this.updateInputValue(); // Atualiza o input com o novo estado
    });
  }

  handleInputChange() {
    const componentName = "CatedralInputLocalSession"; // Nome do componente para logs
    const inputElement = this.shadowRoot.querySelector("input");
    const newValue = inputElement?.value || "";
    const messageError = this.shadowRoot.querySelector(".message-error");

    // Validação do valor
    const validation = this.validateInput(newValue);
    if (!validation.valid) {
      console.warn(`⚠️ [${componentName}] Validação falhou: ${validation.message}`);
      // inputElement.setCustomValidity(validation.message);
      // inputElement.reportValidity();
      inputElement.classList.add("error");
      messageError.innerHTML = validation.message;
      messageError.classList.add("active");
    } else {
      messageError.classList.remove("active");
      inputElement.classList.remove("error");
      // inputElement.setCustomValidity(""); // Limpa mensagens de erro se válido
    }

    clearTimeout(this.debounceTimeout);

    this.debounceTimeout = setTimeout(() => {
      console.log(`✍️ [${componentName}] Atualizando estado no Local/Session Storage (${this.storeKey}):`, newValue);
      this.store.setState({ [this.storeKey]: newValue }); // Salva o estado usando a chave dinâmica
    }, 300);
  }

  updateInputValue() {
    const componentName = "CatedralInputLocalSession"; // Nome do componente para logs
    const inputElement = this.shadowRoot.querySelector("input");
    if (inputElement) {
      inputElement.value = this.state?.[this.storeKey] || "";
      console.log(`🔄 [${componentName}] Input atualizado com valor do Local/Session Storage (${this.storeKey}):`, this.state?.[this.storeKey]);
    }
  }

  generateStoreKey(id) {
    const componentName = "CatedralInputLocalSession"; // Nome do componente para logs
    // Converte o ID para camelCase
    const key = id
      .replace(/-([a-z])/g, (match, letter) => letter.toUpperCase()) // Converte para camelCase
      .replace(/[^a-zA-Z0-9]/g, ""); // Remove caracteres inválidos
    console.log(`🔑 [${componentName}] Chave gerada para o ID "${id}": ${key}`);
    return key;
  }

  template() {
    return `
      <style>
        input {
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 5px;
          width: 100%;
          box-sizing: border-box;
          margin-bottom: .5rem;
        }
        input:focus {
          border-color: #007bff;
        }
        input.error {
          border-color: #f00;
        }
        .message-error {
          font-size: 12px;
          padding: 5px 10px;
          border: 1px solid #f00;
          background: #ffe1e1;
          border-radius: 5px;
          margin: 0;
          position: absolute;
          bottom: -30px;
          left: 10px;
          opacity: 0;
          transition: .3s opacity;
        }
        .message-error.active {
          opacity: 1;
        }
        .message-error::before {
          content: "";
          position: absolute;
          top: -11px;
          left: 15px;
          border-width: 5px;
          border-style: solid;
          border-color: transparent transparent #f00 transparent;
        }
        .message-error::after {
          content: "";
          position: absolute;
          top: -10px;
          left: 15px;
          border-width: 5px;
          border-style: solid;
          border-color: transparent transparent #ffe1e1 transparent;
        }
        label {
          position: relative;
          display: block;
        }
        p {
          margin: 0;
        }
      </style>
      <label for="${this.getAttribute("id")}">
        ${this.getAttribute("label") ? `<p>${this.getAttribute("label")}</p>` : ``}
        <input 
          id="${this.getAttribute("id")}" 
          type="${this.getAttribute("type") || "text"}" 
          placeholder="${this.getAttribute("placeholder") || "Digite algo..."}"
          minlength="${this.getAttribute("minlength") || ""}"
          maxlength="${this.getAttribute("maxlength") || ""}"
          pattern="${this.getAttribute("pattern") || ""}"
          ${this.getAttribute("required") !== null ? "required" : ""}
        />
        <p class="message-error"></p>
      </label>
    `;
  }
}

customElements.define("catedral-input-local-session", CatedralInputLocalSession);