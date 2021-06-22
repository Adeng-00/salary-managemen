const CryptoJS = require("crypto-js");
/* 加密工具类 */
const AES = {
  encrypt(data, secretKey) { // 加密
    let utf8Data = CryptoJS.enc.Utf8.parse(data);
    let utf8SecretKey = CryptoJS.enc.Utf8.parse(secretKey);
    var encrypted = CryptoJS.AES.encrypt(utf8Data, utf8SecretKey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
  },
  decrypt(data, secretKey) { // 解密
    var utf8SecretKey = CryptoJS.enc.Utf8.parse(secretKey);
    var decrypt = CryptoJS.AES.decrypt(data, utf8SecretKey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  }
}

const MD5 = {
  encrypt(data) {
    return CryptoJS.MD5(data).toString(); /* toString后会变成Hex 32位字符串*/
  }
}

export default {
  MD5,
  AES
}