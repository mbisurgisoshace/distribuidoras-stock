import {
  IonPage,
  IonButton,
  IonContent,
  IonLoading,
  useIonToast,
  useIonRouter,
} from "@ionic/react";
import { useState } from "react";
import { TextField } from "@mui/material";

import "./styles.css";
import { useAuth } from "../../../auth/AuthProvider";
export default function Login() {
  const auth = useAuth();
  const [toast] = useIonToast();
  const navigate = useIonRouter();
  const [loading, isLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (event: React.FormEvent) => {
    isLoading(true);
    event.preventDefault();

    try {
      await auth.login(username, password);
      navigate.push("/hojas", "forward");
    } catch (err: any) {
      toast({
        color: "danger",
        duration: 1500,
        position: "top",
        message: err.message,
      });
    } finally {
      isLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent className={"ion-padding"} fullscreen>
        <div className={"LoginFormWrapper"}>
          <form className={"LoginForm"} onSubmit={onLogin}>
            <TextField
              fullWidth
              value={username}
              size={"small"}
              label="Usuario"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(event.target.value)
              }
            />
            <TextField
              fullWidth
              value={password}
              size={"small"}
              type={"password"}
              label="Contraseña"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(event.target.value)
              }
            />
            <IonButton expand="full" type={"submit"}>
              Ingresar
            </IonButton>
          </form>
        </div>
        <IonLoading isOpen={loading} />
      </IonContent>
    </IonPage>
  );
}
