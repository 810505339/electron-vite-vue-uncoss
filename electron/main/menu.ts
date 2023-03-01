import { BrowserWindow, Menu, MenuItemConstructorOptions, app, ipcMain } from "electron"

const isMac = process.platform === 'darwin'

const createMenu = (win: BrowserWindow) => {
  const menu: MenuItemConstructorOptions[] = [
    {
      label: app.name,
      submenu: [
        { role: 'about' },
        { role: 'reload' },
        {
          label: 'click',
          click: () => {
            win.webContents.send('change', 'whoooooooh!')
          }

        }
      ]
    }

  ]
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu))
}
export default createMenu
