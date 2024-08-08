const express = require("express");
const server = express();
const axios = require("axios");
const cors = require("cors");

const client_id = "7o0NAUXXbSqkZuofNVB2"; // 클라이언트 ID
const client_secret = "oWwoIOBQIN"; // 클라이언트 시크릿
const api_url = "https://openapi.naver.com/v1/search/news";
const query = "검색"; // 검색할 뉴스 키워드

async function fetchNews(query = "게임") {
  try {
    let url = `${api_url}?query=${encodeURIComponent(query)}`;
    const response = await axios.get(url, {
      headers: {
        "X-Naver-Client-Id": client_id,
        "X-Naver-Client-Secret": client_secret,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  } finally {
    console.log("야이");
  }
}
server.use(cors());
server.get("/news", async (req, res) => {
  try {
    const result = await fetchNews();
    return res.json({ result });
  } catch (error) {
    console.error(error);
  }
});
server.listen(9999, () => console.log("server run"));
