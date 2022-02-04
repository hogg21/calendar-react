import React, { useEffect, useState } from "react";

const RedLine = () => {
    let currentHour = new Date().getHours();
    let currentMinutes = new Date().getMinutes()
    const [day, setDay] = useState({
        top: currentHour + currentMinutes * 59,
    })
    useEffect(() => {
        const currentTimeout = setInterval(() => {
            currentHour = new Date().getHours()
            currentMinutes = new Date().getMinutes()
            setDay({
                top: currentHour + currentMinutes * 59
           })
        }, 60000)
        return () => {
            clearInterval(currentTimeout)
        }
    }, [])
    return (
        <div className="red-line" style={day}></div>
    )
}
export default RedLine