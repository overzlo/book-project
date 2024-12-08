import React, { useEffect, useState } from 'react';
import { getAllUsers, updateUserRole, deleteUser } from '../../api/adminAPI';
import AdminBookPanel from '../AdminBookPanel/AdminBookPanel';
import { Table, Button, Dropdown } from 'react-bootstrap';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const usersData = await getAllUsers();
        setUsers(usersData);
    };

    const handleRoleChange = async (id, role) => {
        await updateUserRole(id, role);
        fetchUsers(); 
    };

    const handleDeleteUser = async (id) => {
        await deleteUser(id);
        fetchUsers(); 
    };

    return (
        <>
            <div>
            <h1 className="text-center">Панель администратора</h1>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Email</th>
                            <th>Роль</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleRoleChange(user._id, 'user')}>User</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleRoleChange(user._id, 'admin')}>Admin</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDeleteUser(user._id)}>Удалить</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <AdminBookPanel />
        </>
    );
};

export default AdminPanel;
