import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import logo from "../assets/img/logo.png";

const Login = () => {
    const navigate = useNavigate(); //특정 주소를 이동할때 사용함
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    return (
        <div className="login">
            <div>
                <img src={logo}></img>
            </div>
            <div className="title">로그인</div>
            <div className="account">
                <input value={id} onChange={(e) => {
                    setId(e.target.value);
                }}
                placeholder="아이디를 입력해주세요" type="email">
                </input>
                <input value={pw} onChange={(e) => {
                    setPw(e.target.value);
                }}
                placeholder="비밀번호를 입력해주세요" type="password">
                </input>
            </div>
            <button onClick={() => {
                navigate("/type", {state: id});
            }}>로그인</button>
            <div className="version">버전 v0.2</div>
        </div>
    )
}

export default Login;