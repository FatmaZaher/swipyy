import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import TrashIcon from "./TrashIcon";
import axios from "axios";

const MySwal = withReactContent(Swal);

const Deleteicon = (props) => {
  const { t } = props;

  const { item, config, api } = props;

  const deletLink = () => {
    try {
      Swal.fire({
        title: t("modal-delete.title"),
        text: t("modal-delete.text"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#8055f0",
        cancelButtonColor: "#163152",
        cancelButtonText: t("modal-delete.cancelButtonText"),
        confirmButtonText: t("modal-delete.confirmButtonText"),
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`https://test-place.site/api/${api}/${item.id}`, config)
            .then((res) => {
              props.onSaveData("ee");

              Swal.fire(t("delete-success.deleted"), t("delete-success.text"), t("delete-success.success"));
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
