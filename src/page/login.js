import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toast } from "antd-mobile";
import logo from "../assets/img/logo.png";

const Login = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    useEffect(() => {
        axios.post('http://localhost:3003/getuser').then((res) => {
            if(res.data.length > 0){
                setUsers(res.data);
            }
        });
    },[]);

    const btnOnClick = () => {
        users.map((user) => {
            if(id === user.setting_Id){
                if(pw === user.setting_Pw){
                    navigate("/type", {state : id});
                }else{
                    Toast.show({
                        content : "아이디와 비밀번호를 확인해주세요.",
                        position : "bottom",
                    })
                }
            }
        })
    }

    return (
        <div className="login">
            <div>
                <img src={logo}></img>
            </div>
            <div className="title">로그인</div>
            <div className="account">
                <input value={id} onChange={(e) => setId(e.target.value)} placeholder="아이디를 입력 해주세요" type="email"></input>
                <input value={pw} onChange={(e) => setPw(e.target.value)} placeholder="비밀번호를 입력 해주세요" type="password"></input>
            </div>
            <button onClick={btnOnClick}>로그인</button>
            <div className="version">버전 v0.2</div>
        </div>
    )
}

export default Login;