import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGPTSearchClick = async () => {
    // Make api call to GPT and get movie results
    const gptQuerry =
      "Act as a movie reccomendation system and suggest some movies for the query" +
      searchText.current.value +
      ". only give me 5 movie names, comma separated like the example result given ahead. Example Result:  Gadar, Sholay, Don, Golmaal, Koi Mil Gaya, Titanic, Fault in our stars";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuerry }],
      model: "gpt-3.5-turbo",
    });

    if (!gptResults.choices) {
      // Error Handling
      navigate("/error_openAI");
    }

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

    // For each movie search TMDB API
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-[35%] md:pt-[9%] flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-1/2 bg-black opacity-85 grid grid-cols-12 "
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9 "
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          onClick={handleGPTSearchClick}
          className="m-4 py-2 px-4 bg-red-700 text-white rounded-lg col-span-3"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
