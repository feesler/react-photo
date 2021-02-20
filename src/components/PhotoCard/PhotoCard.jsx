import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const fileToDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.addEventListener('load', (e) => {
      resolve(e.currentTarget.result);
    });

    fileReader.addEventListener('error', (e) => {
      reject(new Error(e.currentTarget.error));
    });

    fileReader.readAsDataURL(file);
  });
}

function PhotoCard(props) {
  const { photo, onDelete } = props;
  const [state, setState] = useState({ ...photo });

  useEffect(() => {
    if (!state.src) {
      loadFileData();
    }
  }, []);

  const loadFileData = async () => {
    const data = await fileToDataUrl(state.file);
    setState((prev) => ({ ...prev, src: data }));
  }

  const handleDelete = () => {
    onDelete(state.id);
  }

  const imageContent = (state.src)
    ? <img className="photo-card__photo" src={state.src} />
    : <div className="photo-card__loading">Loading...</div>;

  return (
    <div key={state.id} className="photo-card">
      <div className="photo-card__image">
        {imageContent}
      </div>
      <button className="photo-card__del-btn" onClick={handleDelete}>&times;</button>
    </div>
  )
}

PhotoCard.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    file: PropTypes.instanceOf(File)
  }).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default PhotoCard;
