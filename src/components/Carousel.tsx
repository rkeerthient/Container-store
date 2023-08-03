import * as React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image } from "@yext/pages/components";
import Cta from "./cta";
import HoursText from "./HoursText";
import { GrLocation } from "react-icons/gr";
import { FaLocationArrow } from "react-icons/fa";
const Carousel = (props: any) => {
  const { data } = props;

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
    <div className="py-36 space-y-16 ">
      <div className="text-4xl mx-auto text-center font-bold">
        Nearby Locations
      </div>
      <Slider {...settings}>
        {data &&
          data.map((item: any, index: any) => (
            <span key={index}>
              <div className="flex gap-4">
                <GrLocation className="w-12 h-12 text-blue-300" />
                <div className="textClass flex-col flex justify-between leading-6 font-normal">
                  <div className=" text-left text-sm flex flex-col gap-4">
                    <div className=" font-semibold text-2xl underline pb-2">
                      {item.name} - {item.geomodifier}
                    </div>
                    <div className=" text-2xl font-light">
                      <div>{item.address.line1}</div>
                      <div>
                        {item.address.city}, {item.address.region} -{" "}
                        {item.address.postalCode}
                      </div>
                      <div className="underline hover:cursor-pointer">
                        {item.mainPhone &&
                          item.mainPhone
                            .replace("+1", "")
                            .replace(/\D+/g, "")
                            .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
                      </div>
                      {item.services && (
                        <ul className="servList mt-4 flex flex-row">
                          {item.services.map((nItem: any, index: number) => (
                            <li key={index}>{nItem}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-4 text-2xl mt-8">
                    <FaLocationArrow />
                    <div className="text-blue-300 underline">
                      Get Directions
                    </div>
                  </div>
                </div>
              </div>
            </span>
          ))}
      </Slider>
    </div>
  );
};

export default Carousel;
