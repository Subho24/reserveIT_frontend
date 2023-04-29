import logo from '../logo_UK.webp'


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

export const BookingHeader = (props) => {

    return (
        <div className='bookingHeader'>
            <h1 style={{display: 'inline-block'}}>
                {props.companyInfo.company_name}
            </h1>
        </div>
    )
}