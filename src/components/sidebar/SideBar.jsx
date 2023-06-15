import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import SideBarList from "./SideBarList";


import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "../../redux/drawerSlice";

export default function SideBar() {
  const { isOpen } = useSelector((store) => store.drawer);


  const anchor = "left";

  return (
    <>
      <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
      <SwipeableDrawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(anchor, false)}
        onOpen={toggleDrawer(anchor, true)}
      >
        <SideBarList anchor={"left"} toggleDrawer={toggleDrawer}/>
      </SwipeableDrawer>
    </>
  );
}

// export default function SideBar() {
//   const [state, setState] = React.useState({
//     top: false,
//     left: false,
//     bottom: false,
//     right: false,
//   });

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (
//       event &&
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const list = (anchor) => (
//     <Box
//       sx={{ width: 250 }}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//       <List>
//         {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {["All mail", "Trash", "Spam"].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   const anchor = "left"

//   return (
//       <>
//         <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
//         <SwipeableDrawer
//           anchor="left"
//           open={state[anchor]}
//           onClose={toggleDrawer(anchor, false)}
//           onOpen={toggleDrawer(anchor, true)}
//         >
//           {list(anchor)}
//         </SwipeableDrawer>
//       </>
//   );
// }
