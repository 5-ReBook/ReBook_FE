/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

function ProfilePicture({
  profilePicture,
  handleEditPicture,
  handleDeletePicture,
}) {
  return (
    <div className="profile-picture">
      <img
        className="profile-picture__img"
        src={
          profilePicture
            ? `https://rb-dev-s3-images.s3.ap-northeast-2.amazonaws.com/profile/${profilePicture}`
            : 'src/assets/images/basicprofile.png'
        }
        alt="프로필 사진"
      />
      <input
        type="file"
        accept="image/*"
        id="edit-profile-picture"
        style={{ display: 'none' }}
        onChange={handleEditPicture}
      />
      <label htmlFor="edit-profile-picture">
        <img
          className="profile-picture__edit"
          src="src/assets/images/Members/camera.png"
          alt="사진 수정"
        />
      </label>
      <img
        className="profile-picture__delete"
        src="src/assets/images/Members/button_x_in_circle.png"
        alt="사진 삭제"
        onClick={handleDeletePicture}
      />
    </div>
  );
}

export default React.memo(ProfilePicture);
