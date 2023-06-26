
import { formatDate } from "@fullcalendar/core";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

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
