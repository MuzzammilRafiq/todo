import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../features/userSlice";
import Header from "../Header/Header";
import Tasks from "./Tasks";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const check = async () => {
      try {
        const res = await axios.get("http://localhost:3001/user/check", {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        console.log(res.data._doc);
        dispatch(login(res.data._doc));
      } catch (err) {
        console.log(err);
        navigate("/login");
      }
    };
    check();
  }, []);

  return (
    <>
      <Header />
      <Tasks />
    </>
  );
}

export default Home;
