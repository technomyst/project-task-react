
const Menu =(props) =>{

    const {name} = props;
    
    return(
        <div id="Menu" style={{backgroundColor: "red" }}>Menu</div>
    )
}

Menu.defaultProps = {name: "Меню0"};

export default Menu;