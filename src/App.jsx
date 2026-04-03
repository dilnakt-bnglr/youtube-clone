import React, { useEffect } from "react";
import VideoList from "./Components/Videos/VideoList";
import Category from "./Components/Home/Category";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getVideo } from "./Store/videoSlice.js";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get("http://localhost:5000/api/videos").then((response) => {
      dispatch(getVideo(response?.data?.videos));
    });
  }, []);

  return (
    <div>
      <Category />
      <VideoList />
    </div>
  );
}

export default App;
