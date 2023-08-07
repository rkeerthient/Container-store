import * as React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image } from "@yext/pages/components";
import Cta from "./cta";
import HoursText from "./HoursText";
import { BsPhone } from "react-icons/bs";
import { LexicalRichText } from "@yext/react-components";

const ProductsCarousel = (props: any) => {
  const { data, header, type } = props;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: props.slidesToShow,
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
    <div className="py-16 space-y-16 ">
      <div className="text-4xl mx-auto text-center font-bold">{header}</div>
      <Slider {...settings}>
        {data &&
          data.map((item: any, index: any) => (
            <div key={index} className="p-4 border flex flex-row">
              <div className="textClass flex-col flex justify-between leading-6 font-normal">
                {item.c_collectionName && (
                  <div className="font-bold text-3xl text-gray-400 text-center mb-4">
                    {item.c_collectionName}
                  </div>
                )}
                <Image
                  image={item.primaryPhoto}
                  className={`${type === "intent" && "rounded-full"}`}
                ></Image>
                <div
                  className={`${type === "intent" && "text-xl font-bold mt-4"}`}
                >
                  {item.name}
                </div>
                {item.richTextDescriptionV2 && (
                  <div className="mt-5">
                    <LexicalRichText
                      serializedAST={JSON.stringify(
                        item.richTextDescriptionV2.json
                      )}
                    ></LexicalRichText>
                  </div>
                )}
                {item.price && <div>${item.price.value}</div>}
                {item.c_collectionName && (
                  <div className="rounded-md border w-full text-center px-5 py-2.5 border-black">
                    Explore {item.c_collectionName}
                  </div>
                )}
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default ProductsCarousel;
