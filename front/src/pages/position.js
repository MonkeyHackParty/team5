import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Position = () => {
    const [position, setPosition] = useState({ latitude: null, longitude: null });

    useEffect(() => {
        const sendLocation = (latitude, longitude) => {
            axios.post('http://localhost:5000/api/location', {
                location: {
                    latitude,
                    longitude,
                }
            }, { withCredentials: true })
                .then(response => {
                    console.log('Location sent successfully:', response.data);
                })
                .catch(error => {
                    console.error('Error sending location:', error);
                });
        };

        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setPosition({ latitude, longitude });

                        // サーバーに送信
                        sendLocation(latitude, longitude);
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                    },
                    {
                        enableHighAccuracy: false,
                        timeout: 8000,
                        maximumAge: 2000,
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };

        // 初回実行
        updateLocation();

        // 1分ごとに更新
        const interval = setInterval(updateLocation, 60000); // 60000ms = 1 minute

        // コンポーネントのアンマウント時にintervalをクリア
        return () => clearInterval(interval);
    }, []);

    return null; // このコンポーネントはUIをレンダリングしない
};

export default Position;
