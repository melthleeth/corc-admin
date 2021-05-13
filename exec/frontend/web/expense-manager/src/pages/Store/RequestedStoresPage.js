import { useEffect, useState } from 'react';

import RequestedStoreList from '../../components/Store/RequestedStoreList';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import useHttp from '../../hooks/use-http';
import { getAllRequestedStores } from '../../lib/api-store';
import Page from '../../components/Pagenation';

import classes from './list.module.css';

const RequestedStoresPage = () => {
  const {
    sendRequest,
    status,
    data: loadedStores,
    error,
  } = useHttp(getAllRequestedStores, true);

  const [pageInfo, setPageInfo] = useState({ page: 0, size: 10 }); // page: 현재 페이지, size: 한 페이지에 출력되는 데이터 갯수

  useEffect(() => {
    sendRequest(pageInfo);
  }, [sendRequest, pageInfo]);

  if (status === 'pending') {
    return (
      <div className="page">
        <span className="title">가맹점 신청 목록</span>
        <section className={classes.spinner}>
          <LoadingSpinner />
        </section>
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }
  console.log('loadedStores', loadedStores);
  if (
    status === 'completed' &&
    (!loadedStores.content || loadedStores.content.length === 0)
  ) {
    return (
      <div className="page">
        <span className="title">등록 신청한 가맹점이 없습니다</span>
        <section className={classes.section}></section>
      </div>
    );
  }
  return (
    <div className="page">
      <span className="title">가맹점 신청 목록</span>
      <section className={classes.section}>
        <RequestedStoreList
          stores={loadedStores.content}
          page={loadedStores.numberOfElements}
        />
        <Page
          totalElements={loadedStores.totalElements}
          blockSize={4}
          number={loadedStores.number}
          size={loadedStores.size}
          onClick={setPageInfo}
        ></Page>
      </section>
    </div>
  );
};

export default RequestedStoresPage;
