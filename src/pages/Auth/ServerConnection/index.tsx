import {
  IonPage,
  IonTitle,
  IonLabel,
  IonHeader,
  IonContent,
  IonToolbar,
  useIonToast,
  useIonLoading,
  IonButton,
} from "@ionic/react";
import { useState } from "react";
import { TextField } from "@mui/material";

import "./styles.css";
import { useAuth } from "../../../auth/AuthProvider";
export default function ServerConnection() {
  const auth = useAuth();
  const [toast] = useIonToast();
  const [present, dismiss] = useIonLoading();
  const [server, setServer] = useState(auth.server);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    present();

    try {
      await auth.connectServer(server);
      toast({
        color: "success",
        message: "Conexion al servidor guardada.",
        duration: 1500,
        position: "top",
      });
    } catch (err) {
      console.log(err);
    }

    dismiss();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Conexion al Servidor</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className={"ion-padding"}>
        <IonLabel>
          Ingrese la direccion del servidor al que se desea conectar.
        </IonLabel>
        <form className={"ServerConnectionForm"} onSubmit={onSubmit}>
          <TextField
            fullWidth
            value={server}
            size={"small"}
            label="URL del Servidor"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setServer(event.target.value)
            }
          />
          <IonButton expand="full" type={"submit"}>
            Guardar
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
}
