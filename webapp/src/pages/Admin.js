import NavBar from "../components/NavBar";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { DataGrid, renderActionsCell } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";


function GetAdminData() {
    let authiddata = Cookies.get("LoginToken");

    return fetch("https://backend.project-persona.com/authenticate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ authID: authiddata }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    "my disappointment is immeasurable and my day is ruined"
                );
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            if (data.permission_level === 0) {
                window.location.replace("/game");
            }
            return data;
        })
        .catch((error) => {
            console.log(error);
        });
}

function LogOutUser(Username) {
    let authiddata = Cookies.get("LoginToken");

    return fetch("https://backend.project-persona.com/reset_auth_id", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            authID: authiddata,
            username: Username,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    "my disappointment is immeasurable and my day is ruined"
                );
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((error) => {
            console.log(error);
        });
}

function CreateUser(Name, Username, Password, Email, Permission_Level) {
    let authiddata = Cookies.get("LoginToken");

    return fetch("https://backend.project-persona.com/create_user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            authID: authiddata,
            name: Name,
            username: Username,
            password: Password,
            email: Email,
            permission_level: Number(Permission_Level),
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    "my disappointment is immeasurable and my day is ruined"
                );
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((error) => {
            console.log(error);
        });
}

function SetUserData(User, Name, Username, Password, Email, Permission_Level) {
    let authiddata = Cookies.get("LoginToken");

    return fetch("https://backend.project-persona.com/update_user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            authID: authiddata,
            edit_user: User,
            name: Name,
            username: Username,
            password: Password,
            email: Email,
            permission_level: Number(Permission_Level),
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    "my disappointment is immeasurable and my day is ruined"
                );
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((error) => {
            console.log(error);
        });
}

function DeleteUser(Username) {
    let authiddata = Cookies.get("LoginToken");

    return fetch("https://backend.project-persona.com/delete_user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ authID: authiddata, username: Username }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    "my disappointment is immeasurable and my day is ruined"
                );
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((error) => {
            console.log(error);
        });
}

function GetAdminUserList() {
    let authiddata = Cookies.get("LoginToken");

    return fetch("https://backend.project-persona.com/user_list", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ authID: authiddata, admin: true }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    "my disappointment is immeasurable and my day is ruined"
                );
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((error) => {
            console.log(error);
        });
}

export default function Admin() {
    const [adminData, setAdminData] = useState(null);
    const [userList, setUserList] = useState(null);
    const [tableVisible, setTable] = useState(false);
    const [createUserVisible, setCreateUser] = useState(false);
    const [editUserVisible, setEditUser] = useState(false);
    const [user, setUser] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [permission_level, setPermission_Level] = useState(0);

    const columns = [
        { field: "name", headerName: "Name", width: 200 },
        { field: "username", headerName: "Username", width: 200 },
        { field: "email", headerName: "Email", width: 250 },
        {
            field: "points",
            headerName: "Points",
            type: "number",
            width: 100,
        },
        {
            field: "logout",
            headerName: "Log Out",
            sortable: false,
            width: 160,
            renderCell: (row) => (
                <Button
                    variant="primary"
                    type="submit"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={() => LogOutUser(row.username)}
                >
                    Log Out
                </Button>
            ),
        },
        {
            field: "delete",
            headerName: "Delete",
            sortable: false,
            width: 160,
            renderCell: (row) => (
                <Button
                    variant="primary"
                    type="submit"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={() => deleteUser(row.username)}
                >
                    Delete
                </Button>
            ),
        },
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    useEffect(() => {
        GetAdminData().then((data) => {
            setAdminData(data);
        });
    }, []);

    useEffect(() => {
        GetAdminUserList().then((data) => {
            setUserList(data);
        });
    }, [tableVisible, createUserVisible, editUserVisible]);

    function toggleTable() {
        setTable((tableVisible) => !tableVisible);
    }

    function initalize() {
        setUser("");
        setName("");
        setUsername("");
        setPassword("");
        setEmail("");
        setPermission_Level(0);
    }

    function toggleCreateUser() {
        initalize();
        setCreateUser((editUserVisible) => !editUserVisible);
        if (editUserVisible) {
            setEditUser(false);
        }
    }

    function toggleEditUser() {
        if (user !== "") {
            initalize();
            setEditUser((editUserVisible) => !editUserVisible);
            if (editUserVisible) {
                setCreateUser(false);
            }
        }
    }

    const handleChange = (e) => {
        switch (e.target.name) {
            case "user":
                setUser(e.target.value);
                console.log("User was set to: " + user);
                break;
            case "name":
                setName(e.target.value);
                break;
            case "username":
                setUsername(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            case "email":
                setEmail(e.target.value);
                break;
            case "permission_level":
                setPermission_Level(e.target.value);
                break;
            default:
                break;
        }
    };

    function updateUser() {
        toggleEditUser();
        SetUserData(user, name, username, password, email, permission_level);
        GetAdminUserList().then((data) => {
            setUserList(data); // Set the user data when the promise resolves
        });
    }

    function createUser() {
        toggleCreateUser();
        CreateUser(name, username, password, email, permission_level);
        GetAdminUserList().then((data) => {
            setUserList(data); // Set the user data when the promise resolves
        });
    }

    function deleteUser(username) {
        DeleteUser(username);
        GetAdminUserList().then((data) => {
            setUserList(data); // Set the user data when the promise resolves
        });
    }

    function getPermission(permission_value) {
        switch (permission_value) {
            case 0:
                return "User";
            case 1:
                return "Admin";
            default:
                return "Unknown";
        }
    }

    console.log("admindata ", adminData);
    console.log("userlist ", userList);

    return (
        <>
            <NavBar />
            <Container style={{ padding: "20px" }}>
                <Row className="d-flex gap-2">
                    <h2>Admin Controls</h2>

                    <Col className="d-flex gap-2">
                        {!editUserVisible && (
                            <Col className="d-flex gap-2">
                                {!createUserVisible && (
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="mb-3"
                                        onClick={toggleCreateUser}
                                    >
                                        Create New User
                                    </Button>
                                )}

                                {createUserVisible && (
                                    <Row className="d-flex gap-2">
                                        <h3>Create User</h3>
                                        <Form.Group>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                type="name"
                                                name="name"
                                                placeholder="name"
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                type="username"
                                                name="username"
                                                placeholder="username"
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                placeholder="password"
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                placeholder="email"
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Permissions</Form.Label>
                                            <Form.Select
                                                type="permission_level"
                                                name="permission_level"
                                                placeholder="permission level"
                                                onChange={handleChange}
                                            >
                                                <option value="0">User</option>
                                                <option value="1">Admin</option>
                                            </Form.Select>
                                        </Form.Group>

                                        <Row>
                                            <Col className="d-flex gap-2">
                                                <Button
                                                    variant="primary"
                                                    type="submit"
                                                    className="mb-3"
                                                    onClick={createUser}
                                                >
                                                    Create User
                                                </Button>

                                                <Button
                                                    variant="primary"
                                                    type="submit"
                                                    className="mb-3"
                                                    onClick={toggleCreateUser}
                                                >
                                                    Cancel
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Row>
                                )}
                            </Col>
                        )}

                        {!createUserVisible && (
                            <Col>
                                {!editUserVisible && (
                                    <Row className="d-flex gap-2">
                                        <Form.Group>
                                            <h4>Username</h4>
                                            <Form.Control
                                                type="user"
                                                name="user"
                                                placeholder="user"
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            className="mb-3"
                                            onClick={toggleEditUser}
                                        >
                                            Edit User
                                        </Button>
                                    </Row>
                                )}

                                {editUserVisible && (
                                    <Row className="d-flex gap-2">
                                        <h3>Edit user: {user}</h3>
                                        <Form.Group>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                type="name"
                                                name="name"
                                                placeholder="name"
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                type="username"
                                                name="username"
                                                placeholder="username"
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                placeholder="password"
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                placeholder="email"
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Permissions</Form.Label>
                                            <Form.Select
                                                type="permission_level"
                                                name="permission_level"
                                                onChange={handleChange}
                                            >
                                                <option value="0">User</option>
                                                <option value="1">Admin</option>
                                            </Form.Select>
                                        </Form.Group>

                                        <Col className="d-flex gap-2">
                                            <Button
                                                variant="primary"
                                                type="submit"
                                                className="mb-3"
                                                onClick={updateUser}
                                            >
                                                Submit Changes
                                            </Button>

                                            <Button
                                                variant="primary"
                                                type="submit"
                                                className="mb-3"
                                                onClick={toggleEditUser}
                                            >
                                                Cancel
                                            </Button>
                                        </Col>
                                    </Row>
                                )}
                            </Col>
                        )}
                    </Col>

                    <Row>
                        {!tableVisible && (
                            <Button
                                variant="primary"
                                type="submit"
                                className="mb-3"
                                onClick={toggleTable}
                            >
                                Show User List
                            </Button>
                        )}

                        {tableVisible && (
                            <Col>
                                <h3>Users</h3>
                                <Paper sx={{ height: 400, width: "100%" }}>
                                    <DataGrid
                                        rows={userList}
                                        columns={columns}
                                        getRowId={(userList) => userList.username}
                                        initialState={{ pagination: { paginationModel } }}
                                        pageSizeOptions={[5, 10]}
                                        sx={{ border: 0 }}
                                    />
                                </Paper>
                            </Col>
                        )}

                        {tableVisible && (
                            <Button
                                variant="primary"
                                type="submit"
                                className="mb-3"
                                onClick={toggleTable}
                            >
                                Hide User List
                            </Button>
                        )}
                    </Row>
                </Row>
            </Container>
        </>
    );
}
