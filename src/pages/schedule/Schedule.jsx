import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  Typography,
  Button
} from "@mui/material";

import { LessonList, LessonModal, LessonPop } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllLessons,
  getTeacherLessons,
  getStudentLessons,
  openNewLessonFormModal,
  updateNewLessonTime,
  setLessonPopInfo,
  openLessonPop
} from "../../redux/lessonSlice";

const Schedule = () => {
  const { allLessons, myLessons, newLesson} = useSelector(
    (store) => store.lesson
  );
  const { user, role } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLessons());
  }, []);


  const [currentCalendar, setCurrentCalendar] = useState(allLessons)
  const [selectedCalendar, setSelectedCalendar] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("")

  const addLesson = (selected) => {
    const selectedTime = {
      start: selected.startStr,
      end: selected.endStr,
    };
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

  // console.log(allLessons);
  // console.log(myLessons)



  return (
    <Box m="20px">
      {/* <Header title="Calendar" subtitle="Full Calendar Interactive Page" /> */}
      <Button
        onClick={() => {
          dispatch(getAllLessons());
          setCurrentCalendar(allLessons);
        }}
      >
        View All Lessons
      </Button>

      <Button
        onClick={() => {
          if (role === "student") {
            dispatch(getStudentLessons(user.id));
          } else if (role === "teacher") dispatch(getTeacherLessons(user.id));
          setCurrentCalendar(myLessons);
        }}
      >
        View My Lessons
      </Button>

      <LessonModal />
      <Box display="flex" justifyContent="space-between">
        <Box
          flex="1 1 20%"
          // backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Lessons</Typography>
          <LessonList currentEvents={currentCalendar} />
        </Box>

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
            events={currentCalendar}
          />
          {selectedEvent && (
            <LessonPop selectedEvent = {selectedEvent}  deleteLesson={deleteLesson} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Schedule;
