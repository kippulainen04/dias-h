import "./categories.styles.scss";
import Directory from "./components/directory/directory.component";
import { mockData } from "./mock-Data";

const App = () => {
  return <Directory categories={mockData} />;
};

export default App;
