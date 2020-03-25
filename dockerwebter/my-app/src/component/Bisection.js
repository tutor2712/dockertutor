import React,{Component} from 'react'
import axios from 'axios';
import api from './api';
import {parse,range} from 'mathjs'
import Plot from 'react-plotly.js';
window.$arr_iteration = []
window.$arr_x = []
window.$arr_y = []
window.$arr_error = []
window.$xr = 0
window.$xl = 0 
window.$ans = 0
window.$fx = ""
class Bisection extends Component
{
    constructor(props)
    {
        super(props);
        this.state = { users: "",
                       fx: "",
		               f: "",
                       xl: 2,
                       xr: 2,
                       update: 0
                      };
    }

    componentDidMount = async () => {
        await api.getBisection().then(res => {
	       window.$xr = res.data.data[0].xr
           window.$xl = res.data.data[0].xl
           window.$fx = res.data.data[0].fx
           this.setState({update:this.state.update++});
        })
}
     
    
    bisection = () => {
        this.setState({f: window.$fx});
        window.$arr_iteration = []
        window.$arr_x = []
        window.$arr_y = []
        window.$arr_error = []
        // console.log("xl ; " + window.$xl + "xr : " + window.$xr)
        // const funtion = (fx, value) => (value**4)-13
        const funtion = (fx, value) => parse(fx).evaluate({ x: value });
        const error = (xm_new, xm_old) => Math.abs((xm_new - xm_old) / xm_new)  
        const funtionxm = (xl, xr) => (xl + xr) / 2
        var xm_new
        var xm_old
        var XL = window.$xl
        var XR = window.$xr
        var i = 0
        console.log("in " + funtionxm(parseFloat(XL),parseFloat(XR)))
        console.log("in " + funtion(window.$fx,parseFloat(XL)))
        while (i <= 1 || error(xm_new, xm_old) > 0.000001){
            xm_old = xm_new
            xm_new = funtionxm(parseFloat(XL), parseFloat(XR))
            if ( funtion(window.$fx, parseFloat(xm_new)) * funtion(window.$fx, parseFloat(XL)) > 0){
                XL = xm_new
            } else {
                XR = xm_new
            }
            window.$arr_iteration.push(i)
            window.$arr_x.push(xm_new.toFixed(6))
            window.$arr_y.push(funtion(window.$fx, parseFloat(xm_new)).toFixed(6))
            window.$arr_error.push(error(parseFloat(xm_new), parseFloat(xm_old)).toFixed(6))
            i++
        }      
        window.$ans = xm_new.toFixed(6)
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
                <th>xm</th>,
                <th>f(xm)</th>,
                <th>error</th>)
          }else{
            children.push(
                <td>{window.$arr_iteration[i]}</td>,
                <td>{window.$arr_x[i]}</td>,
                <td>{window.$arr_y[i]}</td>,
                <td>{window.$arr_error[i]}</td>)
          }
          table.push(<tr>{children}</tr>)
        }
        return table
      }

    render()
    {
	const fx = this.state.f
        const xans = window.$ans
        const yans = parse(fx).evaluate({ x: xans })
        const x = range(-10, 10, 0.5).toArray()
		const y = x.map(function (x) {
			return  parse(fx).evaluate({ x: x })
        }) 
        console.log("x : " + x)  
        console.log("y : " + y)    
        const trace1 = {
            x: x,
            y: y,
            mode: 'lines+markers',
            name: 'function'
        };

        const trace2 = {
            x: [xans],
            y: [yans],
            mode: 'markers',
            name: 'ans'
        };
        console.log("in state : ",this.state.users);
        return(
            <div>

               <h3>numer</h3>
               <div><h3>XL : </h3></div>
               <h3><input onChange={(event)=>{window.$xl = event.target.value;console.log(window.$xl)}}/></h3>
               <div><h3>XR : </h3></div>
               <h3><input onChange={(event)=>{window.$xr = event.target.value;console.log(window.$xr)}}/></h3>
               <div><h3>funtion : </h3></div>
               <h3><input onChange={(event)=>{window.$fx = event.target.value;console.log(window.$fx)}}/></h3>
               <br/>
               <button onClick = {this.bisection}> click </button>
               <br/>
               <h3>database </h3>
               <button onClick = {this.bisection}> xl : {window.$xl} <br/> xr : {window.$xr} <br/> fx : {window.$fx}</button>
              
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

			<Plot className="graph"
                            data = {[ trace1 , trace2 ]}
                        />

                    </div>
            </div>
            // <div>/<div/>
        )
    }
}
export default Bisection;