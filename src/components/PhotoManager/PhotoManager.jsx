import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import PhotoCard from '../PhotoCard/PhotoCard.jsx';
import PhotoUploader from '../PhotoUploader/PhotoUploader.jsx';


const initialState = {
  photos: []
};

function PhotoManager() {
  const [state, setState] = useState(initialState)

  const handleUpload = (files) => {
    setState((prev) => ({
      ...prev,
      photos: [
        ...prev.photos.map((photo) => ({ ...photo })),
        ...files.map((file) => ({ id: nanoid(), file }))
      ]
    }));
  }


  const handleDelete = (id) => {
    setState((prev) => {
      const newState = {
        ...prev,
        photos: [
          ...prev.photos
            .filter((photo) => photo.id !== id)
            .map((photo) => ({ ...photo })),
        ]
      };

      return newState;
    });
  }

  return (
    <div className="photo-manager">
      <PhotoUploader onUpload={handleUpload} />
      <div className="photo-manager__uploaded">
        {state.photos.map((photo) =>
          <PhotoCard key={photo.id} photo={photo} onDelete={handleDelete} />
        )}
      </div>
    </div>
  )
}

PhotoManager.propTypes = {

}

export default PhotoManager

