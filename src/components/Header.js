import { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import DehazeIcon from '@mui/icons-material/Dehaze';
import { Box, color, display, minWidth, positions, textAlign, width } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import { MdRefresh } from "react-icons/md";

const headerStyle = {
  display: "flex",
  flexDirection: "row",
  backgroundColor: "#061A40",
  color: "white",
  //height: 60,
  maxWidth: 150,
  textAlign: "center",
  padding: "0px 10px 0px 10px",
  justifyContent: "center",
};

const linkStyle = {
  textDecoration: "none",
  color: "white",
};

export const Header = (props) => {
  const redirect = useNavigate();
  const { companyId } = useParams();

  const handleLogOut = () => {
    sessionStorage.removeItem("accessToken");
    redirect("/login");
  };

  return (
    <Box
      className="header"
      style={{
        backgroundColor: "#D4DCFF",
        minWidth: 200,
        textAlign: "center",
        color: "black"
      }}
      // style={{
      //   ...headerStyle,
      //   justifyContent: "space-between",
      //   alignItems: "center",
      // }}
    >
      <Box //style={{ width: "150px" }} 
      />
      <Box //style={{ display: "flex", gap: "20px" }}
      >
        <div
          className="NavLink"
          onClick={() => redirect(`/admin/bookings/${companyId}`)}
        >
          Home
        </div>
        <div
          className="NavLink"
          onClick={() => redirect(`/admin/recents/${companyId}`)}
        >
          All bookings
        </div>
        <div
          className="NavLink"
          onClick={() => redirect(`/admin/edit/${companyId}`)}
        >
          Settings
        </div>
      </Box>

      {/* Log out aligned to the far right */}
      <Box>
        <div className="NavLink" onClick={handleLogOut}>
          Log out
        </div>
      </Box>
    </Box>
  );
};

export function PhoneHeader() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { companyId } = useParams();
  const redirect = useNavigate()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="positioned-demo-button"
        aria-controls={open ? 'positioned-demo-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="outlined"
        color="black"
        onClick={handleClick}
        style={{
            float: "top",
            position: "absolute"
        }}
      >
        {/* <MoreVert style={{fontSize: 50}}  /> */}
        <DehazeIcon style={{fontSize: 40}} />
      </IconButton>

      <Menu
        id="positioned-demo-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        aria-labelledby="positioned-demo-button"
        placement="bottom-end"
      >
        <MenuItem onClick={() => {
              redirect(`/admin/bookings/${companyId}`)
              setAnchorEl(null);
            }}
        >
            Calendar
        </MenuItem>
        <MenuItem onClick={() => {
              redirect(`/admin/recents/${companyId}`)
              setAnchorEl(null);
            }}
        >
            All bookings
        </MenuItem>
        <MenuItem onClick={() => {
              redirect(`/admin/edit/${companyId}`)
              setAnchorEl(null);
            }}
        >
            Edit
        </MenuItem>
        <MenuItem onClick={() => {
              redirect(`/admin/punch/${companyId}`)
              setAnchorEl(null);
            }}
        >
            Punch Clock
        </MenuItem>
        <MenuItem onClick={() => {
              redirect(`/admin/punches/${companyId}`)
              setAnchorEl(null);
            }}
        >
            Punches
        </MenuItem>
        <MenuItem onClick={() => {
            sessionStorage.removeItem('accessToken');
            redirect(`/login`)
            setAnchorEl(null);
          }}
        >
            Log out
        </MenuItem>
      </Menu>
    </>
  );
}
