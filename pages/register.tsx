import { Form, Input, InputNumber, Button } from "antd";
import { useRouter } from 'next/router'
import { Row, Col } from 'antd';


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

interface ILoginForm {
    username: string
    password: string
    re_password: string
}

export default function Register() {
    const router = useRouter()
    const onFinish = (values: ILoginForm) => {
        const username = values.username;
        const password = values.password;
        const re_password = values.re_password;
        
        if(password != re_password){
            alert(`password and re-password don't match`)
        }
        else {
            let loginPage = true;
            const user = {
                id: Math.floor(Math.random()*100),
                username: username,
                password: password
            };
            const users = JSON.parse(localStorage.getItem("users") || "[]");
            users.map((user:any, index:number) =>{
                if(username === user.username) {
                    loginPage = false;
                }
            });
            if(loginPage == true) {
                users.push(user);
                localStorage.setItem("users", JSON.stringify(users));
                alert('Register success!')
                router.push('/login')
            }
            else if ( loginPage == false) {
                alert('username already')
                console.log(`fail: userid:${user.id} , username:${user.username}`);
            }
            console.log(loginPage);      
        }        
    };

    const loginFunc = () => {
        router.push('/login')
    }

    return (
        
        <Row justify="space-around" align="middle" className='container'>
            <Col span={8}>
                <h1 className="regis-topic">Register</h1>
                <Form onFinish={onFinish} className="form-register">
                    <Form.Item  name={'username'} label="username" rules={[{ required: true, min: 6 }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={'password'} label="password" rules={[{ required: true, min: 6 }]}>
                        <Input type="password"/>
                    </Form.Item>
                    <Form.Item name={'re_password'} label="re-password" rules={[{ required: true, min: 6 }]}>
                        <Input type="password"/>
                    </Form.Item>
                    <div className="regis-button">
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">Register</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={loginFunc}>login</Button>
                    </Form.Item>
                    </div>
                </Form>
            </Col>
        </Row>
    
        
    )
}
