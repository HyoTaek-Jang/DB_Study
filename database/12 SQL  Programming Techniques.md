### Approaches to DB programming

SQL을 프로그램 안에 임베디드 시킴.
자바 C 파이썬 코드 안에 SQL이 들어감

1.  자바에서 SQL을 수행할 수 있도록
    precompiler preprocessor(SQL임을 알수있는 키워드)가 필요함.

2.  Function call
    function 라이브러리가 있어야함.
    API, 메소드에 파라미터로 SQL을 넘기면 됨.
    syntax의 확장이 없음.
3.  brand-new language

1,2가 common함

프로그래밍 언어랑 데이터베이스 모델은 다름.

변수랑 테이블은 다름.

플밍이랑 디비 연결 방식

### impedance mismatch를 해결하기 위해

1. binding
   튜플은 밸류하나가 아니라 연결되있음.
   그걸 튜플은 애트리뷰트가 여러개라 변수를 어사인해줘야함. -> 바인딩
   프로그램은 커서랑 이터레이터가 필요함. 튜플을 하나씩 읽기위해

디비 서러아 커넥션이 되야함.
그 후, 쿼리를 던짐
다 하면 터미네이트

---

### Embedded SQL and SQLJ

## Embedded SQL -> C

프로그래밍 렝귀지에 새로운 키워드가 들가햐암 -> EXEC SQL 여기부터 SQL이라는거. 그 후 ;로 끝냄
플밍이랑 쿼리에서 둘다 사용하기 위한 Shared variables ㅇㅒ 앞에는 :이 붙음

EXEC SQL BEGIN 이렇게 사용함
EXEC SQL END

### Connecting to the db

CONNECT TO <server name> AS <connection name>
AUTHORIZATION <user account name and password>;

### change connection

SET CONNECTION <connection name>;

### Terminate connection

DISCONNECT <connection name>;

SQLCODE -> int, 시퀄이 익스큐전했을때 에러가 있냐 없냐를 갖고있음.
0 -> success, 100 -> 쿼리결과에 더이상 데이터가 없다 <0 -> 에러

쿼리가 한개의 튜플만 가져올때!

일반 씨코드에서 시퀄 넣기
EXEC SQL ~~~~~~~~~ ; 그래서 프리프로세서가 이걸 꺼냄.
'~~~~' 안에 :~~ 하면 쉐어드 베리어블

SQLSTATE -> CHAR, STRING -> 똑같은데 char string으로 표현

### 멀티플 듀플

시퀄 결과가 테이블이면 하나씩 어세스하려고 커서가 필요함.
OPEN CURSOR, CROSS CURSOR
각 커서로 하나의 튜플에 액새ㅔ스하는 FETCH가 있음.

커서 익스큐전 EXEC SQL DECLARE EMP CURSOR FOR ~~~~~~;해야해! 커서 정의
FOR UPDATE OF ~~ ~~는 업데이트에 쓰인다.

EXEC SQL IPEN EMP 커서 오픈

그담 EXEC SQL FETCH from EMP into ~~~~; 패치

Fetch orientation. 위치조정 가능 NEXT, PRIOR, FIRTST, LAST, ABSOLUTE i, and RELATIVE i 이렇게

## SQLJ -> java

모든 SQL을 지원하는건 아님.
클래스를 임포트해야함.
익셉션 핸들링 사용함

트라이 캐치함.

### 싱글 튜플

트라이 안에 #sql 키워드를 넣고 {} 안에 시퀄 넣음. :앞에 붙이면 쉐어드변수
그리고 캐치에서 SQLException 걸어줌
멀티플하면 이터레이터를 사용함.

### 멀티 튜플

1. named iterator
   #sql iterator Emp(String fname ...); // 이런식으로 타입과 변수명이 같이 쓰임
   Emp e = null;
   #sql e = {~};
   while (e.next()){~};
   e.close();

2. position iterator

#sql iterator Emppos(String ..); // 타입만 적혀있음
Emppos e = null
#sql e = {select ssn, fname, minit .... from EMPLOYEE where Dno = :dnumber};
while (!e.endFetch()){
~
#sql { fetch :e into :ssn, :fn, :mi, :ln};
};
e.close();

---

SQL Call Level Interface (SQL/CLI) : function call하기위해 API가 있음

## using C

Environment record : 하나 또는 그 이상의 디비 커넥션
Connection record : 커넥션 중 특정 커넥션
statement record : 익스큐전할 스테이트 먼트
Description record : xbvmfdlsk vkfkalxjdp eogks wjdqh
Handle to the record : 튜플에대한 레코드가 필요함

ret1 = SQLAllocHandle(SQL_HADLE_ENC, SQL_NULL_HANDLE, &env1); -> env에 대한 핸들러로 정의됨
강의노트 참고

---

## using java

JDBC를 사용함. 통합라이브러리의 느낌 db를 커넥션하는 라이브러리
싱글 자바가 여러 디비 연결이 됨

기본세팅
Connection object
statement object
question mark ? symbol
resultSet object

import java.sql.\*;

Calss.forName("~~") 난 이 db를 쓰겠다!
쿼리문을 String으로 하고 Prepared
강노 참고

## 많이 안쓰지만 stored procedures and func

dbms가 프로그램 모듈을 저장함 -> Stored procedure
extensions to SQL -> 일반적인 프로그래밍 랭귀지 기본 기능

db프로그램이 여러 앱에 필요할때 사용함
데이터 트랜스퍼나 커뮤니케이션 코스트가 줄어듬
리턴벨류가 없으면 procedure
리턴벨류 있으면 function

파라미터는 SQL data type을 갖고있음
파라미터 앞에는 IN, OUT or INOUT

부를땐
CALL <procedure or funtion name>(<arg>);
