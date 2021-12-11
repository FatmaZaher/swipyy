import React from "react";
import ImageUploading from "react-images-uploading";
import ImageDrop from "../icons/ImageDrop";
import LinkButton from "../../component/form/LinkButton";
import { Link } from "react-router-dom";

const DropImg = () => {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <div>
              <div className="img-upload mb-3">
                <ImageDrop />
              </div>
              
              Drop your image here, or
              <button
                style={isDragging ? { color: "red" } : null}
                onClick={onImageUpload}
                {...dragProps}
              >
                browse
              </button>
              &nbsp; ,
              <button onClick={onImageRemoveAll}>remove all images</button>
              <p>Supports: JPG,PNG, PDF <span className="pro-btn">
                    <Link to="/payments">
                      <LinkButton
                        type=""
                        buttontext="PRO"
                      />
                    </Link>
                  </span></p>
            </div>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.data_url} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </>
  );
};
export default DropImg;
