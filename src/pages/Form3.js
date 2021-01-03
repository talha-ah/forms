import React from "react";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "formik-material-ui";
import { Button, Typography, MenuItem } from "@material-ui/core";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";

import Heading from "../components/Heading";
import * as actionTypes from "../store/actions/actionTypes";

const validationSchema = Yup.object({
  subgroup1: Yup.array().of(
    Yup.object().shape({
      name: Yup.string(),
      description: Yup.string(),
      features: Yup.array().of(Yup.string().required()).required(),
    }),
  ),
  subgroup2: Yup.array().of(
    Yup.object().shape({
      quantity: Yup.number(),
      price: Yup.number(),
    }),
  ),
});

const nationality = [
  "Afghanistan",
  "Andorra",
  "Antigua and Barbuda",
  "Anguilla",
  "Albania",
];
let canLeave = false;
export default function Form3(props) {
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
      <Heading text="Product Options" />
      <Formik
        initialValues={store.form3}
        // validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          canLeave = true;
          dispatch({ type: actionTypes.SET_FORM_3, data: values });
          setTimeout(() => {
            setSubmitting(false);

            dispatch({ type: actionTypes.SET_PAGE, data: store.page + 1 });
          }, 500);
        }}
      >
        {({ submitForm, isSubmitting, values }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} container spacing={2}>
                <Typography variant="h5">Sub Group 1</Typography>
                <FieldArray name="subgroup1">
                  {({ insert, remove, push }) => (
                    <React.Fragment>
                      {values.subgroup1.length > 0 &&
                        values.subgroup1.map((subgroupItem, index) => (
                          <Grid item xs={12} container spacing={2} key={index}>
                            <Grid item xs={12}>
                              <Field
                                fullWidth
                                component={TextField}
                                name={`subgroup1.${index}.name`}
                                type="text"
                                label="Product Name"
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Field
                                fullWidth
                                component={TextField}
                                name={`subgroup1.${index}.description`}
                                type="text"
                                label="Product Description"
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Field
                                select
                                fullWidth
                                type="text"
                                variant="standard"
                                component={TextField}
                                name={`subgroup1.${index}.features`}
                                label="Product Features"
                                SelectProps={{
                                  multiple: true,
                                  defaultValue: [],
                                }}
                              >
                                {nationality.map((option) => (
                                  <MenuItem key={option} value={option}>
                                    {option}
                                  </MenuItem>
                                ))}
                              </Field>
                            </Grid>
                            <Grid item xs={12}>
                              <Button
                                type="button"
                                variant="contained"
                                color="secondary"
                                onClick={() => remove(index)}
                              >
                                X
                              </Button>
                            </Grid>
                          </Grid>
                        ))}
                      <Grid item xs={12}>
                        <Button
                          type="button"
                          fullWidth
                          variant="contained"
                          color="primary"
                          onClick={() => push({ name: "", email: "" })}
                        >
                          Add Row
                        </Button>
                      </Grid>
                    </React.Fragment>
                  )}
                </FieldArray>
              </Grid>
              <Grid item xs={12} container spacing={2}>
                <Typography variant="h5">Sub Group 2</Typography>
                <FieldArray name="subgroup2">
                  {({ insert, remove, push }) => (
                    <React.Fragment>
                      {values.subgroup2.length > 0 &&
                        values.subgroup2.map((subgroupItem, index) => (
                          <Grid item xs={12} container spacing={2} key={index}>
                            <Grid item xs={12}>
                              <Field
                                fullWidth
                                component={TextField}
                                name={`subgroup2.${index}.quantity`}
                                type="number"
                                label="Product Quantity"
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Field
                                fullWidth
                                component={TextField}
                                name={`subgroup2.${index}.price`}
                                type="number"
                                label="Product Price"
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Button
                                type="button"
                                variant="contained"
                                color="secondary"
                                onClick={() => remove(index)}
                              >
                                X
                              </Button>
                            </Grid>
                          </Grid>
                        ))}
                      <Grid item xs={12}>
                        <Button
                          type="button"
                          fullWidth
                          variant="contained"
                          color="primary"
                          onClick={() => push({ name: "", email: "" })}
                        >
                          Add Row
                        </Button>
                      </Grid>
                    </React.Fragment>
                  )}
                </FieldArray>
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
