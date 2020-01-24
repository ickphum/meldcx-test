import React, { useState, useEffect, useRef } from 'react';

import { API, postData } from './API.js'

export default ({authToken, logout}) => {

  const [devices, setDevices] = useState([]);
  const parentRef = useRef();

  const ORBIT_RADIUS = 150;
  const DEVICE_RADIUS = 30;

  const fetchDevices = () => {
    fetch(API + 'devices')
      .then(data => data.json())
      .then(data => {
        setDevices(data.devices);
      });
  }

  useEffect(() => {
      // do a initial read so we don't wait 5 seconds for the first status
      fetchDevices();

      // start timer to do periodic fetch
      const intervalId = setInterval(fetchDevices,5000);

      // return cleanup function
      return () => clearInterval(intervalId);
    }, [ ]
  )

  // all devices start evenly spaced around the orbit, so we need
  // a start angle based on the device index
  const angleForDevice = (index) => {
    return index * (Math.PI * 2 / devices.length);
  }

  // we're using a dynamic style prop to set the starting position
  const startPositionStyle = (index) => {

    // we could have shortened these expressions to (cos(...)+1) * ORBIT - DEVICE,
    // since we're using ORBIT twice, but that would have obscured the different ways we're 
    // using ORBIT; the first is simple trig to find the coord of an angle on a circle, the
    // second is an offset to move the device circles into place around the centre of the orbit.
    return {
      top: Math.cos(angleForDevice(index)) * ORBIT_RADIUS + ORBIT_RADIUS - DEVICE_RADIUS,
      left: Math.sin(angleForDevice(index)) * ORBIT_RADIUS + ORBIT_RADIUS - DEVICE_RADIUS,
    }
  }

  return (
    <div className="devices">
      <div className="orbit" ref={parentRef}>
        {devices.map((device,index) => 
          <div className="device" key={index} style={startPositionStyle(index)} />
        )}
      </div>
      <div className="deviceStatus">
        <div className="count">
          {devices.length}
        </div>
        <div className="countLabel">
          DEVICES ONLINE
        </div>
      </div>
      <div className="buttons">
        <span className="button" onClick={e => {
          console.log("notify");
          postData('notify', 
            {
              name: 'Ian Macdonald',
              email: 'ickphum@gmail.com',
              repoUrl: '',
              message: "They laughed at me when I said I was going to try stand-up comedy. Well, they're not laughing now.",
            },
            authToken)
          .then(response => {
            response.text()
              .then(text => {
                console.log(text); 
              })
            })


        }}>NOTIFY</span>
        <span className="button" onClick={e => logout()}>
          LOG OUT
        </span>
      </div>
    </div>
  );


}
