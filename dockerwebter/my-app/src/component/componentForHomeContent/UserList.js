import React, { Component } from "react";
import { Col ,Button } from "antd";

class UserList extends Component {
  render() {
    console.log('userlist : ',this.props);
    const { fisrtname, lastname, email, status } = this.props;
    return (
      <div>
       <Col span={12} style={{marginTop : 20}}>
            <h4>
              Name : {fisrtname} {lastname}
            </h4>
            <p>
              Email : {email}
              <br />
              Status : {status}
              <br />
             
            </p>
            <Button type="primary">Edit</Button>
            <Button type="danger" style={{marginLeft : 20}}>Delete</Button>
          </Col>
      </div>
    );
  }
}
export default UserList;
