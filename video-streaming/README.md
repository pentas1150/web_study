# Introduction
- 시작계기
  - 각종 예능 동영상 파일을 클라우드에 올리는 과정이 귀찮아서 개인 웹서버로 보면 스마트폰으로도 쉽게 시청이 가능할 것 같아 개발 시작함

- 간단한 소개
  - 시작은 동영상 플레이였지만 점차 블로그스러운 느낌으로 웹페이지를 변경함

# Using Tools
- [Express](https://expressjs.com/): 웹 프레임워크
- [Multer](https://www.npmjs.com/package/multer): 파일 업로드 패키지
- [Sequelize](https://sequelize.org/): ORM(Object Relational Mapping) 패키지
- [Passport](https://www.npmjs.com/package/passport): 회원가입 패키지 (Passport-kakao)
- [Mongoose](https://mongoosejs.com/): ODM(Object Document Mapper) MongoDB의 Document를 Object로 변환해주는 패키지
- [Redis](https://redis.io/): 오픈소스 인메모리 데이터베이스로 세션 정보 저장용으로 사용함

# Results
1. Bootstrap을 이용한 웹페이지 구성

2. 페이지네이션 및 게시글 검색 가능

3. CKEditor를 이용하여 게시글 작성

4. Redis Store로 session정보 저장

5. MongoDB를 사용한 게시글 및 회원 정보 저장

6. Passport를 사용한 local 로그인 기능 및 session

7. Multer를 이용한 이미지 파일 업로드
