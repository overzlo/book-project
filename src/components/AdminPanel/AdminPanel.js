import React, { useEffect, useState } from 'react';
import { getAllUsers, updateUserRole, deleteUser } from '../../api/adminAPI';
import AdminBookPanel from '../AdminBookPanel/AdminBookPanel';
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
        fetchUsers(); // Обновляем список после изменения роли
    };

    const handleDeleteUser = async (id) => {
        await deleteUser(id);
        fetchUsers(); // Обновляем список после удаления пользователя
    };

    return (
        <>
        <div>
            <h2>Управление пользователями</h2>
            <table>
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
                                <select
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteUser(user._id)}>Удалить</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <AdminBookPanel/>
                    </>
    );
};

export default AdminPanel;
