import landingpageImage from "./assets/landingpage.jpg";
import { Button } from "./ui/button";

interface props {
  landingbuttonHandler: (state: string) => void;
}

const Home = ({ landingbuttonHandler }: props) => {
  return (
    <div className="w-full max-w-5xl sm:w-4/5 md:w-5/6 lg:w-7/8 min-h-[calc(100vh-7rem)] flex flex-col items-center justify-center gap-10 lg:gap-4 p-4">
      <h1 className="font-black text-4xl lg:text-5xl text-center text-gray-700">
        👨‍🔧 Fix My Relationship! 👩‍🔧
      </h1>
      <h2 className="font-bold text-2xl lg:text-3xl text-center text-gray-700">
        Start using our AI powered significant-other-translater
      </h2>
      <Button
        variant="outline"
        className="bg-linear-to-b from-red-400 to-red-600 font-semibold text-3xl p-6 text-white hover:scale-105"
        onClick={() => landingbuttonHandler("Profile")}
      >
        Start Translating
      </Button>
      <img
        src={landingpageImage}
        alt="landingImage"
        className="w-1/2 md:w-2/5 lg:w-3/8 rounded-2xl shadow-lg hover:scale-105 duration-100"
      />
      <h2 className="font-medium text-2xl lg:text-3xl text-center text-gray-700 p-6">
        No more of this communication issue!
      </h2>
    </div>
  );
};

export default Home;
