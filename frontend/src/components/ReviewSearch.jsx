import { useSelector, useDispatch } from "react-redux";
import { bringToTop } from "../features/reviews/reviewSlice";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'


function ReviewSearch() {
  const { reviews } = useSelector((state) => state.review);
  const dispatch = useDispatch();
let x= reviews.map((e)=>{
  return{
    id:e._id,
    ...e
  }
})


  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    results.slice().reverse().forEach(element => {
      dispatch(bringToTop(element._id))
    });
  }

  const handleOnHover = (result) => {
    // the item hovered
  }

  const handleOnSelect = (item) => {
    // the item selected
    dispatch(bringToTop(item._id))
  }

  const handleOnFocus = () => {
  }

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    )
  }

  return (
    <div >
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
            items={x}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            formatResult={formatResult}
            placeholder='Search...'
            fuseOptions={{ keys: ["name", "comment"] }}
            //     // necessary, otherwise the results will be blank
          />
        </div>
    </div>
  )
}

export default ReviewSearch;
