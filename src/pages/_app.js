import "@/styles/globals.css";
import { usePathname } from "next/navigation";
import { SnackbarProvider } from "notistack";
import { Component } from "react";
import { connect, Provider } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import { CircularProgress } from "@mui/material";
import Socket from "@/components/Socket";
import { removeLoader } from "@/redux/services/actions/loaderActions";
import store from "@/redux/store";

class ReduxSetup extends Component {
  render() {
    return (
      <Provider store={store}>
        <SnackbarProvider
          preventDuplicate
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          maxSnack={3}
        >
          {this.props.children}
        </SnackbarProvider>
      </Provider>
    );
  }
}

const ScrollToTop = (props) => {
  const location = usePathname();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>;
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  };
};

export default function App({ Component, pageProps }) {
  const AppUpgrade = connect(mapStateToProps, { removeLoader })(Component);
  return (
    <ReduxSetup>
      <Socket>
        <ScrollToTop>
          <AppUpgrade {...pageProps} />
        </ScrollToTop>
      </Socket>
    </ReduxSetup>
  );
}
