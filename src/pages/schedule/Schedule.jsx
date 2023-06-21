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
  openLessonPop,
  editLessonRequest
} from "../../redux/lessonSlice";
import {TOMORROW } from '../../constants'

const Schedule = () => {

  const dispatch = useDispatch();
  const { currentCal, newLesson } = useSelector(
    (store) => store.lesson
  );
  const { user, role } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(getAllLessons());
  }, []);

  const [selectedCalendar, setSelectedCalendar] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("")

  const addLesson = (info) => {
    if (info.start <= TOMORROW) {
      alert("You can only add a new lesson at least one day in advance!");
      info.view.calendar.unselect();
    } else {
      console.log(info);
      const selectedTime = {
        start: info.startStr,
        end: info.endStr,
      };
      dispatch(openNewLessonFormModal());
      dispatch(updateNewLessonTime(selectedTime));
      setSelectedCalendar(info);
    }

  };

  useEffect(() => {
    if (newLesson) {
      const calendarApi = selectedCalendar.view.calendar;
      calendarApi.unselect();
      calendarApi.addEvent(newLesson);
    };
  }, [newLesson]);

  const editLesson = (info) => {
    setSelectedEvent(info);
    dispatch(openLessonPop());
  };

  const deleteLesson = (info) => {
    info.event.remove()
  }

  const changeEndTime = (info) => {
    if (user.id === info.event.extendedProps['teacher_id']) {
      const message = `Do you want to end ${info.event.title} at the new time: ${info.event.end}?`
      if (!window.confirm(message)) {
        info.revert();
      } else {
        // console.log(info.event.end);
        //format: Sun Jul 02 2023 11:00:00 GMT-0400 (Eastern Daylight Time)
        dispatch(editLessonRequest(info.event));
      }
    } else {
      alert('You can only edit your own lesson!')
      info.revert();
    }
  };

  const changeStartTime = (info) => {
    // NOTE: fullcalendar's dates is just native JavaScript Date objects
    if (user.id === info.event.extendedProps["teacher_id"]) {
      const message = `Do you want to start ${info.event.title} at the new time: ${info.event.start}?`;
      if (!window.confirm(message)) {
        info.revert();
      } else {
        dispatch(editLessonRequest(info.event));
      }
    } else {
      alert("You can only edit your own lesson!");
      info.revert();
    }
  };

  // console.log("currentCal", currentCal);

  const currentCalGreyedPast = currentCal.map(event => {
    const eventStartDate = new Date(event.start)
    if (eventStartDate <= TOMORROW) {
      const newAttr = {
        editable: false,
        backgroundColor: "#858585",
      };
      return { ...event, ...newAttr };
    }
    return event
  })

return (
  <Box m="20px">
    <LessonModal />
    <FullCalendar
      height="80vh"
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
      // validRange={{
      //   start:"2023-06-23"
      // }}
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
      select={(info) => addLesson(info)}
      eventResize={(info) => changeEndTime(info)}
      eventDrop={(info) => changeStartTime(info)}
      //edit event detail through here
      eventClick={(info) => editLesson(info)}
      events={currentCalGreyedPast}
      /* you should also look into eventContent which might be able to change the displayed content
      or other options to change colors
      https://fullcalendar.io/docs/event-display
      you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}

          */
    />
    {selectedEvent && (
      <LessonPop
        info={selectedEvent}
        deleteLesson={deleteLesson}
      />
    )}
  </Box>
);
};

export default Schedule;
