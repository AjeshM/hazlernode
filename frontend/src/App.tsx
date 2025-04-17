import React, { useState } from 'react';



export default function App() {
  const [message, setMessage] = useState<string | null>("Hello from App.tsx")


  return (
    <>
      <p>{message}</p>
    </>
  );
}
