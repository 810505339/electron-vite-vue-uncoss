
import { BrowserWindow, app } from 'electron'
import { join } from 'node:path'
function downloadFileToFolder(win: BrowserWindow) {

  win.webContents.session.on('will-download', (event, item, webContents) => {
    app.getAppPath()
    item.setSavePath('/tmp/save.pdf')
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
        console.log('Download successfully')
      } else {
        console.log(`Download failed: ${state}`)
      }
    })
  })

}


export default downloadFileToFolder
