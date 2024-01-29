//components
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const EventDialog = ({
  dialogProperties,
  handleCloseDialog,
  handleSaveDialog,
  handleDeleteDialog,
  dispatch,
}) => {
  return (
    <Dialog open={dialogProperties.open} onClose={handleCloseDialog}>
      <DialogTitle>{dialogProperties.title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Event"
          fullWidth
          value={dialogProperties.content}
          onChange={(e) => {
            dispatch({ type: "SET_CONTENT", content: e.target.value });
          }}
        />
        <TextField
          margin="dense"
          label="Start"
          type="datetime-local"
          fullWidth
          value={
            dialogProperties.start
              ? new Date(
                  dialogProperties.start.getTime() -
                    dialogProperties.start.getTimezoneOffset() * 60000
                )
                  .toISOString()
                  .substring(0, 16)
              : ""
          }
          onChange={(e) => {
            dispatch({ type: "SET_START", start: new Date(e.target.value) });
          }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="dense"
          label="End"
          type="datetime-local"
          fullWidth
          value={
            dialogProperties.end
              ? new Date(
                  dialogProperties.end.getTime() -
                    dialogProperties.end.getTimezoneOffset() * 60000
                )
                  .toISOString()
                  .substring(0, 16)
              : ""
          }
          onChange={(e) =>
            dispatch({ type: "SET_END", end: new Date(e.target.value) })
          }
          InputLabelProps={{ shrink: true }}
        />
        <Checkbox
          checked={dialogProperties.allDay}
          onChange={(e) =>
            dispatch({ type: "SET_ALL_DAY", allDay: e.target.checked })
          }
        />
        All Day
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveDialog} color="primary">
          Save
        </Button>
        {dialogProperties.id && (
          <Button onClick={handleDeleteDialog} color="secondary">
            Delete
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default EventDialog;
