import react from "react";

const Loader = () => {
    return (
      <div>
        <CutoutTextLoader
          height="500px"
          background="white"
          imgUrl="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHYzcXFtMWhicmFzeTAwMmpiZDlub3ZkbzlhOHZoYWkxbnRzb2p5MyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/QBd2kLB5qDmysEXre9/giphy.gif"
        />
      </div>
    );
  };
  
  const CutoutTextLoader = ({
    height,
    background,
    imgUrl,
  }) => {
    return (
      <div className="relative" style={{ height }}>
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div
          style={{ background }}
          className="absolute inset-0 animate-pulse z-10"
        />
        <span
          className="font-black absolute inset-0 z-20 text-center bg-clip-text text-transparent pointer-events-none"
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            fontSize: "clamp(3rem, 12vw, 10rem)",
            lineHeight: height,
          }}
        >
          Loading...
        </span>
      </div>
    );
  };
  
  export default Loader;