import React from 'react';

const Landing = props => (
  <div className="intro-step">
   <div className="install-app"><img src="assets/img/logo.png" alt="logo"/>Coffee Now mobile</div>
   <div className="content">
      <div className="head">
         <h3>Order the best coffee in town</h3>
         <h2>COFFEE NOW DELIVERY</h2>
         <p>Don't forget to<em> Login </em>to your own account to be the first one to hear our promotion.</p>
      </div>
      <div className="body">
         <img src="assets/img/coffee-now-min.jpg" alt="coffee-now"/>
         <div className="order-steps">
            <h3>3 simple step to order</h3>
            <ol>
               <li>Let us know your name, phone numbers and address</li>
               <li>Choose some fabulous beverages</li>
               <li>Wait 30 minutes(*) to enjoy<em> COFFEE NOW </em>at your place</li>
            </ol>
         </div>
         <div className="notes">
            <p>(*) Time can be varied due to the distance from your place to the nearest shop</p>
            <p>Working hours: 7am-10pm</p>
         </div>
      </div>
    </div>
    <div className="controls">
      <button className="action-button" onClick={() => props.history.push('/app')}>ORDER NOW</button>
    </div>
</div>
);

export default Landing;
