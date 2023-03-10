import AsyncStorage from "@react-native-async-storage/async-storage";
import debounce from "lodash.debounce";

const storageKey = "REACT_QUERY_OFFLINE_CACHE";
const debounceValue = 1000;

export function createReactNativePersistor() {
  return {
    persistClient: debounce(async function (persistedClient) {
      await AsyncStorage.setItem(storageKey, JSON.stringify(persistedClient));
    }, debounceValue),
    restoreClient: async function restoreClient() {
      var cacheString = await AsyncStorage.getItem(storageKey);

      if (!cacheString) {
        return;
      }

      return JSON.parse(cacheString);
    },
    removeClient: async function removeClient() {
      await AsyncStorage.removeItem(storageKey);
    },
  };
}
