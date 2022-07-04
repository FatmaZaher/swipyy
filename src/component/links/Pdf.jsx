import React, { useState, useEffect } from "react";
import LinkButton from "../../component/form/LinkButton";
import { Link } from "react-router-dom";
import Deleteicon from "../../component/icons/Deleteicon";
import Editicon from "../../component/icons/Editicon";
import ImageDrop from "../icons/ImageDrop";
import UploadFileIcon from "../icons/UploadFileIcon";
import UploadLoading from "../../assets/images/UploadLoading.svg";
import { useSelector } from "react-redux";

import axios from "axios";
import LockModal from "../LockModal";

import ReactDOM from "react-dom";
import Modal from "react-modal";
import Editticons from "../icons/Editticons";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormikControl from "../form/FormikControl";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ProgressBar } from "react-bootstrap";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const toFormData = (fromdata) => {
  const toFormDataInner = ((f) => f(f))((h) => (f) => f((x) => h(h)(f)(x)))(
    (f) => (fd) => (pk) => (d) => {
      if (d instanceof Object) {
        Object.keys(d).forEach((k) => {
          const v = d[k];
          if (pk) k = `${pk}[${k}]`;
          if (
            v instanceof Object &&
            !(v instanceof Date) &&
            !(v instanceof File)
          ) {
            return f(fd)(k)(v);
          } else {
            fd.append(k, v);
          }
        });
      }
      return fd;
    }
  )(new FormData())();
  return toFormDataInner(fromdata);
};

const config = JSON.parse(localStorage.getItem("headers"));

const Pdf = (props) => {
  const { t } = props;

  const { user } = useSelector((state) => state.auth);
  let currentUser = {};
  if (user) {
    currentUser = user.data;
  }
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openEditlItem, setOpenEditlItem] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);

  const [items, setItems] = useState([]);

  const [updateProgressBarValue, setUpdateProgressBarValue] = useState(0);

  const checkSize = (size) => {
    if (currentUser.is_pro === true) {
      return true;
    } else {
      if (size > 153600) {
        setIsLockModalOpen(true);
        return false;
      } else {
        return true;
      }
    }
  };
  const handleCloseLockModal = () => {
    setIsLockModalOpen(false);
  };
  const initialValues = {
    name: openEditlItem.name,
  };

  const validationSchema = Yup.object({});
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }
  function sucesesEdit() {
    Swal.fire(
      t("edit-success.good-job"),
      t("edit-success.edited-success"),
      t("edit-success.success")
    );
    setIsOpen(false);
    getFiles();
  }
  const handleEditData = (key, e) => {
    props.onStartRequest(false);

    getFiles();
  };
  const onSubmit = async (values) => {
    try {
      await axios
        .post(
          `https://swipyy.com/api/${"user/files/update"}/${openEditlItem.id}`,
          values,
          config
        )
        .then((res) => {
          sucesesEdit();
          handleEditData();
        });
    } catch (error) {}
  };
  const changeHandler = async (event) => {
    setSelectedFile(event.target.files[0]);
    const file = event.target.files[0];

    if (checkSize(file.size) === false) return;
    const img = toFormData({
      src: event.target.files[0],
    });
    setIsFilePicked(true);
    props.onStartRequest(false);

    try {
      await axios
        .post("https://swipyy.com/api/user/files", img, {
          ...config,
          onUploadProgress: (progressEvent) => {
            var percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );

            setUpdateProgressBarValue(percentCompleted);
       
          },
        })
        .then((res) => {
          getFiles();
          setIsFilePicked(false);
          setOpenModal(true);
          handleOpenModal(res.data.data);
        })
        .then((res) => {});
    } catch (error) {
    }
  };
  const getFiles = () => {
    axios.get("https://swipyy.com/api/user/files", config).then((res) => {
      setItems(res.data.data);
      props.onFinishRequest(false);
      setOpenModal(false);
    });
  };
  useEffect(() => {
    getFiles();
  }, []);

  const handleOpenModal = (item) => {
    setOpenEditlItem(item);
    setIsOpen(true);
  };
  return (
    <div className="pdf">
      <div className="drop-pdf">
        <div>
          <div className="img-upload mb-5">
            {/* <ImageDrop /> */}
            <UploadFileIcon />
          </div>
          <input
            type="file"
            name="file"
            onChange={changeHandler}
            accept="application/pdf"
          />
          <p className="upload">{t("upload")}</p>
          {isFilePicked ? (
            <div>
              {checkSize() ? (
                <div className="file-info mt-3 pt-3 text-center">
                  <ProgressBar
                    now={updateProgressBarValue}
                    label={`${updateProgressBarValue}% completed`}
                  />
                  {/* <p>Filename: {selectedFile.name}</p>
                 <p>Filetype: {selectedFile.type}</p>
                 <p>Size in bytes: {selectedFile.size}</p>
                 <p>
                   lastModifiedDate:
                   {selectedFile.lastModifiedDate.toLocaleDateString()}
                 </p> */}
                </div>
              ) : (
                <p className="more-size">
                  <sapn> {t("bigger-than")}</sapn>

                  <div className="pro-btn">
                    <Link to="/payments">
                      <LinkButton type="" buttontext="PRO" />
                    </Link>
                  </div>
                </p>
              )}
            </div>
          ) : (
            <>
              <p className="more-size">
                <span>{t("go-to")}</span>

                <div className="pro-btn">
                  <Link to="/payments">
                    <LinkButton type="" buttontext="PRO" />
                  </Link>
                </div>
              </p>
              <p>{t("select-file")}</p>
            </>
          )}
        </div>
      </div>
      {items.map((file, index) => (
        <div className="single-item mt-3">
          <div className="single-item-info mt-3">
            <p
              className="name-from-link"
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              <a className="pdf-title" href={file.src}>
                {file.name || "No name and add name"}
              </a>
            </p>
          </div>
          <div className="link-action">
            <>
              <div className="edit-icon" onClick={() => handleOpenModal(file)}>
                <Editticons />
              </div>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
              >
                <div>
                  <h4>Edit</h4>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    className="modal-form"
                  >
                    {(formik) => (
                      <Form className="login-form">
                        <FormikControl
                          control="input"
                          type="text"
                          name={"name"}
                          placeholder=""
                          error="true"
                          label={"pdf name"}
                        />
                        <div className="login-btn">
                          <LinkButton type="submit" buttontext="Save Edit" />
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </Modal>
            </>
            <Deleteicon
              item={file}
              config={config}
              onSaveData={() => handleEditData()}
              api="user/files"
              t={t}
            />
          </div>
        </div>
      ))}
      <LockModal
        modalIsOpen={isLockModalOpen}
        onCloseLockModal={() => handleCloseLockModal()}
      >
        <div className="alert alert-danger mb-5" role="alert">
          <h5>The file is more than 150k please go to pro</h5>
        </div>
      </LockModal>
    </div>
  );
};
export default Pdf;
