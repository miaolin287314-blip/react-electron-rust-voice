import { Tray, Menu, nativeImage } from 'electron';
import path from 'node:path';

export function createTray() {
  const icon = nativeImage.createFromPath(
    path.resolve(__dirname, '../../../build/icon2.png'),
  );

  const tray = new Tray(icon);

  const menu = Menu.buildFromTemplate([
    {
      label: '打开',
      click() {
      },
    },
    {
      label: '退出',
      click() {
      },
    },
  ]);

  tray.setContextMenu(menu);

  return tray;
}