import React from "react";
import moment from "moment";
import Calendar from "rc-year-calendar";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import Heading from "../components/Heading";
import * as actionTypes from "../store/actions/actionTypes";

let canLeave = false;
export default function Form1(props) {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [currentEvent, setCurrentEvent] = React.useState(null);

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

  function saveCurrentEvent() {
    if (currentEvent.id === undefined) {
      // Add event
      currentEvent.id = Math.max(...store.form5.dates.map((evt) => evt.id)) + 1;
      dispatch({
        type: actionTypes.SET_FORM_5,
        data: { dates: store.form5.dates.concat([currentEvent]) },
      });
      setCurrentEvent(null);
    } else {
      // Update event
      var ds = store.form5.dates;
      var index = ds.findIndex((evt) => evt.id === currentEvent.id);
      ds[index] = currentEvent;
      dispatch({ type: actionTypes.SET_FORM_5, data: { dates: ds } });
      setCurrentEvent(null);
    }

    setCurrentEvent(null);
  }

  return (
    <>
      <Heading text="Product Availability" />
      <div style={{ maxWidth: 600 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Calendar
              minDate={new Date()}
              enableRangeSelection={true}
              enableContextMenu={true}
              contextMenuItems={[
                {
                  text: "Update",
                  click: (evt) => setCurrentEvent(evt),
                },
                {
                  text: "Delete",
                  click: (evt) =>
                    dispatch({
                      type: actionTypes.SET_FORM_5,
                      data: {
                        dates: store.form5.dates.filter(
                          (item) => item.id !== evt.id,
                        ),
                      },
                    }),
                },
              ]}
              onRangeSelected={(e) =>
                setCurrentEvent({
                  startDate: e.startDate,
                  endDate: e.endDate,
                })
              }
              dataSource={store.form5.dates}
            />
          </Grid>
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
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
                onClick={() => {
                  canLeave = true;
                  dispatch({
                    type: actionTypes.SET_PAGE,
                    data: store.page + 1,
                  });
                }}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Dialog
        open={currentEvent ? true : false}
        onClose={() => currentEvent(null)}
        aria-labelledby="form-dialog-title"
      >
        {currentEvent && (
          <DialogTitle id="form-dialog-title">
            {currentEvent.id !== undefined ? "Update event" : "Add event"}
          </DialogTitle>
        )}
        {currentEvent && (
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  name="eventName"
                  label="Event Name"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="data"
                  id="min-date"
                  name="startDate"
                  label="Event From"
                  value={moment(currentEvent.startDate).format("YYYY-MM-DD")}
                  onChange={(e) =>
                    setCurrentEvent({
                      ...currentEvent,
                      startDate: e.target.valueAsDate,
                    })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="date"
                  name="endDate"
                  label="Event To"
                  value={moment(currentEvent.endDate).format("YYYY-MM-DD")}
                  onChange={(e) =>
                    setCurrentEvent({
                      ...currentEvent,
                      endDate: e.target.valueAsDate,
                    })
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={() => setCurrentEvent(null)} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => saveCurrentEvent()} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
