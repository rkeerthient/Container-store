import * as React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LexicalRichText } from "@yext/react-components";
import { Image } from "@yext/pages/components";

const ExpertServicesCarousel = (props: any) => {
  const { data, header } = props;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="bg-white">
      <div className="text-4xl mx-auto text-center font-bold">{header}</div>
      <Slider {...settings}>
        {data &&
          data.map((item: any, index: any) => (
            <div key={index} className="p-4 border flex flex-row ">
              <div className=" flex-col flex justify-between gap-10 font-normal">
                <Image image={item.image} height={369} layout="fixed" />
                <div className="text-2xl text-center font-bold">
                  {item.title}
                </div>
                <div className="h-36">
                  <LexicalRichText
                    serializedAST={JSON.stringify(item.description.json)}
                  />
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default ExpertServicesCarousel;
