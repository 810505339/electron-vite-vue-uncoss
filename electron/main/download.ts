//下载文件

import { BrowserWindow } from "electron"

function downloadFileToFolder(win: BrowserWindow, url: string,) {
 
  win.webContents.downloadURL(url)
  win.webContents.session.on('will-download', (event, item, webContents) => {
    // 无需对话框提示， 直接将文件保存到路径

    return new Promise<void>((resolve, reject) => {
      

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
          resolve()
        } else {
          reject(state)
          console.log(`Download failed: ${state}`)
        }
      })
    })


  })
}

export default downloadFileToFolder
