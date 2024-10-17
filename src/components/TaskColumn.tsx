import React from 'react';
import TaskCard from './TaskCard';
import { Ticket, User } from '../types'; // Assuming you have types defined

type TaskColumnProps = {
  tickets: Ticket[];
  users: User[];
  title: string; 
};

const TaskColumn: React.FC<TaskColumnProps> = ({ tickets, users }) => {
  // Helper function to get user data by userId
  const getUserDetails = (userId: string) => {
    const user = users.find(user => user.id === userId);
    return user ? { name: user.name, available: user.available } : { name: 'Unknown', available: false };
  };

  return (
    <div className="task-column">
      {tickets.map((ticket) => {
        const { name, available } = getUserDetails(ticket.userId); // Get user's name and availability

        return (
          <TaskCard
            key={ticket.id}
            id={ticket.id}
            title={ticket.title}
            requestType={ticket.tag[0]} // Assuming you use the first tag as request type
            userImage={undefined} // You can set this based on your API response if there is an image
            userName={name} // Pass the user's name
            isAvailable={available} // Pass availability status
          />
        );
      })}
    </div>
  );
};

export default TaskColumn;
