import {
  IonTitle,
  IonModal,
  IonButton,
  IonHeader,
  IonButtons,
  IonToolbar,
  IonContent,
} from "@ionic/react";
import { useRef } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Envase } from "../../../models/Envase";
import { MenuItem } from "@mui/material";

interface AgregarEnvaseModalProps {
  envases: Envase[];
  selectedEnvases: number[];
  onSelectEnvase: (envaseId: number) => void;
}
export default function AgregarEnvaseModal({
  envases,
  onSelectEnvase,
  selectedEnvases,
}: AgregarEnvaseModalProps) {
  const modal = useRef<HTMLIonModalElement>(null);
  return (
    <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev: any) => {}}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => modal.current?.dismiss()}>
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle>Agregar Envase</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className={"ion-padding"}>
        <Select
          fullWidth
          value={""}
          size={"small"}
          onChange={(e) => {
            onSelectEnvase(parseInt(e.target.value));
            modal.current?.dismiss();
          }}
        >
          {envases.map((envase) => (
            <MenuItem
              key={envase.envase_id}
              value={envase.envase_id}
              disabled={selectedEnvases.includes(envase.envase_id)}
            >{`${envase.envase_codigo} - ${envase.envase_nombre}`}</MenuItem>
          ))}
        </Select>
      </IonContent>
    </IonModal>
  );
}
