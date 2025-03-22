import CryptoJS from "crypto-js";

export default class Store {
  constructor(
    storageKey = "storeState",
    storageType = "localStorage",
    useEncryption = false,
    encryptionKey = "secret-key"
  ) {
    const fileName = "store.js"; // Nome do arquivo para logs
    this.storageKey = storageKey;
    this.storageType = storageType;
    this.useEncryption = useEncryption;

    // Usa navigator.userAgent como fallback se navigator.userAgentData não estiver disponível
    const platform = navigator.userAgentData?.platform || navigator.platform || "unknown";
    const deviceMemory = navigator.deviceMemory || "unknown";

    this.encryptionKey = `${encryptionKey}-${platform.toUpperCase()}-DEV-${deviceMemory}`;

    this.state = {}; // Estado inicial vazio
    this.listeners = {};
    this.db = null;

    console.log(
      `🛠️ [${fileName}] Inicializando Store com chave: "${storageKey}" : "${this.encryptionKey}"`
    );

    this.initState();
  }

  async initState() {
    const fileName = "store.js"; // Nome do arquivo para logs
    console.log(`📦 [${fileName}] Tipo de armazenamento: ${this.storageType}`);
    if (this.storageType === "indexedDB") {
      await this.initDB();
      await this.loadStateFromDB();
    } else {
      this.state = this.loadState() || {};
    }
    console.log(`✅ [${fileName}] Estado inicial carregado:`, this.state);
  }

  subscribe(keyOrListener, listener = null) {
    const fileName = "store.js"; // Nome do arquivo para logs
    const isGlobalListener =
      typeof keyOrListener === "function" && listener === null;

    if (isGlobalListener) {
      this.listeners["__global__"] = this.listeners["__global__"] || [];
      this.listeners["__global__"].push(keyOrListener);
      console.log(`🔔 [${fileName}] Subscrição ativa para o estado completo.`);
    } else if (typeof listener === "function") {
      const key = keyOrListener;
      this.listeners[key] = this.listeners[key] || [];
      this.listeners[key].push(listener);
      console.log(`🔔 [${fileName}] Subscrição ativa para a chave: "${key}"`);
    } else {
      console.error(`❌ [${fileName}] O listener fornecido não é uma função!`);
    }
  }

  notify(key) {
    const fileName = "store.js"; // Nome do arquivo para logs
    console.log(
      `📢 [${fileName}] Notificando alterações para a chave: "${key}"`
    );

    // Notificar listeners da chave específica
    if (this.listeners[key]) {
      this.listeners[key].forEach((listener) => {
        if (typeof listener === "function") {
          listener(this.state[key]);
        } else {
          console.error(
            `❌ [${fileName}] Listener para a chave "${key}" não é uma função!`
          );
        }
      });
    }

    // Notificar listeners globais
    if (this.listeners["__global__"]) {
      console.log(`📢 [${fileName}] Notificando listeners globais.`);
      this.listeners["__global__"].forEach((listener) => {
        if (typeof listener === "function") {
          listener(this.state);
        } else {
          console.error(`❌ [${fileName}] Listener global não é uma função!`);
        }
      });
    }
  }

  async setState(keyOrObject, value = null) {
    const fileName = "store.js"; // Nome do arquivo para logs
    console.log(`✍️ [${fileName}] Iniciando setState com:`, keyOrObject, value);

    if (typeof keyOrObject === "object") {
      Object.entries(keyOrObject).forEach(([key, val]) => {
        console.log(
          `🔑 [${fileName}] Atualizando chave: "${key}" com valor:`,
          val
        );
        this.state[key] = val;
      });
    } else {
      console.log(
        `🔑 [${fileName}] Atualizando chave: "${keyOrObject}" com valor:`,
        value
      );
      this.state[keyOrObject] = value;
    }

    console.log(`📊 [${fileName}] Estado após atualização:`, this.state);

    if (this.storageType === "indexedDB") {
      await this.saveStateToDB();
    } else {
      this.saveState();
    }

    const keysToNotify =
      typeof keyOrObject === "object"
        ? Object.keys(keyOrObject)
        : [keyOrObject];
    keysToNotify.forEach((key) => this.notify(key));
  }

  async getState(key = null) {
    const fileName = "store.js"; // Nome do arquivo para logs
    if (this.storageType === "indexedDB") {
      return this.getStateFromDB(key);
    } else {
      console.log(`🔍 [${fileName}] Recuperando estado para a chave: "${key}"`);
      return key ? this.state[key] || null : { ...this.state };
    }
  }

  removeKey(key) {
    const fileName = "store.js"; // Nome do arquivo para logs
    console.log(`🗑️ [${fileName}] Removendo a chave: "${key}" do estado`);
    delete this.state[key];

    if (this.storageType === "indexedDB") {
      this.saveStateToDB();
    } else {
      this.saveState();
    }
  }

  loadState() {
    const fileName = "store.js"; // Nome do arquivo para logs
    try {
      console.log(
        `📂 [${fileName}] Carregando estado do armazenamento local...`
      );
      const storedData =
        this.storageType === "sessionStorage"
          ? sessionStorage.getItem(this.storageKey)
          : localStorage.getItem(this.storageKey);

      if (storedData) {
        const decryptedData = this.useEncryption
          ? this.decryptState(storedData)
          : storedData;
        console.log(
          `✅ [${fileName}] Estado carregado com sucesso do armazenamento local.`
        );
        return JSON.parse(decryptedData);
      }
      console.log(
        `⚠️ [${fileName}] Nenhum estado encontrado no armazenamento local.`
      );
      return {};
    } catch (error) {
      console.error(`❌ [${fileName}] Erro ao carregar estado:`, error);
      return {};
    }
  }

  saveState() {
    const fileName = "store.js"; // Nome do arquivo para logs
    try {
      console.log(`💾 [${fileName}] Salvando estado no armazenamento local...`);
      const dataToStore = this.useEncryption
        ? this.encryptState(JSON.stringify(this.state))
        : JSON.stringify(this.state);

      if (this.storageType === "sessionStorage") {
        sessionStorage.setItem(this.storageKey, dataToStore);
      } else {
        localStorage.setItem(this.storageKey, dataToStore);
      }
      console.log(
        `✅ [${fileName}] Estado salvo com sucesso no armazenamento local.`
      );
    } catch (error) {
      console.error(`❌ [${fileName}] Erro ao salvar estado:`, error);
    }
  }

  async getStateFromDB(key = null) {
    const fileName = "store.js"; // Nome do arquivo para logs
    console.log(
      `🔍 [${fileName}] Recuperando o estado completo do IndexedDB...`
    );
    if (!this.db) {
      console.error(`❌ [${fileName}] Banco de dados não inicializado.`);
      return null;
    }

    const transaction = this.db.transaction("state", "readonly");
    const store = transaction.objectStore("state");
    const request = store.get(1);

    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        const data = event.target.result;

        if (!data) {
          console.log(
            `⚠️ [${fileName}] Nenhum estado encontrado no IndexedDB.`
          );
          resolve(key ? null : {});
          return;
        }

        try {
          const decryptedState = this.useEncryption
            ? this.decryptState(data.state)
            : data.state;

          const parsedState = JSON.parse(decryptedState);
          console.log(
            `✅ [${fileName}] Estado recuperado do IndexedDB:`,
            parsedState
          );

          resolve(key ? parsedState[key] || null : parsedState);
        } catch (error) {
          console.error(
            `❌ [${fileName}] Erro ao processar o estado decripto ou JSON:`,
            error
          );
          reject(error);
        }
      };

      request.onerror = (event) => {
        console.error(
          `❌ [${fileName}] Erro ao recuperar estado do IndexedDB:`,
          event
        );
        reject(event);
      };
    });
  }

  async initDB() {
    const fileName = "store.js"; // Nome do arquivo para logs
    if (this.db) {
      console.log(`✅ [${fileName}] IndexedDB já inicializado.`);
      return;
    }

    console.log(`⚙️ [${fileName}] Inicializando IndexedDB...`);
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.storageKey, 1);

      request.onupgradeneeded = (event) => {
        this.db = event.target.result;
        if (!this.db.objectStoreNames.contains("state")) {
          this.db.createObjectStore("state", { keyPath: "id" });
        }
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log(`✅ [${fileName}] IndexedDB inicializado com sucesso.`);
        resolve();
      };

      request.onerror = (event) => {
        console.error(`❌ [${fileName}] Erro ao inicializar IndexedDB:`, event);
        reject(event);
      };
    });
  }

  async loadStateFromDB() {
    const fileName = "store.js"; // Nome do arquivo para logs
    console.log(`📂 [${fileName}] Carregando estado do IndexedDB...`);
    const state = await this.getStateFromDB();
    this.state = state || {};
    console.log(
      `✅ [${fileName}] Estado inicial carregado do IndexedDB:`,
      this.state
    );
  }

  async saveStateToDB() {
    const fileName = "store.js"; // Nome do arquivo para logs
    if (!this.db) return;

    console.log(`💾 [${fileName}] Salvando estado no IndexedDB...`);
    const transaction = this.db.transaction("state", "readwrite");
    const store = transaction.objectStore("state");
    const encryptedState = this.useEncryption
      ? this.encryptState(JSON.stringify(this.state))
      : JSON.stringify(this.state);

    store.put({ id: 1, state: encryptedState });
    console.log(`✅ [${fileName}] Estado salvo com sucesso no IndexedDB.`);
  }

  encryptState(data) {
    const fileName = "store.js"; // Nome do arquivo para logs
    console.log(`🔒 [${fileName}] Criptografando estado...`);
    return CryptoJS.AES.encrypt(data, this.encryptionKey).toString();
  }

  decryptState(data) {
    const fileName = "store.js"; // Nome do arquivo para logs
    console.log(`🔓 [${fileName}] Decriptografando estado...`);
    const bytes = CryptoJS.AES.decrypt(data, this.encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
