
import { BrowserWindow, app } from "electron"
import { join } from 'node:path'

async function setwallpaper(win: BrowserWindow, url: string) {
  win.webContents.downloadURL(url)

  win.webContents.session.on('will-download', (event, item, webContents) => {
    // 无需对话框提示， 直接将文件保存到路径

    const filePath = join(app.getAppPath(), '/download', `123.jpg`);
    item.setSavePath(filePath)

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
        
        import('wallpaper').then(async ({ setWallpaper }) => {
           await setWallpaper(filePath)
           webContents.send('downloadItemDone', 1)
        })

      } else {

        console.log(`Download failed: ${state}`)
      }
    })


  })



}

export default setwallpaper
