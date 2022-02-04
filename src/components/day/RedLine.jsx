import React, { useEffect, useState } from "react";

const RedLine = () => {
    let currentHour = new Date().getHours();
    let currentMinutes = new Date().getMinutes()
    const [day, setDay] = useState({
        marginTop: `${currentHour * 60 + currentMinutes}px`,
    })
    useEffect(() => {
        const currentTimeout = setInterval(() => {
            currentHour = new Date().getHours()
            currentMinutes = new Date().getMinutes()
            setDay({
                marginTop: `${currentHour * 60 + currentMinutes}px`
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