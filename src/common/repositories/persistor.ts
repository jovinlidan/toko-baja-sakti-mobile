import debounce from "lodash.debounce";
import storage from "./storage";
import key from "@constants/storage-key.constant";

const debounceValue = 1000;

export function createReactNativePersistor() {
  return {
    persistClient: debounce(async function (persistedClient) {
      await storage.set(key.reactQueryKey, JSON.stringify(persistedClient));
    }, debounceValue),
    restoreClient: async function restoreClient() {
      var cacheString = await storage.getString(key.reactQueryKey);

      if (!cacheString) {
        return;
      }

      return JSON.parse(cacheString);
    },
    removeClient: async function removeClient() {
      await storage.delete(key.reactQueryKey);
    },
  };
}
