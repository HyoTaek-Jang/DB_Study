[https://blog.voidmainvoid.net/category/%EB%B9%85%EB%8D%B0%EC%9D%B4%ED%84%B0/nosql]

# NoSQL

1. 관계형 데이터베이스의 한계가 커짐. 데이터는 커져만 가는데, 관계형 데이터베이스로는 저장/관리 힘듦. scale out하기에 기존 RDB(Relational Data Base)는 많은 비용을 지불해야 함.
2. 고정된 테이블 스키마와 조인 개념을 사용하지 않도록 모델링.
3. 빅데이터에 NoSQL이 더 적합함.

## NoSQL 종류들

- Key-value : Dynamo, Redis, Voldemort, Riak
- Column Oriented : Cassandra, HBase, Big Table
- Document : MongoDB, Couchbase
- Graph : Neo4j

NoSQL : ACID를 지원하지 않고, 원자적 트랜잭션을 지원한다.

## NoSQL 데이터 모델

1. Key-Value 모델
   Key를 이용해 value에 접근하는 구조. 어떠한 형태(List, Set 등)의 데이터든 저장이 가능함. 각 DB별로 value의 최고 저장 size가 있으므로 이점을 유의. Key를 기반으로 정렬/비정렬 가능한점이 다름.
2. Document 모델
   집합 구조를 문서형태로 확인 가능. document하나의 크기 제한이 있으므로 유의. 집합 내의 필드를 이용해 쿼리 할수 있음. 문서는 주로 JSON 또는 BSON(Binary JSON)이다. 문서내의 값들은 필드라는 형태로 존재.
3. Column Family 모델
   두 단계의 집합(Map) 구조. Row Key에 다수의 column&value가 들어감. Row key로 자동정렬, column key로 자동정렬 가능.(각 NoSQL마다 상이) 하나의 행에 수천~수만개의 컬럼을 저장가능.
4. Graph 모델
   Entity와 Entity 사이의 관계를 저장하는 형태. 대부분 분산DB가 아님. RDB처럼 ACID를 지원.

### Amazon DynamoDB

- 완전히 관리(Fully managed)되는 AWS 상의 NOSQL 데이터베이스

#### DynamoDB 장점

▪ EC2 + DB Engine를 올리는 전통적인 방식이 아님. 사용량만 조절하면 자동으로 늘어나고 줄어든다. 사실상 DBA가 필요없는..
▪ 대용량, 뛰어난 확장성, 신뢰성
▪ 10ms 미만의 빠르고 일관된 성능
▪ Key-Value Store(Hash 기반)
▪ 이벤트 기반의 프로그래밍 지원(with serverless function Lambda trigger)
▪ 용량제한 없는 Storage

- 하나의 키(필수)가 있고 여기에 속하는 밸류가 가변적으로 들어감.
- item(ROW)과 attr(COL)로 구성됨

### Document Database

- 컬럼 없음 → Schema 없음
- Document 내에 Field를 정의함 ( Key : Value )
- Key에 대한 값은 Document가 될 수 있음 ( Embedded Document )
- Key에 대한 값은 배열이 될 수 있으며, 배열의 값으로 Document를 포함할 수 있음
- 집합적 데이터 모델 : 관계형 DB에서의 여러개 테이블 데이터를 하나의 Document에 모아둘 수 있음

```
{
  "_id" : "mspark11",
  "name" : "박명수",
  "phones" : [ "010-2452-8864", "02-2214-3521" ],
  "title" : "수석 컨설턴트",
  "team" : { "name" : "기술컨설팅팀", "code" : "Z03212" }, "schedules" : [
    { "time" : "20150311130000", "loc" : "과천", "work" : "업무협의" },
    { "time" : "20150402150000", "loc" : "강남역", "work" : "제휴상담" },
    { "time" : "20150211100000", "loc" : "종로", "work" : "전략회의", "done": true },
    { "time" : "20150211170000", "loc" : "삼성동", "work" : "세미나 참석", "done" :true }
  ]
}
```

#### 몽고 디비

쿼리 사용법
[https://blog.voidmainvoid.net/239?category=719906]
설계 방법
[https://blog.voidmainvoid.net/241?category=719906]
