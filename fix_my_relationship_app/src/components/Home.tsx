import landingpageImage from "./assets/landingpage.jpg";
import { Button } from "./ui/button";

interface props {
  landingbuttonHandler: (state: string) => void;
}

const Home = ({ landingbuttonHandler }: props) => {
  return (
    <div className="w-full sm:w-4/5 md:w-5/6 lg:w-7/8 h-screen flex flex-col items-center justify-center gap-10 lg:gap-4 p-4">
      <h1 className="font-black text-4xl lg:text-6xl text-center">
        👨‍🔧 Fix My Relationship! 👩‍🔧
      </h1>
      <h2 className="font-bold text-2xl lg:text-4xl text-center">
        Start using our AI powered significant-other-translater
      </h2>
      <img
        src={landingpageImage}
        alt="landingImage"
        className="w-1/2 md:w-2/5 lg:w-3/8"
      />
      <h2 className="font-medium text-2xl lg:text-4xl text-center">
        No more of this communication issue!
      </h2>
      <Button
        variant="outline"
        className="bg-red-600 font-semibold text-3xl p-6 text-white"
        onClick={() => landingbuttonHandler("Profile")}
      >
        Start Translating
      </Button>
    </div>
  );
};

export default Home;
