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
  const { user } = useSelector((state) => state.auth);
  let currentUser = {};
  if (user) {
    currentUser = user.data;
  }
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);

  const [items, setItems] = useState([]);
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
  const changeHandler = async (event) => {
    setSelectedFile(event.target.files[0]);
    const file = event.target.files[0];

    console.log(file.size);
    if (checkSize(file.size) === false) return;
    const img = toFormData({
      src: event.target.files[0],
    });
    setIsFilePicked(true);
    props.onStartRequest(false);

    try {
      await axios
        .post("https://test-place.site/api/user/files", img, config)
        .then((res) => {
          getFiles();
          setIsFilePicked(false);
        })
        .then((res) => {});
    } catch (error) {
      console.log(error);
    }
  };
  const getFiles = () => {
    axios.get("https://test-place.site/api/user/files", config).then((res) => {
      setItems(res.data.data);
      props.onFinishRequest(false);
    });
  };
  useEffect(() => {
    getFiles();
  }, []);
  const handleEditData = (key, e) => {
    props.onStartRequest(false);

    getFiles();
  };

  return (
    <div className="pdf">
      <div className="drop-pdf">
        <div>
          <div className="img-upload mb-3">
            {/* <ImageDrop /> */}
            <UploadFileIcon />
          </div>
          <input
            type="file"
            name="file"
            onChange={changeHandler}
            accept="application/pdf"
          />

          {isFilePicked ? (
            <div>
              {checkSize() ? (
                <div className="file-info mt-3 pt-3 text-center">
                  <img src={UploadLoading} alt="" />
                  {/* <p>Filename: {selectedFile.name}</p>
                 <p>Filetype: {selectedFile.type}</p>
                 <p>Size in bytes: {selectedFile.size}</p>
                 <p>
                   lastModifiedDate:{" "}
                   {selectedFile.lastModifiedDate.toLocaleDateString()}
                 </p> */}
                </div>
              ) : (
                <p className="more-size">
                  <sapn>a file is bigger than 150kb go to </sapn>

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
                <span>bigger than 150kb go to </span>

                <div className="pro-btn">
                  <Link to="/payments">
                    <LinkButton type="" buttontext="PRO" />
                  </Link>
                </div>
              </p>
              <p>Select a file to show details</p>
            </>
          )}
        </div>
      </div>
      {items.map((file, index) => (
        <div className="single-item mb-3">
          <div className="single-item-info">
            <p
              className="name-from-link"
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              <a href={file.src}>{file.name || "No name and add name"}</a>
            </p>
          </div>
          <div className="link-action">
            <Editicon
              item={file}
              config={config}
              onSaveData={() => handleEditData()}
              api="user/files/update"
            />
            <Deleteicon
              item={file}
              config={config}
              onSaveData={() => handleEditData()}
              api="user/files"
            />
          </div>
        </div>
      ))}
       <LockModal
        modalIsOpen={isLockModalOpen}
        onCloseLockModal={() => handleCloseLockModal()}
      >
        <div className="alert alert-danger mb-5" role="alert">
         <h5>The  file is more than 150k please go to pro</h5>
        </div>
      </LockModal>
    </div>
  );
};
export default Pdf;
