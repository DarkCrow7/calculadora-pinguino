const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

let ventanaPrincipal;

function crearVentana() {
    // Acá armamos la ventana principal de la app.
    ventanaPrincipal = new BrowserWindow({
        width: 760,
        height: 950,
        icon: 'calcu.ico',
        frame: false,
        transparent: true,
        thickFrame: false,
        resizable: false,
        webPreferences: {
            // Ojo: esto va así para que la app sea más segura.
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    Menu.setApplicationMenu(null);
    ventanaPrincipal.loadFile('index.html');
}

// La interfaz manda la señal y este archivo hace la acción real.
ipcMain.on('minimizar-ventana', () => {
    const ventana = BrowserWindow.getFocusedWindow() || ventanaPrincipal;
    if (ventana && !ventana.isDestroyed()) {
        ventana.minimize();
    }
});

ipcMain.on('cerrar-ventana', () => {
    const ventana = BrowserWindow.getFocusedWindow() || ventanaPrincipal;
    if (ventana && !ventana.isDestroyed()) {
        ventana.close();
    }
});

app.whenReady().then(() => {
    crearVentana();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            crearVentana();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
