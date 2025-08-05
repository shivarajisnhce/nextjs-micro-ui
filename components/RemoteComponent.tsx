import React, { useEffect, useState } from 'react';
import { RemoteModuleManager } from '../utils/RemoteModuleManager';

// Add keyframes for spinner animation
const spinnerStyle = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Inject CSS if not already present
if (typeof document !== 'undefined' && !document.getElementById('spinner-styles')) {
  const style = document.createElement('style');
  style.id = 'spinner-styles';
  style.textContent = spinnerStyle;
  document.head.appendChild(style);
}


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
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%',
        width: '100%',
        padding: '16px',
        minHeight: '60px'
      }}>
        <div style={{
          animation: 'spin 1s linear infinite',
          borderRadius: '50%',
          height: '24px',
          width: '24px',
          border: '2px solid #e5e7eb',
          borderTopColor: '#3b82f6'
        }}></div>
        <span style={{ marginLeft: '8px', fontSize: '14px', color: '#6b7280' }}>
          Loading...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        padding: '16px',
        backgroundColor: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: '8px',
        height: '100%',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <h3 style={{ color: '#991b1b', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>
          Error Loading Micro Frontend
        </h3>
        <p style={{ color: '#dc2626', fontSize: '12px', marginBottom: '8px' }}>{error}</p>
        <p style={{ color: '#ef4444', fontSize: '11px' }}>
          Make sure the micro frontend is running on the expected port.
        </p>
      </div>
    );
  }

  if (!Component) {
    return (
      <div style={{
        padding: '16px',
        backgroundColor: '#fffbeb',
        border: '1px solid #fed7aa',
        borderRadius: '8px',
        height: '100%',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <p style={{ color: '#92400e', fontSize: '14px' }}>Component not found</p>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
      <Component />
    </div>
  );
}
