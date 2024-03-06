import React, { useEffect } from "react";
import { connect } from "react-redux";
import SocketAPI from "../redux/services/sockets";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";

export let SocketContext = React.createContext();

const Socket = (props) => {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  if (typeof window !== "undefined" && !window.socket) {
    window.socket = new SocketAPI(
      "userid",
      dispatch,
      navigate,
      enqueueSnackbar
    );
    window.socket.connect();
  }

  const type = "user";
  const userid = " userid";

  useEffect(() => {
    if (!type || !userid) {
      navigate.push("/");
      enqueueSnackbar("Room not found. Please check the details", {
        variant: "error",
        autoHideDuration: 5000,
      });
    }
  }, []);
  if (typeof window !== "undefined") {
    return (
      <div className="socket-wrapper">
        <SocketContext.Provider value={{ socket: window.socket }}>
          {props.children}
        </SocketContext.Provider>
      </div>
    );
  } else {
    return <div className="socket-wrapper">{props.children}</div>;
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {})(Socket);
