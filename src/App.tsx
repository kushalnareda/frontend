import React, { useEffect, useState } from 'react';
import TaskBoard from './components/TaskBoard';
import Navbar from './components/Navbar';
import { fetchTicketsAndUsers } from './services/api'; // Your service to fetch data
import '/Users/kushalsinghnareda/Documents/GitHub/Apport/frontend/src/styles/TaskCard.css';
import { Ticket, User } from './types'; // Types for Tickets and Users

const App: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]); // State for fetched tickets
  const [users, setUsers] = useState<User[]>([]); // State for fetched users
  const [groupBy, setGroupBy] = useState<'status' | 'user' | 'priority'>('status'); // Grouping criteria
  const [sortBy, setSortBy] = useState<'priority' | 'title'>('priority'); // Sorting criteria

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const { tickets, users } = await fetchTicketsAndUsers(); // Fetch tickets and users from the API
      setTickets(tickets);
      setUsers(users);
    };

    fetchData();
  }, []);

  // Handler for changing the grouping criteria
  const handleGroupChange = (group: 'status' | 'user' | 'priority') => {
    setGroupBy(group);
  };

  // Handler for changing the sorting criteria
  const handleSortChange = (sort: 'priority' | 'title') => {
    setSortBy(sort);
  };

  return (
    <div className="app">
      {/* Navbar to select grouping and sorting */}
      <Navbar onGroupChange={handleGroupChange} onSortChange={handleSortChange} />
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      {/* KanbanBoard to display tickets grouped and sorted */}
      <TaskBoard tickets={tickets} users={users} groupBy={groupBy} sortBy={sortBy} />
    </div>
  );
};

export default App;
