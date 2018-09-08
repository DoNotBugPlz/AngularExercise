/**
* @$divContainer  二维码显示的div  jquery对象
* @text           需要生成二维码的文本    若需要浏览器自动跳转，则text需要完整URL（如：http://www.baidu.com）
* @width          div宽度  可空  默认200
* @height         div高度  可空  默认200
*/
function createQrcode($divContainer, text, width, height) {
    //$('#code').qrcode(str); //html5 canvas直接调用

    $divContainer.empty();
    var str = toUtf8(text);

    $divContainer.qrcode({
        render: "table",
        width: width || 200,
        height: height || 200,
        text: str
    });
}
//转码 转为utf8 为中文进行编码
function toUtf8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
} 