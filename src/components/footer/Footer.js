import Desktop from '../responsive/Desktop'
import Tablet from '../responsive/Tablet'
import Mobile from '../responsive/Mobile'
import React from "react";
import FooterDesktop from "./FooterDesktop";
import FooterMobile from "./FooterMobile";

const Footer = (props) => {
  return (
    <>
      <Desktop>
        <FooterDesktop categories={props?.categories} />
      </Desktop>
      <Tablet>
        <FooterDesktop categories={props?.categories} />
      </Tablet>
      <Mobile>
        <FooterMobile categories={props?.categories} />
      </Mobile>
    </>
  );
};

export default Footer;
