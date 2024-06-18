import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RegistrationForm from './components/pages/register/RegistrationForm';
import LoginSignUp from './components/pages/register/LoginSignUp';
import LoginPage from './components/pages/login/LoginPage';

function App() {

  const router = createBrowserRouter([
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
    }
  ])

  return (
    <div className="App">
      <RouterProvider router = {router}></RouterProvider>
    </div>
  );
}

export default App;
