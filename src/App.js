import "./App.css";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";
import { useEffect, useState } from "react";
import axios from "axios";
import { QueryClientProvider, QueryClient, useQuery } from "react-query";

const queryClient = new QueryClient();

function NaverMapMarker(item) {
  const navermaps = window.naver.maps;

  return (
    <>
      <Marker
        key={item.key}
        position={new navermaps.LatLng(item.item.y, item.item.x)}
      />
    </>
  );
}

function NaverMapComponent(props) {
  console.log(props);
  //const { naver } = window;
  //const mapOptions = {center: new naver.maps.LatLng(37.3595704, 127.105399), zoom: 10,};
  var map;

  // useEffect(()=>{
  //     map = new naver.maps.Map("map", mapOptions);
  //     const currentMarker = new naver.maps.Marker({
  //         position: new naver.maps.LatLng(37.3595704, 127.105399), map,
  //         icon: {
  //             url: "https://uxwing.com/wp-content/themes/uxwing/download/31-location-travel-map/maps-black.png",
  //             size: new naver.maps.Size(100, 100),
  //             origin: new naver.maps.Point(0, 0),
  //             anchor: new naver.maps.Point(25, 26),
  //         },
  //     });
  //
  // },[])

  return (
    // <div id="map" style={{width:'100%',height:'100vh'}}>11</div>
    <RenderAfterNavermapsLoaded
      ncpClientId={"kz9davdqz6"}
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
    >
      <NaverMap
        mapDivId={"react-naver-map"}
        style={{ width: "100%", height: "100vh" }}
        defaultCenter={{ lat: "37.554722", lng: "126.970833" }}
        defaultZoom={13}
      >
        {props.data.data.map((x) => (
          <NaverMapMarker key={x.id} item={x} />
        ))}
      </NaverMap>
    </RenderAfterNavermapsLoaded>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ComponentApp />
    </QueryClientProvider>
  );
}

function ComponentApp() {
  const { isLoading, error, data } = useQuery("beerData", () =>
    axios("https://awesome-beer-sever.onrender.com/")
  );
  console.log(data);
  return (
    <div>
      {isLoading ? (
        <h1>1</h1>
      ) : (
        <NaverMapComponent data={JSON.parse(JSON.stringify(data))} />
      )}
    </div>
  );
}

export default App;
