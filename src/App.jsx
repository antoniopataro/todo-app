import "./App.css";

import Sidebar from "./components/Sidebar";
import ToDo from "./components/Todo";

function App() {
  return (
    <div id="app">
      <Sidebar />
      <ToDo />
    </div>
  );
}

export default App;
