// logout 기능만 따로 정의
function setCookie(name, value, expiredays) {
    var date = new Date();
    date.setDate(date.getDate() + expiredays);
    document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString() + ";path=/" + ";SameSite=None; Secure";
}

function getCookie(name) {
    var cookie = document.cookie;
    if (cookie != "") {
        var cookie_array = cookie.split("; ");
        for (var i = 0; i < cookie_array.length; i++) {
            let pair = cookie_array[i].split("=");
            if (pair[0] == name) return pair[1];
        }
    }
    return null;
}

function logout_count() {
    let cnt = parseInt(getCookie("logout_cnt") || 0);
    cnt += 1;
    setCookie("logout_cnt", cnt, 1);
}

function logout() {
    logout_count(); // 로그아웃 횟수 증가
    sessionStorage.clear(); // 세션 삭제
    localStorage.removeItem('jwt_token'); // 토큰 삭제
    setCookie("id", "", 0); // 쿠키 삭제
    alert("로그아웃 되었습니다.");
    window.location.href = "../index.html"; // 메인 페이지로 이동
}

// HTML에서 onclick="logout()" 사용 가능하게 export
window.logout = logout;
