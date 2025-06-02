import { session_set, session_check } from './js_session.js';
import { generateJWT } from './js_token.js';
import { checkAuth } from './js_token.js';
import { decrypt_text } from './js_crypto.js';

function setCookie(name, value, expiredays) {
    var date = new Date();
    date.setDate(date.getDate() + expiredays);
    document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString() + ";path=/" + ";SameSite=None; Secure";
}

function getCookie(name) {
    var cookie = document.cookie;
    if (cookie !== "") {
        var cookie_array = cookie.split("; ");
        for (var index in cookie_array) {
            var cookie_name = cookie_array[index].split("=");
            if (cookie_name[0] === name) {
                return cookie_name[1];
            }
        }
    }
    return;
}

function login_count() {
    let cnt = parseInt(getCookie("login_cnt") || 0);
    cnt += 1;
    setCookie("login_cnt", cnt, 1);
}

const check_xss = (input) => {
    const DOMPurify = window.DOMPurify;
    const sanitizedInput = DOMPurify.sanitize(input);
    if (sanitizedInput !== input) {
        alert('XSS 공격 가능성이 있는 입력값을 발견했습니다.');
        return false;
    }
    return sanitizedInput;
};

const check_input = () => {
    const loginForm = document.getElementById('login_form');
    const emailInput = document.getElementById('typeEmailX');
    const idsave_check = document.getElementById('idSaveCheck');
    const passwordInput = document.getElementById('typePasswordX');

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    const sanitizedPassword = check_xss(passwordValue);
    const sanitizedEmail = check_xss(emailValue);

    const payload = {
        id: emailValue,
        exp: Math.floor(Date.now() / 1000) + 3600
    };
    const jwtToken = generateJWT(payload);

    if (emailValue === '' || passwordValue === '') {
        alert('이메일과 비밀번호를 입력하세요.');
        return false;
    }

    if (emailValue.length < 5 || passwordValue.length < 12) {
        alert('아이디/비밀번호 길이를 확인하세요.');
        return false;
    }

    const hasSpecialChar = /[!,@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(passwordValue);
    const hasUpperCase = /[A-Z]/.test(passwordValue);
    const hasLowerCase = /[a-z]/.test(passwordValue);

    if (!hasSpecialChar || !hasUpperCase || !hasLowerCase) {
        alert('비밀번호는 대소문자, 특수문자를 포함해야 합니다.');
        return false;
    }

    if (!sanitizedEmail || !sanitizedPassword) {
        return false;
    }

    if (idsave_check.checked) {
        setCookie("id", emailValue, 1);
    } else {
        setCookie("id", "", 0);
    }

    session_set();
    localStorage.setItem('jwt_token', jwtToken);
    login_count();
    decrypt_text(); 
    if (sessionStorage.getItem("register_user")) {
        decrypt_text();
    }
    loginForm.submit();
    
};

document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login_btn");
    if (loginBtn) {
        loginBtn.addEventListener('click', check_input);
    }
    if (window.location.pathname.endsWith("index.html")) {
        checkAuth();
    }
});

