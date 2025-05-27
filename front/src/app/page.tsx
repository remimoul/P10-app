import Header from "@/components/Home/Header";
import Racing from "@/components/Home/Racing";
import HowToPlay from "@/components/Home/HowToPlay";
import LoadingScreen from "@/components/common/LoadingScreen";

const Home = () => {
  const loading = false;

  if (loading) {
    return <LoadingScreen message="Loading home..." />;
  }

  return (
    <div>
      <main className="min-h-screen py-24 lg:py-24 sm:py-24 bg-gray-50">
        <Header />
        <Racing />
        <HowToPlay />
      </main>
    </div>
  );
};

export default Home;
