import React from "react";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "formik-material-ui";
import { Button, MenuItem } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import Heading from "../components/Heading";
import * as actionTypes from "../store/actions/actionTypes";

const validationSchema = Yup.object({
  field1: Yup.string().required("Required"),
  field2: Yup.string().required("Required"),
  select1: Yup.string().required("Required"),
  select2: Yup.string().required("Required"),
  productFeatures: Yup.array()
    .of(Yup.string().required())
    .min(1, "At least one is required!")
    .required("Required"),
});

const nationality = [
  "Afghanistan",
  "Andorra",
  "Antigua and Barbuda",
  "Anguilla",
  "Albania",
];
let canLeave = false;
export default function Form1(props) {
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
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  fullWidth
                  component={TextField}
                  name="field1"
                  type="text"
                  label="Field 1"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  fullWidth
                  component={TextField}
                  name="field2"
                  type="text"
                  label="Field 2"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  select
                  fullWidth
                  type="text"
                  variant="standard"
                  component={TextField}
                  name="select1"
                  label="Select 1"
                >
                  {["option1"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Field
                  select
                  fullWidth
                  type="text"
                  variant="standard"
                  component={TextField}
                  name="select2"
                  label="Select 2"
                >
                  {["option1"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
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
                  SelectProps={{
                    multiple: true,
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
