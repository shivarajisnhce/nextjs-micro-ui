import React from 'react';
import { RemoteComponent } from '../components/RemoteComponent';
import Welcome from './Welcome/welcome';
import styles from './Home.module.css'; // CSS Module

export default function Home() {
  const isProduction = process.env.NODE_ENV === 'production';

  const navigationUrl = isProduction
    ? "https://emiqapassportmicrouiwesa.z6.web.core.windows.net/qa/navigation-ui/remoteEntry.js"
    : "http://localhost:3002/remoteEntry.js";

  const recommendationsUrl = isProduction
    ? "https://emiqapassportmicrouiwesa.z6.web.core.windows.net/qa/recommendations-ui/remoteEntry.js"
    : "http://localhost:3003/remoteEntry.js";

  const searchUrl = isProduction
    ? "https://emiqapassportmicrouiwesa.z6.web.core.windows.net/qa/northstar-searchui/remoteEntry.js"
    : "http://localhost:3004/remoteEntry.js";

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <RemoteComponent
          remoteUrl={navigationUrl}
          moduleName="navigation_ui"
          appName="./NavigationApp"
        />
      </div>

      <div className={styles.welcome}>
        <Welcome />
      </div>

      <div className={styles.search}>
        <RemoteComponent
          remoteUrl={searchUrl}
          moduleName="search_ui"
          appName="./SearchApp"
        />
      </div>

      <div className={styles.recommendations}>
        <RemoteComponent
          remoteUrl={recommendationsUrl}
          moduleName="recommendations_ui"
          appName="./RecommendationsApp"
        />
      </div>
    </div>
  );
}
