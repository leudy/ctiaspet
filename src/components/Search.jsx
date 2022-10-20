import React from "react";
import { useState } from "react";
import { BiCaretDown, BiSearch, BiCheck } from "react-icons/bi";

const DropDown = ({ toggle, SetSortBy, sortBy, OrderBy, ChangeOderBy }) => {
  if (!toggle) return null;
  return (
    <div
      className="origin-top-right absolute right-0 mt-2 w-56
    rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
    >
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem"
          onClick={() => {
            SetSortBy("petName");
          }}
        >
          Pet Name
          {sortBy === "petName" && <BiCheck className="text-green-500" />}
        </div>
        <div
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem"
          onClick={() => {
            SetSortBy("ownerName");
          }}
        >
          Owner Name{" "}
          {sortBy === "ownerName" && <BiCheck className="text-green-500" />}
        </div>
        <div
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem"
          onClick={() => {
            SetSortBy("aptDate");
          }}
        >
          Date {sortBy === "aptDate" && <BiCheck className="text-green-500" />}
        </div>
        <div
          onClick={() => {
            ChangeOderBy("asc");
          }}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer border-gray-1 border-t-2"
          role="menuitem"
        >
          Asc {OrderBy === "asc" && <BiCheck className="text-green-500" />}
        </div>
        <div
          onClick={() => {
            ChangeOderBy("desc");
          }}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem"
        >
          Desc {OrderBy === "desc" && <BiCheck className="text-green-500" />}
        </div>
      </div>
    </div>
  );
};

export const Search = ({
  query,
  OnFilterChange,
  sortBy,
  SetSortBy,
  OrderBy,
  ChangeOderBy,
}) => {
  const [ToggleSort, setToggleSort] = useState(false);
  return (
    <div className="py-5">
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <BiSearch />
          <label htmlFor="query" className="sr-only" />
        </div>
        <input
          type="text"
          name="query"
          id="query"
          value={query}
          onChange={(event) => {
            OnFilterChange(event.target.value);
          }}
          className="pl-8 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300"
          placeholder="Search"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <div>
            <button
              type="button"
              onClick={() => {
                setToggleSort(!ToggleSort);
              }}
              className="justify-center px-4 py-2 bg-blue-400 border-2 border-blue-400 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
            >
              Ordernar por <BiCaretDown className="ml-2" />
            </button>
            <DropDown
              toggle={ToggleSort}
              sortBy={sortBy}
              SetSortBy={(srt) => {
                SetSortBy(srt);
              }}
              OrderBy={OrderBy}
              ChangeOderBy={(order) => {
                ChangeOderBy(order);
              }}
              //onOrderByChange={(myOrder) => onOrderByChange(myOrder)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
