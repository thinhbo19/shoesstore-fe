// FilterMain.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";

const FilterMain = ({
  showFilterOptions,
  toggleFilterOptions,
  currentSort,
  handleSort,
}) => {
  const returnValue = (value) => {
    switch (value) {
      case "AZ":
        return "Từ A đến Z";
      case "ZA":
        return "Từ Z đến A";
      case "PriceAsc":
        return "Tăng dần";
      case "PriceDesc":
        return "Giảm dần";
      default:
        return value;
    }
  };

  return (
    <div className="filter-main">
      <div className="filter-sapxep">
        <button id="filterButton" onClick={toggleFilterOptions}>
          Sắp Xếp {currentSort && `: ${returnValue(currentSort)}`}{" "}
          <FontAwesomeIcon icon={faAnglesDown} />{" "}
        </button>
        <div
          id="filterOptions"
          className={`filterOptions ${showFilterOptions ? "show" : ""}`}
        >
          <ul>
            <li>
              <button
                className="btn-filter-sapxep"
                onClick={() => handleSort("AZ")}
              >
                Từ A đến Z
              </button>
            </li>
            <li>
              <button
                className="btn-filter-sapxep"
                onClick={() => handleSort("ZA")}
              >
                Từ Z đến A
              </button>
            </li>
            <li>
              <button
                className="btn-filter-sapxep"
                onClick={() => handleSort("PriceAsc")}
              >
                Giá: Tăng dần
              </button>
            </li>
            <li>
              <button
                className="btn-filter-sapxep"
                onClick={() => handleSort("PriceDesc")}
              >
                Giá: Giảm dần
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FilterMain;
