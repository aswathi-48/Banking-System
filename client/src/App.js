import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RegistrationForm from './components/pages/register/RegistrationForm';
import LoginSignUp from './components/pages/register/LoginSignUp';
import LoginPage from './components/pages/login/LoginPage';
import Home from './components/pages/home/Home';
import Root from './components/Root/Root';
import Profile from './components/pages/home/Profile';
import Navbar from './components/dashboard/Navbar';
import Main from './components/dashboard/Main';
import SideBar from './components/dashboard/SideBar';


function App() {

  const router = createBrowserRouter([

    {
      path:'/',
      element:<Root/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/profile',
          element:<Profile/>
        }
      ]
    },
    {
      path:"register",
      element:<RegistrationForm/>
    },
    {
      path:"reg",
      element:<LoginSignUp/>
    },
    {
      path: "login",
      element:<LoginPage/>
    },

  ])

  return (
    <div className="App">
      <RouterProvider router = {router}></RouterProvider>
      <div className='grid-container'>
        <Navbar/>
        <SideBar/>
        <Main/>
      </div>
    </div>
  );
}

export default App;
