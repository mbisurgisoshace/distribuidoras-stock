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
} from "@ionic/react";
import { useEffect, useState } from "react";

export default function Hojas() {
  const [fecha, setFecha] = useState(new Date().toISOString());

  useEffect(() => {}, [fecha]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Hojas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
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
                }}
              />
            </IonModal>
          </>
        </IonItem>
      </IonContent>
    </IonPage>
  );
}
