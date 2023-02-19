import {
  IonItem,
  IonPage,
  IonModal,
  IonLabel,
  IonTitle,
  IonHeader,
  IonContent,
  IonToolbar,
  IonDatetime,
  IonDatetimeButton,
  IonList,
  useIonViewWillEnter,
} from "@ionic/react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import useHojasService from "../../../services/useHojasService";
import { HojaRuta } from "../../../models/HojaRuta";
import HojaItem from "./HojaItem";

export default function Hojas() {
  const { getHojas } = useHojasService();
  const isMounted = useRef(false);
  const [fecha, setFecha] = useState(new Date().toISOString());
  const [hojas, setHojas] = useState<HojaRuta[]>([]);

  useEffect(() => {
    if (isMounted.current) {
      fetchHojas();
    }
  }, [fecha]);

  useIonViewWillEnter(() => {
    fetchHojas();
    isMounted.current = true;
  });
  const fetchHojas = async () => {
    const formattedDate = moment(fecha).format("YYYY-MM-DD");
    const hojas = await getHojas(formattedDate);
    setHojas(hojas);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Hojas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem lines={"full"}>
          <IonLabel>Fecha</IonLabel>
          <>
            <IonDatetimeButton datetime="datetime"></IonDatetimeButton>

            <IonModal keepContentsMounted={true}>
              <IonDatetime
                value={fecha}
                id="datetime"
                presentation="date"
                showDefaultButtons={true}
                onIonChange={(event) => {
                  setFecha(event.detail.value as string);
                  fetchHojas();
                }}
              />
            </IonModal>
          </>
        </IonItem>
        <IonList lines={"full"}>
          {hojas.map((hoja) => (
            <HojaItem hoja={hoja} key={hoja.hoja_ruta_id} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
