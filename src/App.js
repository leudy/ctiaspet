import { useState, useEffect, useCallback } from "react";
import { BiCalendar, BiTrash } from "react-icons/bi";
import { AddApppoitment } from "./components/AddApppoitment";
import { AppoitmentInfo } from "./components/AppoitmentInfo";
import { Search } from "./components/Search";

function App() {
  const [Appoints, setAppoints] = useState([]);
  const [SearchText, setSearchText] = useState("");
  const [SortBy, SetSortBy] = useState("petName");
  const [OrderBy, SetOrderBy] = useState("asc");

  //loading
  const fetchData = useCallback(() => {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => {
        setAppoints(data);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
  const filterAppoitments = Appoints.filter((item) => {
    return (
      item.petName.toLowerCase().includes(SearchText.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(SearchText.toLowerCase()) ||
      item.aptNotes.toLowerCase().includes(SearchText.toLowerCase())
    );
  }).sort((a, b) => {
    let order = OrderBy === "asc" ? 1 : -1;
    return a[SortBy].toLowerCase() < b[SortBy].toLowerCase()
      ? -1 * order
      : 1 * order;
  });

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl">
        {" "}
        <BiCalendar className="inline-block text-blue-300 align-top" /> Mi Citas{" "}
      </h1>
      {/* <hr className="border-b-2 border-blue-300" /> */}
      <div className=" ">
        <AddApppoitment
          lastId={Appoints.reduce(
            (Max, item) => (Number(item.id) > Max ? Number(item.id) : Max),
            0
          )}
          OnSendAppointment={(newinfo) => {
            setAppoints([...Appoints, newinfo]);
          }}
        />
        <Search
          query={SearchText}
          OnFilterChange={setSearchText}
          SetSortBy={SetSortBy}
          sortBy={SortBy}
          OrderBy={OrderBy}
          ChangeOderBy={SetOrderBy}
        />
        <ul className="dived-y devide-gray-200">
          {filterAppoitments.length === 0 && <p>Cargando...</p>}
          {filterAppoitments.map((app) => {
            return (
              <AppoitmentInfo
                appointent={app}
                onDeleteAppointment={(id) => {
                  setAppoints(
                    Appoints.filter((appointent) => appointent.id !== id)
                  );
                }}
                key={app.id}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
