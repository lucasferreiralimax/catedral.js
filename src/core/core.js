export default class CatedralComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.debug = false; // Controle para habilitar logs de depuração
    }

    static get observedAttributes() {
        return []; // Subclasses podem definir atributos observados
    }

    connectedCallback() {
        this.log("🔄 Componente conectado ao DOM.");
        this.render();
    }

    disconnectedCallback() {
        this.log("🛑 Componente desconectado do DOM.");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.log(`⚙️ Atributo alterado: ${name} | De: ${oldValue} | Para: ${newValue}`);
            this.render();
        }
    }

    async render() {
        await this.beforeRender(); // Método opcional para lógica antes da renderização
        const templateContent = this.template();
        if (templateContent !== this.shadowRoot.innerHTML) {
            this.shadowRoot.innerHTML = templateContent;
            this.log("✨ Componente renderizado.");
        }
        await this.afterRender(); // Método opcional para lógica após a renderização
    }

    template() {
        return `<slot></slot>`; // Pode ser sobrescrito nas subclasses
    }

    async beforeRender() {
        // Método opcional para lógica antes da renderização
    }

    async afterRender() {
        // Método opcional para lógica após a renderização
    }

    log(message) {
        if (this.debug) {
            console.log(`[CatedralComponent]: ${message}`);
        }
    }
}

export { CatedralComponent };
