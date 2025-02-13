import React, { useContext } from 'react';
import { AppContext } from '../AppProvider';

function TicketSelection() {
  const { firstButton, ticketsType, ticketNumber, setSelectedTicketType, setSelectedAmount, setAmountConfirmation, setTicketConfirmation, selectedTicketType } = useContext(AppContext);

  return (
    <>
        <div className="ticket-selection">
            <section className="event-details">
              <h2 className='road-rage'>Techember Fest ”25</h2>
              <p className='roboto'>Join us for an unforgettable experience at <br /> Legend Fest! Secure your spot now.</p>
              <p className='roboto'>📍 04 Rumens road, Lagos &nbsp; | | &nbsp; March 15, 2025 | 7:00 PM</p>
            </section>
            <span></span>
            <section className="select-ticket roboto">
              <h3>Select Ticket Type:</h3>
              <div className='ticket-cover'>
                {ticketsType.map((item, index) => (
                  <div onClick={() => { setSelectedTicketType(item); setTicketConfirmation(true); }} key={index} className={item.price === selectedTicketType?.price ? 'active' : ''}>
                    <h4>{item.price}</h4>
                    <h5>{item.access} Access</h5>
                    <p>{item.amount} / 52</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="tickets-amount">
              <h3>number of tickets</h3>
              <select 
                name="ticket" 
                id="ticket"
                onChange={(e) => {
                  const selectedValue = Number(e.target.value);
                  setSelectedAmount(selectedValue);
                  setAmountConfirmation(true);
                }}
                onClick={() => { setAmountConfirmation(true); }}
              >
                {ticketNumber.map((item, index) => (
                  <option value={item} key={index}>{item}</option>
                ))}
              </select>
            </section>
            <div className="button-component">
              <button>cancel</button>
              <button onClick={firstButton}>next</button>
            </div>
        </div>
    </>
  )
}

export default TicketSelection;