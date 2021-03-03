## SQL 문법의 종류

- DDL : 데이터 정의 언어, 각 릴레이션을 정의하기 위해 사용하는 언어 (CREATE, ALTER, DROP)
- DML : 데이터 조작 언어, 데이터를 관리 하는 언어(SELECT, INSERT, UPDATE)
- DCL : 데이터 제어 언어, 사용자 관리 및 사용자별로 릴레이션 또는 데이터를 관리하고 접근하는 권한을 다루기 위한 언어. (GRANT, REVOKE)

## 언어적 특성

1. SQL은 대소문자 구분 x
2. 명령은 세미콜론을 꼭 붙인다.
3. 고유값은 따옴표로 감쌈
4. 객체는 백틱으로 감쌈

## SQL문

```
WHERE NAME LIKE '박%'

WHERE SALARY BETWEEN 200 AND 300

ORDER BY NAME ASC
*ASC 오름차순

GROUP BY 'RANK'
랭크로 묶음

AVG(~)
평균내기
```

### 데이터 모델링

- 현실 세계의 데이터를 변환하여 컴퓨터 데이터베이스에 저장하는 과정을 데이터 모델링이라고 하며, 특정 데이터를 선별 및 정리하는 과정을 추상화라고 한다.
- 데이터 사이의 관계와 그 흐름에 필요한 처리 과정과 제약 조건 등을 추상화하여 표현한 개념적인 모형을 데이터 모델이라고 한다.
- 데이터 모델은 개념적 데이터 모델과 논리적 데이터 모델로 나뉜다.

  ### 개념적 데이터 모델

        - 사람이 이해할 수 있는 추상적인 구조로 표현한 모델. ER모델

  ### 논리적 데이터 모델

        - 컴퓨터가 이해하도록 변환.
            1. 관계형 데이터 모델
            2. 계층 모델
            3. 네트워크 모델

### ER모델

    - Entity : 저장할 가치가 있는 중요 데이터를 가진 사람이나 사물, 개념

    - Attribute : 개체 혹은 관계가 가진 고유 특성

    - Relationship : 개체와 개체 사이의 연관성 및 개체 집합 사이의 대응 관계, 즉, 매핑

### 관계 데이터 모델

```
릴레이션(Relation)
: 하나의 개체에 관한 데이터를 2차원 테이블 구조로 저장한 것을 뜻합니다.

속성(Attribute)
: 테이블 각각의 열을 지칭하는 단어로 필드 혹은 칼럼이라고도 부릅니다. 위 직원 테이블에서 속성은 '사번', '이름', '부서', '직급', '입사일' 총 5개 존재합니다.

튜플(Tuple)
: 테이블 각각의 행을 지칭하는 단어로 레코드라고도 부릅니다.

차수(Degree)
: 테이블에서의 속성 총 개수를 의미합니다. 위 직원 테이블의 차수는 5입니다.

카디널리티(Cardinality)
: 테이블에서의 튜플 총 개수를 뜻합니다. 위 직원 테이블의 카디널리티는 5입니다.

도메인(Domain)
: 도메인이란 각각의 필드(속성)에 입력 가능한 값의 범위를 뜻합니다. 좀 더 명확하게 말하자면 각 속성이 가질 수 있는 모든 값의 집합이라고 보시면 됩니다.

널(NULL)
: 특정 속성값을 알지 못하거나 아직 값이 정해지지 않아 입력하지 못한 경우 갖게 되는 값을 NULL이라고 지칭합니다. NULL은 0 또는 공백과는 다른 의미를 있습니다. 0이나 공백은 숫자 0, 문자 ' '로 그 자체의 값을 가지지만 NULL은 그 어떤 값도 없는 정보의 부재를 표현하는 데 사용합니다. 이는 데이터베이스에서 매우 중요한 개념이니 꼭 숙지하고 넘어가시기 바랍니다.
```

### 자료형

- 숫자형
  - integer 4byte
  - flat 실수 4byte
  - number 숫자형 22byte 가변길이
- 문자형
  - char 고정길이 문자, 지정 길이보다 짧으면 공백으로 채움
  - varchar 가변길이, 지정보다 짧으면 안채움.
- 날짜형
  - date 일자 3byte
  - time 시간 3byte
  - timestamp 일자 + , 시스템 변경시 시간 자동으로 그 날짜와 시간 저장

### DLL

- desc table 속성 보여줌
- ALTER : 객체 수정.

```sql
칼럼 추가

ALTER TABLE DWELLERS ADD PHONE VARCHAR(20) AFTER NAME;

FIRTST도 이씀

dwellers 테이블에 phone 필드 추가 name필드 다음에
```

```sql
칼럼 수정
ALTER TABLE DWELLERS CHANGE PHONE TEL VARCHAR(20);
DESC DWELLERS; -- 테이블 확인하기

ALTER TABLE DWELLERS MODIFY TEL INT(11);
기존 필드 자료형 수정

ALTER TABLE DWELLERS DROP TEL;
특정 필드 삭제

ALTER TABLE DWELLERS RENAME PERSONS;
테이블명 변경
```

```sql
TRUNCATE TABLE EMP;
레코드 비우기
```

### key : 자료를 식별할 수 있는 속성 또는 그 속성을 묶은 집합

- 키의 두가지 특징
  1. 중복된 값을 허용하지 않음. 유일성
  2. 최소성

### 후보키

    - 각각의 레코드를 식별할 수 있는 고유 속성의 집합. 유일성과 최소성 모두 만족
    - 하지만 항상 후보키가 단일 필드로 이루어지지는 않음

### 기본키

    - 후보키 중에서 선택하는 주 키로 1개만 지정
    - 기본키로 선택되면 NULL이 안되고 중복 값 또한 저장할 수 없다.

### 대체키

    - 후보키가 둘 이상이면 기본키를 제외한 나머지 후보키가 대체키임

### 슈퍼키

    - 슈퍼키는 테이블에서 각각의 레코드를 식별할 수 있는 하나 또는 여러 개 속성의 집합
    - 유일성만 만족하면 모두가 슈퍼키
    - 묶음으로 가능

```sql
CREATE TABLE CON2(
NAME	VARCHAR(10),
AGE 	INT					UNIQUE
);

위 구문에서 unique는 중복 값을 막음
```

### 외래키

    - 다른 테이블의 기본키를 참조하는 속성
    - 기본키와 외래키 사이의 관계가 항상 유지되어야함. -> 참조 무결성

```sql
ALTER TABLE <테이블 명> ADD CONSTRAINT <제약 조건 명> FOREIGN KEY (칼럼 명) REFERENCES <부모 테이블> (부모 테이블의 기본키 필드명);

ALTER TABLE EMP_ORDER ADD CONSTRAINT FK_ORDER_EMP_ID FOREIGN KEY(EMP_ID) REFERENCES EMP(EMP_ID);
```

### ON키워드

- ON UPDATE <제약조건>
- ON DELETE <제약조건>
- 제약 조건 : NO ACTION(default), RESTRICT : 참조하는 테이블에서 해당 레코드의 기본키를 더이상 참조하지 않아야 수정 삭제 가능.

- ON UPDATE,DEL SET NULL : 기본키가 바뀌면 NULL로 외래키 바꿈, 그래서 꼭 외래 테이블은 NULL 허용

### 제약 조건 제거

- 변경이 불가함. 제거하고 새로 만들어야함.

```
PRIMARY KEY 제약 조건 제거하기
: ALTER TABLE <테이블 명>  DROP PRIMARY KEY;

UNIQUE 제약 조건 제거하기
: ALTER TABLE <테이블 명>  DROP INDEX <제약 조건 명>;

외래키 제약 조건 제거하기
: ALTER TABLE <테이블 명>  DROP FOREIGN KEY <제약 조건 명>;
```
