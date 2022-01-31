import React, { useEffect, useState } from "react";

const RedLine = () => {
    const [day, setDay] = useState({
        marginTop: new Date().getHours() + new Date().getMinutes() * (60 - 1)
    })
    useEffect(() => {
        const currentTimeout = setInterval(() => {
            setDay({
                marginTop: new Date().getHours() + new Date().getMinutes() * (60 - 1)
           })
        }, 60000)
        return () => {
            clearInterval(currentTimeout)
        }
    }, [day])

    return (
        <div className="red-line" style={day}></div>
    )
}
export default RedLine