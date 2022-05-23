import { Form, Input, Button, Checkbox, Result, Row, Col} from 'antd';
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()
  const onFinish = (values: any) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const username = values.username
  const password = values.password // boolean ** 
  // users.map((user:any,index:number)=>{
  //   if (user.username == username) {
  //     loginPage
  //   }
  //   else{
  //     loginPage = false
  //     console.log('asdf');
      
  //   }
  // })
  const result =  users.filter((user:any)=>{
    return user.username == username && user.password == password
  })
  console.log(result.length);
  if(result.length == 1) {
    alert('login success!') //testlog
    const account:any = {
      username: username,
      password: password
    }
    localStorage.removeItem('account');
    localStorage.setItem('account',JSON.stringify(account));
    router.push('/home')
  }
  else {
    alert('username and password invalid!')
    router.push('/login')
    console.log(username,password);
  }
  
  };
  return (
    <Row justify="space-around" align="middle" className='container'>
      <Col span={8}>
      <h1 className="login-topic">Login</h1>
      <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <div className="login-button">
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      <Form.Item>   
        <Button type="primary" htmlType="submit">
          <Link href="/register">
             Register
          </Link>
        </Button>
      </Form.Item>
      </div>
      
    </Form>
      </Col>
    </Row>
    
  );
}



function localUser(localUser: any) {
  throw new Error('Function not implemented.');
}

