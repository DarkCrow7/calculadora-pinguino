const { contextBridge, ipcRenderer } = require('electron');

// Este puente solo pasa lo justo para no abrir de más.
contextBridge.exposeInMainWorld('electronAPI', {
    minimizarVentana: () => ipcRenderer.send('minimizar-ventana'),
    cerrarVentana: () => ipcRenderer.send('cerrar-ventana'),
    esElectron: true,
});
