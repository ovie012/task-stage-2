import React, { createContext, useRef, useState } from 'react';
import './App.css'

export const AppContext = createContext();

export function AppProvider ({ children }) {
    const [ticketSelection, setTicketSelection] = useState(true);
    const [attendee, setAttendee] = useState(false);
    const [ready, setReady] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [constant, setConstant] = useState("Ticket Selection");
    const [percent, setPercent] = useState("");
    const [step, setStep] = useState("1");
    const [selectedTicketType, setSelectedTicketType] = useState();
    const [ticketConfirmation, setTicketConfirmation] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState(1)
    const [amountConfirmation, setAmountConfirmation] = useState(false);
    const [error, setError] = useState({
      name : false,
      email : false,
      nameErrorText : '',
      emailErrorText : '',
    });

    const inputRef = {
        name : useRef(),
        email : useRef(),
        freeWill : useRef(),
    };

    const ticketsType = [
        {
            price : 'Free',
            access : 'Regular',
            amount : '20',
        },
        {
            price : '$150',
            access : 'VIP',
            amount : '20',
        },
        {
            price : '$250',
            access : 'VVIP',
            amount : '20',
        },
    ]

    const ticketNumber = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const firstButton = () => {
        if (!amountConfirmation && !ticketConfirmation) {
            return
        }

        setTicketSelection(false);
        setAttendee(true);
        setReady(false);
        setConstant("Attendee Details");
        setPercent("second");
        setStep("2");
    }

    const secondButton = () => {

        let errors = {
            name : false,
            email : false,
            nameErrorText : '',
            emailErrorText : '',
        }

        if (inputRef.name.current.value.trim() === '') {
          errors.name = true;
          errors.nameErrorText = "Joor nau, Can't be Empty";
        }

        if (inputRef.email.current.value.trim() === '') {
          errors.email = true;
          errors.emailErrorText = "oya abeg, put any e-mail";
        } else if ((!emailRegex.test(inputRef.email.current.value))) {
          errors.email = true;
          errors.emailErrorText = "Common, let it be a valid e-mail address";
        }

        setError((prevError) =>({
            ...prevError,
            ...errors
        }))

        if (
            (inputRef.name.current.value.trim() === '') || 
            (inputRef.email.current.value.trim() === '')  || 
            (!emailRegex.test(inputRef.email.current.value)) 
        ) {
            return;
        }

        setTicketSelection(false);
        setAttendee(false);
        setReady(true);
        setConstant("Ready");
        setPercent("final");
        setStep("3");
    }

    const thirdButton = () => {
        setTicketSelection(true);
        setAttendee(false);
        setReady(false);
        setConstant("Ticket Selection");
        setPercent("");
        setStep("1");
    }

    return (
        <AppContext.Provider value={{
            ticketSelection, 
            attendee, 
            ready,
            firstButton,
            secondButton,
            thirdButton,
            constant,
            percent,
            step,
            ticketsType, 
            ticketNumber,
            setSelectedTicketType,
            setSelectedAmount,
            setAmountConfirmation,
            setTicketConfirmation,
            ticketConfirmation,
            amountConfirmation,
            selectedTicketType, 
            selectedAmount,
            inputRef,
            error,
            imageUrl, 
            setImageUrl,
        }}>
            {children}
        </AppContext.Provider>
    )
}