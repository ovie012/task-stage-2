import React, { createContext, useRef, useState, useEffect } from 'react';
import './App.css'

export const AppContext = createContext();

export function AppProvider ({ children }) {
    const [ticketSelection, setTicketSelection] = useState(true);
    const [attendee, setAttendee] = useState(false);
    const [ready, setReady] = useState(false);
    const [imageUrl, setImageUrl] = useState(localStorage.getItem("imageUrl") || "");
    const [constant, setConstant] = useState("Ticket Selection");
    const [percent, setPercent] = useState("");
    const [step, setStep] = useState("1");
    const [imageError, setImageError] = useState("");
    const [uploaded, setUploaded] = useState(false);
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

    useEffect(() => {
        if (inputRef.name.current) {
        inputRef.name.current.value = localStorage.getItem("name") || "";
        }
        if (inputRef.email.current) {
        inputRef.email.current.value = localStorage.getItem("email") || "";
        }
    }, []);

    useEffect(() => {
        if (inputRef.name.current) {
        localStorage.setItem("name", inputRef.name.current.value);
        }
        if (inputRef.email.current) {
        localStorage.setItem("email", inputRef.email.current.value);
        }
    }, [error]);

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

        if (!uploaded) {
            setImageError("Please upload fine picture oo")
        }

        setError((prevError) =>({
            ...prevError,
            ...errors
        }))

        if (
            (inputRef.name.current.value.trim() === '') || 
            (inputRef.email.current.value.trim() === '')  || 
            (!emailRegex.test(inputRef.email.current.value)) ||
            (!uploaded)
        ) {
            return;
        }

        localStorage.setItem("imageUrl", imageUrl);
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
        setImageUrl('');
        setSelectedTicketType("");
        setSelectedAmount("");
        setUploaded(false);
        setTicketConfirmation(false);
        setAmountConfirmation(false);
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
            uploaded, 
            setUploaded,
            imageError, 
            setImageError,
        }}>
            {children}
        </AppContext.Provider>
    )
}