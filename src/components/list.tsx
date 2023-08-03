import { Image } from "@yext/react-components";
import * as React from "react";

type List = {
  name?: string;
  list: any[];
};

const List = (props: List) => {
  const { list } = props;
  const listItems = list.storeServices.map((item: any) => (
    <li key={item} className="flex gap-4 items-center ">
      <div>
        <Image image={item.icon} className="w-8 h-8" />
      </div>
      <div>{item.serviceName}</div>
    </li>
  ));
  return (
    <>
      <div className="leading-10">
        <div className="text-2xl font-semibold mb-4">Services</div>
        <ul className="list-none pl-6 space-y-2">{listItems}</ul>
      </div>
    </>
  );
};

export default List;
