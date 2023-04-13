import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { accelerometer, setUpdateIntervalForType, SensorTypes, gyroscope } from 'react-native-sensors';

import { styles } from './styles';

const ShakeDetector = function () {
    const [sensorData, setSensorData] = useState({
        x: 0,
        y: 0,
        z: 0,
        mag: 0,
    });

    const [shakeDetected, setShakeDetected] = useState(false);
    const THRESHOLD = 1.5;

    const  handleShake = ({x, y, z}) => {
        const accel = Math.sqrt(x*x + y*y + z*z);
        if (accel > THRESHOLD) {
            setShakeDetected(true);
            console.log("shake detected: " + accel)
        }

        setSensorData({
            x: x.toFixed(2),
            y: y.toFixed(2),
            z: z.toFixed(2),
            mag: accel.toFixed(2),
        }); 
    }

    setUpdateIntervalForType(SensorTypes.accelerometer, 100);
    useEffect(() => {
        const subscription = accelerometer.subscribe(handleShake);
            return () => {
            subscription.unsubscribe();
    }; }, []);


    return <View>
        <Text style={styles.Text}>X: {sensorData.x}</Text>
        <Text style={styles.Text}>Y: {sensorData.y}</Text>
        <Text style={styles.Text}>Z: {sensorData.z}</Text>
        <Text style={styles.Text}>accel: {sensorData.mag}</Text>
            {shakeDetected ? 
                <View>
                <Text style={styles.ShookText}>Shake detected!</Text>
                <Pressable
                    style={({pressed}) => [ styles.ButtonBasic, pressed ? styles.ButtonDown : styles.ButtonUp ]}
                    onPress={() => {
                    console.log("resetting shake");
                    setShakeDetected(false)
                    } }
                    >
                <Text style={styles.ButtonLabel}>Reset the sensor!</Text>
                </Pressable>
                </View>
                :
                <Text style={styles.UnShookText}>Shake the device to see the message!</Text>
        }
        
    </View>;
}

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
        console.log("sensor:" + props.sensor);
        setUpdateIntervalForType(SensorTypes.accelerometer, 200);
        useEffect(() => {
            console.log("subscribed to accel");
            const subscription = accelerometer.subscribe(handleSensorData);
                return () => {
                    console.log("unsubscribed");
                    subscription.unsubscribe();
        }; }, []);
    } else if (props.sensor == "gyro") {
        console.log("sensor:" + props.sensor);
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

export { ShakeDetector, Sensor };