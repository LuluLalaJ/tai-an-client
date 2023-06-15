import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

const LessonList = ({currentEvents}) => {
  return (
    <List>
      {currentEvents.map((event) => (
        <ListItem
          key={event.id}
          sx={{
            // backgroundColor: colors.greenAccent[500],
            margin: "10px 0",
            borderRadius: "2px",
          }}
        >
          <ListItemText
            primary={event.title}
            secondary={
              <Typography>
                {formatDate(event.start, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default LessonList;
