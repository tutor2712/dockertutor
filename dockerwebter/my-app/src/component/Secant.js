import React,{Component} from 'react'
import axios from 'axios';
import api from './api';
import {parse} from 'mathjs'
import {derivative} from 'mathjs'
import Plot from 'react-plotly.js';
window.$arr_iteration = []
window.$arr_x = []
window.$arr_x0 = []
window.$arr_error = []
window.$x = 0
window.$x0 = 0
window.$ans = 0
window.$fx = ""
// Secant
class Secant extends Component {
  constructor(props)
  {
      super(props);
      this.state = { users: "",
                     fx: "",
                     x: 0,
                     x0: 0,
                     update: 0
                    };
  }
  componentDidMount = async () => {
    await api.getsecant().then(res => {
      window.$x0 = res.data.data[0].x0
     window.$x = res.data.data[0].x
       window.$fx = res.data.data[0].fx
       this.setState({update:this.state.update++});
    })
}
  secant = () => {
    window.$arr_iteration = []
    window.$arr_x = []
    window.$arr_x0 = []
    window.$arr_error = []
    const f = (fx, value) => parse(fx).evaluate({ x: value });
    const error = (x,x0) => Math.abs((window.$x - window.$x0) / x)  
    const f1= (x0, x) =>(f(window.$fx,parseFloat(window.$x0))-f(window.$fx,parseFloat(window.$x)))/(parseFloat(window.$x0)-parseFloat(window.$x))
    
    
   // console.log(window.$x)
    //console.log(f(window.$fx,window.$x0))
   // console.log(f(window.$fx,window.$x))
    //console.log(window.$x)
    //console.log(f1(window.$x0,window.$x))
    var n = 0
    var i = 0
    var er1
    var er2
    while (i <= 1 || error(window.$x,window.$x0) > 0.000001){
      n = parseFloat(f1(parseFloat(window.$x0),parseFloat(window.$x)))
      window.$x0 = window.$x
      window.$x  = window.$x-(parseFloat(f(window.$fx,window.$x0))/n)
      console.log(window.$x)
      console.log(window.$x0)
      window.$arr_iteration.push(i)
      window.$arr_x.push(n.toFixed(6))
      window.$arr_error.push(error(window.$x,window.$x0).toFixed(6))

      i++
  }      
  //window.$ans = window.$x.toFixed(6)
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
            <th>f'(x)</th>,
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
    <div><h3>X0 : </h3></div>
   <h3> <input onChange={(event)=>{window.$x0 = event.target.value;console.log(window.$x0)}}/></h3>
   <div><h3>X : </h3></div>
   <h3> <input onChange={(event)=>{window.$x = event.target.value;console.log(window.$x)}}/></h3>
   <div><h3>funtion : </h3></div>
   <h3> <input onChange={(event)=>{window.$fx = event.target.value;console.log(window.$fx)}}/></h3>
   <button onClick = {this.secant}> click </button>
   <br/>
      <h3>database </h3>
      <button onClick = {this.secant}> x0 : {window.$x0} <br/> x : {window.$x} <br/> fx : {window.$fx}</button>
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
export default Secant;