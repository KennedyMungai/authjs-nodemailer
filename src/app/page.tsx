import { getSession } from "@/lib/session-hooks";

const HomePage = async () => {
  await getSession();

  return <div>HomePage</div>;
};

export default HomePage;
