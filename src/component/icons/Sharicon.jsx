import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ShareIcon from "@mui/icons-material/Share";

const MySwal = withReactContent(Swal);

const Sharicon = () => {
  function deletLink() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your Link has been coped',
        showConfirmButton: false,
        timer: 1500
      })
  }
  return (
    <>
      <div className="trash-icon" onClick={deletLink}>
      <ShareIcon />
      </div>
    </>
  );
};
export default Sharicon;
