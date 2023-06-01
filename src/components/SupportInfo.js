import img from '../support.png'

const Reeact = require('react')


const SupportInfo = () => {
  return (
    <div className="SupInfo">
        <div class="supportInfo_box">
                <div class="supportInfo_text_title">
                    <h2>Support Info</h2>
                </div>
                <div class="supportInfo_text">
                    <p>
                        WE LIKE CUSTOMER CONTACT
                    </p>
                </div>
                <div class="supportInfo_text_main">
                    <p>
                        Our support is always available. We who answer the phone are in Sweden<br/>
                        and place great value on helping you when you need it. Support around <br/>
                        the clock, seven days a week Quick solution to your questions
                    </p>
                    <img src={img }alt=""></img>
                </div>
        </div>
        <br/>
        <br/>
    </div>
  );
};
    
export default SupportInfo;