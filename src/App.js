import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Weather from "./Weather";

import Spinner from "react-bootstrap/Spinner";

function App() {
  const URL_API_JOKES = "https://v2.jokeapi.dev/joke/Any?type=single";
  const [joke, setJoke] = useState();
  const [isFetchingJoke, setIsFetchingJoke] = useState(false);

  const fetchJoke = useCallback(() => {
    fetch(URL_API_JOKES)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        setJoke(json.joke);
        setIsFetchingJoke(false);
      })
      .catch((e) => {
        setJoke(`API call failed (${e})`);
        setIsFetchingJoke(false);
      });
  }, [URL_API_JOKES]);

  useEffect(() => {
    setIsFetchingJoke(true);
    fetchJoke();
  }, [fetchJoke]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>JOKE API</h1>
        {isFetchingJoke ? (
          <div className="d-inline-block">
            <Spinner animation="border" role="status"></Spinner>
            <span className="ml-3 text-success">Fetching a joke from API</span>
          </div>
        ) : (
          <>
            <p className="text-warning">{joke}</p>
          </>
        )}
        <br />

        <Weather></Weather>
      </header>
    </div>
  );
}

export default App;
