const ShowText = ({ para }) => {
  const p = para.map((elem) => {
    return { text: elem.text.join(" "), title: elem.title };
  });
  return p.map((p) => {
    return (
      <div className="px-4">
        <div className="max-w py-4 px-8 bg-white shadow-lg rounded-lg my-20">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-center pb-2">
              {p.title}
            </div>
            <p className="text-gray-700 text-base">{p.text}</p>
          </div>
        </div>
      </div>
    );
  });
};

export default ShowText;
