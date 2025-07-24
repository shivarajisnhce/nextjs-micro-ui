declare module 'micro_ui/App' {
  const App: React.ComponentType<any>;
  export default App;
}

declare module 'micro_ui/MicroComponent' {
  const MicroComponent: React.ComponentType<any>;
  export default MicroComponent;
}

declare global {
  interface Window {
    micro_ui: {
      get: (module: string) => Promise<any>;
      init: (shared: any) => void;
    };
  }
}