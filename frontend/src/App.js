import "./App.css";

import { Route, BrowserRouter } from "react-router-dom";

import UploadImage from "./pages/UploadImage";
import UploadName from "./pages/UploadName";

function App() {
  return (
    <BrowserRouter>
      <Route path="/uploadname" component={UploadName} />
      <Route path="/uploadImage" component={UploadImage} />
    </BrowserRouter>
  );
}

export default App;
