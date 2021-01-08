import React from "react";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "formik-material-ui";
import { Button, Typography, MenuItem } from "@material-ui/core";
import { Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import Chip from "@material-ui/core/Chip";
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
export default function Form3(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  React.useEffect(() => {
    canLeave = false;
    window.addEventListener("beforeunload", function (e) {
      if (canLeave) {
        var confirmationMessage =
          "There are unsaved changes left. Are you sure to leave?";

        (e || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Heading text="Product Options" />
      <div className="app">
        <Formik
          initialValues={store.form3}
          validationSchema={Yup.object({
            groups: Yup.array().of(
              Yup.object().shape({
                name: Yup.string().required("Name required"),
                description: Yup.string().required("Description required"),
                features: Yup.array()
                  .of(Yup.string().required())
                  .min(1, "At least one is required!")
                  .required(),
                children: Yup.array().of(
                  Yup.object().shape({
                    quantity: Yup.number().required("Quantity required"),
                    price: Yup.number().required("Price required"),
                  }),
                ),
              }),
            ),
          })}
          onSubmit={(values, { setSubmitting }) => {
            canLeave = true;
            dispatch({ type: actionTypes.SET_FORM_3, data: values });
            console.log(values);
            setTimeout(() => {
              setSubmitting(false);
              dispatch({ type: actionTypes.SET_PAGE, data: store.page + 1 });
            }, 500);
          }}
        >
          {(props) => {
            const { values, handleSubmit, submitForm, isSubmitting } = props;
            return (
              <Form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
                <FieldArray
                  id="groups"
                  name="groups"
                  render={(arrayHelpers) => {
                    const groups = values.groups;
                    return (
                      <Grid container spacing={2}>
                        {groups && groups.length > 0 ? (
                          groups.map((product, index) => (
                            <Grid
                              item
                              xs={12}
                              container
                              spacing={2}
                              key={index}
                            >
                              <Grid item xs={12}>
                                <Typography variant="h6">
                                  Product {index + 1}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Field
                                  fullWidth
                                  component={TextField}
                                  label="Product Name"
                                  id={`groups.${index}.name`}
                                  name={`groups.${index}.name`}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <Field
                                  fullWidth
                                  component={TextField}
                                  label="Product description"
                                  id={`groups.${index}.description`}
                                  name={`groups.${index}.description`}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <Field
                                  select
                                  fullWidth
                                  type="text"
                                  variant="standard"
                                  component={TextField}
                                  id={`groups.${index}.features`}
                                  name={`groups.${index}.features`}
                                  label="Product Features"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  SelectProps={{
                                    multiple: true,
                                    defaultValue: [],
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
                              <Grid item xs={12} container>
                                <FieldArray
                                  id={`groups.${index}.children`}
                                  name={`groups.${index}.children`}
                                  render={(arrayHelpers2, insideIndex) => {
                                    return (
                                      <Grid item xs={12} key={insideIndex}>
                                        {groups[index].children &&
                                        groups[index].children.length > 0 ? (
                                          <div
                                            style={{
                                              marginLeft: 10,
                                              marginTop: 10,
                                            }}
                                          >
                                            {groups[index].children.map(
                                              (q, indexxx) => {
                                                return (
                                                  <Grid
                                                    key={indexxx}
                                                    container
                                                    spacing={2}
                                                  >
                                                    <Grid item xs={12}>
                                                      <Field
                                                        fullWidth
                                                        component={TextField}
                                                        type="number"
                                                        id={`groups.${index}.children.${indexxx}.quantity`}
                                                        name={`groups.${index}.children.${indexxx}.quantity`}
                                                        label="Product quantity"
                                                        InputLabelProps={{
                                                          shrink: true,
                                                        }}
                                                      />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                      <Field
                                                        fullWidth
                                                        component={TextField}
                                                        type="number"
                                                        id={`groups.${index}.children.${indexxx}.price`}
                                                        name={`groups.${index}.children.${indexxx}.price`}
                                                        label="Product price"
                                                        InputLabelProps={{
                                                          shrink: true,
                                                        }}
                                                      />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                      <Button
                                                        fullWidth
                                                        type="button"
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={() =>
                                                          arrayHelpers2.remove(
                                                            index,
                                                          )
                                                        }
                                                      >
                                                        - Detail
                                                      </Button>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                      <Button
                                                        fullWidth
                                                        type="button"
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() =>
                                                          arrayHelpers2.push(
                                                            index,
                                                            {
                                                              quantity: "",
                                                              price: "",
                                                            },
                                                          )
                                                        }
                                                      >
                                                        + Detail
                                                      </Button>
                                                    </Grid>
                                                  </Grid>
                                                );
                                              },
                                            )}
                                          </div>
                                        ) : (
                                          <Grid item xs={12}>
                                            <Button
                                              fullWidth
                                              type="button"
                                              variant="contained"
                                              color="primary"
                                              onClick={() =>
                                                arrayHelpers2.push({
                                                  name: "",
                                                  description: "",
                                                  features: [],
                                                  children: [],
                                                })
                                              }
                                            >
                                              Add Product Detail
                                            </Button>
                                          </Grid>
                                        )}
                                      </Grid>
                                    );
                                  }}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <Button
                                  fullWidth
                                  type="button"
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  - Product
                                </Button>
                              </Grid>
                              <Grid item xs={6}>
                                <Button
                                  fullWidth
                                  type="button"
                                  variant="contained"
                                  color="primary"
                                  onClick={() =>
                                    arrayHelpers.push({
                                      name: "",
                                      description: "",
                                      features: [],
                                      children: [],
                                    })
                                  }
                                >
                                  + Product
                                </Button>
                              </Grid>
                            </Grid>
                          ))
                        ) : (
                          <Grid item xs={12}>
                            <Button
                              fullWidth
                              type="button"
                              variant="contained"
                              color="primary"
                              onClick={() =>
                                arrayHelpers.push({
                                  name: "",
                                  description: "",
                                  features: [],
                                  children: [],
                                })
                              }
                            >
                              Add New Product
                            </Button>
                          </Grid>
                        )}
                      </Grid>
                    );
                  }}
                />
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
                      type="submit"
                      disabled={isSubmitting}
                      onClick={submitForm}
                    >
                      Next
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}
