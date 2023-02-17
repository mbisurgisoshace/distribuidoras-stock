import { Storage } from "@ionic/storage";
import { useEffect, useState } from "react";
export default function useStorage() {
  const [store, setStore] = useState<Storage>();

  useEffect(() => {
    const initStorage = async () => {
      const createStore = new Storage({
        name: "stock-distribuidoras",
      });
      const store = await createStore.create();
      setStore(store);
    };

    initStorage();
  }, []);

  return {};
}
