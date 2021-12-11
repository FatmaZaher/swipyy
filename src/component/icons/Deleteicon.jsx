import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import TrashIcon from "./TrashIcon";


const MySwal = withReactContent(Swal);

const Deleteicon = () => {
  function deletLink() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8055f0",
      cancelButtonColor: "#163152",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }
  return (
    <>
      <div className="trash-icon" onClick={deletLink}>
        <TrashIcon />
      </div>
    </>
  );
};
export default Deleteicon;
