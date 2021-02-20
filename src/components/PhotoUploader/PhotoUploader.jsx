import React, { useRef } from 'react';
import PropTypes from 'prop-types';

function PhotoUploader(props) {
  const { onUpload } = props;
  const fileInputRef = useRef();

  const handleUpload = (e) => {
    const files = [...e.target.files];
    onUpload(files);
  }

  return (
    <div className="photo-uploader">
      <input
        className="photo-uploader__file"
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        ref={fileInputRef}
      />
      <div className="photo-uploader__upload-area">Click to select</div>
    </div>
  )
}

PhotoUploader.propTypes = {
  onUpload: PropTypes.func.isRequired
};

export default PhotoUploader

