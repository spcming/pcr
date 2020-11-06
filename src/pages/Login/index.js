import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';

import MM from 'util/MM'
import DropDownMenu from 'modules/DropDownMenu'

import './index.css'

const _mm = new MM()

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username:'',
            password:''
        }
    }

    // 输入用户名/密码
    handleInputChange(e){
        let name = e.target.name,
            value = e.target.value
        this.setState({
            [name]:value
        })
    }

    // 对于回车的相应
    handleKeyUp(e){
        if(e.keyCode == 13){
            this.login()
        }
    }
    // 登陆
    async login(){
        if(!this.state.username){
            alert('用户名不能为空！')
        }else if(!this.state.password){
            alert('密码不能为空！')
        }else {

            // 异步请求，登陆
            let success = await _mm.login(this.state.username,this.state.password)
            if(success) {
                window.history.back()
            }
        }
    }

    // 注册
    register(){
        this.props.history.push('/pageRegister')
    }

    render() {
        return (
            <Form name="basic" className="login-form" >
                <DropDownMenu />
                <Form.Item
                    label="用户名"
                    className="login-from-item"
                    >
                    <Input placeholder="请输入用户名" 
                        name="username"
                        onChange={(e)=>{this.handleInputChange(e)}}
                        onKeyUp={(e)=>{this.handleKeyUp(e)}}/>
                </Form.Item>

                <Form.Item
                    label="密码"
                    className="login-from-item"
                    >
                    <Input.Password placeholder = "请输入密码"
                        name="password"
                        onChange={(e)=>{this.handleInputChange(e)}}
                        onKeyUp={(e)=>{this.handleKeyUp(e)}}/>
                </Form.Item>

                <Form.Item>
                    <Button className="login-btn" type="primary" onClick={()=>{this.login()}}>
                        登陆
                    </Button>
                    <Button className="register-btn" type="primary" onClick={()=>{this.register()}}>
                        注册
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}



export default Login