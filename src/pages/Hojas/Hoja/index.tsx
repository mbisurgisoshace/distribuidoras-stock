import {
  IonFab,
  IonIcon,
  IonPage,
  IonLabel,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonContent,
  IonSegment,
  IonFabButton,
  IonSegmentButton,
  useIonViewWillEnter,
  IonCard,
  IonButton,
  IonButtons,
  useIonToast,
  useIonLoading,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";

import EnvaseCard from "./EnvaseCard";
import { Envase } from "../../../models/Envase";
import { HojaRuta } from "../../../models/HojaRuta";
import { Carga, CARGAS } from "../../../models/Carga";
import AgregarEnvaseModal from "./AgregarEnvaseModal";
import useHojasService from "../../../services/useHojasService";
import useEnvasesService from "../../../services/useEnvasesService";
import useCargasService from "../../../services/useCargasService";
import useDates from "../../../hooks/useDates";

type RouteParams = { hojaId: string };
export default function Hoja() {
  const [toast] = useIonToast();
  const methods = useForm<Carga>();
  const { formatDate } = useDates();
  const [present, dismiss] = useIonLoading();
  const { hojaId } = useParams<RouteParams>();
  const { control, handleSubmit, reset } = methods;
  const {
    fields: items,
    append,
    remove,
  } = useFieldArray<Carga, "items", "cargaDetId">({
    control,
    name: "items",
  });

  const { getHoja } = useHojasService();
  const { getEnvases } = useEnvasesService();
  const [hoja, setHoja] = useState<HojaRuta>();
  const [envases, setEnvases] = useState<Envase[]>([]);
  const [currentCarga, setCurrentCarga] = useState("1");
  const { getCarga, createCarga, updateCarga } = useCargasService();

  useEffect(() => {
    if (hoja) {
      fetchCarga(hoja, parseInt(currentCarga));
    }
  }, [hoja, currentCarga]);

  useIonViewWillEnter(() => {
    const fetchHoja = async () => {
      const hoja = await getHoja(parseInt(hojaId));
      setHoja(hoja);
    };

    const fetchEnvases = async () => {
      const envases = await getEnvases();
      setEnvases(envases);
    };

    fetchHoja();
    fetchEnvases();
  });

  const fetchCarga = async (hoja: HojaRuta, tipoCargaId: number) => {
    const hojaRutaId = hoja.hoja_ruta_id;
    const carga = await getCarga(hojaRutaId, tipoCargaId);
    if (carga) {
      reset({
        items: carga.items,
        fecha: hoja?.fecha,
        hoja_ruta_id: hojaRutaId,
        carga_enc_id: carga.carga_enc_id,
        carga_tipo_id: carga.carga_tipo_id,
      });
    } else {
      reset({
        items: [],
        fecha: hoja?.fecha,
        hoja_ruta_id: hojaRutaId,
        carga_tipo_id: tipoCargaId,
      });
    }
  };

  const onSubmit = async (data: Carga) => {
    present();
    try {
      if (data.carga_enc_id) {
        await updateCarga(data.carga_enc_id, data);
      } else {
        await createCarga(data);
      }

      await fetchCarga(hoja!, parseInt(currentCarga));

      toast({
        color: "success",
        message: "Carga guardada satisfactoriamente.",
        duration: 1500,
        position: "top",
      });
    } catch (err: any) {
      toast({
        color: "danger",
        duration: 1500,
        position: "top",
        message: err.message,
      });
    } finally {
      dismiss();
    }
  };
  const getEnvase = (envaseId: number): Envase => {
    const envase = envases.find((envase) => envase.envase_id === envaseId);
    return envase!;
  };
  const onAgregarEnvase = (envaseId: number) => {
    append({
      envase_id: envaseId,
      lleno: 0,
      vacio: 0,
      averiado: 0,
      retiro: 0,
      entrega: 0,
      cambio: 0,
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <h3>{`${formatDate(hoja?.fecha || "")} - ${
              hoja?.hoja_ruta_numero
            }`}</h3>
            <p>{`${hoja?.apellido.toUpperCase()}, ${hoja?.nombre.toUpperCase()}`}</p>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleSubmit(onSubmit)}>Guardar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className={"ion-padding"}>
        <IonSegment
          value={currentCarga}
          onIonChange={(e) => setCurrentCarga(e.target.value!)}
        >
          {CARGAS.map((carga) => (
            <IonSegmentButton key={carga.id} value={carga.id}>
              <IonLabel>{carga.label}</IonLabel>
            </IonSegmentButton>
          ))}
        </IonSegment>
        {envases.length > 0 ? (
          <FormProvider {...methods}>
            <form>
              {items.map((item, index: number) => {
                const envase = getEnvase(item.envase_id);
                return (
                  <EnvaseCard
                    item={item}
                    key={index}
                    index={index}
                    envase={envase.envase_nombre}
                    onEliminar={() => remove(index)}
                    tipoEnvase={
                      envase.tipo_envase_id === 1 ? "Gas Butano" : "Gas Propano"
                    }
                  />
                );
              })}
            </form>
          </FormProvider>
        ) : null}
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton id="open-modal">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
      <AgregarEnvaseModal
        envases={envases}
        onSelectEnvase={onAgregarEnvase}
        selectedEnvases={items.map((item) => item.envase_id)}
      />
    </IonPage>
  );
}
