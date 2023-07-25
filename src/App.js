import SearchEngine from "./SearchEngine";
import "./app.css";
import axios from "axios";

function App() {
  const onSubmit = async (term) => {
    const response = [];
    const url = await axios.get(
      "https://customsearch.googleapis.com/customsearch/v1",
      {
        params: {
          key: process.env.REACT_APP_KEY,
          cx: process.env.REACT_APP_CX,
          q: term,
        },
      }
    );
    // const body = await axios.get("https://app.scrapingbee.com/api/v1", {
    //   params: {
    //     api_key:
    //             "SLIQY6OU4UHLCBX109PZVY0P1Z3ZQVRPE3KMYH4A1IFRV6K2MXADSWE58OO62EWGTYG1VK9WK8UTMWTP",
    //       url:
    //   },
    // });
    for (const i in url) {
    }
    console.log(url.data.items[0].formattedUrl);
  };

  return (
    <div className="h-screen bg-slate-100">
      <SearchEngine onSubmit={onSubmit} />
    </div>
  );
}
export default App;
// url.data.items[0].formattedUrl;
