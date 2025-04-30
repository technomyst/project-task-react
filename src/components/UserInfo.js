
const UserInfo =(props) =>{

    const {userName} = props;
    const styleMain = {backgroundColor: "lightblue", float:"right", width:"10%",minWidth:"200px"};
    return(
        <div id="UserInfo" style={styleMain}>
            {userName}
        </div>
    )
}

UserInfo.defaultProps = {userName: "Пользователь0"};

export default UserInfo;