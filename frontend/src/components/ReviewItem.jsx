import { useSelector, useDispatch } from "react-redux";
import { deleteReview } from "../features/reviews/reviewSlice";

function ReviewItem({ review }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  let button;
  //"http://localhost:5000/"
  let img = "https://darkgamereviews.herokuapp.com/" + review.imageURL;
  if (user) {
    button = (
      <button onClick={() => dispatch(deleteReview(review._id))}>X</button>
    );
  }

  let reviewrating=''
  if(review.rating*10<=20){
    reviewrating= <h2 className="text-light custombgred border border-info p-2">{review.rating *10} </h2>
  }else if (review.rating*10<=40) {
    reviewrating= <h2 className="text-light custombgorangered border border-info p-2">{review.rating *10} </h2>
  } else if (review.rating*10<=60){
    reviewrating= <h2 className="text-light custombgorange border border-info p-2">{review.rating *10} </h2>
  } else  if(review.rating*10<=80) {reviewrating= <h2 className="text-light custombglightgreen border border-info p-2">{review.rating *10} </h2>}
  else { reviewrating= <h2 className="text-light custombggreen border border-info p-2">{review.rating *10} </h2>}
    
  
  return (
    //style={{ "maxHeight": 500 + "px" }}
    <div className="container-lg  p-5">
      <div className="row justify-content-md-center  p-5 bg-dark text-light border shadow border-info rounded">
        <div className="col-md-4 hide_border_sm text-center ">
          <img
            src={img}
            className="img-fluid rounded-start img-thumbnail "
            alt="game thumnail"
            style={{ "maxHeight": 350 + "px"}}
          />
        </div>
        <div className="col-md-8 text-center flex-nowrap">
          <div className="row h-25  flex-md-nowrap">
            <div className="col-md-10 ">
              <h2 className="text-center text-uppercase text-underline">
                {review.name}
              </h2>
            </div>
            <div className="col-md-2  d-flex justify-content-center align-items-center  ">  {reviewrating} </div>   
          </div>
          <div className="row h-75  ">
            <div className="container-lg ">
              <p className="lead text-center d-flex justify-content-center align-items-center h-100 ">
                "{review.comment}"
              </p>
            </div>
          </div>
          <div className="row  ">
            <p className=" text-end ">
              <small className="text-muted  ">
                {review.timePlayed}h on record / Author: {review.auther} / Last Played: {review.dateOfPlay}
                {button}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewItem;
