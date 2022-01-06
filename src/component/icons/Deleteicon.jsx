import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import TrashIcon from "./TrashIcon";
import axios from "axios";

const MySwal = withReactContent(Swal);

const Deleteicon = (props) => {
  const { item, config, api } = props;

  const deletLink = () => {
    try {
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
          axios
            .delete(`https://test-place.site/api/${api}/${item.id}`, config)
            .then((res) => {
              props.onSaveData("ee");

              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            });
        }
      });
    } catch (error) {}
  };
  const successDelete = () => {};
  return (
    <>
      <div className="trash-icon" onClick={deletLink}>
        <TrashIcon />
      </div>
    </>
  );
};
export default Deleteicon;
