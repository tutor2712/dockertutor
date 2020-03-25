import React,{Component} from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import Bisection from './component/Bisection';
import Add from './component/componentForHomeContent/Add';
import Delete from './component/componentForHomeContent/Delete';
import Falseposition from './component/Falseposition';
import Newtonraphson from './component/Newtonraphson';
import Derivativebw from './component/Derivativebw';
import Derivativefw from './component/Derivativefw';
import Derivativecentrol from './component/Derivativecentrol';
import Secant from './component/Secant';
import Onepointitreation from './component/Onepointitreation';
import Compositetrapezoidel from './component/Compositetrapezoidel';
import Compositesimson from './component/Compositesimson';
import axios from 'axios';
import {Link} from 'react-router-dom'

class App extends Component
{
  
  constructor(props)
  {
    super(props);
    this.state = {
      BisectionPage : false,
      addPage:false,
      deletePage:false,
      FalsepositionPage:false,
      NewtonraphsonPage:false,
      SecantPage:false,
      OnepointitreationPage:false,
      DerivativebwPage:false,
      DerivativefwPage:false,
      DerivativecentrolPage:false,
      CompositetrapezoidelPage:false,
      CompositesimsonPage:false
    };
  }



  openBisectionPage = ()=>{
      this.setState({
        BisectionPage : true,
        addPage:false,
        deletePage:false,
        FalsepositionPage:false,
        NewtonraphsonPage:false,
        SecantPage:false,
        OnepointitreationPage:false,
        DerivativebwPage:false,
        DerivativefwPage:false,
        DerivativecentrolPage:false,
        CompositetrapezoidelPage:false,
        CompositesimsonPage:false
      })
  }


  openAddPage = ()=>{
    this.setState({
      BisectionPage :false,
      addPage:true,
      deletePage:false,
      FalsepositionPage:false,
      NewtonraphsonPage:false,
      SecantPage:false,
      OnepointitreationPage:false,
      DerivativebwPage:false,
      DerivativefwPage:false,
      DerivativecentrolPage:false,
      CompositetrapezoidelPage:false,
      CompositesimsonPage:false
    })
  }

  openDeletePage = ()=>{
    this.setState({
      BisectionPage :false,
      addPage:false,
      deletePage:true,
      FalsepositionPage:false,
      NewtonraphsonPage:false,
      SecantPage:false,
      OnepointitreationPage:false,
      DerivativebwPage:false,
      DerivativefwPage:false,
      DerivativecentrolPage:false,
      CompositetrapezoidelPage:false,
      CompositesimsonPage:false
    })
  }
  openFalsepositionPage = ()=>{
    this.setState({
      BisectionPage :false,
      addPage:false,
      deletePage:false,
      FalsepositionPage:true,
      NewtonraphsonPage:false,
      SecantPage:false,
      OnepointitreationPage:false,
      DerivativebwPage:false,
      DerivativefwPage:false,
      DerivativecentrolPage:false,
      CompositetrapezoidelPage:false,
      CompositesimsonPage:false
    })
  }
  openNewtonraphsonPage = ()=>{
    this.setState({
      BisectionPage :false,
      addPage:false,
      deletePage:false,
      FalsepositionPage:false,
      NewtonraphsonPage:true,
      SecantPage:false,
      OnepointitreationPage:false,
      DerivativebwPage:false,
      DerivativefwPage:false,
      DerivativecentrolPage:false,
      CompositetrapezoidelPage:false,
      CompositesimsonPage:false
    })
  }
  openSecantPage = ()=>{
    this.setState({
      BisectionPage :false,
      addPage:false,
      deletePage:false,
      FalsepositionPage:false,
      NewtonraphsonPage:false,
      SecantPage:true,
      OnepointitreationPage:false,
      DerivativebwPage:false,
      DerivativefwPage:false,
      DerivativecentrolPage:false,
      CompositetrapezoidelPage:false,
      CompositesimsonPage:false
    })
  }
  openOnepointitreationPage = ()=>{
    this.setState({
      BisectionPage :false,
      addPage:false,
      deletePage:false,
      FalsepositionPage:false,
      NewtonraphsonPage:false,
      SecantPage:false,
      OnepointitreationPage:true,
      DerivativebwPage:false,
      DerivativefwPage:false,
      DerivativecentrolPage:false,
      CompositetrapezoidelPage:false,
      CompositesimsonPage:false
    })
  }
  openDerivativebwPage = ()=>{
    this.setState({
      BisectionPage :false,
      addPage:false,
      deletePage:false,
      FalsepositionPage:false,
      NewtonraphsonPage:false,
      SecantPage:false,
      OnepointitreationPage:false,
      DerivativebwPage:true,
      DerivativefwPage:false,
      DerivativecentrolPage:false,
      CompositetrapezoidelPage:false,
      CompositesimsonPage:false
    })
  }
  openDerivativefwPage = ()=>{
    this.setState({
      BisectionPage :false,
      addPage:false,
      deletePage:false,
      FalsepositionPage:false,
      NewtonraphsonPage:false,
      SecantPage:false,
      OnepointitreationPage:false,
      DerivativebwPage:false,
      DerivativefwPage:true,
      DerivativecentrolPage:false,
      CompositetrapezoidelPage:false,
      CompositesimsonPage:false
    })
  }
  openDerivativecentrolPage = ()=>{
    this.setState({
      BisectionPage :false,
      addPage:false,
      deletePage:false,
      FalsepositionPage:false,
      NewtonraphsonPage:false,
      SecantPage:false,
      OnepointitreationPage:false,
      DerivativebwPage:false,
      DerivativefwPage:false,
      DerivativecentrolPage:true,
      CompositetrapezoidelPage:false,
      CompositesimsonPage:false
    })
  }
  openCompositetrapezoidelPage = ()=>{
    this.setState({
      BisectionPage :false,
      addPage:false,
      deletePage:false,
      FalsepositionPage:false,
      NewtonraphsonPage:false,
      SecantPage:false,
      OnepointitreationPage:false,
      DerivativebwPage:false,
      DerivativefwPage:false,
      DerivativecentrolPage:false,
      CompositetrapezoidelPage:true,
      CompositesimsonPage:false
    })
  }
  openCompositesimsonPage = ()=>{
    this.setState({
      BisectionPage :false,
      addPage:false,
      deletePage:false,
      FalsepositionPage:false,
      NewtonraphsonPage:false,
      SecantPage:false,
      OnepointitreationPage:false,
      DerivativebwPage:false,
      DerivativefwPage:false,
      DerivativecentrolPage:false,
      CompositetrapezoidelPage:false,
      CompositesimsonPage:true
    })
  }

  render()
  {
    let renderComponent = <Add/>;

    if(this.state.BisectionPage)
    {
      renderComponent = <Bisection/>;
    }
    if(this.state.addPage)
    {
      renderComponent = <Add/>
    }
    if(this.state.deletePage)
    {
      renderComponent =<Delete/>
    }
    if(this.state.FalsepositionPage)
    {
      renderComponent =<Falseposition/>
    }
    if(this.state.NewtonraphsonPage)
    {
      renderComponent =<Newtonraphson/>
    }
    if(this.state.SecantPage)
    {
      renderComponent =<Secant/>
    }
    if(this.state.OnepointitreationPage)
    {
      renderComponent =<Onepointitreation/>
    }
    if(this.state.DerivativebwPage)
    {
      renderComponent =<Derivativebw/>
    }
    if(this.state.DerivativefwPage)
    {
      renderComponent =<Derivativefw/>
    }
    if(this.state.DerivativecentrolPage)
    {
      renderComponent =<Derivativecentrol/>
    }
    if(this.state.CompositetrapezoidelPage)
    {
      renderComponent =<Compositetrapezoidel/>
    }
    if(this.state.CompositesimsonPage)
    {
      renderComponent =<Compositesimson/>
    }
    const { Header, Content, Footer } = Layout;
    return(
      <div>
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
              <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="1" onClick={this.openAddPage}>Home</Menu.Item>
                <Menu.Item key="2" onClick={this.openBisectionPage}>Bisection</Menu.Item>
                <Menu.Item key="3" onClick={this.openFalsepositionPage}>Falseposition</Menu.Item>
                <Menu.Item key="4" onClick={this.openNewtonraphsonPage}>Newtonraphson</Menu.Item>
                <Menu.Item key="5" onClick={this.openSecantPage}>Secant</Menu.Item>
                <Menu.Item key="6" onClick={this.openOnepointitreationPage}>Onepointitreation</Menu.Item>
                <Menu.Item key="7" onClick={this.openDerivativebwPage}>Derivative(Bw)</Menu.Item>
                <Menu.Item key="8" onClick={this.openDerivativefwPage}>Derivative(Fw)</Menu.Item>
                <Menu.Item key="9" onClick={this.openDerivativecentrolPage}>Derivative(Central)</Menu.Item>
                <Menu.Item key="10" onClick={this.openCompositetrapezoidelPage}>Compositetrapezoidel</Menu.Item>
                <Menu.Item key="11" onClick={this.openCompositesimsonPage}>Compositesimson</Menu.Item>
              </Menu>
            </Header>
            <Content style={{ padding: '0 50px', marginTop: 64 }}>
              
              
              <div style={{ background: '#fff', padding: 24, minHeight: 800}}>
                {renderComponent}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>PG Memory Design ©2019 Created by PG Company</Footer>
        </Layout>
      </div>
    )
  }
}


export default App;
