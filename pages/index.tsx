import dynamic from 'next/dynamic';
import React from 'react';
import Welcome from './Welcome/welcome';
import styles from './Home.module.css'; // CSS Module


const NavigationApp = dynamic(
  () => {
    if (typeof window !== 'undefined') {
      return import('navigation_ui/NavigationApp' as any).catch(() => {
        return () => <div>Navigation UI not available</div>;
      });
    }
    return Promise.resolve(() => <div>Loading...</div>);
  },
  {
    ssr: false, // This is crucial - prevents SSR for federated modules
    loading: () => <p>Loading Navigation...</p>
  }
);

const RecommendationsApp = dynamic(
  () => {
    if (typeof window !== 'undefined') {
      return import('recommendations_ui/RecommendationsApp' as any).catch(() => {
        return () => <div>Recommendations UI not available</div>;
      });
    }
    return Promise.resolve(() => <div>Loading...</div>);
  },
  {
    ssr: false, // This is crucial - prevents SSR for federated modules
    loading: () => <p>Loading Recommendations...</p>
  }
);

const SearchApp = dynamic(
  () => {
    if (typeof window !== 'undefined') {
      return import('search_ui/SearchApp' as any).catch(() => {
        return () => <div>Search UI not available</div>;
      });
    }
    return Promise.resolve(() => <div>Loading...</div>);
  },
  {
    ssr: false, // This is crucial - prevents SSR for federated modules
    loading: () => <p>Loading Recommendations...</p>
  }
);

export default function Home() {
  return (

    <div className={styles.container}>
      <div className={styles.navigation}>
        <NavigationApp />
      </div>

      <div className={styles.welcome}>
        <Welcome />
      </div>

      <div className={styles.search}>
        <SearchApp />
      </div>

      <div className={styles.recommendations}>
        <RecommendationsApp />
      </div>
    </div>

  );
}