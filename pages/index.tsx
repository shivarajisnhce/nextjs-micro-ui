import React from 'react';
import { RemoteComponent } from '../components/RemoteComponent';





export default function Home() {
  return (

      <div>
        <h1>Micro UI Container</h1>
        <RemoteComponent
            remoteUrl="https://emiqapassportmicrouiwesa.z6.web.core.windows.net/qa/navigation-ui/remoteEntry.js"
            moduleName="navigation_ui"
            appName="./NavigationApp"
          />
        <RemoteComponent
            remoteUrl="https://emiqapassportmicrouiwesa.z6.web.core.windows.net/qa/recommendations-ui/remoteEntry.js"
            moduleName="recommendations_ui"
            appName="./RecommendationsApp"
          />
      </div>

  );
}