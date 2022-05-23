import React from 'react'
import { useRouter } from 'next/router'
import { Row, Col, Button, Pagination  } from 'antd';

function AdminDetail() { 
    const [user, setUser] = React.useState<any[]>([]);
    const [filter, setFilter] = React.useState<any[]>([]);
    const router = useRouter();
    const {username} = router.query;
    

    React.useEffect(() => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const filterUser = users.filter((user:any)=>{
              return username === user.username
        })
        setUser(filterUser)
    }, []);

    console.log(user[0]?.id);

    const backAdmin = () => {
        var r = confirm("Go to Admin page")
        if(r == true) {
            router.push('/admin')
        }
    }

    const deleteProfile = (result:any) => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        console.log(result);
        // const newUser =  user.filter((user:any)=>{
        //     return result.id !== user.id
        // })
        const userFilter = users.filter((user:any)=>{
            return result[0].id !== user.id
        })
        console.log(userFilter);
        
        // console.log(newUser);
        
        var r = confirm("Sure for delete?");
        if(r == true) {
            localStorage.setItem("users", JSON.stringify(userFilter));
            alert(`delete " Username : ${result[0].username} " success!`)
            router.push('/admin')
        }
    }

    // React.useEffect(()=>{
    //     const users = JSON.parse(localStorage.getItem("users") || "[]");
    //     setUser(users);
    //     filterUser();
    // },[])

    // const filterUser = () => {
    //     let i;
    //     for (i=0;i<=2;i++){
    //         const filter = user.filter((user:any)=>{
    //             return username === user.username;
    //         })
    //     }
    //     console.log(filter);
    //     console.log(username);
    // }

    const changeUser = (result:any) =>{
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        // let loginPage = true;
        const mapUser = users.map((user:any,index:number)=>{
            return user.username
        })
        
        let person = prompt("Change username :");
        const personUser = mapUser.includes(person)  
        console.log(personUser);
        

        if (person == null || person == "") {
            alert(`Please input username`)
        } 
        else if (person.length <= 5) {
            alert('Please input more than 5 letter')
        }
        else if (person === result[0].username) {
            alert('dont use same username')
        }
        else if(personUser === true) {
            alert('username already')
        }
        else {
            // const mapUser = users.map((user:any, index:number) =>{
            //     if (person === user.username) {
            //         loginPage == false
            //     }
            // });
            // if (loginPage == false) {

            // }
           
            var r = confirm("Sure for change username");
            if(r == true) {
                const users = JSON.parse(localStorage.getItem("users") || "[]");

                const userFilter = users.filter((user:any)=>{
                    return result[0].id !== user.id
                })
                localStorage.setItem("users", JSON.stringify(userFilter));
                
                const nUser = JSON.parse(localStorage.getItem("users") || "[]");
                const newUser = {
                    id: result[0].id,
                    username: person,
                    password: result[0].password
                };
                nUser.push(newUser);
                localStorage.setItem("users", JSON.stringify(nUser));
                router.push('/admin')
            }
            
        }
    }

    
  
    return (
        
        
        <Row justify="space-around" align="middle" className="admin-container">
            <Col span={8}>
                <h1>ID: {user[0]?.id}</h1>
                <h1>Username: {user[0]?.username}</h1>
                <Button onClick={() => changeUser(user)}>Change username</Button>
                <h1>Password: {user[0]?.password}</h1>
                <Button type="primary" onClick={backAdmin}>Back</Button>
                <Button type="primary" onClick={() => deleteProfile(user)} danger>Delete</Button>
            </Col>

        </Row>


    )

}

export default AdminDetail

