import { CatedralComponent } from "../core/core.js";

export default class CatedralInputValidator extends CatedralComponent {
  validateInput(value) {
    const validations = {
      required: this.getAttribute("required") !== null,
      minLength: parseInt(this.getAttribute("minlength"), 10) || null,
      maxLength: parseInt(this.getAttribute("maxlength"), 10) || null,
      pattern: this.getAttribute("pattern") || null,
      type: this.getAttribute("type") || "text",
    };

    // Validação de campo obrigatório
    if (validations.required && !value) {
      return { valid: false, message: "Este campo é obrigatório." };
    }

    // Validação de tamanho mínimo
    if (validations.minLength && value.length < validations.minLength) {
      return { valid: false, message: `O valor deve ter pelo menos ${validations.minLength} caracteres.` };
    }

    // Validação de tamanho máximo
    if (validations.maxLength && value.length > validations.maxLength) {
      return { valid: false, message: `O valor deve ter no máximo ${validations.maxLength} caracteres.` };
    }

    // Validação de email
    if (validations.type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return { valid: false, message: "Por favor, insira um email válido." };
      }
    }

    // Validação de regex personalizada
    if (validations.pattern) {
      const customRegex = new RegExp(validations.pattern);
      if (!customRegex.test(value)) {
        return { valid: false, message: "O valor não corresponde ao padrão esperado." };
      }
    }

    // Se todas as validações passarem
    return { valid: true, message: "" };
  }
}