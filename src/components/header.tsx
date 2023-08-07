import * as React from "react";
import Cta from "../components/cta";

type Link = {
  label: string;
  url: string;
};

const links: Link[] = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "About",
    url: "/turtlehead-tacos",
  },
];

const Header = (props: any) => {
  console.log(props);

  const linkDoms = links.map((link) => (
    <div key={link.label}>
      <a href={link.url} target="_blank" rel="noreferrer">
        {link.label}
      </a>
    </div>
  ));

  return (
    <div className="mb-4">
      <img
        src="https://a.mktgcdn.com/p/1oXcdJsnOcNMkBfpPDNFVrexRCzypb0diNN-5jqaxNE/2336x434.png"
        alt=""
      />
    </div>
  );
};

export default Header;
