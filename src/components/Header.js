import logo from '../logo_UK.webp'

export const Header = (props) => {
    const wrapperStyle = {
        textAlign: "center", 
        display: 'inline-block', 
        width:'100%', 
        border: '2px solid grey', 
        borderStyle: 'none none solid none' 
    }

    const imgStyle = {
        width: 30, 
        height: 30, 
        borderRadius: 15, 
        float: 'right', 
        margin: 20
    }

    return (
        <div style={wrapperStyle}>
            <h1 style={{display: 'inline-block'}}>
                {props.RestaurantName}
            </h1>
            <img src={logo} alt="uk logo" style={imgStyle} />
        </div>
    )
}