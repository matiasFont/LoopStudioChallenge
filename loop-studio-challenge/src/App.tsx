import React, { useEffect } from "react";
import "./App.css";
import { Autocomplete, TextField } from "@mui/material";
import { OptionsModel } from "./models/options";
import { MapWikiResponse, useDebounce } from "./utils/utils";
import { wikiRequest } from "./requests/requests";
import { WikiResponseMapped } from "./models/wikiResponse";

const App = () => {
  const [prevSearch, setPrevSearch] = React.useState<OptionsModel[]>([]);
  const [req, setReq] = React.useState<WikiResponseMapped[]>([]);
  const [inputValue, setInputValue] = React.useState<OptionsModel | null>(
    {} as OptionsModel
  );
  const debouncedSearchTerm = useDebounce(inputValue, 500);

  useEffect(() => {
    wikiRequest(debouncedSearchTerm).then((res) => {
      setReq(MapWikiResponse(res));
    });
  }, [debouncedSearchTerm]);

  const setPreviousSearch = (value: OptionsModel) => {
    if (prevSearch.length === 10) {
      const newPrevSearch = prevSearch.slice(1);
      setPrevSearch([...newPrevSearch, value]);
    }
    if (prevSearch.length < 10) {
      setPrevSearch([...prevSearch, value]);
    }
  };

  return (
    <div className="App">
      <div className="search-box">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={prevSearch}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
          value={inputValue}
          onChange={(event: any, newValue: OptionsModel | null) => {
            setInputValue(newValue);
            if (newValue !== null) setPreviousSearch(newValue);
          }}
        />
      </div>
      <div className="content">
        <div className="content__options"></div>
        <div className="content__article"></div>
      </div>
    </div>
  );
};

export default App;
