import React from "react";
import Grid from "@material-ui/core/Grid";
import { Formik, Form } from "formik";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import MUIRichTextEditor from "mui-rte";

import Heading from "../components/Heading";
import SmallText from "../components/SmallText";
import * as actionTypes from "../store/actions/actionTypes";

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
      <Heading text={`Product Description`} />
      <SmallText text="Click save button to save your session" />

      <Formik
        initialValues={store.form4}
        validate={(values) => {
          const errors = {};
          if (!values.productName) {
            errors.productName = "Required";
          }
        }}
        onSubmit={(values, { setSubmitting }) => {
          canLeave = true;
          dispatch({ type: actionTypes.SET_FORM_4, data: values });
          setTimeout(() => {
            setSubmitting(false);

            dispatch({ type: actionTypes.SET_PAGE, data: store.page + 1 });
          }, 500);
        }}
      >
        {({ submitForm, isSubmitting, values, setFieldValue }) => (
          <Form style={{ maxWidth: 600 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div style={{ minHeight: 300 }}>
                  <MUIRichTextEditor
                    label="Type product description here..."
                    onSave={(data) => setFieldValue("description", data)}
                    defaultValue={values.description}
                    inlineToolbar={true}
                    controls={[
                      "title",
                      "bold",
                      "italic",
                      "underline",
                      "strikethrough",
                      "numberList",
                      "bulletList",
                      "save",
                    ]}
                  />
                </div>
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
                    disabled={isSubmitting || values.description === ""}
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
