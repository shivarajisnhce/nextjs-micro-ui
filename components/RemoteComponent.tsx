import React, { useEffect, useState } from 'react';
import { RemoteModuleManager } from '../utils/RemoteModuleManager';


interface RemoteComponentProps {
  readonly remoteUrl: string;
  readonly moduleName: string;
  readonly appName: string;
  readonly componentName?: string;
}

export function RemoteComponent({ 
  remoteUrl, 
  moduleName, 
  appName,
  componentName = 'default' 
}: RemoteComponentProps) {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadComponent = async () => {
      try {
        setLoading(true);
        setError(null);

        const manager = RemoteModuleManager.getInstance();
        const RemoteComponent = await manager.loadRemoteModule(
          remoteUrl, 
          moduleName, 
          appName
        );
        
        if (mounted) {
          setComponent(() => RemoteComponent);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          console.error('Error loading remote component:', err);
          setError(`Failed to load component: ${err instanceof Error ? err.message : 'Unknown error'}`);
          setLoading(false);
        }
      }
    };

    loadComponent();

    return () => {
      mounted = false;
    };
  }, [remoteUrl, moduleName, componentName]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-2">Loading micro frontend...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-800 font-semibold mb-2">Error Loading Micro Frontend</h3>
        <p className="text-red-600 text-sm">{error}</p>
        <p className="text-red-500 text-xs mt-2">
          Make sure the micro frontend is running on the expected port.
        </p>
      </div>
    );
  }

  if (!Component) {
    return (
      <div className="p-8 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800">Component not found</p>
      </div>
    );
  }

  return <Component />;
}
