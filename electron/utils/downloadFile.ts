
import { BrowserWindow, app } from 'electron'
import { join } from 'node:path'

 let type: "set" | "down" = "down"

 export function setType(newtype: "set" | "down") {
  type = newtype
}

function downloadFileToFolder(win: BrowserWindow) {
  console.log(type);
  
  win.webContents.session.on('will-download', (event, item, webContents) => {
  
    const filePath = join(app.getAppPath(), '/download', `wallpaper.jpg`);
    if (type === 'set') {
      item.setSavePath(filePath)
    }


    item.on('updated', (event, state) => {
      if (state === 'interrupted') {
        console.log('Download is interrupted but can be resumed')
      } else if (state === 'progressing') {
        if (item.isPaused()) {
          console.log('Download is paused')
        } else {
          console.log(`Received bytes: ${item.getReceivedBytes()}`)
        }
      }
    })
    item.once('done', (event, state) => {
      if (state === 'completed') {

        if (type === 'set') {
          import("wallpaper").then(({ setWallpaper }) => {
            setWallpaper(filePath)
          })
        }
        webContents.send('downloadCompleted')
        console.log('成功');
        
      } else {
        console.log(`Download failed: ${state}`)
      }
    })
  })

}


export default downloadFileToFolder
