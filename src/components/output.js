import { CatedralComponent } from "../core/core.js";
import hubStore from "../stores/hub.store.js"; // Importa o hubStore para acessar os stores

export default class CatedralOutput extends CatedralComponent {
  static get observedAttributes() {
    return ["store", "key", "encrypted"]; // Adiciona o atributo "encrypted"
  }

  constructor() {
    super();
    this.store = null;
    this.key = null;
    this.unsubscribe = null;
    this.initialValue = "Carregando..."; // Valor inicial armazenado
    this.encrypted = false; // Define o comportamento padrão como não criptografado
  }

  async beforeRender() {
    const componentName = "CatedralOutput"; // Nome do componente para logs

    // Obtém o store e a chave antes de renderizar
    const storeName = this.getAttribute("store");
    this.key = this.getAttribute("key");
    this.encrypted = this.getAttribute("data-encrypt") === "true";

    console.log("this.encrypted ", this.encrypted );

    if (!storeName || !this.key) {
      console.warn(`⚠️ [${componentName}] Store ou key não definidos.`);
      this.initialValue = "Erro: Store ou key não definidos.";
      return;
    }

    console.log(`🔍 [${componentName}] Inicializando com store: "${storeName}" e key: "${this.key}"`);

    // Obtém o store do hubStore
    this.store = hubStore[storeName];
    if (!this.store) {
      console.error(`❌ [${componentName}] Store "${storeName}" não encontrado no hubStore.`);
      this.initialValue = "Erro: Store não encontrado.";
      return;
    }

    // Inicializa o IndexedDB, se necessário
    if (this.store.storageType === "indexedDB" && typeof this.store.initDB === "function") {
      try {
        console.log(`⚙️ [${componentName}] Inicializando IndexedDB para store "${storeName}"...`);
        await this.store.initDB();
        console.log(`✅ [${componentName}] IndexedDB inicializado com sucesso.`);
      } catch (error) {
        console.error(`❌ [${componentName}] Erro ao inicializar o IndexedDB:`, error);
        this.initialValue = "Erro ao inicializar o banco de dados.";
        return;
      }
    }

    // Atualiza o valor inicial
    try {
      console.log(`🔍 [${componentName}] Obtendo estado inicial do store "${storeName}"...`);
      const state = await this.store.getState();

      // Loga o estado completo retornado
      console.log(`📋 [${componentName}] Estado retornado:`, state);

      if (state && this.key in state) {
        console.log(`✅ [${componentName}] Chave "${this.key}" encontrada no estado. Valor:`, state[this.key]);
        this.initialValue =  this.encrypted ? this.generateBulletString(state[this.key]) : state[this.key];
      } else {
        console.warn(`⚠️ [${componentName}] Chave "${this.key}" não encontrada no estado. Estado atual:`, state);
        this.initialValue = "Nenhum valor salvo";
      }
    } catch (error) {
      console.error(`❌ [${componentName}] Erro ao obter o estado inicial do store:`, error);
      this.initialValue = "Erro ao carregar";
    }

    // Subscrição para mudanças no estado
    this.unsubscribe = this.store.subscribe((newState) => {
      console.log(`🔔 [${componentName}] Subscrição ativa para mudanças no estado.`);
      if (newState && this.key in newState) {
        console.log(`✅ [${componentName}] Chave "${this.key}" encontrada no novo estado. Valor:`, newState[this.key]);
        this.updateValue(this.encrypted ? this.generateBulletString(newState[this.key]) : newState[this.key]); // Atualiza com a string com bullets ou o valor normal
      } else {
        console.warn(`⚠️ [${componentName}] Chave "${this.key}" não encontrada no novo estado. Estado atual:`, newState);
        this.updateValue("Nenhum valor salvo");
      }
    });
  }

  generateBulletString(value) {
    // Gera uma string com bullets (•) com base no comprimento do valor
    if (typeof value !== "string") return "✸✸✸✸✸"; // Valor padrão caso não seja uma string
    return "✸".repeat(value.length);
  }

  disconnectedCallback() {
    const componentName = "CatedralOutput"; // Nome do componente para logs
    // Remove a subscrição ao desconectar o componente
    if (this.unsubscribe) {
      console.log(`🔌 [${componentName}] Removendo subscrição.`);
      this.unsubscribe();
    }
  }

  updateValue(value) {
    const componentName = "CatedralOutput"; // Nome do componente para logs
    // Verifica se o shadowRoot e o elemento <p> existem
    if (!this.shadowRoot) {
      console.error(`❌ [${componentName}] shadowRoot não encontrado.`);
      return;
    }

    const outputElement = this.shadowRoot.querySelector("p");
    if (outputElement) {
      console.log(`✏️ [${componentName}] Atualizando valor para: "${value}"`);
      outputElement.textContent = value || "Nenhum valor salvo";
    } else {
      console.error(`❌ [${componentName}] Elemento <p> não encontrado no shadowRoot.`);
    }
  }

  template() {
    return `
      <style>
        p {
          font-size: 1rem;
          color: #333;
          background-color:#ddd;
          padding: 7px 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin: 5px 0 1rem;
        }
      </style>
      <p>${this.initialValue || "Nenhum valor salvo"}</p>
    `;
  }
}

customElements.define("catedral-output", CatedralOutput);