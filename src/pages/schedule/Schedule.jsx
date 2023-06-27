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
  editLessonRequest,
  resetNewLesson,
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
  }, [dispatch]);

  const [selectedCalendar, setSelectedCalendar] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("")

  const addLesson = (info) => {
    if (info.start <= TOMORROW) {
      alert("You can only add a new lesson at least one day in advance!");
      info.view.calendar.unselect();
    } else {
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
    if (newLesson && selectedCalendar) {
      const calendarApi = selectedCalendar.view.calendar;
      calendarApi.unselect();
      calendarApi.addEvent(newLesson);
    };
  }, [newLesson]);

  const editLesson = (info) => {
    setSelectedEvent(info);
    dispatch(openLessonPop());
  };

  const changeEndTime = (info) => {
    if (user.id === info.event.extendedProps['teacher_id']) {
      const message = `Do you want to change the time for ${info.event.title}?`;
      if (!window.confirm(message)) {
        info.revert();
      } else {
        const lessonId = parseInt(info.event.id);
        dispatch(editLessonRequest([lessonId, { end: info.event.end }]));
      }
    } else {
      alert('You can only edit your own lesson!')
      info.revert();
    }
  };


  const changeStartTime = (info) => {
    if (user.id === info.event.extendedProps["teacher_id"]) {
      const message = `Do you want to change the time for ${info.event.title}?`;
      if (!window.confirm(message)) {
        info.revert();
      } else {
        const lessonId = parseInt(info.event.id);
        dispatch(editLessonRequest([lessonId, { start: info.event.start, end: info.event.end}]));
      }
    } else {
      alert("You can only edit your own lesson!");
      info.revert();
    }
  };

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
      timeZone={"UTC"}
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
      initialView="dayGridMonth"
      editable={role === "teacher"}
      selectable={role === "teacher"}
      selectMirror={role === "teacher"}
      dayMaxEvents={true}
      select={(info) => addLesson(info)}
      eventResize={(info) => changeEndTime(info)}
      eventDrop={(info) => changeStartTime(info)}
      eventClick={(info) => editLesson(info)}
      events={currentCalGreyedPast}
    />
    {selectedEvent && <LessonPop info={selectedEvent} />}
  </Box>
);
};

export default Schedule;
