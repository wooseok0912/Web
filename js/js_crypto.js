import { session_set, session_get, session_check } from './js_session.js';

function encodeByAES256(key, data) {
    const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(""),        // IV 초기화 벡터
        padding: CryptoJS.pad.Pkcs7,            // 패딩
        mode: CryptoJS.mode.CBC                 // 운영 모드
    });
    return cipher.toString();
}

function decodeByAES256(key, data) {
    const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString(CryptoJS.enc.Utf8);
}

export function encrypt_text(password) {
    const k = "key";                       // 클라이언트 키
    const rk = k.padEnd(32, " ");          // AES256은 key 길이가 32
    const b = password;
    const eb = encodeByAES256(rk, b);      // 실제 암호화
    console.log(eb);                       // 암호화된 텍스트 출력
    return eb;
}

export function decrypt_text() {
    const k = "key";                   
    const rk = k.padEnd(32, " ");          
    const eb = sessionStorage.getItem("register_user"); 

    if (!eb) {
        console.log("회원가입 세션이 없습니다. 복호화하지 않습니다.");
        return;
    }

    try {
        const bytes = CryptoJS.AES.decrypt(eb, CryptoJS.enc.Utf8.parse(rk), {
            iv: CryptoJS.enc.Utf8.parse(""),
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });

        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
        const parsedObj = JSON.parse(decryptedText);
        console.log("복호화된 회원가입 정보:", parsedObj);
        return parsedObj;
    } catch (e) {
        console.error("복호화 중 오류 발생:", e);
    }
}

