import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import UserList from '../../components/User/UserList';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import useHttp from '../../hooks/use-http';
import { getAllUsers } from '../../lib/api-user';

import classes from './UserListPage.module.css';

const UserListPage = () => {
  const { sendRequest, status, data: loadedInfo, error } = useHttp(
    getAllUsers,
    true
  );

  let loadedUsers = [
    {
      userId: 26,
      employeeNum: 2600032,
      email: "test3@corc.com",
      userName: "한제현",
      department: "총무부",
      position: "주임",
      contact: "010-1414-4141",
      days: "1111111",
      cardLimit: "100000",
      balance: "1000",
      active: 1,
      accessTime: "2021-05-03 16:54:22",
    },
  ];
  if (loadedInfo !== null) loadedUsers = Object.values(loadedInfo)[0].content;

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="page">
        <span className="title">사용자 목록</span>
        <section className={classes.spinner}>
          <LoadingSpinner />
        </section>
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === "completed" && (!loadedUsers || loadedUsers.length === 0)) {
    return <span>사용자가 없습니다.</span>;
  }

  return (
    <div className="page">
      <span className="title">사용자 목록</span>
      <section className={classes.section}>
        <Link className="btn" to="/user/register">
          사용자 등록
        </Link>
        <UserList users={loadedUsers} />
      </section>
    </div>
  );
};

export default UserListPage;
