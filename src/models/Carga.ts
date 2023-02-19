export interface Carga {
  carga_enc_id: number;
  fecha: string;
  carga_tipo_id: number;
  hoja_ruta_id: number;
  items: CargaItem[];
}

export interface CargaItem {
  carga_det_id?: number;
  envase_id: number;
  lleno: number;
  vacio: number;
  averiado: number;
  retiro: number;
  entrega: number;
  cambio: number;
}

export const CARGAS = [
  {
    id: "1",
    label: "INI",
  },
  {
    id: "3",
    label: "RE1",
  },
  {
    id: "2",
    label: "REP",
  },
  {
    id: "4",
    label: "RE2",
  },
];
