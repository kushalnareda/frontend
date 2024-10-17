import React from 'react';
import '/Users/kushalsinghnareda/Documents/GitHub/Apport/frontend/src/styles/Usercard.css';

type UserCardProps = {
  userName: string;
  userImage?: string; // Optional, so we can fallback to initials
  isAvailable: boolean; // Availability status for the user
};

const UserCard: React.FC<UserCardProps> = ({ userName, userImage, isAvailable }) => {
  const getInitials = (name: string) => {
    const nameParts = name.split(' ');
    const initials = nameParts[0][0] + (nameParts.length > 1 ? nameParts[1][0] : '');
    return initials.toUpperCase();
  };

  return (
    <div className="user-card">
      <div className="user-avatar-container">
        {userImage ? (
          <img src={userImage} alt="user" className="user-avatar" />
        ) : (
          <div className="user-initials">
            {getInitials(userName)}
          </div>
        )}
        {/* Status Circle */}
        <div className={`status-circle ${isAvailable ? 'available' : 'unavailable'}`}></div>
      </div>
    </div>
  );
};

export default UserCard;
