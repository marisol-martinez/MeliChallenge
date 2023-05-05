import MainList from './pages/MainList';
import Detail from './pages/Detail';
import NotFound from './pages/NotFound';
import HomePage from './pages/HomePage';

const RoutesSite = [
  {
    path: "/",
    element: <HomePage/>,
    exact: true
  },
  {
    path: "/items",
    element: <MainList/>
  },
  {
    path: "/items/:id",
    element: <Detail/>
  },
  {
    path: "*",
    element: <NotFound/>
  }
];

export default RoutesSite;
