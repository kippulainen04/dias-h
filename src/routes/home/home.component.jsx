import Directory from "../../components/directory/directory.component";
import { mockData } from "../../mock-Data";
const Home = () => {
  return <Directory categories={mockData} />;
};

export default Home;