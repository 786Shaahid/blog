import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch('/api/v1/getData')
        .then(response => response.json())
        .then(data => setData(data));
}, []);

  return (
    <div>
      {data.message}
    </div>
  );
}




export default App
