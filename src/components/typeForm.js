import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const TypeForm = (props) => {
    const { companyId } = useParams()

    const handleOnClick = ({target}) => {
        props.setSelectedType(target.innerText)
        props.setStepCount(2);
    }

    useEffect(() => {
        const config = {
            method: 'get',
            url: `http://localhost:4000/api/booking_instructions/${companyId}/?custom=booking_type`,
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                accessKey: process.env.REACT_APP_ACCESS_KEY_2
            })
        }
        axios(config).then(response => {
            const typesArray = response.data.map(type => type.booking_type);
            props.setAvailableTypes(typesArray)
        })
    }, [])

    const types = props.AvailableTypes;
    return (
        <div className="typeContainer" style={{marginTop: 100}} >
            {
                types.map((type) => {
                    return(
                        <div className="type" onClick={handleOnClick} >
                            {type}
                        </div>
                    )
                })
            }
        </div>
    )
}