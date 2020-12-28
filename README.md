# DB 학습일지

### 20년 12월 28일

- 깃레포 생성
- DB의 핵심 : input의 CUD, output의 R
- 스프레드시트는 파일과 DB 사이에 있음.
- 관계형 DB 먼저 배우고 아닌것도 배워라(MongoDB)
- 관계형으로 처리가 힘든걸 억지로 끼워맞추기보다, 다양한 DB를 다룰 수 있는 NoSQL이 나옴.
- mysql 실행법, cmd에서 mysql -uroot -p
- uroot는 root라는 사용자로 접속. 근데 루트로 다루는건 좀 위험함. 너무 권한이 쎔 -p는 비밀번호 입력
- 테이블을 그룹한게 데이터베이스(스키마schema) 스키마를 묶어서 데이터베이스 서버
- db는 어느정도 보안이 됨. 권한 등록도 됨

### 스키마 관련

- CREATE DATABASE name;
- Drop DATABASE name은 없애는거
- SHOW DATABASES : 스키마 보여줘
- USE name; nmae 스키마를 사용하겠다.

### SQL

- Structured 구조화된 Query DB에 다양한 요청해줘 Language 서로 이해할 수 있는 언어

### table 표

- row ,record, 행
- column, 열

### 테이블 생성

- cheat sheet 컨닝 페이퍼 느낌... 검색 팁 Mysql create table cheat sheet
- 생성 : USE하고 CREATE TABLE name( 열이름 type(INT)(얼마까지 노출시킬까 보통 11) NOT NULL(널을 허용하지 않음) AUTO_INCREMENT(자동으로 1증가) )
- VARCHAR(num) : type의 일종. 값의 크기를 지정할 수 있음.
- DATE 형식
- 맨 마지막에 PRIMARY KEY(~)로 중복을 막고 가장 중요한 키라는 것을 알려줌. id값 같은거
  ```
  CREATE TABLE topic(
  -> id INT(11) NOT NULL AUTO_INCREMENT,
  -> title VARCHAR(100) NOT NULL,
  -> description TEXT NULL,
  -> created DATETIME NOT NULL,
  -> author VARCHAR(30) NULL,
  -> profile VARCHAR(100) NULL,
  -> PRIMARY KEY(id));
  ```
- DESC name;
- SHOW TABLES;

### 값 넣기

- INSERT INTO name;
- INSERT INTO topic (title, description, created, author, profile) VALUES('MYSQL', 'sql is...', NOW(), 'taek', 'top');
- 테이블 구조보기 DESC name;

### 값 보기

- SELECT\* FROM topic; (모든거 다 출력)
- 가장 많이 사용됨 크리에이티드도 많이 사용함 인서트도 많이씀
- SELECT id,title FROM topic;
- SELECT id,title FROM topic WHERE author = "taek";
- SELECT id,title FROM topic WHERE author = "taek" ORDER BY id DESC;
- SELECT id,title FROM topic WHERE author = "taek" ORDER BY id DESC LIMIT 2;

### 값 수정

- UPDATE topic SET autor = 'john' WHERE id=4;

### 값 삭제

- DELETE FROM topic WHERE id = 4;

### 왜 관계형 DB가 필요한가

- 서로 테이블간 관계를 형성하여 재사용성을 증대시킴. 확장 수정에 용이함.
- 트레이드오프 : 장점이 생기면 단점도 생김. 단점으로는 보기에 불편함. 한 테이블에 다 나오는게 아니라 직관적인 분석이 안됨.
- 근데 이걸 MySQL이 해결함. 저장은 분산, View는 합쳐서
- RENAME TABLE 원래네임 TO 다른이름;

### 테이블 이어주기

- JOIN!!
- SELECT \* FROM topic LEFT JOIN author ON topic.author_id = author.id;
