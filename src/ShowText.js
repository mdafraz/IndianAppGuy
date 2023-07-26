const ShowText = ({ para, isloading }) => {
  const arr = [0, 1, 2, 3, 4];

  const paras = para.map((elem) => {
    return elem ? { text: elem.text.join(" "), title: elem.title } : null;
  });

  console.log(paras);

  if (!isloading) {
    return paras.map((item) => {
      if (item === null) {
        return (
          <div className="px-4">
            <div className="max-w py-4 px-8 bg-white shadow-lg rounded-lg my-20">
              <div className="px-6 py-4">
                <>
                  <div className="font-bold text-red-500 text-xl mb-2 text-center pb-2">
                    {"Something went wrong!"}
                  </div>
                  <item className="text-red-300 text-base text-sm">
                    {"Hey! Something went wrong with the scraping bee api."}
                  </item>
                </>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="px-4">
          <div className="max-w py-4 px-8 bg-white shadow-lg rounded-lg my-20">
            <div className="px-6 py-4">
              <>
                <div className="font-bold text-xl mb-2 text-center pb-2">
                  {item.title ||
                    "Seems like there is no title to be scaraped here."}
                </div>
                <item className="text-gray-700 text-base text-sm">
                  {item.text ||
                    "Seems like there is no body to be scraped here."}
                </item>
              </>
            </div>
          </div>
        </div>
      );
    });
  } else {
    return arr.map((num) => {
      return (
        <div className="px-4">
          <div className="max-w py-4 px-8 bg-white shadow-lg rounded-lg my-20">
            <div className="px-6 py-4">
              <div class="flex justify-center items-center ">
                <div
                  class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !item-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
};

export default ShowText;
