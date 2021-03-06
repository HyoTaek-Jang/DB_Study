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
- 만약 \*이 아닌 특정 구문을 보여줄때 겹치는 행이 있으면 표기해줘야함.

### 클라이언트랑 서버 연결

- mysql -uroot -p -h(호스트주소 ex) localhost)

### 20년 12월 29일

- package.json에서 필요한 모듈 다운받기 (ex sanitize-html). cmd에서 패키지 제이손 있는 폴더로 가서 npm install하면 알아서 다운받아줌

### 20년 12월 31일

- node에서 mysql사용

1. mysql 모듈 require로 가져오기
2. createConnection으로 db 연결하기
3. .connect() 연결하고 데이터 가져올땐 .query() 가져다 쓰기

```
var mysql = require("mysql");
//mysql 모듈 사용
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "wkdWkddl1218",
  database: "dbstudy",
});

connection.connect();

connection.query("SELECT * FROM topic", function (error, results, fields) {
  if (error) {
    console.log(error);
  }
  console.log(results);
});

connection.end();

```

```
 db.query(
          `SELECT * FROM topic WHERE id = ${queryData.id}`,
```

- 여기서 쿼리데이터.id를 직접주는것이 아닌

```
db.query(
          `SELECT * FROM topic WHERE id = ?`,[queryData.id],
```

- 로 ?에 값을 넣어주는 형식으로 걸러서 하는게 좋대

```
 db.query(
        `INSERT INTO topic (title, description, created, author_id) VALUES(?, ?, NOW(), ?)`,
        [post.title, description, 1],
        (err, result) => {
          if (err) throw err;
          console.log(result.insertId);
          response.writeHead(302, { Location: `/?id=${result.insertId}` });
          response.end();
        }
      );
    });
```

- result.insertId로 방금 insert한 row의 id를 받을 수 있음. 저거 ?는 다음 인자로 ,[]리스트에 값 순서대로 넣어주면 됨

* db활용하여 update 기능 구현, db는 title로 읽는게 아닌 id로 읽기에 id를 전달 받아야함 폼에서

```
        `UPDATE topic SET title = "${afterTitle}", description = "${description}" WHERE id = ${id}`,

```

### 21년 1월 6일

- db활용하여 콤보박스 업데이트 구현 완료
- select 안에 option 있자나? 옵션에 셀렉트 넣으면 그게 선택됨
- 수업의 정상 : 저자 추가 수정 삭제 기능.

### 코드정리

- 디비에 직접 아이디를 쓰는 건 아주 위험, 복사해서 쓰라는데? 뭐라는겨
- 하나만 내보내는거 module.export, 여러개 exports

### 21년 1월 7일

- 외부에서 들어온 정보는 다 오염됐다고 가정하고 보안에 신경써야한다.
- ?로 sql을 치환해서 쓰면 안전하게 db를 사용할 수 있음
- sql을 주입하는 공격 sql injection -> ?로 막을 수 잇음
- db.query()는 한번에 여러 sql 명령을 막아둠
- 여러줄 입력하고 싶으면 db.js에서 multipleStatements : true하면 됨. 그리고 쿼리에서 ;를 찍어주면서 여러 명령 입력
- 아니면 직접 ${}로 넣어주되 db.escape(~)로 하면 sql문에서 양끝에 ''를 찍어줌 그냥 ?쓰셈

- 콘솔에서 npm --save sanitize-html 하면 설치됨 사용법은 외부에서 들어온 정보를 띄울 때 그냥 sanitizeHtml(내용)을 대신 사용하면됨
- 사용자가 입력한 정보는 살균이 필요함

### 21년 1월 10일

- 서치 기능구현. db에서 읽을때 대소문자 구분없이 읽힘.
- 노드에서 alert를 못부름 js의 부분이 아닌 윈도우 객체의 일부분이라서 ㅇㅇ

### 21년 1월 11일

- 요라밍 db 다루기 연습을 위해 디렉토리 생성. express myapp으로!
- 응답의 종류 ex) res.send() ...
  res.send(): 문자열로 응답한다.<br>
  res.json(): Json 객체로 응답한다.<br>
  res.render(): Jade같은 템플릿을 렌더링한다.
  <br> res.sendfile(): 파일 다운로드로 응답한다.
  <br> res.set(): 헤더 값을 세팅한다. 세팅 후 res.send()를 호출하면 바디없이 헤더만 보낼 수 있다.

### 21년 1월 11일

- DB 정렬기능 구현
- SELECT [칼럼명] FROM [테이블명] WHERE [칼럼명] LIKE '%특정문자열%;
- 위 쿼리를 통해 특정 문자열이 포함된 데이터 찾기 구현 기능 구현
- save할때 체크박스로 req.body를 받는데 이걸 loop 돌리기가 애매함. length가 안찍힘
- for each, for(in), for(of) 방법을 생각 -> of로 했더니 개수가 1개일때 처리가 힘듬. -> 그냥 빈 데이터를 하나 체크해놓음 그럼 무조건2개이상 체크됨 -> 실패
- 유저 테이블에 추가 기능 구현, 1개 추가 수정요망
- 테이블 정렬하여 보여주기, order by 헀는데 제대로 안됨 -> id를 CYB_1 에서 CYB_001~ 이런식으로 해야함. - 성공

### 21년 1월 13일

- 서버 외부 공개하기 : localhost를 ip주소로 바꾸면 같은 공유기를 쓰는 사람들끼린 접속이 가능함.
- 찐으로 외부에 공개하기 : ngrok 사용
- $ npm i -g ngrok
- ngrok http [PORT 번호]

- JSON 뽑기 content-type, referer 헤더에 필요함.
- 바디는 {
  "url": "/uni/uni/cour/curi/findCourCurriculumInq.action",
  "param": {
  "strYy": "2020",
  "strMjCd": "DS03001022001",
  "strFg": "1"
  }
  }

### 21년 1월 14일

- 포스트 때린 데이터 받기. app.use나 app.post("~")로 받는다. 포스트 때릴때 컨텐츠 타입을 제대로 지정해줘야함. 제이슨으로 보낼거면 컨텐츠타입도 제이슨으로!
