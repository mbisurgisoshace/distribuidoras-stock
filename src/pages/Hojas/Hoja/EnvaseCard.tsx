import { trashOutline } from "ionicons/icons";
import { IonButton, IonCard, IonIcon } from "@ionic/react";

import "./styles.css";
import { CargaItem } from "../../../models/Carga";
import CargaInput from "./CargaInput";
interface EnvaseCardProps {
  index: number;
  envase: string;
  item: CargaItem;
  tipoEnvase: string;
  onEliminar: () => void;
}

const ESTADOS: { name: keyof CargaItem; label: string }[] = [
  {
    name: "lleno",
    label: "Lleno",
  },
  {
    name: "vacio",
    label: "Vacio",
  },
  {
    name: "averiado",
    label: "Averiado",
  },
  {
    name: "retiro",
    label: "Retiro",
  },
  {
    name: "entrega",
    label: "Entrega",
  },
  {
    name: "cambio",
    label: "Cambio",
  },
];
export default function EnvaseCard({
  item,
  index,
  envase,
  tipoEnvase,
  onEliminar,
}: EnvaseCardProps) {
  return (
    <IonCard className={"ion-no-margin ion-margin-top"}>
      <div className={"EnvaseCard"}>
        <div className={"EnvaseCardHeader"}>
          <h6>{tipoEnvase.toUpperCase()}</h6>
          <h4>{envase}</h4>
        </div>
        <div className={"EnvaseCardContent"}>
          {ESTADOS.map((estado) => (
            <CargaInput
              index={index}
              name={estado.name}
              label={estado.label}
              value={item[estado.name] as number}
            />
          ))}
        </div>
      </div>
      <div className={"EnvaseCardFooter"}>
        <IonButton size={"small"} fill={"clear"} onClick={onEliminar}>
          <IonIcon slot="start" icon={trashOutline}></IonIcon>
          Eliminar
        </IonButton>
      </div>
    </IonCard>
  );
}
