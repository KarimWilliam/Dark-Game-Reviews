import { useState} from "react";
import { useDispatch } from "react-redux";
import { getReviews } from "../features/reviews/reviewSlice";
import React from "react";
import { setPage } from "../features/pageSlice";

function ReviewFilter() {
  const dispatch = useDispatch();
  const [filterBy, setFilterBy] = useState("");
  const [num, setNum] = useState("");

  const onClearSubmit = (e) => {
    localStorage.removeItem("filterSearch");
    localStorage.removeItem("filterValue");
    dispatch(getReviews());
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(setPage(1))
    dispatch(getReviews({ num, filterBy }), [num]);
    localStorage.setItem("filterSearch", filterBy);
    localStorage.setItem("filterValue", num);
  };

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.id === "filterBy") {
      setFilterBy(e.currentTarget.value);
    } else {
      setNum(e.target.value/10);
    }
  };

  let dropdown=  (
    <>
      <input
        type="text"
        className="form-control"
        placeholder="Please Pick what to filter by"
        disabled
        onChange={onChange}
      />
    </>
  );
  if (filterBy === "Rating") {
    dropdown = (
      <>
        <input
          type="text"
          className="form-control"
          placeholder="Number between 1 and 100"
          name="ratebiggerthan"
          id="ratebiggerthan"
          pattern="^[1-9][0-9]?$|^100$"
          required
          onChange={onChange}
        />
      </>
    );
  } else if(filterBy === "timePlayed"){
    dropdown = (
      <>
        <input
          type="text"
          className="form-control"
          placeholder="Number between 1 and 1000"
          name="timeplayedbiggerthan"
          id="timeplayedbiggerthan"
          pattern="([1-9][0-9]{0,2}|1000)"
          required
          onChange={onChange}
        />
      </>
    );
  }

  let filtnum = "";
  if (localStorage.getItem("filterValue")) {
    filtnum = (
      <div>
        <form onSubmit={onClearSubmit}>
          <button className="btn btn-outline-primary" type="submit">
            Clear Filter
          </button>
        </form>
        <h6>
          Filtering by: {localStorage.getItem("filterSearch")*10} &gt;
          {localStorage.getItem("filterValue")}
        </h6>
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="input-group"
        style={{ maxWidth: 450 + "px" }}
      >
        <label>
          <select
            className="form-select"
            name="filterBy"
            id="filterBy"
            onChange={onChange}
            defaultValue={'default'}
          >
            
            <option  disabled value="default">
            Filter by... 
            </option>
            <option value="Rating">
              Rating <>&gt;</>
            </option>
            <option value="timePlayed">
              Time Played <>&gt;</>
            </option>
          </select>
        </label>
        {dropdown}
        <button className="btn btn-outline-primary" type="submit">
          Filter
        </button>
      </form>

      {filtnum}
    </>
  );
}

export default ReviewFilter;
