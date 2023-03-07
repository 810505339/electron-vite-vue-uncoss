import { app, BrowserWindow, shell, ipcMain, dialog, protocol, ipcRenderer, session } from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'
import downloadFileToFolder, { setType } from '../utils/downloadFile'


// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

async function createWindow() {
  win = new BrowserWindow({ //BrowserWindow 模块，它创建和管理应用程序 窗口。
   
    icon: join(process.env.PUBLIC, 'favicon.ico'),
    resizable: true,
    width: 360,
    frame: true,
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
     
    },
  })
  //electron创建菜单

  if (process.env.VITE_DEV_SERVER_URL) { // electron-vite-vue#298
    win.loadURL(url)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
  // win.webContents.on('will-navigate', (event, url) => { }) #344


  downloadFileToFolder(win)
}

app.whenReady().then(() => {
  // protocol.registerFileProtocol('file', (request, callback) => {
  //   console.log(1);
  //   const pathname = decodeURI(request.url.replace('file:///', ''));
  //   callback(pathname);
  // })
  createWindow()  //创建winodow窗口
  downloadFileToFolder(win)

})

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()  //IOS平台退出
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  console.log(allWindows);

  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})


// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})


ipcMain.handle('ping', () => 'pong')
ipcMain.handle('selectFile', async (event) => {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    ]
  })
  const title = filePaths?.[0]
  //修改窗口标题
  BrowserWindow.fromWebContents(event.sender).setTitle(title)


  return filePaths
})

<<<<<<< HEAD



ipcMain.on('setwallpaper', (env, url) => {
  setType('set')
  win.webContents.downloadURL(url)
=======
>>>>>>> a3eeaa2bb0c84a6000283680f641e7cda7f0df27

ipcMain.on('downloadFile', (event, url, type) => {
  setType(type)
  win.webContents.downloadURL(url)
})

<<<<<<< HEAD
ipcMain.on('downloadFile', (env, url) => {
  setType('down')
  win.webContents.downloadURL(url)
})
=======

>>>>>>> a3eeaa2bb0c84a6000283680f641e7cda7f0df27
