import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RegistrationForm from './components/pages/register/RegistrationForm';
import LoginSignUp from './components/pages/register/LoginSignUp';
import LoginPage from './components/pages/login/LoginPage';
import Home from './components/pages/home/Home';
import Root from './components/Root/Root';
import Profile from './components/pages/home/Profile';
import TransactionHistory from './components/dashboard/TransactionHistory';
import Dashboard from './components/dashboard/Dashboard';
import DashboardContent from './components/dashboard/DashboardContent';



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
        },
         {
        path: 'dashboard',
        element: <Dashboard />, // Set Dashboard as the parent component
        children: [
          {
            path: 'dashboardContent',
            element: <DashboardContent />
          },
          {
            path: 'profile',
            element: <Profile />
          },
          {
            path: 'transaction-history',
            element: <TransactionHistory />
          },
          // Add more routes as needed
        ]
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
 
    </div>
  );
}

export default App;
