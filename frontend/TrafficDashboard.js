import React, { useState, useEffect } from "react";

function TrafficDashboard() {
  const [trafficData, setTrafficData] = useState({});
  const [lightTimes, setLightTimes] = useState({});

  useEffect(() => {
    const fetchTraffic = async () => {
      const response = await fetch("http://127.0.0.1:5000/get_traffic");
      const data = await response.json();
      setTrafficData(data.traffic_data);
      setLightTimes(data.light_times);
    };

    fetchTraffic();
    const interval = setInterval(fetchTraffic, 5000); // Refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Traffic AI Dashboard</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Intersection</th>
            <th>Vehicle Count</th>
            <th>Light Time (Seconds)</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(trafficData).map((key) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{trafficData[key]}</td>
              <td>{Math.round(lightTimes[key])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TrafficDashboard;