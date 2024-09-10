import React from 'react';

import { Avatar } from '@chakra-ui/react';

function ProfileImage({ src, name = 'XprofileImage', size = 'xl', fill }) {
  return (
    <Avatar
      size={size}
      name={name}
      src={src}
      onError={e => {
        e.currentTarget.src = defaultSrc || 'https://via.placeholder.com/150';
      }}
    />
  );
}

export default ProfileImage;
