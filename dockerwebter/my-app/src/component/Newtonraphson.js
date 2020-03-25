import React,{Component} from 'react'
import axios from 'axios';
import api from './api';
import {parse} from 'mathjs'
import {derivative} from 'mathjs'
import Plot from 'react-plotly.js';
window.$arr_iteration = []
window.$arr_x = []
window.$arr_error = []
window.$x = 0
window.$ans = 0
window.$fx = ""
// Newtonraphson
class Newtonraphson extends Component {
  constructor(props)
  {
      super(props);
      this.state = { users: "",
                     fx: "",
                     x: 0,
                     update: 0
                    };
  }
  componentDidMount = async () => {
    await api.getnewton().then(res => {
     window.$x = res.data.data[0].x
       window.$fx = res.data.data[0].fx
       this.setState({update:this.state.update++});
    })
}
  newtonraphson = () => {
    window.$arr_iteration = []
    window.$arr_x = []
    window.$arr_error = []
    const f = (fx, value) => parse(fx).evaluate({ x: value });
    const error = (x,x0) => Math.abs((x - x0) / x)  
    const f1= (fx, value) => derivative(parse(fx),'x').evaluate({ x: value });
    var x1 = 0
    var x0 =  window.$x
    var i = 0
    var e = 0
    while (i < 1 || error(x1,x0) > 0.000001){
      if(i>0){
        x0 = x1
      }
      x1 = x0 - (parseFloat(f(window.$fx,x0))/parseFloat(f1(window.$fx,x0)))
      window.$arr_iteration.push(i)
      window.$arr_x.push(x1.toFixed(6))
      window.$arr_error.push(error(x1,x0).toFixed(6))
      i++
  }      
  window.$ans = x1.toFixed(6)
  this.setState({update: this.state.update++});
  }
  createTable = () => {
    console.log("intable")
    let table = []
    for (let i = -1; i < window.$arr_iteration.length; i++) {
      let children = []
      if(i == -1){
        children.push(
            <th>iteration</th>,
            <th>x</th>,
            <th>error</th>)
      }else{
        children.push(
            <td>{window.$arr_iteration[i]}</td>,
            <td>{window.$arr_x[i]}</td>,
            <td>{window.$arr_error[i]}</td>)
      }
      table.push(<tr>{children}</tr>)
    }
    return table
  }



  render() {
    return(
    <div>

    <h3>numer</h3>
    <div><h3>X : </h3></div>
   <h3><input onChange={(event)=>{window.$x = event.target.value;console.log(window.$x)}}/></h3>
   <div><h3>funtion : </h3></div>
   <h3><input onChange={(event)=>{window.$fx = event.target.value;console.log(window.$fx)}}/></h3>
   <button onClick = {this.newtonraphson}> click </button>
   <br/>
      <h3>database </h3>
    <button onClick = {this.newtonraphson}> x : {window.$x}  <br/> fx : {window.$fx}</button>
   <div>
       <table> 
            {this.createTable()}
       </table>
   </div>
   <div class="container">
            <Plot className="graph"
                data={[
                {
                   x: window.$arr_iteration,
                   y: window.$arr_error
                }
                ]}
            />
        </div>
    </div>
   )
  }
}
export default Newtonraphson;
