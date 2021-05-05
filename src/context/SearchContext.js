import React, { useState } from "react";

const SearchContext = React.createContext();

export const ProviderSearch = ({ children }) => {
  const [filter, setFilter] = useState("");
  const [term, setTerm] = useState("");
  const [when, setWhen] = useState(""); // 1 || 2 || 7 || 30
  const [eventApi, setEventsApi] = useState(["Festival", "Bar", "Concert", "Club"]); // genre
  const [date1, setDate1] = useState(""); // start_time
  const [date2, setDate2] = useState(""); // end_time
  const [location, setLocation] = useState({
    coords: {
      latitude: 46.227638,
      longitude: 2.213749,
    }, // milieu de la france
  });

  return (
    <SearchContext.Provider
      value={{
        filter,
        setFilter,
        term,
        setTerm,
        when,
        setWhen,
        eventApi,
        setEventsApi,
        date1,
        setDate1,
        date2,
        setDate2,
        location,
        setLocation,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
