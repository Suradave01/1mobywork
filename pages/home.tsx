import React from 'react'
import { Avatar, Input, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'


export default function Home() {
    const router = useRouter()
    const account = JSON.parse(localStorage.getItem("account") || "[]");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [newPassword, setNewPassword] = React.useState('')
    const [rePassword, setRePassword] = React.useState('')
    const [editUser, setEditUser] = React.useState(false)
    const [showPassword, setshowPassword] = React.useState(false)
    const [editPass, setEditPass] = React.useState(false)
    const [adminShow, setAdminShow] = React.useState(false)
    const changeUser = () => {
        setEditUser(!editUser);
        console.log(editUser);
    }
    const showAdmin = () => {
        setAdminShow(!adminShow);
        console.log(adminShow);
    }
    const conUser = () => {
        const user = {
            username: username,
            password: password
        }
        if(account.username == username){
            alert('username already')
        }
        else if(username.length < 6){
            alert('username less than 6 character')
        }
        else{
            alert('change username success!')
            account.push(user)
            console.log(account.username);
            setEditUser(editUser === false);
            console.log(editUser);
        }
    }
    const showPass = () => {
        setshowPassword(!showPassword);
    }
    const changePass = () => {
        setEditPass(!editPass);
        console.log(editPass);
    }
    const confirmPass = () => {
        if(account.password != password){
            alert('password dont match')
        }
        else if(account.password == newPassword || account.password == rePassword) {
            alert('dont use same password')
        }
        else if(newPassword != rePassword) {
            alert('newpassword and repassword dont match')
        }
        else if(newPassword.length < 6 || rePassword.length < 6) {
            alert('newpassword or repassword less than 6 character')
        }
        else{
            alert('change password success!')
            router.push('/home')
            localStorage.setItem('password',newPassword)
        }
        console.log(password,newPassword,rePassword,account.password)
    }
    const logout = () => {
        localStorage.removeItem('account');
        alert('logout!')
        router.push('/login')
    }
    const deleteProfile = () => {
        console.log(users.id);
    }
    return (
        <Row justify="space-around" align="middle" className='container'>
            <Col span={10}>
            <h1 className="home-topic">Profile</h1>
            <div className="home-username">
                <Avatar size={70} icon={<UserOutlined />} />
                <h1 className="profile-username">username: { editUser ? <input type="text" onChange={ (e) => setUsername(e.target.value)}/> : <p>{account.username}</p>} </h1>
                <button onClick={changeUser}>Edit</button>
            {editUser === true && <button onClick={conUser}>confirm</button>}
            </div>
            <div className="home-password">
            <h1>password: { showPassword ? <input type="name" value={account.password} disabled/> : <input type="password" value={account.username} disabled/>}</h1>
            { editPass === true && (
                <div>
                    password:<Input type="password" name="old_password" min="6" required onChange={ (e) => setPassword(e.target.value)} />
                    new-password:<Input type="password" name="password" min="6" required onChange={ (e) => setNewPassword(e.target.value)}/>
                    new-repassword<Input type="password" name="re_password" min="6" required onChange={ (e) => setRePassword(e.target.value)}/>
                    <button onClick={confirmPass}>confirm</button>
                </div>
            )}
            <button onClick={showPass}>Show</button>
            <button onClick={changePass}>Edit</button>
            <button onClick={logout}>logout</button>
            </div>
            {
                account.username === "admintest" ? <button onClick={showAdmin}>Show Profile</button>:null
            }
            {adminShow === true && (
                // users.map((user:any,index:number)=>{
                //     <div>
                //         <h1>{user.id}</h1>
                //         <h1>{user.username}</h1>
                //         <h1>{user.password}</h1>
                //     </div>
                // })
                // <h1>asdfsdaf</h1>
                <div>
                    {/* {
                        users.map((user:any,index:number)=>{
                            <h1>{user.username}</h1>
                        })
                    } */}
                    {
                        users.map((user:any,index:number)=>{
                            return (
                                <div key={index}>
                                    <h1>id : {user.id}</h1>
                                    <h1>username : {user.username}</h1>
                                    <h1>password : {user.password}</h1>
                                    <button onClick={() => deleteProfile(users)}> Delete </button>
                                </div>
                            )
                        })
                    }
                </div>
            )}
            </Col>
        </Row>
    )
}
