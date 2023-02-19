import axios, { AxiosError, AxiosResponse } from "axios";

import { Carga } from "../models/Carga";
import { useAuth } from "../auth/AuthProvider";

export default function useCargasService() {
  const { token, server } = useAuth();
  async function getCarga(
    hojaRutaId: number,
    tipoCargaId: number
  ): Promise<Carga | null> {
    try {
      const response: AxiosResponse<Carga> = await axios.get(
        `${server}/cargas/${hojaRutaId}/${tipoCargaId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      throw err;
    }
  }

  async function createCarga(carga: Carga): Promise<Carga> {
    try {
      const response: AxiosResponse<Carga> = await axios.post(
        `${server}/cargas`,
        carga,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      throw err;
    }
  }

  async function updateCarga(cargaEncId: number, carga: Carga): Promise<Carga> {
    try {
      const response: AxiosResponse<Carga> = await axios.put(
        `${server}/cargas/${cargaEncId}`,
        carga,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      throw err;
    }
  }

  return {
    getCarga,
    createCarga,
    updateCarga,
  };
}
