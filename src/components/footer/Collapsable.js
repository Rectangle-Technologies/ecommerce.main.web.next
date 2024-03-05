import { Box, Collapse, Link as MaterialLink, Typography } from "@mui/material";
import React, { useState } from "react";
import textStyle from "../../helpers/textStyle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TypographyLink from "../TypographyLink";
import Link from 'next/link'

const Collapsable = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box my={2}>
      <MaterialLink
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: "pointer" }}
        underline="none"
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #330C3E",
          }}
        >
          <Typography
            style={{
              ...textStyle,
              fontWeight: 600,
              fontSize: 18,
              color: "#330C3E",
            }}
            my={1}
          >
            {props.title}
          </Typography>
          {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </Box>
      </MaterialLink>
      <Collapse in={isOpen}>
        {props?.list?.map((item, key) => {
          return (
            <Link key={key} href={`${item.url}`}>
              <TypographyLink style={textStyle} my={1}>
                {item.name}
              </TypographyLink>
            </Link>
          );
        })}
      </Collapse>
    </Box>
  );
};

export default Collapsable;
