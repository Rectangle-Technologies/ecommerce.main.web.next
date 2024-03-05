import React from "react";
import { connect } from "react-redux";
import { BrowserView, TabletView, MobileOnlyView } from "react-device-detect";
import FixedNotificationDesktop from "./desktop/FixedNotification";
import FixedNotificationMobile from "./mobile/FixedNotification";
import NavbarDesktop from "./desktop/Navbar";
import NavbarMobile from "./mobile/Navbar";
import Desktop from "../responsive/Desktop";
import Tablet from "../responsive/Tablet";
import Mobile from "../responsive/Mobile";

const Header = (props) => {
    const { innerWidth: width, innerHeight: height } = window;
    return (
        <>
            {/* fix notification */}
            {/* <Desktop>
                <FixedNotificationDesktop />
            </Desktop>
            <Tablet>
                <FixedNotificationMobile />
            </Tablet>
            <Mobile>
                <FixedNotificationMobile />
            </Mobile> */}


            {/* NAVBAR */}
            <BrowserView>
                {width > 900
                    ? <NavbarDesktop categories={props?.categories} />
                    : <NavbarMobile categories={props?.categories} />
                }
            </BrowserView>
            <TabletView>
                {width > 900
                    ? <NavbarDesktop categories={props?.categories} />
                    : <NavbarMobile categories={props?.categories} />
                }
            </TabletView>
            <MobileOnlyView>
                <NavbarMobile categories={props?.categories} />
            </MobileOnlyView>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, {})(Header);