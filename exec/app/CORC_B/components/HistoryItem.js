import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const closeBtnSize = width * 0.08;

const formatMoney = (number) =>
  number !== null && +number >= 0
    ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : null;

const formatDate = (date) => {
  let year = date.slice(2, 4);
  let month = date.slice(5, 7);
  let day = date.slice(8, 10);
  let time = date.slice(11, 16);

  return `${year}.${month}.${day} ${time}`;
};

const Payment = ({ payment }) => {
  const [isModalVisible, setmodalVisible] = React.useState(false);

  const toggleModal = () => {
    return setmodalVisible(!isModalVisible);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.9}
        onPress={() => toggleModal()}
      >
        <View style={styles.itemNamePrice}>
          <View>
            <Text style={styles.itemNameFont}>
              {payment.paymentitem[0].productName}
              {payment.paymentitem.length > 1 &&
                " 외 " + (payment.paymentitem.length - 1) + "건"}
            </Text>
            <Text style={styles.dateFont}>{formatDate(payment.date)}</Text>
          </View>
          <Text style={styles.moneyFont}>{formatMoney(payment.total)}원</Text>
        </View>
      </TouchableOpacity>
      <Modal visible={isModalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalBox}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Icon
                name="close"
                size={closeBtnSize}
                onPress={() => toggleModal()}
              />
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Receipt
                </Text>
              </View>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.modalStoreName}>
                {payment.store.storeName}
              </Text>
              <Text style={styles.modalDate}>
                {payment.date.toString().slice(0, 16).replace(/T/gi, " ")}
              </Text>
              <ScrollView style={styles.modalScrollView}>
                {payment.paymentitem.map((item) => (
                  <View
                    key={item.paymentItemId.toString()}
                    style={{ ...styles.modalTextBothSides, flex: 1 }}
                  >
                    <Text style={styles.modalScrollItemFont}>
                      {item.productName} x {item.amount}
                    </Text>
                    <Text style={styles.modalScrollItemFont}>
                      ￦ {formatMoney(item.price * item.amount)}
                    </Text>
                  </View>
                ))}
              </ScrollView>
              <View style={styles.modalTextBothSides}>
                <Text style={styles.modalMoneyFont}>Total</Text>
                <Text style={styles.modalMoneyFont}>
                  ￦ {formatMoney(payment.total)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginTop: 4,
    paddingHorizontal: 4,
  },
  itemNamePrice: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemNameFont: {
    fontSize: 17,
  },
  moneyFont: {
    fontWeight: "bold",
    fontSize: 19,
  },
  dateFont: {
    fontSize: 13.5,
    color: "gray",
  },
  modalBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.50)",
  },
  modalView: {
    width: "85%",
    height: "70%",
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: "13%",
    paddingLeft: "3%",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  modalBody: {
    flex: 1,
    paddingHorizontal: "7%",
    paddingTop: "6%",
    paddingBottom: "10%",
  },
  modalStoreName: {
    marginBottom: 5,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  modalDate: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalScrollView: {
    flex: 1,
    paddingVertical: "5%",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 15,
  },
  modalScrollItem: {
    flexDirection: "row",
    marginVertical: 5,
    flex: 1,
    justifyContent: "space-between",
  },
  modalScrollItemFont: {
    fontSize: 17,
  },
  modalTextBothSides: {
    flexDirection: "row",
    marginVertical: 5,
    justifyContent: "space-between",
  },
  modalMoneyFont: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
