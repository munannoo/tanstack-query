import { useState } from "react";
import "./App.css";
import Post1 from "./post-components/post1";
import Post2 from "./post-components/post2";

function App() {
  const [currentPage, setCurrentPage] = useState(<Post1 />);

  return (
    <>
      <button onClick={() => setCurrentPage(<Post1 />)}>Page 1</button>
      <button onClick={() => setCurrentPage(<Post2 />)}>Page 2</button>
      <br />
      {currentPage}
    </>
  );
}

export default App;
