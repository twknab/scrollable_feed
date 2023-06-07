import feedDataSource from "./data/feedDataSource.js";
import ScrollableFeed from "./components/ScrollableFeed/ScrollableFeed";
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* Scrollable feed accepts a data source and a length (e.g, we could change to interval scrolls of 10 if we wished) */}
      <ScrollableFeed data={feedDataSource} length={5}></ScrollableFeed>
    </div>
  );
}

export default App;
