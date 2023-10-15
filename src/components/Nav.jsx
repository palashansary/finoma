import { Link, useLocation } from "react-router-dom";
import LoginDashboard from "./LoginDashBoard";
import { useSelector, useDispatch } from "react-redux";
import { openDashBoard, closeDashBoard } from "../store/authSlice";
import finoma from "../Images/finoma.png";
import { auth } from "../firebase/firebase";

const Nav = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  // code for selecting the the user state data from redux store
  const user = useSelector((state) => state.auth.user);

  // Logic for Opening and Closing the user dashboard

  const isDashboardVisible = useSelector(
    (state) => state.auth.isDashboardVisible
  );

  const dashOpenHandler = () => {
    dispatch(openDashBoard());
  };

  const dashCloseHandler = () => {
    dispatch(closeDashBoard());
  };

  // Logic for Opening and Closing the user dashboard Ends here

  return (
    <div>
      <div
        className={`fixed  top-0 left-0  h-[65px]  sm:h-[80px] md:h-[85px] lg:[90px] w-full flex justify-between items-center  backdrop-blur-sm   px-[4%] z-50`}
      >
        <Link to="/">
          <img
            src={finoma}
            alt="finoma"
            className="w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] shrink-0 cursor-pointer"
          />
        </Link>

        <div className="flex gap-4 justify-center items-center">
          {auth.currentUser && location.pathname != "/signIn" && (
            <button
              onClick={dashOpenHandler}
              className="h-[30px] md:h-[32px] lg:h-[34px] w-[100px] md:w-[120px] lg:w-[140px] bg-green-500 text-white text-[18px] lg:text-[20px]  rounded-md flex justify-center items-center font-bricolage no-underline "
            >
              Dashboard
            </button>
          )}
        </div>
      </div>
      <div
        className={`${
          isDashboardVisible ? "fixed" : "hidden"
        } top-[10%] md:top-[12%] right-[4%] z-50`}
      >
        {user && <LoginDashboard onClose={dashCloseHandler} />}
      </div>
    </div>
  );
};

export default Nav;
