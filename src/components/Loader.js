import React from "react";
import "./Loader.css"; 
import { TailSpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div class="loader-container">
        <TailSpin className="l"
          height="10rem"
          width="10rem"
          color="#0077b6"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
    </div>
  );
};

export default Loader;
