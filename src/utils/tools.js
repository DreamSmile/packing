import { Toast, Dialog } from 'vant';
export function showToast(msg, opts = {}) {
    let obj = {
        duration: 0,
        forbidClick: true,
        overlay: false,
        message: msg
    };
    Object.assign(obj, opts);
    Toast(obj);
}
export function showDialog(msg, title = '提 示', opts = {}) {
    Object.assign(opts, {
        message: msg,
        title: title
    });
    return Dialog.alert(opts);
}