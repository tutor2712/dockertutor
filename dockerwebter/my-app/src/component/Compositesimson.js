import React,{Component} from 'react'
import axios from 'axios';
import api from './api';
import {parse,range} from 'mathjs'
import Plot from 'react-plotly.js';
import {integral} from 'algebrite';
window.$arr_iteration = []
window.$arr_x = []
window.$arr_y = []
window.$arr_error = []
window.$range = 0
window.$start = 0
window.$stop = 0
window.$ans = 0
window.$fx = ""
class Compositesimson extends Component
{
    constructor(props)
    {
        super(props);
        this.state = { users: "",
                       fx: "",
		               f: "",
                       start: 2,
                       stop: 2,
                       range:2,
                       update: 0
                      };
    }
    componentDidMount = async () => {
        await api.getcomposite().then(res => {
          window.$fx = res.data.data[0].fx
	       window.$range = res.data.data[0].range
           window.$start = res.data.data[0].start
           window.$stop = res.data.data[0].stop
           this.setState({update:this.state.update++});
        })
}

    re = ()=>{
        this.setState({update: this.state.update++});
    }
     
    
    CompositesimsonRule = () => {
        this.setState({f: window.$fx});
        window.$arr_iteration = []
        window.$arr_x = []
        window.$arr_y = []
        window.$arr_error = []
        var next = window.$start
        var h = (window.$stop - window.$start)/(2*window.$range)
        window.$l = 0
        window.$error = 0
        var range = 0
        var sum = 0 
        var value = 0
        var size = parseInt(window.$range)+1
        console.log("size : " + size)
        window.$arr_range = [Array(size)].map(e => Array(size).fill(value))
        console.log("arrerror : " + window.$arr_range)
        for(var i=0 ; i<size ; i++){
            if(i==0){
                window.$arr_range[i] = next
            }else{
                next += h
                window.$arr_range[i] = next
            }
        }
        console.log("arrerror : " + window.$arr_range)
        const funtion = (fx, value) => parse(fx).evaluate({ x: value });
        const error = (xm_new, xm_old) => Math.abs((xm_new - xm_old) / xm_new)
        for(var i=0 ; i<size ; i++){
            if(i==0 || i==size-1){
                console.log("f : " + funtion(window.$fx, parseFloat(window.$arr_range[i])))
                sum += funtion(window.$fx, parseFloat(window.$arr_range[i]))
                console.log("f0 : " + window.$fx)
                console.log("sum : " + sum)
            }else if(i%2 == 0){
                console.log("f : " + funtion(window.$fx, parseFloat(window.$arr_range[i])))
                sum += 2*(funtion(window.$fx, parseFloat(window.$arr_range[i])))
                console.log("f2 : " + window.$fx)
                console.log("sum : " + sum)
            }else if(i%2 == 1){
                console.log("f : " + funtion(window.$fx, parseFloat(window.$arr_range[i])))
                sum += 4*(funtion(window.$fx, parseFloat(window.$arr_range[i])))
                console.log("f4 : " + window.$fx)
                console.log("sum : " + sum)
            }
        }
        window.$ans =  (((window.$stop - window.$start)/(2*window.$range))/3)*sum
        console.log("l : " + window.$ans)
        var fx = integral(window.$fx).toString()
        var start = funtion(fx,window.$start)
        var stop = funtion(fx,window.$stop)
        window.$real = stop - start
        window.$error = error(window.$real,window.$ans).toFixed(6)
        this.setState({update: 1});
        
      }

      createTable = () => {
        console.log("intable")
    let table = []
    for (let i = -1; i <= window.$arr_iteration.length; i++) {
      let children = []
      if(i == -1){
        children.push(
            //<th>iteration</th>,
            <th>ANS</th>,
            
            <th>error</th>)
      }else{
        children.push(
            <td>{window.$ans}</td>,
            <td>{window.$error}</td>)
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
            
                       <div><h3>funtion : </h3></div>
                       <div><input onChange={(event) => {window.$fx = event.target.value;this.setState({update: this.state.update++})}}/></div>
                       <div><h3>range :</h3></div>
                        <div><input onChange={(event) => {window.$range = event.target.value;this.setState({update: this.state.update++})}}/></div>
                        <div><h3>start :</h3></div>
                        <div><input onChange={(event) => {window.$start = parseInt(event.target.value);this.setState({update: this.state.update++})}}/></div>
                        <div><h3>stop :</h3></div>
                        <div><input onChange={(event) => {window.$stop = parseInt(event.target.value);this.setState({update: this.state.update++})}}/></div>
                        <br/>
                        <button onClick = {this.CompositesimsonRule}> click </button>
                        <br/>
                      <h3>database </h3>
                     <button onClick = {this.CompositesimsonRule}> fx : {window.$fx} <br/> range : {window.$range} <br/> start : {window.$start} <br/> stop : {window.$stop}</button>
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
export default Compositesimson;