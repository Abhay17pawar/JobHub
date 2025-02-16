import React from 'react';
import "./NewsLetter.css";

const Example = () => {
  return (
    <div>
        <div class="card">
  <span class="card__title">Newsletter</span>
  <p class="card__content">
    Get existential crisis delivered straight to your inbox every week.
  </p>
  <form class="card__form">
    <input required="" type="email" placeholder="Your life" />
    <button class="card__button">Click me</button>
  </form>
</div>
    </div>
  )
}

export default Example