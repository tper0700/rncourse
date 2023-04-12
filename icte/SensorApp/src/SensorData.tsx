import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { accelerometer, setUpdateIntervalForType, SensorTypes, gyroscope } from 'react-native-sensors';

import { styles } from './styles';

const Sensor = function (props: {
    sensor: string
}) {
    const [sensorData, setSensorData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });

    const handleSensorData = (data) => {
        setSensorData({
            x: data.x.toFixed(2),
            y: data.y.toFixed(2),
            z: data.z.toFixed(2),
    }); };

    if (props.sensor != "accel" && props.sensor != "gyro") {
        props.sensor = "accel";
    }
    if (props.sensor == "accel") {
        console.log("register accel");
        setUpdateIntervalForType(SensorTypes.accelerometer, 200);
        useEffect(() => {
            const subscription = accelerometer.subscribe(handleSensorData);
                return () => {
                subscription.unsubscribe();
        }; }, []);
    } else if (props.sensor == "gyro") {
        console.log("register accel");
        setUpdateIntervalForType(SensorTypes.gyroscope, 200);
        useEffect(() => {
            const subscription = gyroscope.subscribe(handleSensorData);
                return () => {
                subscription.unsubscribe();
        }; }, []);
    }

    let sensorName = props.sensor == "accel" ? "Accelerometer" : "Gyroscope"
    return <View>
        <Text style={styles.Text}>This is the {sensorName}.</Text>
        <Text style={styles.Text}>X: {sensorData.x}</Text>
        <Text style={styles.Text}>Y: {sensorData.y}</Text>
        <Text style={styles.Text}>Z: {sensorData.z}</Text>
    </View>
}

export { Sensor };