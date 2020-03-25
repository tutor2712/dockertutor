import React, { Component } from 'react'
import UserList from './UserList'
export default class Delete extends Component {
    showUser = ()=>{
        if(this.props.users)
        {
            console.log("props in ShowUser : ",this.props.users);
            return this.props.users.map(user=>(
                <UserList key ={user._id} {...user}/>
            ))



        }
    }
    render()
    {
        return(
            <div>
                {this.showUser()}
            </div>
        )
    }
}
