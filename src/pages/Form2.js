import React from "react";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "formik-material-ui";
import { Button, MenuItem } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import Chip from "@material-ui/core/Chip";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";

import Heading from "../components/Heading";
import * as actionTypes from "../store/actions/actionTypes";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const nationality = [
  "Afghanistan",
  "Andorra",
  "Antigua and Barbuda",
  "Anguilla",
  "Albania",
];
let canLeave = false;
export default function Form1(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  React.useEffect(() => {
    canLeave = false;
    window.addEventListener("beforeunload", function (e) {
      if (canLeave) {
        var confirmationMessage =
          "There are unsaved changes left. Are you sure to leave?";

        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
      }
    });
    // eslint-disable-next-line
  }, []);

  const validationSchema = Yup.object({
    field1: Yup.string().required("Required"),
    ...(store.form1.productCategory === "quantity" && {
      field2: Yup.string().required(),
    }),
    productFeatures: Yup.array()
      .of(Yup.string().required())
      .min(1, "At least one is required!")
      .required("Required"),
  });

  return (
    <>
      <Heading text="Product Details" />
      <Formik
        initialValues={store.form2}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          canLeave = true;
          dispatch({ type: actionTypes.SET_FORM_2, data: values });
          setTimeout(() => {
            setSubmitting(false);
            dispatch({ type: actionTypes.SET_PAGE, data: store.page + 1 });
          }, 500);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form style={{ maxWidth: 600 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  fullWidth
                  component={TextField}
                  name="field1"
                  type="text"
                  label="Field 1"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              {store.form1.productCategory === "quantity" && (
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    component={TextField}
                    name="field2"
                    type="text"
                    label="Field 2"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <Field
                  select
                  fullWidth
                  type="text"
                  variant="standard"
                  component={TextField}
                  name="select1"
                  label="Select 1"
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  {["option1"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              {store.form1.productCategory !== "capacity" && (
                <Grid item xs={12}>
                  <Field
                    select
                    fullWidth
                    type="text"
                    variant="standard"
                    component={TextField}
                    name="select2"
                    label="Select 2"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    {["option1"].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
              )}
              <Grid item xs={12}>
                <Field
                  // classes={{ root: classes.root }}
                  select
                  fullWidth
                  type="text"
                  variant="standard"
                  component={TextField}
                  name="productFeatures"
                  label="Product Features"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  SelectProps={{
                    multiple: true,
                    renderValue: (selected) => (
                      <div className={classes.chips}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={value}
                            className={classes.chip}
                          />
                        ))}
                      </div>
                    ),
                  }}
                >
                  {nationality.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>

              <Grid item xs={12} container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={() => {
                      canLeave = true;
                      dispatch({
                        type: actionTypes.SET_PAGE,
                        data: store.page - 1,
                      });
                    }}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
}
