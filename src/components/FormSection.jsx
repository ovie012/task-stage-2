import React from 'react'

function FormSection() {
  return (
    <>
      <div className="form-section">
        <form action="POST">
          <section className="text">
            <input type="text" placeholder='Full Name' />
            <input type="email" placeholder='Email Address' />
          </section>
          <section className="image">
            <input type="file" name="avatar" id="avatar" />
          </section>
        </form>
      </div>
    </>
  )
}

export default FormSection