# 첫 Blog 개발기
Project URL: https://github.com/pentas1150/web_study/tree/master/video-streaming

# Introduction
- 시작계기
  - 각종 예능 동영상 파일을 클라우드에 올리는 과정이 귀찮아서 개인 웹서버로 보면 스마트폰으로도 쉽게 시청이 가능할 것 같아 개발 시작함

- 간단한 소개
  - 시작은 예능 시청용 웹페이지였지만 점차 블로그스러운 느낌으로 웹페이지를 변경함

# Using Tools
- [Express](https://expressjs.com/): 웹 프레임워크
- [Multer](https://www.npmjs.com/package/multer): 파일 업로드 패키지
- [Passport](https://www.npmjs.com/package/passport): 회원가입 패키지 (Passport-kakao)
- [Mongoose](https://mongoosejs.com/): ODM(Object Document Mapper) MongoDB의 Document를 Object로 변환해주는 패키지
- [Redis](https://redis.io/): 오픈소스 인메모리 데이터베이스로 세션 정보 저장용으로 사용함

# Results
### Screenshots
- 메인 화면
<img src="https://postfiles.pstatic.net/MjAyMDA5MDJfMjk4/MDAxNTk5MDIwOTYxNzI4.m9HeCFD_e5CcfudRRgEbse7hCE5kYV4pkSToX4gXhNsg.dlR2EBLkZAqSt7NCH5s75eEw13-9IDSchaUhBIZV1sgg.PNG.ffanys_/3.png?type=w966" width="600px">

- 로그인 화면
<img src="https://postfiles.pstatic.net/MjAyMDA5MDJfNDUg/MDAxNTk5MDIwOTYwNzE4.UuxWy_fCEig9HcO_iUlcsk5EOp56z9HL79XkkFrO450g.qRcK6FV5ehS8pcMABkrKZrFivlgrrPrd_BRbdg7wr08g.PNG.ffanys_/1.png?type=w966" width="600px">

- 게시글 작성 화면
<img src="https://postfiles.pstatic.net/MjAyMDA5MDJfOCAg/MDAxNTk5MDIwOTYxNzU3.u0iXQkYf0sfdRsyI4Nn4V2AfNrA_KN8Zw2CjPFh5fG8g.MD9lqeVG3y5WR4Hs6pSi8qXbXw8sVhd2cJaNpNoOiHEg.PNG.ffanys_/2.png?type=w966" width="600px">

- 게시글 및 댓글 화면
<img src="https://postfiles.pstatic.net/MjAyMDA5MDJfMjk2/MDAxNTk5MDIwOTYxODQw.FQGgpr75-1DgomAw6T7grVXRuX2H_D_9clfDi2Imf6kg.OHkVbZ1odTGZk7XN5-bpd5qPLL3HsPyX8716g3D3LfAg.PNG.ffanys_/4.png?type=w966" width="600px">

### Notes
1. Bootstrap을 이용한 웹페이지 구성

2. 페이지네이션 및 게시글 검색 가능

3. CKEditor를 이용하여 게시글 작성

4. Redis Store로 session정보 저장

5. MongoDB를 사용한 게시글 및 회원 정보 저장

6. Passport를 사용한 local 로그인 기능 및 session

7. Multer를 이용한 이미지 파일 업로드

# How to Use
- .env 파일 생성 후 아래의 변수명 기입
  - COOKIE : 쿠키의 시크릿 키
  - MONGO_ID : 몽고DB의 루트 아이디
  - MONGO_PW : 몽고DB 루트 아이디의 비밀번호
  - MONGO_DB : 해당 프로젝트와 연결할 DB의 이름
  - BASE_IP : 도메인명(or IP)과 포트번호 ex)localhost:3412
  - INVITE_CODE : 회원가입 시 입력해야하는 가입 코드
  - VIDEO_PATH : 동영상 파일이 저장될 디렉토리 경로
