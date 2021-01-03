import React from "react";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Checkbox } from "formik-material-ui";
import { Button, MenuItem } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import Heading from "../components/Heading";
import * as actionTypes from "../store/actions/actionTypes";

const validationSchema = Yup.object({
  productName: Yup.string().required("Required"),
  productLabel: Yup.string().required("Required"),
  productCategory: Yup.string().required("Required"),
  addressCheckbox: Yup.boolean(),
  address: Yup.string().when("addressCheckbox", {
    is: true,
    then: Yup.string().required("Required"),
  }),
  city: Yup.string().when("addressCheckbox", {
    is: true,
    then: Yup.string().required("Required"),
  }),
  state: Yup.string().when("addressCheckbox", {
    is: true,
    then: Yup.string().required("Required"),
  }),
  zip: Yup.string().when("addressCheckbox", {
    is: true,
    then: Yup.string().required("Required"),
  }),
  country: Yup.string().when("addressCheckbox", {
    is: true,
    then: Yup.string().required("Required"),
  }),
});

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
      <Heading text="Product initial information" />
      <Formik
        initialValues={store.form1}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          canLeave = true;
          dispatch({ type: actionTypes.SET_FORM_1, data: values });
          setTimeout(() => {
            setSubmitting(false);

            dispatch({ type: actionTypes.SET_PAGE, data: store.page + 1 });
          }, 500);
        }}
      >
        {({ submitForm, isSubmitting, values }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  fullWidth
                  component={TextField}
                  name="productName"
                  type="text"
                  label="Product Name"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  fullWidth
                  component={TextField}
                  name="productLabel"
                  type="text"
                  label="Product Label"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  select
                  fullWidth
                  type="text"
                  variant="standard"
                  component={TextField}
                  name="productCategory"
                  label="Select product Category"
                  helperText="Please prouduct category"
                >
                  {["weight", "quantity"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>

              <Grid item xs={12}>
                <label>
                  <Field
                    type="checkbox"
                    name="addressCheckbox"
                    component={Checkbox}
                  />
                  Address Fields
                </label>
              </Grid>
              {values.addressCheckbox && (
                <>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      component={TextField}
                      name="address"
                      type="text"
                      label="Address"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      component={TextField}
                      name="city"
                      type="text"
                      label="City"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      component={TextField}
                      name="state"
                      type="text"
                      label="State"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      component={TextField}
                      name="zip"
                      type="text"
                      label="Zip"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      component={TextField}
                      name="country"
                      type="text"
                      label="Country"
                    />
                  </Grid>
                </>
              )}
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
