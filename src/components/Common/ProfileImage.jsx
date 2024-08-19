import React from 'react';

import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react';

const ProfileImage = ({ src, name = "XprofileImage", size = "xl" }) => {
  return (
    <Avatar
      size={size}
      name={name}
      src={src}
      onError={(e) => {
        e.currentTarget.src = defaultSrc || 'https://via.placeholder.com/150';
      }}
    />
  );
};

export default ProfileImage;
