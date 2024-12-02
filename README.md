# json-server
- fake 서버(연습용)

## 1. 자료
- [json-server] (https://www.npmjs.com/package/json-server)
- [블로그] (https://poiemaweb.com/json-server)

## 2. 프로젝트 폴더 및 파일 생성
- `server` 폴더 생성
- 터미널에 `cd server`로 터미널 프롬프트 이동
- `npm init -y`
- `npm install -g json-server` 실행
- server  폴더에 `db.json` 파일 생성
```json
{
  "todos": [
    { "id": "1", "title": "react 공부", "content": "axios 공부하자" },
    { "id": "2", "title": "postman 공부", "content": "사용법을 공부하자" }
  ]
}
```

## 3. 서버 실행하기
- `json-server --watch db.json --port 5000` 
- `package.json` 내용 수정
```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "json-server --watch db.json --port 5000"
  },
```
- `npm run start` 실행

## 4. postman으로 api 테스트하기
- [Postman] `https://www.postman.com/downloads/`