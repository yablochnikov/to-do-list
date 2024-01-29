import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
//components
import { Box } from "@mui/material";
import EventDialog from "../EventDialog";
import Loader from "../Loader";
//hooks
import useEventHandling from "../../hooks/useEventHandling";
//helpers
import {
  fetchEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "../../utils/api";
//styles
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Calendar.scss";

const Calendar = ({ ...props }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const { dialogProperties, dispatch } = useEventHandling();

  useEffect(() => {
    fetchEventsFromServer();
  }, []);

  const fetchEventsFromServer = async () => {
    setLoading(true);
    try {
      const eventsData = await fetchEvents();
      setEvents(eventsData);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (arg) => {
    dispatch({
      type: "ADD_EVENT",
      title: "Add Event",
      content: "",
      start: arg.start,
      end: arg.end,
      allDay: arg.allDay,
      id: arg.id,
    });
  };

  const handleEventClick = (arg) => {
    dispatch({
      type: "EVENT_CLICK",
      title: "Edit Event",
      content: arg.event.title,
      start: arg.event.start,
      end: arg.event.end,
      allDay: arg.event.allDay,
      id: arg.event.id,
    });
  };

  const handleCloseDialog = () => {
    dispatch({ type: "CLOSE_DIALOG" });
  };

  const handleSaveDialog = async () => {
    try {
      if (dialogProperties.id) {
        await updateEvent({
          id: dialogProperties.id,
          title: dialogProperties.content,
          start: dialogProperties.start,
          end: dialogProperties.end,
          allDay: dialogProperties.allDay,
        });
      } else {
        await addEvent({
          title: dialogProperties.content,
          start: dialogProperties.start,
          end: dialogProperties.end,
          allDay: dialogProperties.allDay,
        });
      }
      fetchEventsFromServer();
    } catch (error) {
      console.error("Error saving event:", error);
    }
    handleCloseDialog();
  };

  const handleDeleteDialog = async () => {
    try {
      await deleteEvent(dialogProperties.id);
      fetchEventsFromServer();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
    handleCloseDialog();
  };

  return (
    <Box>
      {loading ? (
        <Loader />
      ) : (
        <>
          <FullCalendar
            themeSystem="bootstrap5"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              bootstrap5Plugin,
            ]}
            initialView="dayGridMonth"
            events={events}
            weekends={true}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            selectable={true}
            editable={true}
            select={handleSelect}
            eventClick={handleEventClick}
            {...props}
          />
          <EventDialog
            dialogProperties={dialogProperties}
            handleCloseDialog={handleCloseDialog}
            handleSaveDialog={handleSaveDialog}
            handleDeleteDialog={handleDeleteDialog}
            dispatch={dispatch}
          />
        </>
      )}
    </Box>
  );
};

export default Calendar;
