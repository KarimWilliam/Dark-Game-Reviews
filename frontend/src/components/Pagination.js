import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate, pageNumber }) => {
  let  pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }


const reducedPages=(pageNumber,pageNumbers)=>{
  let finalindex= pageNumbers.length;
    if (pageNumbers.length<7 ){return pageNumbers}
    if(pageNumber<=3){
      return [1,2,3,4,5,"...",finalindex]
    }else if (pageNumber>=finalindex-3){return[1,"...",finalindex-4,finalindex-3,finalindex-2,finalindex-1,finalindex]}
    pageNumbers= pageNumbers.slice((pageNumber-3),(pageNumber+2))
    pageNumbers.push("...")
    pageNumbers.push(finalindex)
    pageNumbers.unshift(1);
    return pageNumbers
}

pageNumbers=reducedPages(pageNumber,pageNumbers);

  let nextkey; let prevkey;
  if (pageNumber < totalPosts / postsPerPage) {
    nextkey = (
      <li key={-1} className="page-item">
        <a
          onClick={() => paginate(pageNumber + 1)}
          href="#"
          className="page-link">
          Next
        </a>
      </li>
    );
  } else {
    nextkey = "";
  }

  if (pageNumber >1) {
    prevkey = (
      <li key={-2} className="page-item">
        <a
          onClick={() => paginate(pageNumber - 1)}
          href="#"
          className="page-link"
        >
          Prev
        </a>
      </li>
    );
  } else {
    prevkey = "";
  }


  return (
    <nav>
      <ul className="pagination justify-content-center pt-5">
      {prevkey}
        {pageNumbers.map((number) => (
          <li key={number} className="page-item"  >
            <a onClick={() => paginate(number)} href="#" className="page-link">
              {number}
            </a>
          </li>
        ))}
        {nextkey}
      </ul>
    </nav>
  );
};

export default Pagination;
