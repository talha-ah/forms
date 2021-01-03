import React from "react";
import { useDispatch } from "react-redux";

import Button from "../components/Button";
import * as actionTypes from "../store/actions/actionTypes";

export default function LandingPage() {
  const dispatch = useDispatch();

  return (
    <>
      <Button
        onClick={() => dispatch({ type: actionTypes.SET_PAGE, data: 1 })}
        text="Go to Forms"
      />
    </>
  );
}
