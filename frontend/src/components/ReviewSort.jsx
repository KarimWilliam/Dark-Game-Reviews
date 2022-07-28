import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sortReviews } from "../features/reviews/reviewSlice";
import sortasc from "../images/sort-up.svg";
import sortdec from "../images/sort-down.svg";

function ReviewSort() {
  const { reviews } = useSelector((state) => state.review);
  const dispatch = useDispatch();
  const [sortBy, setsortBy] = useState("");
  const [Desc, setDesc] = useState(false);
  const [checkboxImg, setcheckboxImg] = useState(sortasc);

  const onChange = (e) => {
    if (e.target.id === "checkbox") {
      setDesc(e.currentTarget.checked);

      setcheckboxImg((prevsetcheckbox) => {
        if (prevsetcheckbox == sortasc) {
          return sortdec;
        } else {
          return sortasc;
        }
      });
    } else {
      setsortBy(e.currentTarget.value);
    }
  };

  useEffect(() => {}, [checkboxImg]);

  useEffect(() => {
    dispatch(sortReviews([sortBy, Desc]));
  }, [sortBy, Desc, sortReviews]);

  return (
    <div className="input-group sort-input" style={{ maxWidth: 200 + "px" }}>
      <select
        name="sortBy"
        id="atts"
        onChange={onChange}
        className="form-select"
        defaultValue={"default"}
      >
        <option disabled value="default">
          Sort by...
        </option>
        <option value="name">Name</option>
        <option value="rating">Rating</option>
        <option value="timePlayed">Time Played</option>
        <option value="auther">Auther</option>
        <option value="dateOfPlay">Last Played</option>
      </select>
      <input
        className="btn-check"
        type="checkbox"
        id="checkbox"
        onChange={onChange}
      />
      <label className="btn btn-dark " htmlFor="checkbox">
        <img src={checkboxImg} alt="sort asc/dec" />
      </label>
      {/* {checkboxImg} */}
    </div>
  );
}

export default ReviewSort;
