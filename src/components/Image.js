import logo from '../logo.jpg';

export const Image = () => {
    return (
        <div className='restaurantImage' style={{ padding: '50px 0px 50px 80px'}}>
            <img src={logo} width={600} height={500} alt='Company Logo' />
        </div>
    )
}