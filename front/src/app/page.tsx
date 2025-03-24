import Header from "@/components/Home/Header";
import Racing from "@/components/Home/Racing";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import HowToPlay from "@/components/Home/HowToPlay";

const Home = () => {
  return (
    <div className="">
      <Navbar />
      <main className="min-h-screen py-14 lg:py-16 sm:py-18">
        <Header />
        <Racing />
        <HowToPlay />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
