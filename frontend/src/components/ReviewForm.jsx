import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createReview } from "../features/reviews/reviewSlice";
import { useSelector } from "react-redux";
import axios from "axios";

function ReviewForm() {
  const { user } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [timePlayed, setTimePlayed] = useState("");
  const [auther, setAuther] = useState(user.name);
  const [dateOfPlay, setDateOfPlay] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [imgFileName, setImgFileName] = useState("choose File");
  const [uploadedImg, setUploadedImg] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  // On file select (from the pop up)
  const onFileChange = (event) => {
    // Update the state
    setImgFile(event.target.files[0]);
    setImgFileName(event.target.files[0].name);
    console.log(imgFile);
  };

  useEffect(() => {
    setAuther(user.name);
  });

  const dispatch = useDispatch();

  // upload image to backend THROUGH AxIOS
  const uploadImg = async (imgFile, token) => {
    let formdata = new FormData();
    formdata.append("image", imgFile);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", //imgFile.type
      },
      onUploadProgress: (ProgressEvent) => {
        setUploadPercentage(
          parseInt(
            Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
          )
        ); //Upload percentage state provided by axios.
      },
    };
    try {
      const response = await axios.post("/api/reviews/img", formdata, config);
      const { fileName, filePath } = response.data;
      setUploadedImg({ fileName, filePath });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //upload img
    const imageURL = imgFile.name;
    uploadImg(imgFile, user.token);
    setUploadPercentage(0);

    //dispatch
    dispatch(
      createReview({
        name,
        comment,
        rating,
        timePlayed,
        auther: auther,
        dateOfPlay,
        imageURL: imageURL,
      })
    );
    setName("");
    setComment("");
    setAuther("");
    setTimePlayed("");
    setRating("");
    setImgFile("");
    setDateOfPlay("");
  };

  return (
    <section className='form-control'>
      <form onSubmit={onSubmit}>
        <div className="">
          <label htmlFor="text"> </label>
          <input
          placeholder="name..."
            type="name"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="">
          <label htmlFor="text"> </label>
          <input
                    placeholder="comment..."
            type="textarea"
            name="comment"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="">
          <label htmlFor="text"> </label>
          <input
                    placeholder="Time Played..."
            type="timePlayed"
            name="timePlayed"
            id="timePlayed"
            value={timePlayed}
            onChange={(e) => setTimePlayed(e.target.value)}
          />
        </div>
        <div className="">
          <label htmlFor="text"> </label>
          <input
                    placeholder="Date of play..."
            type="dateOfPlay"
            name="date"
            id="date"
            value={dateOfPlay}
            onChange={(e) => setDateOfPlay(e.target.value)}
          />
        </div>
        <div className="">
          <label htmlFor="text"> </label>
          <input
            placeholder="Rating..."
            type="rating"
            name="rating"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="text"></label>
          <input
            type="file"
            name="Image"
            id="customFile"
            encType="multipart/form-data"
            onChange={onFileChange}
          />
<div class="progress container">
  <div class="progress-bar " role="progressbar" aria-label="Basic example" aria-valuenow={uploadPercentage} aria-valuemin="0" aria-valuemax="100"></div>
</div>
          <> {uploadPercentage} %</>
        </div>

        <div className="">
          <button className="btn btn-block btn-dark " type="submit">
            Add review
          </button>
        </div>
      </form>
    </section>
  );
}

export default ReviewForm;
