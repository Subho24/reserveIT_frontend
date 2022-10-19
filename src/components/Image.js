import japaneseRestaurant from '../japaneseRestaurant.png';

export const Image = () => {
    return (
        <div className='restaurantImage' style={{ padding: '50px 0px 50px 80px'}}>
            <img src={japaneseRestaurant} width={450} height={600} alt='Restaurant' />
        </div>
    )
}