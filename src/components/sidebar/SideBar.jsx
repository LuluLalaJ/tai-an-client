import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import SideBarList from "./SideBarList";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer} from "../../redux/drawerSlice";

export default function SideBar() {
  const { isOpen } = useSelector((store) => store.drawer);
  const dispatch = useDispatch()

  return (
    <>
      <SwipeableDrawer
        anchor="left"
        open={isOpen}
        onClose={() => dispatch(toggleDrawer(false))}
        onOpen={() => dispatch(toggleDrawer(true))}
      >
        <SideBarList />
      </SwipeableDrawer>
    </>
  );
}
