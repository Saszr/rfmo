import React from 'react';

function App() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    console.log(count);
  }, []);

  return <div>1</div>;
}

export default App;
