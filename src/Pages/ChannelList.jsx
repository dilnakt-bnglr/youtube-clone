import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ChannelList() {
  const token = JSON.parse(localStorage.getItem("token"));
  const [channelList, setChannelList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/channel-list", {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      .then((response) => setChannelList(response.data.channelList));
  }, []);
  return (
    <>
      <h2 className="text-center font-bold p-5 text-2xl">Your Channels</h2>
      <div className="m-8 grid sm:grid-cols-4 md:grid-cols-5 gap-5">
        {channelList?.map((channel) => (
          <Link to={`/channel/${channel._id}`}>
            <span className="border-1 rounded-lg text-center p-2">
              {channel.channelName}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}

export default ChannelList;
