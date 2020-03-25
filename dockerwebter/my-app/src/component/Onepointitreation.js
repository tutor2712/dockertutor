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
class Onepointitreation extends Component {
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
  onepointitreation = () => {
    window.$arr_iteration = []
    window.$arr_x = []
    window.$arr_error = []
    const f = (fx, value) => parse(fx).evaluate({ x: value });
    const error = (x,x0) => Math.abs((x - x0) / x)  
    var xmnew
    var xmold =  window.$x
    //console.log(x1)
    //console.log(f(window.$fx,x1))
    var i = 0
    while (i < 1 || error(xmnew,xmold) > 0.000001){
    if(i>0){
        xmold = xmnew
    }
      
    xmnew =  parseFloat(f(window.$fx,xmold))
      window.$arr_iteration.push(i)
      window.$arr_x.push(parseFloat(xmnew.toFixed(6)))
      window.$arr_error.push(error(xmnew,xmold).toFixed(6))
      i++
  }      
 // window.$ans = x1.toFixed(6)
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
   <h3>  <input onChange={(event)=>{window.$x = event.target.value;console.log(window.$x)}}/></h3>
   <div><h3>funtion : </h3></div>
   <h3> <input onChange={(event)=>{window.$fx = event.target.value;console.log(window.$fx)}}/></h3>
   <button onClick = {this.onepointitreation}> click </button>
   <br/>
      <h3>database </h3>
    <button onClick = {this.onepointitreation}> x : {window.$x}  <br/> fx : {window.$fx}</button>
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
export default Onepointitreation;