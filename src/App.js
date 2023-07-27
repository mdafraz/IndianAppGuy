import { useState } from "react";
import SearchEngine from "./SearchEngine";
import ShowText from "./ShowText";
import "./app.css";
import axios from "axios";

function App() {
  const [isloading, setIsLoading] = useState(false);
  const [para, SetPara] = useState([]);

  const onSubmit = async (term) => {
    let allUrls = [];
    let text = [];

    const googleResponse = await axios.get(
      "https://customsearch.googleapis.com/customsearch/v1",
      {
        params: {
          key: process.env.REACT_APP_GOOGLE_KEY,
          cx: process.env.REACT_APP_CX,
          q: term,
          num: 5,
        },
      }
    );

    for (let i = 0; i < 5; i++) {
      allUrls[i] = encodeURI(googleResponse.data.items[i].link);
    }

    const promises = allUrls.map((url) => {
      return axios.get("https://app.scrapingbee.com/api/v1", {
        params: {
          api_key:
            "SASEYFR8LX0HZEJOEE0EVYQ6JIVK4178A3K3H7A7D9O17H0S1HWXXNRE1FZE4KTMAKVRVCMFEJPLS4CO",
          url: url,
          json_response: true,
          render_js: false,
          extract_rules: JSON.stringify({
            body: {
              selector: "p",
              output: "text",
              type: "list",
            },
            title: {
              selector: "h1",
              output: "text",
              type: "item",
            },
          }),
        },
      });
    });

    try {
      setIsLoading(true);
      const res = await Promise.allSettled(promises);
      const data = res.map((v) => (v.status === "fulfilled" ? v.value : null));
      data.map((p) => {
        text.push({
          text: p.data.body.body,
          title: p.data.body.title,
        });
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }

    SetPara([...text]);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <SearchEngine onSubmit={onSubmit} />
      <ShowText para={para} isloading={isloading} />
    </div>
  );
}
export default App;
// url.data.items[0].formattedUrl/title;
