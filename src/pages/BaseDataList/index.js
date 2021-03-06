import React, { Component } from 'react'
import { List, Button, Divider, Input } from 'antd';

import MM from 'util/MM'
import DropDownMenu from 'modules/DropDownMenu'

import './index.css'

const _mm = new MM()
class BaseDataList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            bossItem:'',
            characterItem:'',
            characterData:[],
            bossData:[]
        }
    }
    async componentWillMount(){
        // 判断是否具有管理员权限
        let isManager = await _mm.isManager()
        if(!isManager) {
            this.props.history.push('/pageLogin')
            return
        }
        // 异步请求boss和角色数据
        this.getBossList()
        this.getCharacterList()
    }
    // 获取boss列表
    async getBossList(){
        let bossData = await _mm.request({
            url:'/getBoss'
        })
        this.setState({
            bossData
        })
    }
    // 获取角色列表
    async getCharacterList(){
        let characterData = await _mm.request({
            url:'/getCharacter'
        })
        this.setState({
            characterData
        })
    }
    // 删除boss数据
    async deleteBossItem(item){
        if(window.confirm(`您确定要删除${item}吗？`)){
            // 异步请求，删除boss
            await _mm.request({
                type:'post',
                url:'/deleteBoss',
                data:{
                    bossName:item
                }
            })
            this.getBossList()
        }
    }

    // 删除角色数据
    async deleteCharacterItem(item){
        if(window.confirm(`您确定要删除${item}吗？`)){
            let characterObj = {name:item}
            // 异步请求，删除角色 
            await _mm.request({
                type:'post',
                url:'/deleteCharacter',
                data:characterObj
            })
            this.getCharacterList()
        }
    }

    // 同步添加boss输入框与state
    addBossItem(bossItem){
        this.setState({
            bossItem
        })
    }

    // 同步添加character输入框与state
    addCharacterItem(characterItem){
        this.setState({
            characterItem
        })
    }

    // 相应添加boss的回车
    handleAddBossKey(e){
        if(e.keyCode == 13){
            this.handleAddBossBtn()
        }
    }

    // 相应添加角色的回车
    handleAddCharacterKey(e){
        if(e.keyCode == 13){
            this.handleAddCharacterBtn()
        }
    }

    // 点击添加boss
    async handleAddBossBtn(){
        this.setState({
            bossItem:''
        })
        // 异步请求，添加boss 
        if(!this.state.bossItem){
            return 
        }
        let resMsg = await _mm.request({
            type:'post',
            url:'/addBoss',
            data:{
                bossName:this.state.bossItem
            }
        })
        this.getBossList()
        alert(resMsg.msg)
    }

    // 点击添加角色
    async handleAddCharacterBtn(){
        // 异步请求，添加角色 
        await _mm.request({
            type:'post',
            url:'/addCharacter',
            data:{
                characterName:this.state.characterItem
            }
        })
        this.getCharacterList()
        this.setState({
            characterItem:''
        })
    }

    // 清除boss列表
    async clearBossList(){
        const flag = window.confirm('您确定要删除全部boss的数据吗，此行为不可逆,(需确认三次，第一次确认)') 
            && window.confirm('您确定要删除全部boss的数据吗，此行为不可逆,(需确认三次，第二次确认)')
            && window.confirm('您确定要删除全部boss的数据吗，此行为不可逆,(需确认三次，第三次确认)')
        if(!flag) return false
        // 异步请求，清除boss列表
        await _mm.request({
            url:'/clearBoss'
        })
        this.getBossList()
    }
    render() {
        // 解析boss列表
        // 异步请求，请求boss数据 
        const bossList = this.state.bossData.map((bossItem)=>{
            return bossItem
        })
        
        
        // 解析角色列表
        // 异步请求，请求角色数据
        const characterList = this.state.characterData.map((characterItem)=>{
            return characterItem.name
        })

        // 添加boss的输入框
        const addBossItem = (
            <div>
                <Input style={{width:'70%'}} 
                    value={this.state.bossItem}
                    onChange={(e)=>{this.addBossItem(e.target.value)}}
                    onKeyUp={(e)=>{this.handleAddBossKey(e)}}></Input>
                <Button className="add-btn"
                    onClick={()=>{this.handleAddBossBtn()}}>添加Boss</Button>
            </div>
        )

        // 添加角色的输入框
        const addCharacterItem = (
            <div>
                <Input style={{width:'70%'}}
                    value={this.state.characterItem}
                    onChange={(e)=>{this.addCharacterItem(e.target.value)}}
                    onKeyUp={(e)=>{this.handleAddCharacterKey(e)}}></Input>
                <Button className="add-btn"
                    onClick={()=>{this.handleAddCharacterBtn()}}>添加角色</Button>
            </div>
        )

        return (
            <div>
                <DropDownMenu />
                <div className="base-data-list">
                    <Button className="clear-boss-btn" onClick={()=>{this.clearBossList()}} type="danger" >删除全部boss</Button>
                    <Divider orientation="left">Boss列表</Divider>
                    <List
                        className="list"
                        size="small"
                        bordered
                        dataSource={bossList}
                        footer={addBossItem}
                        renderItem={item => (
                            <List.Item>
                                {item}
                                <Button type="danger" 
                                    className='delete-btn'
                                    onClick={()=>{this.deleteBossItem(item)}}>删除</Button>
                            </List.Item>
                        )}
                        />
                    <Divider orientation="left">角色列表</Divider>
                    <List
                        className="list"
                        size="small"
                        bordered
                        dataSource={characterList}
                        footer={addCharacterItem}
                        renderItem={item => (
                            <List.Item>
                                {item}
                                <Button type="danger" 
                                    className='delete-btn'
                                    onClick={()=>{this.deleteCharacterItem(item)}}>删除</Button>
                            </List.Item>
                        )}
                        />
                </div>
        
            </div>
            )
    }
}


export default BaseDataList