
export const TypeForm = (props) => {
    const handleOnClick = ({target}) => {
        props.setSelectedType(target.innerText)
        props.setStepCount(2);
    }

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