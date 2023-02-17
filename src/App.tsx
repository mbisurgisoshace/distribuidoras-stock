import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import { serverOutline, logInOutline } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import { useAuth } from "./auth/AuthProvider";

import Login from "./pages/Auth/Login";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import ServerConnection from "./pages/Auth/ServerConnection";

setupIonicReact();

const App: React.FC = () => {
  const auth = useAuth();
  if (auth.isLoading) return <div>Loading...</div>;
  return (
    <IonApp>
      {!auth.token ? (
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/server">
                <ServerConnection />
              </Route>
              <Route render={() => <Redirect to={"/login"} />} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="login" href="/login">
                <IonIcon icon={logInOutline} />
                <IonLabel>Login</IonLabel>
              </IonTabButton>
              <IonTabButton tab="server" href="/server">
                <IonIcon icon={serverOutline} />
                <IonLabel>Servidor</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      ) : (
        <IonReactRouter>
          <ProtectedRoutes />
        </IonReactRouter>
      )}
    </IonApp>
  );
};

export default App;
