import { useState } from "react";
import SearchEngine from "./SearchEngine";
import ShowText from "./ShowText";
import "./app.css";
import axios from "axios";

function App() {
  const [para, SetPara] = useState([]);
  const onSubmit = async (term) => {
    let URL = [];
    let text = [];
    const googleResponse = await axios.get(
      "https://customsearch.googleapis.com/customsearch/v1",
      {
        params: {
          key: process.env.REACT_APP_KEY,
          cx: process.env.REACT_APP_CX,
          q: term,
          num: 5,
        },
      }
    );
    for (let i = 0; i < 5; i++) {
      URL[i] = {
        url: googleResponse.data.items[i].formattedUrl,
        title: googleResponse.data.items[i].title,
      };
    }
    for (let i = 0; i < 5; i++) {
      const response = await axios.get("https://app.scrapingbee.com/api/v1", {
        params: {
          api_key:
            "SLIQY6OU4UHLCBX109PZVY0P1Z3ZQVRPE3KMYH4A1IFRV6K2MXADSWE58OO62EWGTYG1VK9WK8UTMWTP",
          url: URL[i].url,
          render_js: false,
          block_resources: true,
          block_ads: true,
          json_response: true,
          extract_rules: JSON.stringify({
            body: {
              selector: "p",
              output: "text",
              type: "list",
            },
          }),
        },
      });
      text.push({ text: response.data.body.body, title: URL[i].title });
    }
    SetPara([...text]);
    //html parsing
    // const el = document.createElement("html");
    // el.innerHTML = response.data.body;

    // const p = el.getElementsByTagName("p");
    // console.log([...p].map((v) => v.outerText));
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <SearchEngine onSubmit={onSubmit} />
      <ShowText para={para} />
    </div>
  );
}
export default App;
// url.data.items[0].formattedUrl/title;
