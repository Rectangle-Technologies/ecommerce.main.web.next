import React, {useEffect} from "react";
import { connect } from "react-redux";
import SocketAPI from "../redux/services/sockets";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export let SocketContext = React.createContext();

const Socket = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    if (!window.socket) {
        window.socket = new SocketAPI("userid", dispatch, navigate, enqueueSnackbar);
        window.socket.connect();
    }

    const type = "user";
    const userid = " userid";

    useEffect(() => {
        if (!type || !userid) {
            navigate("/");
            enqueueSnackbar("Room not found. Please check the details", {
                variant: "error",
                autoHideDuration: 5000,
            });
        }
    }, []);

    return (
        <div className="socket-wrapper" >
            <SocketContext.Provider value={{socket: window.socket}} >
            {props.children}
            </SocketContext.Provider>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps, {})(Socket);