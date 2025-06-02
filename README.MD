# HTML 프로젝트 - 깃허브
새로운 시작! 웹 서비스 개발의 세계로 떠나보아요~
## Getting Started
This project is a starting point for a Web application.
- [http://127.0.0.1:5500/index.html](https://github.com/wooseok0912/WEB_MAIN)
## 2주차 수업 메인화면 개발 완료! (문제 포함)
- <html>,<head>,<title>,<body>,<script>,<div> 등 태그 실습
- 네비게이션바 메뉴, 이미지 삽입

## 3주차 수업 부트스트랩 적용 완료! (문제 제외)
- <a href>태그로 하이퍼링크 삽입
- 테이블로 표 삽입 <tr>:행 <th>:열,제목셀 <td>:데이터 셀

## 4주차 검색 창 구현하기!
- 메인 이미지를 반응형 이미지로 수정 class="img-fluid"
- js로 검색 창 버튼 기능 구현
- test.js 작성
- search.js 작성
연습문제 :
 현재 식별자 값은? search_btn
 같은 이름의 함수가 중첩하면 에러가 나는가? NO. 
 실행하는 경우 어떤 함수가 우선 순위가 높은가? 나중 함수가 이전 함수를 덮어쓴다. -> 나중 함수가 실행됨.
 


## 5주차 팝업창 생성하기!
- data_type.js 작성
- search.js 수정
- popup폴더 생성, 그 안에 popup.html 작성
- pop_up.js는 js폴더에 작성
- popup.js에 호버함수 추가. index.html의 로고 이미지 속성 수정

## 6주차 로그인 폼 구현하기!
- login폴더 생성. login.html작성.
- css폴더 생성. login.css파일 작성
- 이메일, 패스워드 name 속성 추가.
- 로그인 시 공백체크

## 9주차 입력필터링, 쿠키
- check_input함수로 입력값의 길이와 특수문자를 필터링.
- DOMPurify 라이브러리로 XSS방지

## 10주차 데이터 저장(쿠키, 세션)
- session.js 추가

## 11주차 암호화
- crypto.js 작성 및 login.html, index_login.html의 head에 연동
- token.js을 login.html, index_login.html의 head에 연동

## 12주차 회원가입
- module 기능으로 파일로딩
- session.js의 set, get, check와 cryto,token의 몇몇 함수 앞에 export 처리
- session.js에서 웹 세션을 객체로 저장하는 기능을 구현
- login.html을 복사하여 회원가입 페이지 join.html 만들기
- join.js 작성

## 13주차 프로필 화면 구현 및 지도 API활용
- index.login.html을 수정하여 개인 프로필 페이지 접근버튼 만들기
- login폴더에 profile.html파일 작성
- profile.html에 카카오 자바 맵 api를 추가
- js 폴더에 map.js 작성
- 주소를 성결대학교로 설정
- 지도타입 컨트롤, 줌 컨트롤, 지형정보 표시, 마커 표시, 키워드 검색 및 출력 구현
