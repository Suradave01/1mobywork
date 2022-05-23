import React from 'react'
import { useRouter } from 'next/router'
import { Row, Col, Table, Button, Space, Pagination } from 'antd';


function Admintable() {

    const [user, setUser] = React.useState<any[]>([]);
    const router = useRouter()


    React.useEffect(() => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        setUser(users)
    }, []);

    const dataUser = user.map((user:any,index:number)=>{
        return user;
    })

    const editProfile = (result:any) => {
        var r = confirm("Go to Edit profile")
        if(r == true) {
            router.push({
                pathname: '/admin/[username]',
                query: {username: result.username}
            })
        }
    }

    const deleteProfile = (result:any) => {
        console.log(result);
        
        const newUser =  user.filter((user:any)=>{
            return result.id !== user.id
        })
        
        var r = confirm("Sure for delete?");
        if(r == true) {
            localStorage.setItem("users", JSON.stringify(newUser));
            setUser(newUser)
            alert(`delete " Username : ${result.username} " success!`)
        }
        
    }

    const columns = [
        {
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Username',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: 'Password',
          dataIndex: 'password',
          key: 'password',
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'id',
            // eslint-disable-next-line react/display-name
            render: (text:any, record:any) => {
                console.log(text,record);
                return <Space size="middle">
                <Button type="primary" onClick={() => editProfile(record)}>Edit</Button>
                <Button danger type="primary" onClick={() => deleteProfile(record)}>Delete</Button>
              </Space>
            },
          },
        
      ];
      
    
    return (
        
        <Row justify="space-around" align="middle" className="admin-container">
            <Col span={16}>
                <h1>ADMIN</h1>
                <Table dataSource={dataUser} columns={columns} />;
            </Col>
        </Row>
        
    )
}

export default Admintable
