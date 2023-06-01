const Reeact = require('react')

export const Text = () => {
  return (
    <div>
        <div className="containerfortextline">
            <div class='fortext_one_and_duo'>
                <div class="fortext_one">
                    <div class="fortext_one_title">
                        <h1>Advanced but simple</h1>
                    </div>
                    <div class="fortext_one_text">
                        <p>
                            A good system is easy to use but can handle a complicated<br/>
                            reality. ReserveIT has been developed together with our<br/> 
                            customers'wishes for a long time .
                        </p>
                    </div>
                </div>
                <div class="fortext_dou">
                    <div class="fortext_duo_title">
                        <h1>
                            Optimize sitting times
                        </h1>
                    </div>
                    <div class="fortext_duo_text">
                        <p>
                            When is a restaurant fully booked? We are always looking<br/>
                            for smarter solutions to bring in more guests, even when it <br/>
                            looks like the restaurant is full.
                        </p>
                    </div>
                </div>
            </div>
            <div class="fortext_tree_and_for">
                <div class="fortext_tree">
                    <div class="fortext_tree_title">
                        <h1>
                            Easy to use app
                        </h1>
                    </div>
                    <div class="fortext_tree_text">
                        <p>
                            With our app for evry platform mobil and can easily<br/>
                            manage your bookings on phone or tablet.
                        </p>
                    </div>
                </div>
                <div class="fortext_for">
                    <div class="fortext_for_title">
                        <h1>
                            No hidden fees
                        </h1>
                    </div>
                    <div class="fortext_for_text">
                        <p>
                            We applty a flexible pricing, which means that the system fits<br/>
                            just as well regardless of the size of your restaurant.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <br/>
        <br/>
    </div>
  );
};

export default Text;