import ReactDom from "react-dom/client";
import { Offline, Online } from "react-detect-offline";
import MovieApp from "./components/MovieApp/MovieApp";
import AlertComponent from "./components/Alert/Alert";
import "./index.css";

const root = document.getElementById("root");
function App() {
  return (
    <>
      <Online>
        <MovieApp />
      </Online>
      <Offline>
        <AlertComponent message="Поверьте ваше интернет соединение" />
      </Offline>
    </>
  );
}

ReactDom.createRoot(root).render(<App />);
