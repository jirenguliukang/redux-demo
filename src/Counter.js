import React, { Component } from 'react';
import {createStore} from "./redux";
import counter from "./reducers/counter";
import {INCREASE,DECREASE} from './reducers/actiontypes';

let store=createStore(counter);

class Counter extends Component {
    // constructor(){
    //     super();

    // }

    render() {
        return (
            <div>
                <p>{this.props.value}</p>
                <button onClick={this.props.onIncrease}>+</button>
                <button onClick={this.props.onDncrease}>-</button>
            </div>
        )
    }
}

//mapStateToProps 吧store里的状态对象映射成属性
let connect= (mapStateToProps,mapDispatchToProps)=>(_component)=>{
    class Proxy extends Component{
        constructor(){
            super();
            this.state={...mapStateToProps(store.getState())}
        }
        componentWillMount(){
            store.subscribe(()=>{
                console.log(store.getState());
                this.unsubscribe=this.setState(mapStateToProps(store.getState()))
            })
        }

        componentWillUnmount(){
            this.unsubscribe();
        }
        render(){
            return <_component {...this.state} {...mapDispatchToProps(store.dispatch)}/>
        }
    }
    return Proxy;
}
 
let mapStateToProps = (state)=>(
  
    {
        value:state.number
    }
)

let mapDispatchToProps=(dispatch)=>(
    {
       onIncrease:()=>dispatch({type:INCREASE}),
       onDncrease:()=>dispatch({type:DECREASE}) 
    }
)
export default connect(mapStateToProps,mapDispatchToProps)(Counter);
// export default Counter;