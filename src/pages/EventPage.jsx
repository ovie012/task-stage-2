import React, { useContext } from 'react';
import { AppContext } from '../AppProvider';
import EventPageConstant from '../components/EventPageConstant';
import TicketSelection from '../components/TicketSelection';
import AttendeeDetail from '../components/AttendeeDetail';
import TicketBooked from '../components/TicketBooked';

function EventPage() {
  const { ticketSelection, attendee, ready } = useContext(AppContext);

  return (
    <>
        <div className="event-page">
          <EventPageConstant />
          {ticketSelection && <TicketSelection />}
          {attendee && <AttendeeDetail />}
          {ready && <TicketBooked />}
        </div>
    </>
  )
}

export default EventPage;