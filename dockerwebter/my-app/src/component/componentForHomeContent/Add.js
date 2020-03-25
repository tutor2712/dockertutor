import React, { Component } from 'react'
import { Input,Button } from 'antd';
import axios from 'axios';
export default class Add extends Component {
    
    constructor(props)
    {
        super(props);
        this.state ={
            firstname:null,
            lastname:null,
            email:null,
            status:null
        }
    }

    sendDatatoDB = ()=>{
        axios.post('http://localhost:3001/api/users/addUser',{firstname:this.state.firstname,lastname:this.state.lastname,email:this.state.email,status:this.state.status})
        .then(res=>{
            console.log(res);
        })
    }

    render()
    {
        return(
            <div style={{width:250}}>
                    <div>
                        FISRTNAME : <Input placeholder="FISRTNAME" onChange={e=>this.setState({firstname:e.target.value})}/>
                    </div>
                    <div>
                        LASTNAME : <Input placeholder="LASTNAME" onChange={e=>this.setState({lastname:e.target.value})}/>
                    </div>
                    <div>
                        Email : <Input placeholder="Email" onChange={e=>this.setState({email:e.target.value})}/>
                    </div>
                    <div>
                        Status : <Input placeholder="Status" onChange={e=>this.setState({status:e.target.value})}/>
                    </div>
                    <br/>
                    <Button type="danger" onClick={this.sendDatatoDB}>Add</Button>
            </div>
        )
    }
}
