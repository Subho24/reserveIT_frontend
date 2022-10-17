import { useNavigate, useParams } from "react-router-dom";

export const TypeForm = (props) => {
    const { restaurantId } = useParams();
    console.log(restaurantId)
    const navigate = useNavigate();
    const handleOnClick = ({target}) => {
        props.setSelectedType(target.innerText)
        navigate('/people')
    }

    const types = props.AvailableTypes;
    return (
        <div className="typeContainer">
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