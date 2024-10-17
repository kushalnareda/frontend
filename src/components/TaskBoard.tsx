import React from 'react';
import TaskColumn from './TaskColumn';
import { Ticket, User } from '../types';

type TaskBoardProps = {
  tickets: Ticket[];
  users: User[];
  groupBy: 'status' | 'user' | 'priority'; // Grouping criteria
  sortBy: 'priority' | 'title'; // Sorting criteria
};

const TaskBoard: React.FC<TaskBoardProps> = ({ tickets, users, groupBy, sortBy }) => {
  // Helper function to get user's name and availability by userId
  const getUserDetails = (userId: string) => {
    const user = users.find(user => user.id === userId);
    return user ? { name: user.name, available: user.available } : { name: 'Unknown', available: false };
  };

  // Function to group tickets by the selected criteria (status, user, or priority)
  const groupTickets = (group: 'status' | 'user' | 'priority') => {
    if (group === 'status') {
      return {
        'Todo': tickets.filter(ticket => ticket.status === 'Todo'),
        'In Progress': tickets.filter(ticket => ticket.status === 'In progress'),
        'Backlog': tickets.filter(ticket => ticket.status === 'Backlog'),
      };
    } else if (group === 'user') {
      const groupedByUser: { [key: string]: Ticket[] } = {};
      users.forEach(user => {
        groupedByUser[user.name] = tickets.filter(ticket => ticket.userId === user.id);
      });
      return groupedByUser;
    } else if (group === 'priority') {
      return {
        'Priority 1': tickets.filter(ticket => ticket.priority === 1),
        'Priority 2': tickets.filter(ticket => ticket.priority === 2),
        'Priority 3': tickets.filter(ticket => ticket.priority === 3),
        'Priority 4': tickets.filter(ticket => ticket.priority === 4),
      };
    }
    return {}; // Return an empty object in case no grouping is selected
  };

  // Function to sort tickets by the selected criteria (priority or title)
  const sortTickets = (tickets: Ticket[]) => {
    if (sortBy === 'priority') {
      return tickets.sort((a, b) => b.priority - a.priority);
    } else {
      return tickets.sort((a, b) => a.title.localeCompare(b.title));
    }
  };

  // Group the tickets dynamically based on the selected groupBy criteria
  const groupedTickets = groupTickets(groupBy);

  return (
    <div className="kanban-board">
      {/* Ensure groupedTickets is not undefined before using Object.keys */}
      {groupedTickets && Object.keys(groupedTickets).map((group) => (
        <TaskColumn
          key={group}
          title={group}
          tickets={sortTickets(groupedTickets[group])} // Sort tickets in each group
          users={users} // Pass users to KanbanColumn so it can get user details
        />
      ))}
    </div>
  );
};

export default TaskBoard;
