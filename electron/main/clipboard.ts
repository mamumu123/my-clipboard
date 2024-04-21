import { BrowserWindow, clipboard } from 'electron';

let previousText = '';

export async function subscribeClipboard(win: BrowserWindow) {
    // 监表
    setInterval(() => {
        const text = clipboard.readText() || '';
        if (text && text !== previousText) {
            win.webContents.send('clipboard-change', text);
            previousText = text;
        }
    }, 1000);
}