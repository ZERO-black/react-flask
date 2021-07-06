import "./App.css";
import UploadName from "./pages/UploadName";
import { Route, BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Route path="/uploadname" component={UploadName} />
    </BrowserRouter>
  );
}

export default App;
