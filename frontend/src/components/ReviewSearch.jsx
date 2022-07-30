import { useSelector, useDispatch } from "react-redux";
import { bringToTop } from "../features/reviews/reviewSlice";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { setPage } from "../features/pageSlice";
import Select from 'react-select'

function ReviewSearch() {
  const { reviews } = useSelector((state) => state.review);
  const dispatch = useDispatch();
let x= reviews.map((e)=>{
  return{
    label:e.name,
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
    dispatch(setPage(1))
    
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

        {/* <div style={{ width: 300 }}>
        <Select options={x} closeMenuOnScroll={true} onChange={handleOnSelect} getOptionValue={(x)=> x.label}  ValueContainer="bg-black"/>
        </div> */}
    </div>
  )
}

export default ReviewSearch;
