import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { closeLessonPop } from "../../redux/lessonSlice";


export default function LessonPop({ lessonPopAnchorEl }) {
  const dispatch = useDispatch();
  const { isLessonPopOpen } = useSelector((store) => store.lesson);

  return (
    <div>
      <Popover
        id="lesson"
        open={isLessonPopOpen}
        anchorEl={lessonPopAnchorEl}
        onClose={() => dispatch(closeLessonPop())}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </div>
  );
}
