import { RouterProvider } from 'react-router-dom';
import router from './Routers/PublicRouter';
import { useEffect, useState } from 'react';
import Loading from './Pages/Shared/Loading/Loading.jsx';



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
      {sppin ? <Loading ></Loading> : <RouterProvider router={router}></RouterProvider>}
    </div>
  );
}

export default App;
