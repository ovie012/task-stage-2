import React, { useState, useContext } from 'react';
import { AppContext } from '../AppProvider';
import ImageUpload from './ImageUpload';

function AttendeeDetail() {
  const { secondButton, thirdButton, inputRef, error, setImageUrl } = useContext(AppContext);

  return (
    <>
        <div className="attendee-detail roboto">
            <section className="image-upload-section">
                <h3>upload profile photo</h3>
                <div className="upload-image-cover">
                  <ImageUpload />
                </div>
            </section>
            <span></span>
            <form action="POST">
              <div>
                <label>Enter your name *</label>
                <input type="text" ref={inputRef.name} />
                {error.name && <p className='error'>{error.nameErrorText}</p>}
              </div>
              <div>
                <label>Enter your email *</label>
                <input type="text" ref={inputRef.email} placeholder='📧 hello@avioflagos.io' />
                {error.email && <p className='error'>{error.emailErrorText}</p>}
              </div>
              <label>Special Request ?</label>
              <textarea type="text" ref={inputRef.freeWill} />
            </form>
            <div className="button-component">
              <button onClick={thirdButton}>Back</button>
              <button onClick={secondButton}>Get my free ticket</button>
            </div>
        </div>
    </>
  )
}

export default AttendeeDetail;