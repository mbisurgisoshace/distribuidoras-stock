import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { Route, Redirect } from "react-router-dom";
import { personOutline, newspaperOutline } from "ionicons/icons";

import { useAuth } from "./AuthProvider";
import { Hoja, HojasList } from "../pages/Hojas";
import Settings from "../pages/Settings";

export default function ProtectedRoutes() {
  const auth = useAuth();

  if (!auth.token) {
    return <Redirect to={"/login"} />;
  }

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/" render={() => <Redirect to={"/hojas"} />} />
        <Route exact path="/login" render={() => <Redirect to={"/hojas"} />} />
        <Route exact path={"/hojas"}>
          <HojasList />
        </Route>
        <Route exact path={"/hojas/:hojaId"}>
          <Hoja />
        </Route>
        <Route exact path={"/settings"}>
          <Settings />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="hojas" href="/hojas">
          <IonIcon icon={newspaperOutline} />
          <IonLabel>Hojas</IonLabel>
        </IonTabButton>
        <IonTabButton tab="settings" href="/settings">
          <IonIcon icon={personOutline} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}
