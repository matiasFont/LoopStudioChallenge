import React from "react";
import "./App.css";
import { Autocomplete, Link, TextField } from "@mui/material";
import { wikiRequest } from "./requests/requests";

const App = () => {
  const [prevSearch, setPrevSearch] = React.useState<string[]>([]);
  const [articles, setArticles] = React.useState<string[]>([]);
  const [links, setLinks] = React.useState<string[]>([]);

  /**
   * Sets the previous search value.
   * @param value - The value to set as the previous search.
   */
  const setPreviousSearch = (value: string) => {
    if (prevSearch.length === 10) {
      const newPrevSearch = prevSearch.slice(1);
      setPrevSearch([...newPrevSearch, value]);
    }
    if (prevSearch.length < 10) {
      setPrevSearch([...prevSearch, value]);
    }
  };

  const handleClick = (search: string) => {
    wikiRequest(search).then((res) => {
      setArticles(res[1]);
      setLinks(res[3]);
      setPreviousSearch(search);
    });
  };

  return (
    <div className="App">
      <div className="search-box">
        <Autocomplete
          freeSolo
          disableClearable
          sx={{ width: 300 }}
          options={prevSearch}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
          onChange={(event: any) => {
            handleClick(event.target.value);
          }}
        />
      </div>
      <div className="content">
        <div className="content__options">
          {articles.map((article, index) => (
            <div>
              <p>{`- ${article} : `}</p>
              <Link href={links[index]} target="_blank" color="inherit">
                {links[index]}
              </Link>
            </div>
          ))}
        </div>
        <div className="content__article"></div>
      </div>
    </div>
  );
};

export default App;
