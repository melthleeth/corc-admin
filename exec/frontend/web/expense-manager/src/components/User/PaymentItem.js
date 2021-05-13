import { Fragment, useState } from 'react';

import Modal from '../UI/Modal/Modal';
import Backdrop from '../UI/Backdrop/Backdrop';
import Receipt from '../UI/Receipt/Receipt';
import { ReactComponent as ReceiptIcon } from '../../assets/receipt.svg';
import classes from './Item.module.css';

const PaymentItem = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const formatMoney = (number) => new Intl.NumberFormat().format(number) + '원';

  const showModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const totalPrice = () =>
    props.paymentitem.reduce(
      (accumulatedQuantity, item) =>
        accumulatedQuantity + item.price * item.amount,
      0
    );

  const paymentContents = (items) => {
    let resultStr = `${items[0].productName} ✕ ${items[0].amount}`;
    if (items.length === 1) return resultStr;

    return resultStr + ` 외 ${items.length - 1}건`;
  };

  return (
    <Fragment>
      <Modal show={modalIsOpen} closed={closeModal}>
        <span>결제 상세 내역</span>
        <Receipt {...props} />
      </Modal>
      {modalIsOpen ? <Backdrop show={modalIsOpen} closed={closeModal} /> : null}
      <tr className={classes.tr}>
        <td style={{ width: '40%' }} className={`${classes.td}`}>
          {props.paymentId}
        </td>
        <td
          className={`${classes.td} ${classes['text-sm']} ${classes['font-normal']}`}
        >
          {props.store.category.categoryName}
        </td>
        <td className={`${classes.td}`}>{props.store.storeName}</td>
        <td
          className={`${classes.td}`}
        >{`${props.store.sido.sidoName} ${props.store.gugun.gugunName}`}</td>
        <td className={`${classes.td} ${classes['td-flex']}`}>
          <span>{paymentContents(props.paymentitem)}</span>
          <ReceiptIcon className={classes.icon} onClick={showModal} />
        </td>
        <td
          style={{ width: '60%' }}
          className={`${classes.td} ${classes['text-sm']} ${classes.date}`}
        >
          {props.date.slice(0, 10)}
        </td>
        <td
          style={{ width: '60%' }}
          className={`${classes.td} ${classes['text-sm']} ${classes['align-right']}`}
        >
          {formatMoney(totalPrice())}
        </td>
      </tr>
    </Fragment>
  );
};

export default PaymentItem;
