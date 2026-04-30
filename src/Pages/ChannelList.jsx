import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../utils/getLocalStorageValues";
import { API_BASE_URL } from "../utils/apiConfig";

function ChannelList() {
  const token = getToken();
  const [channelList, setChannelList] = useState([]);
  useEffect(() => {
    // API call to fetch the list of channels for the logged-in user
    axios
      .get(`${API_BASE_URL}/api/channel-list`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      .then((response) => setChannelList(response.data.channelList));
  }, []);
  return (
    <>
      <h2 className="text-center font-bold p-5 text-2xl">Your Channels</h2>
      <hr />
      <div className="m-8 grid sm:grid-cols-4 md:grid-cols-5 gap-5">
        {channelList?.map((channel) => (
          <Link to={`/channel/${channel._id}`}>
            <span className=" rounded-lg text-center p-4 bg-black text-white font-semibold">
              {channel.channelName}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}

export default ChannelList;
