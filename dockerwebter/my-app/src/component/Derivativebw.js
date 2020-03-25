import React,{Component} from 'react'
import axios from 'axios';
import api from './api';
import {parse} from 'mathjs'
import {derivative} from 'mathjs'
import{pow} from 'mathjs'
import Plot from 'react-plotly.js';
window.$arr_iteration = []
window.$arr_x = []
window.$arr_error = []
window.$x = 0
window.$h = 0
window.$oh = 0
window.$d = 0
window.$fx = ""
// Secant
class Derivativebw extends Component {
  constructor(props)
  {
      super(props);
      this.state = { users: "",
                     fx: "",
                     x: 0,
                     h: 0,
                     d: 0,
                     oh:0,
                     update: 0
                    };
  }
  componentDidMount = async () => {
    await api.getdiff().then(res => {
      window.$fx = res.data.data[0].fx
      window.$x = res.data.data[0].x
       window.$h = res.data.data[0].h
       window.$d = res.data.data[0].d
       window.$oh = res.data.data[0].oh
       this.setState({update:this.state.update++});
    })
 }
  
  Backward = () => {
    window.$arr_iteration = []
    window.$arr_x = []
    window.$arr_error = []
    var ans = 0
        const funtiondiff1 = (fx, value) => derivative(parse(window.$fx), 'x').evaluate({ x: value })
        const funtiondiff2 = (fx, value) => derivative(derivative(parse(window.$fx), 'x'), 'x').evaluate({ x: value })
        const funtiondiff3 = (fx, value) => derivative(derivative(derivative(parse(window.$fx), 'x'), 'x'), 'x').evaluate({ x: value })
        const funtiondiff4 = (fx, value) => derivative(derivative(derivative(derivative(parse(window.$fx), 'x'), 'x'), 'x'), 'x').evaluate({ x: value })
        const funtion = (fx, value) => parse(window.$fx).evaluate({ x: value })
        const error = (xm_new, xm_old) => Math.abs((xm_new - xm_old)/ xm_new)  
        var diff = window.$fx
        var h = window.$h
        var fx = window.fx
        var x = window.$x
        var oh = window.$oh
        var d = window.$d
        console.log("fxdiff  : " + diff)
        if(d == 1){
          diff = funtiondiff1(diff,x).toFixed(6)
          console.log("ans : " + diff)
        }else if(d == 2){
          diff = funtiondiff2(diff,x).toFixed(6)
          console.log("ans : " + diff)
        }else if(d == 3){
          diff = funtiondiff3(diff,x).toFixed(6)
          console.log("ans : " + diff)
        }else if(d == 4){
          diff = funtiondiff4(diff,x).toFixed(6)
          console.log("ans : " + diff)
        }
            
        if(oh == 1){
            if(d == 1){
                ans = (funtion(fx,x) - funtion(fx,x-h))/h
                console.log("ans : " + ans)
            }
            else if(d == 2){
                ans = (funtion(fx,x) - 2*funtion(fx,x-h) + funtion(fx,x-(2*h)))/pow(h,2)
                console.log("ans : " + ans)
            }
            else if(d == 3){
                ans = (funtion(fx,x) - 3*funtion(fx,x-h) + 3*funtion(fx,x-(2*h)) - funtion(fx,x-(3*h)))/pow(h,3)
                console.log("ans : " + ans)
            }
            else if(d == 4){
                ans = (funtion(fx,x) - 4*funtion(fx,x-h) + 6*funtion(fx,x-(2*h)) - 4*funtion(fx,x-(3*h)) + funtion(fx,x-(4*h)))/pow(h,4)
                console.log("ans : " + ans)
            }
        }
        else if(oh == 2){
            if(d == 1){
                ans = (3*funtion(fx,x) - 4*funtion(fx,x-(1*h)) + funtion(fx,x-(2*h)))/(2*h)
            }
            else if(d == 2){
                ans = (2*funtion(fx,x) - 5*funtion(fx,x-(1*h)) + 4*funtion(fx,x-(2*h)) - funtion(fx,x-(3*h)))/pow(h,2)
            }
            else if(d == 3){
                ans = (5*funtion(fx,x) - 18*funtion(fx,x-(1*h)) + 24*funtion(fx,x-(2*h)) - 14*funtion(fx,x-(3*h)) + 3*funtion(fx,x-(4*h)))/(2*pow(h,3))
            }
            else if(d == 4){
                ans = (3*funtion(fx,x) - 14*funtion(fx,x-(1*h)) + 26*funtion(fx,x-(2*h)) - 24*funtion(fx,x-(3*h)) + 11*funtion(fx,x-(4*h)) - 2*funtion(fx,x-(5*h)))/pow(h,4)
            }
        }
       
        console.log("diff : " + diff)
        var e = error(diff,ans).toFixed(6)
        console.log("error : " + e)  
        window.$arr_x.push(ans.toFixed(6))
        window.$arr_error.push(error(parseFloat(diff), parseFloat(ans)).toFixed(6))
  //window.$ans = window.$x.toFixed(6)
  this.setState({update: this.state.update++});
  }
  createTable = () => {
    console.log("intable")
    let table = []
    for (let i = -1; i <= window.$arr_iteration.length; i++) {
      let children = []
      if(i == -1){
        children.push(
            //<th>iteration</th>,
            <th>f'(x)</th>,
            <th>error</th>)
      }else{
        children.push(
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
    <div><h3>funtion : </h3></div>
   <h3>  <input onChange={(event)=>{window.$fx = event.target.value;console.log(window.$fx)}}/></h3>
   <div><h3>X : </h3></div>
   <h3> <input onChange={(event)=>{window.$x = event.target.value;console.log(window.$x)}}/></h3>
   <div><h3>H : </h3></div>
   <h3> <input onChange={(event)=>{window.$h = event.target.value;console.log(window.$h)}}/></h3>
   <div><h3>diff : </h3></div>
   <h3><input onChange={(event)=>{window.$d = event.target.value;console.log(window.$d)}}/></h3>
   <div><h3>O(h) click1  O(h^2) click2: </h3></div>
   <h3><input onChange={(event)=>{window.$oh = event.target.value;console.log(window.$oh)}}/></h3>
   <button onClick = {this.Backward}> click </button>
   <br/>
      <h3>database </h3>
      <button onClick = {this.Backward}> fx : {window.$fx} <br/> x : {window.$x} <br/> h : {window.$h}<br/> d : {window.$d}<br/> oh : {window.$oh}</button>
   <div>
       <table> 
            {this.createTable()}
       </table>
   </div>
   <div class="container">
            <Plot className="graph"
                data={[
                {
                   x: window.$arr_x,
                   y: window.$arr_error
                }
                ]}
            />
        </div>
    </div>
   )
  }
}
export default Derivativebw;