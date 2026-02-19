import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

function Tag() {
  const [tag, setTag] = useState('');
  const [gif, setGif] = useState('');
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    try {
      setLoading(true);
      const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}`;
      const { data } = await axios.get(url);
      const imageSource = data.data.images.downsized_large.url;
      setGif(imageSource);
    } catch (error) {
      console.error('Error fetching GIF:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const clickHandler = () => {
    fetchData();
  };

  return (
    <div
      className="
        w-11/12 sm:w-8/12 md:w-6/12 lg:w-5/12
        bg-green-500 rounded-lg border border-black
        flex flex-col items-center
        gap-y-5 mt-4 p-4 sm:p-6
      "
    >
      <h1 className="text-xl sm:text-2xl font-bold uppercase underline mt-2">
        Random {tag || "Tag"} GIF
      </h1>

      {loading ? (
        <Spinner />
      ) : (
        <img
          src={gif}
          alt=""
          className="w-full max-w-[450px] rounded-lg"
        />
      )}

      <input
        className="
          w-10/12 sm:w-9/12 text-lg py-2 rounded-lg
          text-center border border-black
        "
        onChange={(event) => setTag(event.target.value)}
        value={tag}
        placeholder="Enter a tag..."
      />

      <button
        onClick={clickHandler}
        disabled={loading}
        className="
          w-10/12 sm:w-9/12 bg-yellow-500 text-lg py-2 rounded-lg 
          mb-3 font-semibold border border-black
          hover:bg-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        Generate
      </button>
    </div>
  );
}

export default Tag;
