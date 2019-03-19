import React from "react";

const DisplayNoResults = () => {
  return (
    <div className="card-body">
      <div className="d-flex no-block">
        <h4 className="card-title">All Products</h4>
      </div>
      <div className="table-responsive m-t-20">
        <table className="table stylish-table">
          <thead>
            <tr>
              <th>Main Image</th>
              <th>Description</th>
              <th>Sharable Link</th>
              <th>Quantity</th>
              <th>Current Price</th>
              <th>Rating</th>
              <th>Is Visible?</th>
              <th>Is Deleted?</th>
            </tr>
          </thead>
          <tbody />
        </table>
      </div>
      <h2 className="text-center mt-5">No Results Found</h2>
    </div>
  );
};

export default React.memo(DisplayNoResults);
