import * as React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image } from "@yext/pages/components";
import Cta from "./cta";
import HoursText from "./HoursText";
import { BsPhone } from "react-icons/bs";

const ProductsCarousel = (props: any) => {
  const { data, header } = props;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
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
      <div className="text-4xl mx-auto text-center font-bold">{header}</div>
      <Slider {...settings}>
        {data &&
          data.map((item: any, index: any) => (
            <div key={index} className="p-4 border flex flex-row">
              <div className="textClass flex-col flex justify-between leading-6 font-normal">
                <Image image={item.primaryPhoto}></Image>
                <div>{item.name}</div>
                <div>${item.price.value}</div>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default ProductsCarousel;
