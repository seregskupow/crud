import React, { useSate } from "react";

const tableSearch = () => {

  return (
    <div class="input-group mb-3 order-sm-2">
      <div class="input-group-prepend">
        <button
          class="btn btn-primary"
          type="button"
          id="button-addon1"
        >
          Button
        </button>
      </div>
      <input
        type="text"
        class="form-control"
        placeholder=""
        style={{background:"rgba(235, 234, 234, 0.616)"}}
      />
    </div>
  );
};

export default tableSearch;
