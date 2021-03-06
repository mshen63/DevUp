import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { grid, layers, analyticsOutline, albums } from 'ionicons/icons';
import Home from './pages/Home.page';
import Categories from './pages/Categories.page';
import Category from './pages/Category.page';
import Login from './pages/Login.page';
import Register from './pages/Register.page.jsx';
import Profile from './pages/Profile.page.jsx';
import Projects from './pages/Projects.page.jsx'
import Private from './pages/Private.page';
import ResetPassword from './pages/ResetPassword.page';
import ForgotPassword from './pages/ForgotPassword.page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import React, { useState, useReducer, useEffect } from 'react';

import GlobalContext from './utils/state/GlobalContext';
import GlobalReducer, { initialState } from "./utils/state/GlobalReducer";


const App = () => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);
  const [showNav, setShowNav] = useState(true);
  const url = window.location.pathname.split("/").pop();


  useEffect(() => {
    dispatch({ type: 'LOAD_FROM_STORAGE' });
  }, [dispatch]);

  useEffect(() => {
    if (["login", "register", "reset"].includes(url)) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [setShowNav, url]);

  return (
    <IonApp>
      <IonReactRouter>
        <GlobalContext.Provider value={{ state, dispatch }}>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/explore">
                <Home />
              </Route>
              <Route exact path="/projects">
                <Projects />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route exact path="/">
                <Redirect to="/explore" />
              </Route>
              <Private exact path="/profile">
                <Profile />
              </Private>
              <Route exact path="/categories">
                <Categories />
              </Route>
              <Route exact path="/reset">
                <ForgotPassword />
              </Route>
              <Route
                exact
                path="/reset/:user"
                render={(props) => <ResetPassword {...props} />}
              />
              <Route
                exact
                path="/category/:id"
                render={(props) => <Category {...props} />}
              />
            </IonRouterOutlet>

            <IonTabBar slot="bottom" style={showNav ? {} : { display: "none" }}>
              {/* check if url in certain [], do/don't display */}
              <IonTabButton tab="Explore" href="/explore">
                <IonIcon icon={layers} />
                <IonLabel>Explore</IonLabel>
              </IonTabButton>

              <IonTabButton tab="Categories" href="/categories">
                <IonIcon icon={grid} />
                <IonLabel>Categories</IonLabel>
              </IonTabButton>

              {
                state.token?.length &&
                <IonTabButton tab="Projects" href="/projects">
                  <IonIcon icon={albums} />
                  <IonLabel>Projects</IonLabel>
                </IonTabButton>
              }

              {
                state.token?.length &&
                <IonTabButton tab="Profile" href="/profile">
                  <IonIcon icon={analyticsOutline} />
                  <IonLabel>Profile</IonLabel>
                </IonTabButton>
              }

            </IonTabBar>
          </IonTabs>
        </GlobalContext.Provider>
      </IonReactRouter>
    </IonApp>
  );
}
export default App;
