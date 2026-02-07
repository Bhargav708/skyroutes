import LoginForm from './component/auth/LoginForm'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Navbar from './component/Navbar'
import Home from './component/Home'
import About from './component/About'
import Footer from './component/Footer'
import FlightBooking from './component/FlightBooking'
import BoardingPass from './component/BoardingPass'
import AllFlights from './component/AllFlights'
import SearchFlights from './component/SearchFlights'
import Signup from './component/auth/Signup'
import RecentBookings from './component/RecentBookings'
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <><Navbar/> <Home /></>,
    },
    {
      path: '/about',
      element: <> <Navbar/> <About /> </>,
    },
   
    {
      path: '/login',
      element: <LoginForm />,
    },
    {
      path: '/signup',
      element: <Signup/>,
    },
    {
      path : '/flightbooking',
      element : <FlightBooking />
    },
    {
      path: "/boarding-pass/:bookingId",
      element: <BoardingPass />
    },
    {
      path: "/allFlights",
      element: <> <Navbar/><AllFlights/></>
    },

    {
      path: "/search",
      element: <><Navbar/> <SearchFlights /></>,
    },
    {
      path: "/book",
      element: <FlightBooking />,
    },
    {
      path: "/mybookings",
      element: <><Navbar/> <RecentBookings/></>,
    }
  ])

  return (
   <>
    <RouterProvider router={router} />
    <Footer/>
   </>
   
  )
}

export default App
