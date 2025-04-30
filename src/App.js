//import './App.css';
import { Route, Routes} from 'react-router-dom';
import AppRoutes from './AppRoutes';


import Board from './components/Board';
import Menu from './components/Menu';
import UserInfo from './components/UserInfo';
import Project from './components/Project';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return ( 
     <div>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Board />} />
        <Route path="/board" element={<Board />} />
        <Route path="/projects" element={<Board />} />
        <Route path="/projects/:id" element={<Project />}/>
      </Routes>
    </BrowserRouter>
      {/* <UserInfo/>
      <Menu/>
      <Board> 
      <Routes>
           /*{AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}*/
          /*<Route path="/projects/:id" element={<Project />}/>*/
      /*</Routes>
      </Board> */}
    </div>
  );
}

export default App;
