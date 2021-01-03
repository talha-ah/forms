import React from "react";
import Button from "@material-ui/core/Button";

export default function ButtonComp(props) {
  return (
    <Button
      type={props.type}
      variant="contained"
      color="primary"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
      {props.text}
    </Button>
  );
}
