import { create } from 'zustand';

interface UIState {
  sidebarCollapsed: boolean;
  commandPaletteOpen: boolean;
  notificationsPanelOpen: boolean;
  activeWorkspaceId: string;
  activeWorkspaceName: string;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setNotificationsPanelOpen: (open: boolean) => void;
  setActiveWorkspace: (id: string, name: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  commandPaletteOpen: false,
  notificationsPanelOpen: false,
  activeWorkspaceId: 'personal',
  activeWorkspaceName: 'Personal Workspace',

  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed: boolean) => set({ sidebarCollapsed: collapsed }),
  setCommandPaletteOpen: (open: boolean) => set({ commandPaletteOpen: open }),
  setNotificationsPanelOpen: (open: boolean) => set({ notificationsPanelOpen: open }),
  setActiveWorkspace: (id: string, name: string) => set({ activeWorkspaceId: id, activeWorkspaceName: name }),
}));
