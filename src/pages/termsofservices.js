import { Typography } from "@mui/material";
import textStyle from "../helpers/textStyle";

const TermsOfServices = () => {
  return (
    <div style={{ width: "90%", margin: "auto", marginTop: "20px" }}>
      <Typography style={{ ...textStyle, fontSize: 36, fontWeight: 700 }}>
        TERMS OF SERVICES
      </Typography>
      <Typography style={textStyle} my={1}>
        {`Please read these terms of use ("terms", "terms of use") carefully
        before using BloomByKhushbu website (the "service") operated by
        BloomByKhushbu ("us", 'we”, “our”).`}
      </Typography>
      <Typography
        style={{ ...textStyle, fontSize: 25, fontWeight: 700 }}
        my={2}
      >
        Conditions of Use
      </Typography>
      <Typography style={textStyle} my={1}>
        The services provided by us to you are subject to the conditions stated
        below in this document. Every time you visit this website, use its
        services, or make a purchase, you accept the following conditions. This
        is why we urge you to read them carefully.
      </Typography>
      <Typography
        style={{ ...textStyle, fontSize: 25, fontWeight: 700 }}
        my={2}
      >
        Privacy Policy
      </Typography>
      <Typography style={textStyle} my={1}>
        Before you continue using our website we advise you to read our privacy
        policy regarding our user data collection. It will help you better
        understand our practices.
      </Typography>
      <Typography
        style={{ ...textStyle, fontSize: 25, fontWeight: 700 }}
        my={2}
      >
        Copyright
      </Typography>
      <Typography style={textStyle} my={1}>
        Content published on this website (digital downloads, images, texts,
        graphics, logos) is the property of BloomByKhushbu and/or its content
        creators and protected by international copyright laws. The entire
        compilation of the content found on this website is the exclusive
        property of BloomByKhushbu, with copyright authorship for this
        compilation by BloomByKhushbu.
      </Typography>
      <Typography
        style={{ ...textStyle, fontSize: 25, fontWeight: 700 }}
        my={2}
      >
        Communications
      </Typography>
      <Typography style={textStyle} my={1}>
        Every time you send us an email or visit our website, you are going to
        be communicating with us. You hereby consent to receive communications
        from us. If you subscribe to the newsletter or notifications on our
        website, you are going to receive regular emails from us. We will
        continue to communicate with you by posting news and notices on our
        website and by sending you emails. You also agree that all notices,
        disclosures, agreements and other communications we provide to you
        electronically meet the legal requirements that such communications be
        in writing.
      </Typography>
      <Typography
        style={{ ...textStyle, fontSize: 25, fontWeight: 700 }}
        my={2}
      >
        Applicable Law
      </Typography>
      <Typography style={textStyle} my={1}>
        By visiting this website, you agree that the laws of the Indian
        Cybersecurity without regard to principles of conflict laws, will govern
        these terms of service, or any dispute of any sort that might come
        between BloomByKhushbu and you, or its business partners and associates.
      </Typography>
      <Typography
        style={{ ...textStyle, fontSize: 25, fontWeight: 700 }}
        my={2}
      >
        Disputes
      </Typography>
      <Typography style={textStyle} my={1}>
        Any dispute related in any way to your visit to this website or to
        products you purchase from us shall be arbitrated by the district,
        state, or central courts and you consent to exclusive jurisdiction and
        venue of such courts.
      </Typography>
      <Typography
        style={{ ...textStyle, fontSize: 25, fontWeight: 700 }}
        my={2}
      >
        License and Site Access
      </Typography>
      <Typography style={textStyle} my={1}>
        We grant you a limited license to access and make personal use of this
        website. You are not allowed to download or modify the content - any
        parts or otherwise. This may be done only with written consent from us.
      </Typography>
      <Typography
        style={{ ...textStyle, fontSize: 25, fontWeight: 700 }}
        my={2}
      >
        User Account
      </Typography>
      <Typography style={textStyle} my={1}>
        If you are an owner of an account on this website, you are solely
        responsible for maintaining the confidentiality of your private user
        details (username and password). You are responsible for all activities
        that occur under your account or password. We reserve all rights to
        terminate accounts, edit or remove content, and cancel orders in their
        sole discretion.
      </Typography>
      <Typography
        style={{ ...textStyle, fontSize: 25, fontWeight: 700 }}
        my={2}
      >
        Terms of Sale
      </Typography>
      <Typography style={textStyle} my={1}>
        By placing an order you are offering to purchase a product on and
        subject to the following terms and conditions. All orders are subject to
        availability and confirmation of the order price. Dispatch times may
        vary according to availability and subject to any delays resulting from
        postal delays or force majeure for which we will not be responsible.
        When placing an order you undertake that all details you provide to us
        are true and accurate, that you are an authorized user of the credit or
        debit card used to place your order, and that there are sufficient funds
        to cover the cost of the goods. The cost of products and services may
        fluctuate. All prices advertised are subject to such changes
      </Typography>
    </div>
  );
};

export default TermsOfServices;
