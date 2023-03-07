
import { BrowserWindow, app } from 'electron'
import { join } from 'node:path'
export type IType = 'set' | 'down'
let type: IType = 'set'
export function setType(newType: IType) {
  type = newType
}
function downloadFileToFolder(win: BrowserWindow) {
  win.webContents.session.on('will-download', (event, item, webContents) => {
    // 无需对话框提示， 直接将文件保存到路径
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
          import('wallpaper').then(async ({ setWallpaper }) => {
            await setWallpaper(filePath)
            webContents.send('downloadItemDone', type)
          })
        }
      } else {

        console.log(`Download failed: ${state}`)
      }
    })


  })

}


export default downloadFileToFolder
