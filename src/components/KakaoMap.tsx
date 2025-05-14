import React from 'react';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';

export default function KakaoMap({location, className = ''}: {location: string; className?: string}) {
    if (!location || !location.includes(',')) {
        return <Text>위치 정보를 불러오는 중입니다...</Text>;
    }

    const [latitude, longitude] = location.split(',').map(Number);
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=a1cb870c2f1afcffd6d127610ecc529a&libraries=services"></script>
      <style>
        html, body, #map { width: 100%; height: 100%; margin: 0; padding: 0; }
      </style>
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
          marker.setMap(map);
        }
      </script>
    </body>
    </html>
  `;
    return (
        <View className={`w-[240px] h-[240px] overflow-hidden rounded-xl ${className}`}>
            <WebView nestedScrollEnabled={true} originWhitelist={['*']} source={{html: htmlContent}} javaScriptEnabled={true} domStorageEnabled={true} />
        </View>
    );
}
