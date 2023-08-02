/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import * as React from "react";
import Hours from "../components/hours";
import List from "../components/list";
import PageLayout from "../components/page-layout";
import "../index.css";
import { Image } from "@yext/pages/components";
import Carousel from "../components/Carousel";
import ProductsCarousel from "../components/ProductsCarousel";
import ExpertServicesCarousel from "../components/ExpertServicesCarousel";
import FAQs from "../components/FAQs";
import { LexicalRichText } from "@yext/react-components";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-1",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "description",
      "hours",
      "slug",
      "geocodedCoordinate",
      "services",
      "c_promotion1",
      "c_promotion2",
      "c_aboutTheStore",
      "c_trendingProducts.sectionHeader",
      "c_trendingProducts.products.name",
      "c_trendingProducts.products.primaryPhoto",
      "c_trendingProducts.products.price",
      "c_expertServices",
      "c_relatedFAQs.relatedFAQs.name",
      "c_relatedFAQs.relatedFAQs.answerV2",
      "c_nearbyLocations.nearbyLocations.name",
      "c_nearbyLocations.nearbyLocations.address",
      "c_nearbyLocations.nearbyLocations.geomodifier",

      // "c_expertServices.image",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["location"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug
    ? document.slug
    : `${document.locale}/${document.address.region}/${document.address.city}/${
        document.address.line1
      }-${document.id.toString()}`;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
    ],
  };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Location: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    _site,
    name,
    address,
    openTime,
    hours,
    mainPhone,
    geocodedCoordinate,
    services,
    c_promotion1,
    c_aboutTheStore,
    c_promotion2,
    c_trendingProducts,
    c_expertServices,
    c_relatedFAQs,
    c_nearbyLocations,
  } = document;

  return (
    <>
      <PageLayout>
        <div className="bg-gray-200  space-y-8 py-8">
          {/* hero */}
          <div className="flex flex-col">
            <div>
              <img
                src="https://i.imgur.com/2qJ5k7P.png"
                className="w-full h-auto"
                alt=""
              />
            </div>
            <div className="centered-container w-full ">
              <div className="grid grid-cols-3 justify-between w-full gap-8">
                <div className="bg-white shadow border flex flex-col text-2xl p-8 justify-between h-full">
                  <div className="font-semibold text-4xl">{name}</div>
                  <div>{address.line1}</div>
                  <div className="underline text-blue-200">{mainPhone}</div>
                  <div className="underline text-blue-200">
                    Make This My Store
                  </div>
                  <div className="underline text-blue-200">Get Directions</div>
                  <div className="text-base">
                    SCHEDULE CUSTOM SPACES APPOINTMENT
                  </div>
                </div>
                <div className="bg-white shadow border p-8">
                  {hours && <Hours hours={hours} title="Hours" />}
                </div>
                <div className="bg-white shadow border p-8 text-xl">
                  {services && <List list={services}></List>}
                </div>
              </div>
            </div>
          </div>
          {/* Free consultation block */}
          {c_promotion1 && (
            <div className="centered-container bg-white flex w-full justify-center gap-8">
              <div className="w-1/2 ">
                <div className="  flex flex-col h-full justify-evenly  ">
                  <div className="text-5xl">{c_promotion1.promotionTitle}</div>
                  {/* <div className="text-xl">{c_promotion1.description.json}</div> */}
                  <div className="text-xl">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Optio dignissimos consectetur eum, voluptates laudantium,
                    consequuntur nulla odit nemo eos repellat culpa modi
                    reiciendis id nisi tempora delectus pariatur! Blanditiis,
                    eos.
                  </div>
                  <div className="rounded-md border w-fit px-5 py-2.5 border-black">
                    {c_promotion1.cTA.label}
                  </div>
                </div>
              </div>
              <div>
                <Image
                  image={c_promotion1.image}
                  className="h-[500px] w-[500px]"
                />
              </div>
            </div>
          )}
          {/* Trending products */}
          {c_trendingProducts && (
            <ProductsCarousel
              data={c_trendingProducts.products}
              header={c_trendingProducts.sectionHeader}
            />
          )}
          {/* New and now */}
          {c_promotion2 && (
            <div
              className="centered-container bg-white flex w-full  gap-8 h-[600px] bg-contain bg-no-repeat text-white"
              style={{ backgroundImage: `url(${c_promotion2.image.url} )` }}
            >
              <div className="w-1/2">
                <div className="  flex flex-col h-full justify-evenly  ">
                  <div className="text-5xl">{c_promotion2.promotionTitle}</div>
                  {/* <div className="text-xl">{c_promotion1.description.json}</div> */}
                  <div className="text-xl">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Optio dignissimos consectetur eum, voluptates laudantium,
                    consequuntur nulla odit nemo eos repellat culpa modi
                    reiciendis id nisi tempora delectus pariatur! Blanditiis,
                    eos.
                  </div>
                  <div className="rounded-md border w-fit px-5 py-2.5 border-white">
                    {c_promotion2.cTA.label}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Expert Services */}
          {c_expertServices && (
            <ExpertServicesCarousel
              data={c_expertServices.ourExpertServices}
              header={"Our Expert  Services"}
            />
          )}
          {/* FAQs */}
          {c_relatedFAQs && (
            <div className="centered-container">
              {c_relatedFAQs.relatedFAQs.map((item: any, index: any) => (
                <div key={index}>
                  <FAQs faq={item}></FAQs>
                </div>
              ))}
            </div>
          )}
          {/* store detail */}
          {c_aboutTheStore && (
            <div className="bg-white flex items-center gap-4">
              <div className="w-1/2">
                <Image image={c_aboutTheStore.storeImage} layout="fill"></Image>
              </div>
              <div className="w-1/2 px-6">
                <div className="w-4/5 flex flex-col gap-4 ">
                  <div className="text-5xl font-bold">
                    {c_aboutTheStore.aboutSectionTitle}
                  </div>
                  <div>
                    <LexicalRichText
                      serializedAST={JSON.stringify(
                        c_aboutTheStore.aboutDescription.json
                      )}
                    ></LexicalRichText>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Near by locations */}
          {c_nearbyLocations && (
            <Carousel data={c_nearbyLocations.nearbyLocations} />
          )}
        </div>
      </PageLayout>
    </>
  );
};

export default Location;
