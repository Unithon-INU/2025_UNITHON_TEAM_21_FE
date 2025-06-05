import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import {ANDROID_KAKAO_API_KEY, REST_KAKAO_API_KEY} from '@env';

/**
 *
 * @param location 위도, 경도
 * @param name 마커에 표시할 이름
 * @param className 스타일
 * @returns
 */
export function KakaoMap({location, name = '', className = ''}: {location: string; name?: string; className?: string}) {
    if (!location || !location.includes(',')) {
        return <Text>위치 정보를 불러오는 중입니다...</Text>;
    }

    const [latitude, longitude] = location.split(',').map(Number);
    const htmlContent = `
        <!DOCTYPE html>
    <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${ANDROID_KAKAO_API_KEY}&libraries=services"></script>
            <style>
                html,
                body,
                #map {
                    width: 100%;
                    height: 100%;
                    margin: 0;
                    padding: 0;
                }
                .marker-label {
                    background: #fff;
                    color: #484848;
                    padding: 2px 10px;
                    border-radius: 12px;
                    font-size: 13px;
                    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.05);
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div id="map"></div>
            <script>
                var mapContainer = document.getElementById("map");
                var mapOption = {
                    center: new kakao.maps.LatLng(${latitude}, ${longitude}),
                    level: 3
                };
                var map = new kakao.maps.Map(mapContainer, mapOption);
                var markerPosition = new kakao.maps.LatLng(${latitude}, ${longitude});
                var imageSrc = "https://i.ibb.co/B5NGnKNj/Adobe-Express-file-1.png",
                imageSize = new kakao.maps.Size(32, 32),
                imageOption = { offset: new kakao.maps.Point(16,26) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

                var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

                var marker = new kakao.maps.Marker({
                    position: markerPosition,
                    image: markerImage,
                });
                marker.setMap(map);


                var customOverlay = new kakao.maps.CustomOverlay({
                position: markerPosition,
                content: '<div class="marker-label">${name}</div>',
                yAnchor: 2.4,
                });
                customOverlay.setMap(map);
            </script>
        </body>
    </html>
    `;
    return (
        <View className={`${className} overflow-hidden rounded-xl`}>
            <WebView nestedScrollEnabled={true} originWhitelist={['*']} source={{html: htmlContent}} javaScriptEnabled={true} domStorageEnabled={true} />
        </View>
    );
}

/**
 *
 * @param location 위도, 경도
 * @param name 마커에 표시할 이름
 * @param className 스타일
 * @returns
 */
export function KakaoMapAddress({location, name = '', className = ''}: {location: string; name?: string; className?: string}) {
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    useEffect(() => {
        const address2Coordinates = async () => {
            const response = await fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(location)}`, {
                method: 'GET',
                headers: {
                    Authorization: `KakaoAK ${REST_KAKAO_API_KEY}`,
                },
            });
            const data = await response.json();
            setLatitude(data.documents[0].y);
            setLongitude(data.documents[0].x);
        };
        address2Coordinates();
    }, [location]);
    const htmlContent = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${ANDROID_KAKAO_API_KEY}&libraries=services"></script>
            <style>
                html,
                body,
                #map {
                    width: 100%;
                    height: 100%;
                    margin: 0;
                    padding: 0;
                }
                .marker-label {
                    background: #fff;
                    color:#484848;
                    padding: 2px 10px;
                    border-radius: 12px;
                    font-size: 13px;
                    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.05);
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div id="map"></div>
            <script>
                var mapContainer = document.getElementById("map");
                var mapOption = {
                    center: new kakao.maps.LatLng(${latitude}, ${longitude}),
                    level: 3
                };
                var map = new kakao.maps.Map(mapContainer, mapOption);
                var markerPosition = new kakao.maps.LatLng(${latitude}, ${longitude});
                var imageSrc = "https://i.ibb.co/B5NGnKNj/Adobe-Express-file-1.png",
                imageSize = new kakao.maps.Size(32, 32),
                imageOption = { offset: new kakao.maps.Point(16,26) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

                var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

                var marker = new kakao.maps.Marker({
                    position: markerPosition,
                    image: markerImage,
                });
                marker.setMap(map);

                var customOverlay = new kakao.maps.CustomOverlay({
                position: markerPosition,
                content: '<div class="marker-label">${name}</div>',
                yAnchor: 2.4,
                });
                customOverlay.setMap(map);
            </script>
        </body>
    </html>
    `;

    return (
        <View className={`overflow-hidden rounded-xl ${className}`}>
            <WebView originWhitelist={['*']} nestedScrollEnabled={true} source={{html: htmlContent}} javaScriptEnabled={true} domStorageEnabled={true} />
        </View>
    );
}
