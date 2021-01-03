import React from "react";
import { useSelector } from "react-redux";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { makeStyles } from "@material-ui/core/styles";

import MainPage from "../pages/Main";
import Form1 from "../pages/Form1";
import Form2 from "../pages/Form2";
import Form3 from "../pages/Form3";
import Form4 from "../pages/Form4";
import Form5 from "../pages/Form5";
import Form6 from "../pages/Form6";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 50,
    display: "flex",
    minWidth: "100vw",
    minHeight: "100vh",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#f5f7fb",
    backgroundPosition: "center",
  },
}));

function getSteps() {
  return ["1", "2", "3", "4", "5", "6"];
}

export default function Main() {
  const classes = useStyles();
  const store = useSelector((state) => state);
  const steps = getSteps();

  return (
    <div className={classes.root}>
      {store.page === 0 ? (
        <MainPage />
      ) : (
        <>
          <Stepper
            activeStep={store.page - 1}
            alternativeLabel
            style={{ backgroundColor: "#f5f7fb" }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel></StepLabel>
              </Step>
            ))}
          </Stepper>
          {store.page === 1 ? (
            <Form1 />
          ) : store.page === 2 ? (
            <Form2 />
          ) : store.page === 3 ? (
            <Form3 />
          ) : store.page === 4 ? (
            <Form4 />
          ) : store.page === 5 ? (
            <Form5 />
          ) : (
            <Form6 />
          )}
        </>
      )}
    </div>
  );
}
