const Reeact = require('react')

const About_us = (props) => {
  console.log(props)

  return (
    <div className="Info">
      
      <div class="Info_container">
        <div class="Info_text_title">
          <h2 style={{color:"goldenrod"}}>
            ABOUT US
          </h2>
        </div>
        <div class="info_text_main">
          <p>
          Our restaurant reservation system in Sweden is a game-changer for both diners and establishments. With a focus on affordability and competitiveness, we take pride in being the most cost-effective reservation system available.
Our platform offers a seamless and user-friendly experience, allowing customers to effortlessly browse through a diverse range of restaurants across Sweden. From cozy cafes to fine dining establishments, we have it all covered. Our system provides real-time updates on table availability, ensuring that you can secure a reservation at your preferred time and date.
What sets us apart is our commitment to offering the best prices on the market. We continuously monitor and compare prices to ensure that we remain the cheapest option for restaurant reservations. By partnering with numerous restaurants and leveraging our extensive network, we negotiate exclusive deals and discounts, passing on the savings directly to our customers.
Not only do we prioritize affordability, but we also ensure that our platform is competitive in terms of features and reliability. Our robust reservation system is built to handle high volumes of bookings, ensuring a smooth and hassle-free experience for both diners and restaurants. We have a dedicated customer service team available to assist with any inquiries or concerns you may have.
So, if you're looking for an affordable and competitive restaurant reservation system in Sweden, look no further. Choose our platform to enjoy the benefits of cost-effectiveness, a wide selection of dining options, and a user-friendly interface. Let us make your dining experiences memorable while keeping more money in your pocket.
          </p>
        </div>
      </div>
      <br/>
      <br/>
    </div>
  );
};

export default About_us;
