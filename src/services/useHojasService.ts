import axios, { AxiosError, AxiosResponse } from "axios";

import { useAuth } from "../auth/AuthProvider";
import { HojaRuta } from "../models/HojaRuta";

export default function useHojasService() {
  const { token, server } = useAuth();

  async function getHoja(hojaId: number): Promise<HojaRuta> {
    try {
      const response: AxiosResponse<HojaRuta> = await axios.get(
        `${server}/hojas/${hojaId}`,
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
  async function getHojas(fecha: string): Promise<HojaRuta[]> {
    try {
      const response: AxiosResponse<HojaRuta[]> = await axios.get(
        `${server}/hojas?fecha=${fecha}`,
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
    getHoja,
    getHojas,
  };
}
