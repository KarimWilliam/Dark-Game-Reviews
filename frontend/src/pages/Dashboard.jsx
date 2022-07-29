import Spinner from "../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getReviews } from "../features/reviews/reviewSlice";
import ReviewItem from "../components/ReviewItem";
import ReviewSort from "../components/ReviewSort";
import ReviewFilter from "../components/ReviewFilter";
import ReviewSearch from "../components/ReviewSearch";
import { useState } from "react";
import Pagination from "../components/Pagination";
import { setPage } from "../features/pageSlice";


function Dashboard() {
  const dispatch = useDispatch();
  //const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const {currentPage} = useSelector((state)=>state.page)

  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);

  const { reviews, isLoading } = useSelector(
    (state) => state.review
  );

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentreviews = reviews.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    if(pageNumber!=="..." &&pageNumber!==">>"  &&pageNumber!=="<<" ){
      dispatch(setPage(pageNumber))
    //  setCurrentPage(pageNumber);
    }

  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {/* <h1>Welcome {user && user.name}</h1> */}

      <div
        className="align-items-center   justify-content-between p-5 border shadow bg-light  d-lg-flex"
        style={{ "backgroundColor": "#FFFFFF" }}
      >
        <ReviewSearch />
        <ReviewSort />
        <ReviewFilter />
      </div>

      <div className=" align-items-center  justify-content-between p-5 bg-secondary container-lg">
        {reviews.length > 0 ? (
          <div className="goals">
            {currentreviews.map((review) => (
              <ReviewItem key={review._id} review={review} />
            ))}
          </div>
        ) : (
          <h3>There are no reviews to see</h3>
        )}
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={reviews.length}
        paginate={paginate}
        pageNumber={currentPage}
      />
    </>
  );
}

export default Dashboard;
