
import { BrowserWindow, app } from 'electron'
import { join } from 'node:path'
export type IType = 'set' | 'down'
let type: IType = 'set'
export function setType(newType: IType) {
  type = newType
  console.log(newType);

}
function downloadFileToFolder(win: BrowserWindow) {
  console.log('downloadFileToFolder');

  win.webContents.session.on('will-download', (event, item, webContents) => {
    // 无需对话框提示， 直接将文件保存到路径
    //process.resourcesPath 文件不能使用app.getAppPath 
    const filePath = join(process.resourcesPath, '/download', `wallpaper.jpg`);
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

      console.log(filePath);

      if (state === 'completed') {

        if (type === 'set') {
          import('wallpaper').then(async ({ setWallpaper }) => {
            await setWallpaper(filePath)
          })
        }
        webContents.send('downloadItemDone', type, filePath)
      } else {

      }
    })


  })

}


export default downloadFileToFolder
