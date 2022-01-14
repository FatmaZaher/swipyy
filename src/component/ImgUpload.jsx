import React, { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import HideImageIcon from "@mui/icons-material/HideImage";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ImageUploading from "react-images-uploading";

const ImgUpload = (props) => {
  const { item } = props;
  const [images, setImages] = useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };
  return (
    <div>
      <div className="image-upload">
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
              <button
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                         
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet quas, maiores culpa sequi deleniti voluptates. Error exercitationem et doloremque, dolorem perferendis repudiandae explicabo? Quod non inventore facere. Ipsam, consequuntur officia.</span>
                <AddPhotoAlternateIcon />
              </button>
              &nbsp;
              <button onClick={onImageRemoveAll}>
                {item.img !== null ? (
                  <img src={item.img} alt="" width="100" />
                ) : (
                  <HideImageIcon />
                )}
              </button>
            </div>
          )}
        </ImageUploading>
      </div>
    </div>
  );
};
export default ImgUpload;
