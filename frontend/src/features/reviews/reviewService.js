import axios from "axios";
const API_URL = "/api/reviews/";

// Create new goal
const createReview = async (reviewData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, reviewData, config);

  return response.data;
};

// Get  reviews
const getReviews = async (reviewData) => {
  let conc = "";

  if (reviewData) {
    const { num, filterBy } = reviewData;
    conc = "/?" + filterBy + "=" + num;
  }

  const response = await axios.get(API_URL + conc);
  return response.data;
};

// Delete  review
const deleteReview = async (reviewId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + reviewId, config);

  return response.data;
};

const reviewService = {
  createReview,
  getReviews,
  deleteReview,
};

export default reviewService;
