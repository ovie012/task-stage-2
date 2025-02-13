import React, { useContext } from 'react';
import { AppContext } from '../AppProvider';

function EventPageConstant() {
  const { constant, percent, step, } = useContext(AppContext);

  return (
    <>
        <div className="event-page-constant">
            <section>
                <h2 className='noto'>{constant}</h2>
                <p className='roboto'>Step {step}/3</p>
            </section>
            <span className={percent}></span>
        </div>
    </>
  )
}

export default EventPageConstant;