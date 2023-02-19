import moment from "moment";

import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { lockClosedOutline, lockOpenOutline } from "ionicons/icons";

import { HojaRuta } from "../../../models/HojaRuta";
import useDates from "../../../hooks/useDates";

interface HojaItemProps {
  hoja: HojaRuta;
}
export default function HojaItem({ hoja }: HojaItemProps) {
  const { formatDate } = useDates();
  return (
    <IonItem routerLink={`/hojas/${hoja.hoja_ruta_id}`}>
      <IonIcon
        size={"small"}
        slot={"start"}
        color={hoja.estado ? "success" : "danger"}
        icon={hoja.estado ? lockOpenOutline : lockClosedOutline}
      />
      <IonLabel>
        <h3>{`${formatDate(hoja.fecha)} - ${hoja.hoja_ruta_numero}`}</h3>
        <p>{`${hoja.apellido.toUpperCase()}, ${hoja.nombre.toUpperCase()}`}</p>
      </IonLabel>
    </IonItem>
  );
}
