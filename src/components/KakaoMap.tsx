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
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${ANDROID_KAKAO_API_KEY}&libraries=services"></script>
      <style>html, body, #map { width: 100%; height: 100%; margin: 0; padding: 0; }</style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        window.onload = function() {
          var mapContainer = document.getElementById('map');
          var mapOption = {
            center: new kakao.maps.LatLng(${latitude}, ${longitude}),
            level: 3
          };
          var map = new kakao.maps.Map(mapContainer, mapOption);
          var markerPosition = new kakao.maps.LatLng(${latitude}, ${longitude});
          var marker = new kakao.maps.Marker({ position: markerPosition });
          var infowindow = new kakao.maps.InfoWindow({
              content: '<div style="width:150px;text-align:center;padding:6px 0;">${name}</div>'
          });
          infowindow.open(map, marker);
          marker.setMap(map);
        }
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
            </style>
        </head>
        <body>
            <div id="map"></div>
            <script>
                window.onload = function() {
                  var mapContainer = document.getElementById('map');
                  var mapOption = {
                    center: new kakao.maps.LatLng(${latitude}, ${longitude}),
                    level: 5
                  };
                  var map = new kakao.maps.Map(mapContainer, mapOption);
                    var markerPosition = new kakao.maps.LatLng(${latitude}, ${longitude});
                    var marker = new kakao.maps.Marker({ position: markerPosition });
                    marker.setMap(map);
                  var infowindow = new kakao.maps.InfoWindow({
                    content: '<div style="width:150px;text-align:center;padding:6px 0;">${name}</div>'
                })
                  infowindow.open(map, marker);
                }
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
