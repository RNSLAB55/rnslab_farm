import axios from "axios";
import { useState,useEffect } from "react";
import { Toast,SpinLoading } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";

const Login = () => {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [users, setUsers] = useState([]);
    const [usersLoading, setUsersLoading] = useState(false);

    const getUsers = async() => {
        setUsersLoading(true);
        try {
            const response = await axios.post('/getusers')
            setUsers(response.data);
            setUsersLoading(false);
        } catch(err) {
            console.log("Error >>",err);
        }
    }


    const goType = () => {
        let check = false;
        users && users.map((user) => {
            if(id === user.setting_Id && pw === user.setting_Pw){
                check = true;
                navigate("/type", {state : id});
            }
        })
        if(check === false){
            Toast.show({
                content : "아이디와 비밀번호를 확인해주세요",
                position : "bottom",
            });
        }
    }

    const spinLoading = () => {
        return (
            <div style={{textAlign: 'center'}}>
            <div style={{
                flexGrow: 2,
                display: "flex",
                paddingTop: "70%",
                justifyContent: "center",
            }}>
                <SpinLoading></SpinLoading>
            </div>
            <p style={{marginTop:"20px"}}>Loading...</p>
        </div>
        )
    }

    useEffect(() => {
        getUsers();
    },[]);

    return (
        <div className="login">
            {usersLoading ?  spinLoading() : 
                <>
                    <div> <img src={logo} alt=""></img></div>
                    <div className="title">로그인</div>
                    <div className="account">
                        <input value={id} onChange={(e) => setId(e.target.value)} placeholder="아이디를 입력 해주세요" type="email" />
                        <input value={pw} onChange={(e) => setPw(e.target.value)} placeholder="비밀번호를 입력 해주세요" type="password" />
                    </div>
                    <button onClick={goType}>로그인</button>
                    <div className="version">버전 v0.2</div>
                </>
            }
        </div>
    )
}

export default Login;