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
import PageLayout from "../components/page-layout";
import "../index.css";
import { Image } from "@yext/pages/components";
import ProductsCarousel from "../components/ProductsCarousel";
import { LexicalRichText } from "@yext/react-components";
import { Tab } from "@headlessui/react";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-2",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "uid",
      "meta",
      "primaryPhoto",
      "name",
      "slug",
      "c_customerReviews",
      "c_icon",
      "c_promotion1",
      "c_promotion2",
      "c_storeCreditCard",
      "c_trendingProducts.sectionHeader",
      "c_trendingProducts.products.name",
      "c_trendingProducts.products.richTextDescriptionV2",
      "c_trendingProducts.products.c_collectionName",
      "c_trendingProducts.products.primaryPhoto",
      "c_trendingProducts.products.price",
      "photoGallery",
      "id",

      // "c_expertServices.image",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityIds: ["1225312107329482395"],
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
const Intent: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const _cpy = document;
  const {
    _site,
    primaryPhoto,
    name,
    slug,
    c_customerReviews,
    c_icon,
    c_promotion1,
    c_promotion2,
    c_storeCreditCard,
    c_trendingProducts,
    photoGallery,
    id,
  } = document;

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      {/* <Schema document={_cpy}></Schema> */}
      <PageLayout>
        <div className="bg-gray-200 my-8 ">
          {/* hero */}
          <div className="flex flex-col">
            <div>
              <div className="relative isolate overflow-hidden pt-14">
                <Image
                  image={primaryPhoto}
                  className="absolute inset-0 -z-10 h-full w-full object-cover brightness-75"
                ></Image>

                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-4xl">
                  <div className="text-center">
                    <h1 className="font-bold tracking-tight text-white sm:text-6xl">
                      CLOSET
                    </h1>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                      <a
                        href="#"
                        className="text-2xl font-semibold leading-6 text-white border px-4 py-2 border-white"
                      >
                        Learn more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Free consultation block */}
          {c_promotion1 && (
            <div className=" bg-white flex w-full justify-center gap-2 py-16 px-44">
              <div className="w-1/2 ">
                <div className="  flex flex-col h-full justify-evenly ">
                  <div className="text-5xl">{c_promotion1.promotionTitle}</div>
                </div>
              </div>

              <div className="text-xl w-1/2">
                <LexicalRichText
                  serializedAST={JSON.stringify(c_promotion1.description.json)}
                />
              </div>
            </div>
          )}

          <Tab.Group as="div" className="flex flex-col-reverse my-24">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full  sm:block  ">
              <Tab.List className="grid grid-cols-6 px-36">
                {photoGallery.map((image: any, index: any) => (
                  <Tab
                    key={index}
                    className="relative flex h-24 !w-1/2 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4 "
                  >
                    {({ selected }) => (
                      <>
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          <Image
                            image={image}
                            className="h-full  object-cover object-center "
                          ></Image>
                        </span>
                        <span
                          className={classNames(
                            selected ? "ring-indigo-500" : "ring-transparent",
                            "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                          )}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>

            <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
              {photoGallery.map((image: any, index: any) => (
                <Tab.Panel key={index}>
                  <Image
                    image={image}
                    className="h-full w-full object-cover object-center sm:rounded-lg  mx-auto"
                  ></Image>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          {/* Trending products */}
          <img src="https://i.imgur.com/w5uXVx5.png" alt="" />
          {c_trendingProducts && (
            <ProductsCarousel
              type="intent"
              slidesToShow={3}
              data={c_trendingProducts.products}
              header={c_trendingProducts.sectionHeader}
            />
          )}
          {c_customerReviews && (
            <div className="bg-white px-16 py-16">
              <div className="mb-8 text-5xl text-center">
                What our customers say:
              </div>
              <div className="grid grid-cols-3 gap-4 px-8">
                {c_customerReviews.map((item: any, index: any) => (
                  <div className="rounded-md px-14 py-14 flex flex-col justify-center border border-black text-center">
                    <div>{item.customerReview}</div>
                    <div className="font-medium mt-4">{item.customerName}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {c_storeCreditCard && (
            <div className="bg-[#fcf7f0] px-16 mx-auto flex  flex-col gap-4 items-center py-16">
              <Image image={c_storeCreditCard.image} className="!w-60"></Image>
              <div className="text-3xl">{c_storeCreditCard.name}</div>
              <div className="text-xl">
                {c_storeCreditCard.description}
              </div>{" "}
              <div className="rounded-md border w-fit px-5 py-2.5 border-black uppercase">
                Learn more
              </div>
            </div>
          )}
          {/* New and now */}
          {c_promotion2 && (
            <div className="  bg-white flex w-full justify-center gap-8 py-16">
              <div className="w-1/2 ">
                <div className="  flex flex-col h-full justify-evenly  ">
                  <div className="text-5xl">{c_promotion2.promotionTitle}</div>
                  <div className="text-xl">
                    <LexicalRichText
                      serializedAST={JSON.stringify(
                        c_promotion2.description.json
                      )}
                    />
                  </div>
                  <div className="rounded-md border w-fit px-5 py-2.5 border-black">
                    {c_promotion2.cTA.label}
                  </div>
                </div>
              </div>
              <div>
                <Image
                  image={c_promotion2.image}
                  className="h-[500px] w-[500px]"
                />
              </div>
            </div>
          )}
        </div>
      </PageLayout>
    </>
  );
};

export default Intent;
