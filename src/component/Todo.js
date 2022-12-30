import {React, useState, useEffect} from 'react'
import "../App.css"

const getLocalItems = ()=>{
    let list = localStorage.getItem('list');
    if(list){
        return JSON.parse(localStorage.getItem('list'));
    }
    else{
        return [];
    }
}


const Todo = ()=> {
    const deleteItem = (id)=>{
        const updatedItems = items.filter((elem, ind)=>{
            return ind !== id ;
        })
        setItems(updatedItems)
    }

    const addItem = () =>{
        if(height==='' || weigth===''){
            alert("Height and Weight is empty!")
        }
        else{
            if(items.length-1 >=6){
                items.splice(0,1);
            }
            setsmallW(weigth)
            setsmallH(height)
            setItems([...items, Math.floor((weigth/ ((height)/100 * (height)/100)))])
            setBMI(Math.floor((weigth/ ((height)/100 * (height)/100))))
            setWeight('')
            setHeight('')


        }

    }


    let [items, setItems] = useState(getLocalItems());
    const [weigth, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [BMI, setBMI] = useState(0);

    const[smallH, setsmallH] = useState(0);
    const[smallW, setsmallW] = useState(0);

    useEffect(()=>{
        localStorage.setItem('list',JSON.stringify(items))
    }, [items]);

    return (
    <>
    <div className="main-div">
        <div className="child-div">
            <h1 id='main-head'>BMI Tracker</h1>

        <div>
            <div id='maindivision'>
                <div className='divisions'>
                    <label className='lables'>Weight(Kg)</label>
                    <input type="text" className="field" placeholder="weight(KG)" value={weigth} onChange={(e)=>setWeight(e.target.value)}/>
                </div>
                <div className='divisions'>
                    <label className='lables'>Height(cm)</label>
                    <input type="text" className="field" placeholder="height(cm)" value={height} onChange={(e)=>setHeight(e.target.value)}/><br/>
                </div>  
            </div>
            <div  id='bmibutton' ><button onClick={addItem} id='button'> Compute BMI </button></div>
                
                <p className='bmi-head'> BMI:{BMI} </p>
                <p className='bmi-head2'>Last 7 Data</p>
        </div>

            <div className='show-Items'>           
                {
                items.map(
                        (elem, ind)=>{
                            console.log()
                            return(
                                <div id='main-outer-div' key={ind} >
                                    <i onClick={()=>{deleteItem(ind)}} id='cross'>X</i>
                                    <div className='each-Item'>
                                        <p id='small-bmi'>{elem}</p>
                                        <h5 className='date'>{(new Date()).toLocaleDateString()}</h5>
                                        {/* <h5 className='date'>H: {smallH}m</h5>
                                        <h5 className='date'>W: {smallW}Kg</h5> */}
                                    </div>
                                </div>
                            )
                        }
                    )
                }
            </div>
        </div>
    </div>
    </>
  )
}

export default Todo;