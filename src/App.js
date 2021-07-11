import "./App.css";
import { FormV1 } from "./components/FormV1/FormV1";
import { FormV2 } from "./components/FormV2/FormV2";
import FormV3 from "./components/FormV3/FormV3";

const App = () => {
  return (
    <div className="app">
      {/* <FormV1 /> */}
      {/* <FormV2 /> */}
      <FormV3 />
    </div>
  );
};

export default App;
