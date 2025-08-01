import React from 'react';
import { RemoteComponent } from '../components/RemoteComponent';





export default function Home() {
  // Use local URLs for development
  const isProduction = process.env.NODE_ENV === 'production';

  const navigationUrl = isProduction
    ? "https://emiqapassportmicrouiwesa.z6.web.core.windows.net/qa/navigation-ui/remoteEntry.js"
    : "http://localhost:3002/remoteEntry.js";

  const recommendationsUrl = isProduction
    ? "https://emiqapassportmicrouiwesa.z6.web.core.windows.net/qa/recommendations-ui/remoteEntry.js"
    : "http://localhost:3003/remoteEntry.js";

  return (
    <div>
      <h1>Micro UI Container</h1>
      <RemoteComponent
        remoteUrl={navigationUrl}
        moduleName="navigation_ui"
        appName="./NavigationApp"
      />
      <RemoteComponent
        remoteUrl={recommendationsUrl}
        moduleName="recommendations_ui"
        appName="./RecommendationsApp"
      />
    </div>
  );
}