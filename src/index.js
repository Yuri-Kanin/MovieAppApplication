import ReactDom from "react-dom/client";
import MovieApp from "./components/MovieApp/MovieApp";

const root = document.getElementById("root");
function App() {
  return <MovieApp />;
}

ReactDom.createRoot(root).render(<App />);
