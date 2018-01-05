import React from "react";

const Pagination = props => (
  <div>
    <ul id="pagination" className="pagination">
      <li className="waves-effect">
        <a onClick={() => props.onPrev()}>
          <i className="material-icons">chevron_left</i>
        </a>
      </li>
      <li className="waves-effect">
        {props.pages === 0 ? (
          <a>No pages available</a>
        ) : (
          <a className="page-link">{`Page ${props.page} of ${props.pages}`}</a>
        )}
      </li>
      <li className="waves-effect">
        <a onClick={() => props.onNext()}>
          <i className="material-icons">chevron_right</i>
        </a>
      </li>
    </ul>
  </div>
);
export default Pagination;
