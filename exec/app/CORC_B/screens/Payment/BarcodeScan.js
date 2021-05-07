import React, { useState, useEffect } from "react";
import { Image, Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const qrSize = width * 0.7;

export default function BarcodeScan(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    props.onScanned(data);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[styles.container]}
      >
        <Text style={styles.description}>Scan your QR code</Text>
        {/* <Image
          style={styles.qr}
          source={{
            uri: 'https://facebook.github.io/react-native/img/tiny_logo.png',
          }}
        /> */}
        <Text
          onPress={() => {
            props.onCancel();
          }}
          style={styles.cancel}
        >
          Cancel
        </Text>
      </BarCodeScanner>
      {scanned && (
        <Text onPress={() => setScanned(false)} style={styles.cancel}>
          Tap to Scan Again
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "gray",
    width: "150%",
  },
  qr: {
    marginTop: "20%",
    marginBottom: "20%",
    width: qrSize,
    height: qrSize,
  },
  description: {
    fontSize: width * 0.05,
    marginBottom: "80%",
    padding: 3,
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    color: "white",
    borderRadius: 12,
  },
  cancel: {
    fontSize: width * 0.05,
    padding: 3,
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    color: "white",
    borderRadius: 12,
  },
});
