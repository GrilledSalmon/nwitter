import { authService } from 'fbase';
import React from 'react';

const auth = authService.getAuth();

const Profile = () => {
  const onLogOutClick = () => authService.signOut(auth);
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;