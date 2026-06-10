import { Carousel } from "antd";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="w-[60%] !h-full p-2">
      <Carousel
        autoplay
        rootClassName="!h-full !w-full"
        className="!h-full rounded-2xl! overflow-hidden"
      >
        <div className="relative w-full h-screen">
          <Image
            src="/banner.png"
            alt="banner"
            fill
            className="object-cover"
            priority
            loading="eager"
          />
        </div>
        <div className="relative w-full h-screen">
          <Image
            src="/banner.png"
            alt="banner"
            fill
            className="object-cover"
            loading="eager"
          />
        </div>
        <div className="relative w-full h-screen">
          <Image
            src="/banner.png"
            alt="banner"
            fill
            className="object-cover"
            loading="eager"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
