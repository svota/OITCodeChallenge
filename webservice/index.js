const express = require("express");
const axios = require("axios");
const app = express();
const port = 5000;

app.get("/", (_req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.get("/movies", async (req, res) => {
  const url = buildURL(req.query.search);
  const response = await handleSearch(url);
  const filteredResults = reduceResults(response);
  res.send(filteredResults);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const handleSearch = async (url) => {
  console.log("searching...");
  const response = await axios.get(url).then((res) => {
    return res.data;
  });
  console.log("found: ", response);
  return response.results;
};

const buildURL = (query) => {
  console.log("Building URL from query: ", query);
  const endpoint = "https://api.themoviedb.org/3/search/movie?";
  const options = {
    api_key: "3779faf9ee7602e93ec15f01aed5f68a", //req.get("api-key"),
    language: "en-US",
    page: 1,
    include_adult: false,
    region: "US",
    query,
  };
  let acc = "";
  for (const option in options) {
    acc += option + "=" + options[option] + "&";
  }

  acc = acc.slice(0, acc.length - 1);

  console.log("built url: ", endpoint + acc);
  return endpoint + acc;
};

const reduceResults = (results) => {
  return results.reduce((acc, val) => {
    if (acc.length == 10) {
      return acc;
    }
    const filteredVal = reduceValue(val);
    acc.push(filteredVal);
    return acc;
  }, []);
};

const reduceValue = (val) => {
  const { title, overview, popularity, poster_path } = val;
  return { title, overview, popularity, poster_path };
};
