import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../../css/employee/EmployeeReceivedTask.css';


import Navbar from '../../components/templetes/Navbar';
import Footer from '../../components/templetes/Footer';
import Sidebar from '../../components/templetes/ESideBar';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmployeeReceivedTask = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);

    // Fetch tasks from the API
    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:8800/admin/task/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    // Delete a task
    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:8800/admin/task/tasks/${taskId}`);
            // Remove the task from the state
            setTasks(tasks.filter(task => task.TaskID !== taskId));
            alert('Task deleted successfully.');
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('Failed to delete task.');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="manage-tasks-container">
                <nav className="breadcrumb" aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a className="text-decoration-none" href="/employee-dashboard">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Received Task</li>
                    </ol>
                </nav>

                <div className="tasks-container">
                    <div className='headManage'>
                        <h1 className="text-center">Received Tasks</h1>
                    </div>

                    <div className="back-button-area">
                        <div className="but-inside">
                            <button className="btn back-btn my-3" onClick={() => navigate('#')}>
                                <span className="bi bi-arrow-left m-3"> Back </span>
                            </button>
                        </div>
                    </div>

                    <div className="tasks-table-container">
                        <table className="tasks-table">
                            <thead>
                                <tr>
                                    <th>Task ID</th>
                                    <th>Admin ID</th>
                                    <th>Task Name</th>
                                    <th>Budget Info</th>
                                    <th>Description</th>
                                    <th>Deadline</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((task) => (
                                    <tr key={task.TaskID}>
                                        <td>{task.TaskID}</td>
                                        <td>{task.AdminID}</td>
                                        <td>{task.TaskName}</td>
                                        <td>{task.BudgetInfo}</td>
                                        <td>{task.Description}</td>
                                        <td>{task.Deadline}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <button className="sidebar-toggle" onClick={toggleSidebar}>☰</button>
            <div className={`flex-grow-1 d-flex ${sidebarVisible ? 'show-sidebar' : ''}`}>
                <Sidebar sidebarVisible={sidebarVisible} />
            </div>
            <div className="container3">
                <Footer />
            </div>
        </div>
    );
};

export default EmployeeReceivedTask;
