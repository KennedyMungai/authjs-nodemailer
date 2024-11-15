import { protectServer } from "@/lib/session-hooks";

const HomePage = async () => {
  await protectServer();

  return <div>HomePage</div>;
};

export default HomePage;
