import React from 'react';

const DisplayProfile = ({ profile }) => {
  return (
    <div className="DisplayProfil" style={{ color: 'red' }}>
      <h1>Welcome my boss {profile.display_name}</h1>
      <p>Email : {profile.email}</p>
      <p>country : {profile.country}</p>
      <p>id : {profile.id}</p>
      <p>Date de naissance : {profile.birthdate}</p>
    </div>
  );
};


export default DisplayProfile;
