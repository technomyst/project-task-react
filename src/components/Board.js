import Projects from './Projects'

const Board =(props) =>{

    const {name, description} = props;
    
    return(
        <div>
            <h2>Ваши проекты</h2>
            <Projects/>
        </div>
    )
}

Board.defaultProps = {name: "Проект0", description: "Это проект по умолчанию (пока не загружены данные)"};

export default Board;