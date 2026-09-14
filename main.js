const { app, BrowserWindow, Menu, ipcMain } = require('electron');

function crearVentana() {
    const ventana = new BrowserWindow({
        width: 760,
        height: 950,
        icon: 'calcu.ico',
        frame: false,
        transparent: true,
        thickFrame: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    Menu.setApplicationMenu(null);
    ventana.loadFile('index.html');

    ipcMain.on('minimizar-ventana', () => {
        ventana.minimize();
    });
}

app.whenReady().then(crearVentana);