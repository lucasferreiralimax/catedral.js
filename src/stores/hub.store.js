import Store from "../core/store.js";

const fileName = "hub.store.js"; // Nome do arquivo para logs

// Função auxiliar para criar instâncias de Store
const createStore = (
  key,
  storageType,
  useEncryption = false,
  encryptionKey = null
) => {
  console.log(
    `🛠️ [${fileName}] Criando Store: ${key} | Tipo: ${storageType} | Criptografia: ${useEncryption}`
  );
  return new Store(key, storageType, useEncryption, encryptionKey);
};

// Instâncias de Store
export const globalStoreLocal = createStore("catedral", "localStorage");
export const globalStoreSession = createStore("catedral", "sessionStorage");
export const globalStoreDB = createStore("catedral", "indexedDB");
export const globalStoreLocalEncrypt = createStore(
  "catedralStoreEncrypt",
  "localStorage",
  true,
  "catedral-key"
);
export const globalStoreSessionEncrypt = createStore(
  "catedralStoreEncrypt",
  "sessionStorage",
  true,
  "catedral-key"
);
export const globalStoreEncryptDB = createStore(
  "catedralStoreEncrypt",
  "indexedDB",
  true,
  "catedral-key"
);

// Objeto centralizado para exportação
const hubStore = {
  globalStoreLocal,
  globalStoreSession,
  globalStoreDB,
  globalStoreLocalEncrypt,
  globalStoreSessionEncrypt,
  globalStoreEncryptDB,
};

console.log(
  `✅ [${fileName}] HubStore inicializado com as seguintes Stores:`,
  Object.keys(hubStore)
);

export default hubStore;
