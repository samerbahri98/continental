import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import { Link } from "react-router-dom";

type voidDelegate = () => void;

interface ISideMenuItem {
  text: string;
  link: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  selected: boolean;
}

function SideMenuItem({
  text,
  link,
  Icon,
  selected,
}: ISideMenuItem) {
  return (
    <ListItem
      component={Link}
      to={link}
      button
      key={text}
      selected={selected}
    >
      <ListItemIcon>
        <Icon></Icon>
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
}

export default SideMenuItem;
