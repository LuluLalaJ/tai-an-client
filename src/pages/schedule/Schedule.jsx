import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { LessonModal, LessonPop } from "../../components";
import {
  getAllLessons,
  getTeacherLessons,
  getStudentLessons,
  openNewLessonFormModal,
  updateNewLessonTime,
  setLessonPopInfo,
  openLessonPop
} from "../../redux/lessonSlice";
import { render } from "@fullcalendar/core/preact";

const Schedule = () => {
  const dispatch = useDispatch();
  const { allLessons, myLessons, currentCal, newLesson} = useSelector(
    (store) => store.lesson
  );
  const { user, role } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(getAllLessons());
  }, []);

  const [selectedCalendar, setSelectedCalendar] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("")

  const addLesson = (selected) => {
    const selectedTime = {
      start: selected.startStr,
      end: selected.endStr,
    };
    console.log(selectedTime);
    dispatch(openNewLessonFormModal());
    dispatch(updateNewLessonTime(selectedTime));
    setSelectedCalendar(selected);
  };

  useEffect(() => {
    if (newLesson) {
      const calendarApi = selectedCalendar.view.calendar;
      calendarApi.unselect();
      calendarApi.addEvent(newLesson);
    };
  }, [newLesson]);

  const handleEventClick = (info) => {
    setSelectedEvent(info)
    dispatch(openLessonPop());
    dispatch(setLessonPopInfo(info.event.extendedProps));
    console.log(info.event.id);
  };

  const deleteLesson = (info) => {
    info.event.remove()
  }

  const edit = (info) => {
    if (user.id === info.event.extendedProps['teacher_id']) {
      alert(info.event.title + " end is now " + info.event.end.toISOString());
        if (!window.confirm("is this okay?")) {
          info.revert();
        }
    } else {
      alert('You can only edit your own lesson!')
      info.revert();
    }
  };

  console.log("currentCal", currentCal);
return (
  <Box m="20px">
    <LessonModal />
    <FullCalendar
      height="80vh"
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
      customButtons={{
        allLessons: {
          text: "All Lessons",
          click: function () {
            dispatch(getAllLessons());
          },
        },
        myLessons: {
          text: "My Lessons",
          click: function () {
            if (role === "student") {
              dispatch(getStudentLessons(user.id));
            } else if (role === "teacher") dispatch(getTeacherLessons(user.id));
          },
        },
      }}
      headerToolbar={{
        left: "prev,next,today allLessons,myLessons",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
      }}
      initialView="timeGridWeek"
      editable={role === "teacher"}
      selectable={role === "teacher"}
      selectMirror={role === "teacher"}
      dayMaxEvents={true}
      //add event through here
      select={addLesson}
      eventResize={(info) => edit(info)}
      //edit event time through here
      eventDragStart={(info) => console.log("drag", info)}
      //edit event detail through here
      eventClick={(info) => handleEventClick(info)}
      // But not rendered the first time
      events={currentCal}
      /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
          */
    />
    {selectedEvent && (
      <LessonPop selectedEvent={selectedEvent} deleteLesson={deleteLesson} />
    )}
  </Box>
);
};

export default Schedule;
