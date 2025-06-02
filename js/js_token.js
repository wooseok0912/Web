// JWT 비밀 키 (실제 운영 환경에서는 복잡한 키 사용 필수)
const JWT_SECRET = "your_secret_key_here";

export function generateJWT(payload) {
    // 1. 헤더 생성 및 Base64 인코딩
    const header = { alg: "HS256", typ: "JWT" };
    const encodedHeader = btoa(JSON.stringify(header));
    // 2. 페이로드 Base64 인코딩
    const encodedPayload = btoa(JSON.stringify(payload)); // JSON 형태로 변환 후 인코딩
    // 3. 서명 생성 (HMAC-SHA256 알고리즘 사용)
    const signature = CryptoJS.HmacSHA256(`${encodedHeader}.${encodedPayload}`, JWT_SECRET);
    const encodedSignature = CryptoJS.enc.Base64.stringify(signature);
    // 4. 최종 토큰 조합
    return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

function verifyJWT(token) { // 토큰 검증
    try {
        // 1. 토큰을 헤더, 페이로드, 서명으로 분할
        const parts = token.split('.');
        if (parts.length !== 3) return null; // 형식 오류 체크
        const [encodedHeader, encodedPayload, encodedSignature] = parts;

        // 2. 서명 재계산 및 비교
        const signature = CryptoJS.HmacSHA256(`${encodedHeader}.${encodedPayload}`, JWT_SECRET);
        const calculatedSignature = CryptoJS.enc.Base64.stringify(signature);
        if (calculatedSignature !== encodedSignature) return null; // 서명 불일치

        // 3. 페이로드 파싱 및 만료 시간 검증
        const payload = JSON.parse(atob(encodedPayload)); // 디코딩 후 해석
        if (payload.exp < Math.floor(Date.now() / 1000)) { // 초 단위 만료 검사
            console.log('보안 토큰이 만료되었습니다');
            return null;
        }

        return payload; // 검증 성공
    } catch (error) {
        return null; // 파싱 오류 또는 기타 예외 처리
    }
}

function isAuthenticated() { // 사용자 인증 상태 확인
    const token = localStorage.getItem('jwt_token');
    if (!token) return false; // 토큰 없음

    const payload = verifyJWT(token);
    console.log(payload);
    return !!payload; // 페이로드 유무로 인증 상태 판단
}

export function checkAuth() {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
        console.log('토큰 없음. 로그인 필요');
        return false;
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        if (payload.exp > currentTime) {
            alert("이미 로그인된 사용자입니다.");
            window.location.href = "login_index.html";
            return true;
        } else {
            alert("토큰이 만료되었습니다. 다시 로그인하세요.");
            localStorage.removeItem('jwt_token');
            return false;
        }
    } catch (e) {
        console.error("토큰 분석 실패", e);
        localStorage.removeItem('jwt_token');
        return false;
    }
}

