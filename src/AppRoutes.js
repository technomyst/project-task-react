import Board from "./components/Board";
import Project from "./components/Project";

const AppRoutes =[
    {
        path:"/board",
        element:<Board/>
    },
    {
        path:"/projects/:id",
        element:<Project/>
    }
]

export default AppRoutes;