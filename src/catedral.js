// Exporta todos os módulos da biblioteca Catedral

/**
 * @module Catedral
 * Biblioteca principal que fornece componentes e funcionalidades para manipulação de estado e UI.
 */

/**
 * Núcleo da biblioteca Catedral.
 * Contém a classe base para criação de componentes personalizados.
 * @see {@link ./core/core.js}
 */
export { default as CatedralCore } from './core/core.js';

/**
 * Sistema de gerenciamento de estado.
 * Permite criar e gerenciar estados reativos.
 * @see {@link ./core/store.js}
 */
export { default as Store } from './core/store.js';

/**
 * Componente de botão reutilizável.
 * Pode ser usado para interações baseadas em cliques.
 * @see {@link ./components/button.js}
 */
export { default as CatedralButton } from './components/button.js';

/**
 * Componente de input para IndexedDB.
 * Permite salvar e recuperar dados do IndexedDB.
 * @see {@link ./components/input.db.js}
 */
export { default as CatedralInputIndexedDB } from './components/input.db.js';

/**
 * Componente de input para LocalStorage e SessionStorage.
 * Permite salvar e recuperar dados de LocalStorage ou SessionStorage.
 * @see {@link ./components/input.local.js}
 */
export { default as CatedralInputLocalSession } from './components/input.local.js';

/**
 * Componente de output.
 * Exibe valores reativos baseados no estado do store.
 * @see {@link ./components/output.js}
 */
export { default as CatedralOutput } from './components/output.js';

/**
 * Componente de logo.
 * Exibe o logo da biblioteca Catedral.js.
 * @see {@link ./components/logo.js}
 */
export { default as CatedralLogo } from './components/logo.js';

/**
 * Componente de Modal.
 * Exibe um modal da biblioteca Catedral.js.
 * @see {@link ./components/modal.js}
 */
export { default as CatedralModal } from './components/modal.js';

/**
 * Hub central para gerenciamento de múltiplos stores.
 * Contém instâncias de stores para LocalStorage, SessionStorage e IndexedDB.
 * @see {@link ./stores/hub.store.js}
 */
export { default as hubStore } from './stores/hub.store.js';