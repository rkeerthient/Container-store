import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/20/solid";
import { LexicalRichText } from "@yext/react-components";
import * as React from "react";

export default function FAQs(props: any) {
  const { faq } = props;

  return (
    <>
      <div className="w-full px-4 pt-2">
        <div className="mx-auto w-full rounded-2xl  p-2">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between  border border-black bg-white px-8 py-4 text-left text-sm font-medium focus:outline-none focus-visible:ring  focus-visible:ring-opacity-75 shadow-md">
                  <span className="text-2xl font-light">{faq.name}</span>
                  <PlusIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5  `}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className=" px-8 pt-4 pb-2  flex flex-col text-lg font-normal">
                  <LexicalRichText
                    serializedAST={JSON.stringify(faq.answerV2.json)}
                  />
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </>
  );
}
