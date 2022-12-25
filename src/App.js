import { RouterProvider } from 'react-router-dom';
import router from './Routers/PublicRouter';
import { useEffect, useState } from 'react';
import Loader from './Pages/Shared/Loading/Loader';



function App() {

  const [sppin, setSppin] = useState(false);


  useEffect(() => {
    setSppin(true);
    setTimeout(() => {
      setSppin(false);
    }, 1500);
  }, []);

  return (
    <div   >
      {sppin ? <Loader></Loader>: <RouterProvider router={router}></RouterProvider>}
    </div>
  );
}

export default App;
