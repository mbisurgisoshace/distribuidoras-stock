import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useAuth } from "../../auth/AuthProvider";

export default function Settings() {
  const auth = useAuth();
  const navigate = useIonRouter();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Configuracion</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className={"ion-padding"}>
        <IonButton
          size={"small"}
          expand={"full"}
          onClick={() => {
            auth.logout();
            navigate.push("/login", "none");
          }}
        >
          Cerras Sesion
        </IonButton>
      </IonContent>
    </IonPage>
  );
}
