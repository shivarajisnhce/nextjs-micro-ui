interface ModuleFederationContainer {
  init: (shared: Record<string, unknown>) => Promise<void>;
  get: (module: string) => Promise<() => { default: React.ComponentType }>;
}

declare global {
  interface Window {
    [key: string]: ModuleFederationContainer | undefined;
    __webpack_share_scopes__?: {
      default: Record<string, unknown>;
    };
  }
  
  const __webpack_share_scopes__: {
    default: Record<string, unknown>;
  };
}

class RemoteModuleManager {
  private static instance: RemoteModuleManager;
  private readonly loadedContainers = new Set<string>();
  private readonly containerPromises = new Map<string, Promise<void>>();

  static getInstance(): RemoteModuleManager {
    if (!RemoteModuleManager.instance) {
      RemoteModuleManager.instance = new RemoteModuleManager();
    }
    return RemoteModuleManager.instance;
  }

  async loadRemoteModule(remoteUrl: string, moduleName: string, exposedModule: string): Promise<React.ComponentType> {
    // Load the script if not already loaded
    if (!this.loadedContainers.has(moduleName)) {
      if (!this.containerPromises.has(moduleName)) {
        this.containerPromises.set(moduleName, this.loadScript(remoteUrl, moduleName));
      }
      await this.containerPromises.get(moduleName);
    }

    // Get the container
    const container = window[moduleName];
    if (!container) {
      throw new Error(`Container ${moduleName} not found`);
    }

    // Initialize container only once
    if (!this.loadedContainers.has(moduleName)) {
      try {
        await container.init(__webpack_share_scopes__.default);
        this.loadedContainers.add(moduleName);
      } catch (error) {
        // If initialization fails because it's already initialized, that's okay
        console.warn(`Container ${moduleName} initialization warning:`, error);
        if (error instanceof Error && error.message.includes('already been initialized')) {
          this.loadedContainers.add(moduleName);
        } else {
          // Try to initialize with empty scope as fallback
          try {
            await container.init({});
            this.loadedContainers.add(moduleName);
          } catch (fallbackError) {
            console.warn(`Fallback initialization failed:`, fallbackError);
            this.loadedContainers.add(moduleName);
          }
        }
      }
    }

    // Get the module
    const factory = await container.get(exposedModule);
    const Module = factory();
    return Module.default;
  }

  private loadScript(url: string, moduleName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if script already exists
      const existingScript = document.querySelector(`script[src="${url}"]`);
      if (existingScript && window[moduleName]) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = url;
      script.onload = () => {
        if (window[moduleName]) {
          resolve();
        } else {
          reject(new Error(`Module ${moduleName} not found after loading script`));
        }
      };
      script.onerror = () => reject(new Error(`Failed to load script from ${url}`));
      
      document.head.appendChild(script);
    });
  }
}

export { RemoteModuleManager };
