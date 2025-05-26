import Header from "@/components/Home/Header";
import Racing from "@/components/Home/Racing";
import HowToPlay from "@/components/Home/HowToPlay";

const Home = () => {
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
