import { useEffect, useState } from "react"

const Projectile = ()=>{
    const [p,setp1] = useState({p1:20,p2:20})
    useEffect(()=>{
    const change =()=>{
        setp1({p1:Math.random()*800,p2:Math.random()*800})
        
    }
    console.log(p)
},[p])

    return <div><div style={{offsetPath: `path("M${p.p1},${p.p2} C20,100 200,0 200,100")`,
    animation: `move 3000ms infinite alternate ease-in-out`,
    width: `40px`,
    height: `40px`,
    background: `cyan`}}></div>
    <button onClick={()=>setp1({p1:Math.random()*100,p2:Math.random()*100})}>skalkas</button>
    </div>
}

export default Projectile

// done: figure out jumping animation
//       figured out cloud logic
//       figured out cloud logic
// to do:
//       logic of jump
//       logic of death
// 
