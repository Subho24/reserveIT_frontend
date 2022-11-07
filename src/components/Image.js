import RamenShackLogo from '../RamenShackLogo.png';

export const Image = () => {
    return (
        <div className='restaurantImage' style={{ padding: '50px 0px 50px 80px'}}>
            <img src={RamenShackLogo} width={500} height={500} alt='Restaurant' />
        </div>
    )
}