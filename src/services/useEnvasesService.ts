import axios, { AxiosError, AxiosResponse } from "axios";

import { Envase } from "../models/Envase";
import { useAuth } from "../auth/AuthProvider";

export default function useEnvasesService() {
  const { token, server } = useAuth();
  async function getEnvases(): Promise<Envase[]> {
    try {
      const response: AxiosResponse<Envase[]> = await axios.get(
        `${server}/envases`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.filter(
        (envase) => envase.tipo_envase_id === 1 || envase.tipo_envase_id === 2
      );
    } catch (err) {
      throw err;
    }
  }

  return {
    getEnvases,
  };
}
