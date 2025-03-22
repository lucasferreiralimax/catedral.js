import { CatedralComponent } from "../core/core.js";

export default class CatedralButton extends CatedralComponent {
  static get observedAttributes() {
    return [
      "label",
      "variant",
      "size",
      "type",
      "disabled",
      "appearance",
      "color",
      "background",
      "border",
      "radius",
      "width",
      "height",
      "full", // Para largura total
    ];
  }

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    console.log("🔄 Conectando componente CatedralButton...");
    this.addEventListener("click", this.handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick);
    console.log("🛑 Event listener removido do botão.");
  }

  handleClick(event) {
    if (this.hasAttribute("disabled")) {
      console.log("⚠️ Botão desabilitado, clique ignorado.");
      event.preventDefault();
      return;
    }

    console.log("🖱️ Botão clicado!");

    // Emitindo um evento customizado
    this.dispatchEvent(
      new CustomEvent("buttonClicked", {
        detail: { message: "O botão foi clicado!" },
        bubbles: true,
        composed: true,
      })
    );
  }

  template() {
    const label = this.getAttribute("label") || "Clique aqui";
    const variant = this.getAttribute("variant") || "primary";
    const size = this.getAttribute("size") || "medium";
    const type = this.getAttribute("type") || "button";
    const appearance = this.getAttribute("appearance") || "filled";
    const radius = this.getAttribute("radius") || "medium";
    const width = this.getAttribute("width") || (this.hasAttribute("full") ? "100%" : "auto");
    const height = this.getAttribute("height") || "auto";
    const disabled = this.hasAttribute("disabled") ? "disabled" : "";

    // Estilos predefinidos para variantes
    const variants = {
      primary: { background: "#007bff", color: "#ffffff", border: "#007bff" },
      secondary: { background: "#6c757d", color: "#ffffff", border: "#6c757d" },
      success: { background: "#28a745", color: "#ffffff", border: "#28a745" },
      danger: { background: "#dc3545", color: "#ffffff", border: "#dc3545" },
      warning: { background: "#ffc107", color: "#212529", border: "#ffc107" },
      info: { background: "#17a2b8", color: "#ffffff", border: "#17a2b8" },
      light: { background: "#f8f9fa", color: "#212529", border: "#ced4da" },
      dark: { background: "#343a40", color: "#ffffff", border: "#343a40" },
    };

    const { background: defaultBackground, color: defaultColor, border: defaultBorder } =
      variants[variant] || variants.primary;

    // Permitir sobrescrita de estilos via atributos
    const background = this.getAttribute("background") || defaultBackground;
    const color = this.getAttribute("color") || (appearance === "outlined" ? defaultBorder : defaultColor);
    const border = this.getAttribute("border") || `2px solid ${defaultBorder}`;

    // Estilos dinâmicos para tamanhos
    const padding = {
      small: "5px 10px",
      medium: "10px 20px",
      large: "15px 30px",
    }[size] || "10px 20px";

    const fontSize = {
      small: "14px",
      medium: "16px",
      large: "18px",
    }[size] || "16px";

    // Estilos dinâmicos para bordas
    const borderRadius = {
      small: "5px",
      medium: "10px",
      large: "15px",
      round: "50px",
    }[radius] || "10px";

    // Estilo baseado no tipo (filled ou outlined)
    const buttonStyles =
      appearance === "outlined"
        ? `background: transparent; color: ${color}; border: ${border};`
        : `background: ${background}; color: ${color}; border: none;`;

    return `
      <style>
        button {
          ${buttonStyles}
          padding: ${padding};
          font-size: ${fontSize};
          cursor: ${disabled ? "not-allowed" : "pointer"};
          border-radius: ${borderRadius};
          transition: background 0.3s ease, color 0.3s ease, border 0.3s ease;
          opacity: ${disabled ? "0.6" : "1"};
          width: ${width};
          height: ${height};
        }
        ${!disabled ? `
        button:hover {
          background: ${
            appearance === "outlined"
              ? this.darkenColor(defaultBorder, 10)
              : this.darkenColor(background, 10)
          };
          color: ${appearance === "outlined" ? "#ffffff" : color};
        }
        button:active {
          background: ${
            appearance === "outlined"
              ? this.darkenColor(defaultBorder, 20)
              : this.darkenColor(background, 20)
          };
        }
        ` : ""}
      </style>
      <button
        type="${type}"
        ${disabled}
        aria-label="${label}"
        role="button"
        tabindex="${disabled ? -1 : 0}"
      >
        ${label}
      </button>
    `;
  }

  // Função para escurecer a cor no hover e active
  darkenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = ((num >> 8) & 0x00ff) - amt;
    const B = (num & 0x0000ff) - amt;
    return `#${(0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255))
      .toString(16)
      .slice(1)}`;
  }
}

customElements.define("catedral-button", CatedralButton);