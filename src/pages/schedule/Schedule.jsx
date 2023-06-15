import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core"
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  Typography,
  Button
} from "@mui/material";

import { LessonList, LessonModal } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../redux/modalSlice";
import { addNewLesson } from "../../redux/lessonSlice";

const Schedule = () => {
    const dispatch = useDispatch()

    const lesson = {
      id: "",
      title: "",
      start: "",
      end: "",
      extendedProps: {
        capacity: "",
        level: "",
        price: "",
        description: "",
      },
    };

    const [currentEvents, setCurrentEvents] = useState([]);

    const handleDateClick = (selected) => {
    dispatch(openModal());
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();



    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        // allDay: selected.allDay,

      });
    }
  };



  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };


  const handleSubmit = (e) => {
    e.prevent.default()
  }

  return (
    <Box m="20px">
      {/* <Header title="Calendar" subtitle="Full Calendar Interactive Page" /> */}
      <Button onClick={() => dispatch(addNewLesson(1))}>Open modal</Button>
      <LessonModal handleSubmit={handleSubmit} />
      <Box display="flex" justifyContent="space-between">
        <Box
          flex="1 1 20%"
          // backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Lessons</Typography>
          <LessonList currentEvents={currentEvents} />
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next,today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
              {
                id: "12315",
                title: "All-day event",
                date: "2023-06-15",
              },
              {
                id: "5123",
                title: "Timed event",
                date: "2022-06-17",
              },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Schedule;
