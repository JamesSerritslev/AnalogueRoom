"use client"

import { useState } from "react"

export function InquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission - replace with actual endpoint
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    setSubmitted(true)
    setIsSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <p className="font-display text-2xl text-cream mb-4">Thank You!</p>
        <p className="font-body text-[15px] text-cream/70">
          We&apos;ve received your inquiry and will be in touch within 48 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <div>
          <label className="block font-label text-[9px] tracking-[0.3em] uppercase text-orange mb-1.5">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            required
            className="w-full bg-cream/4 border border-cream/18 px-4 py-3 text-cream font-body text-[13px] outline-none focus:border-orange transition-colors"
            placeholder="First Name"
          />
        </div>
        <div>
          <label className="block font-label text-[9px] tracking-[0.3em] uppercase text-orange mb-1.5">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            required
            className="w-full bg-cream/4 border border-cream/18 px-4 py-3 text-cream font-body text-[13px] outline-none focus:border-orange transition-colors"
            placeholder="Last Name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <div>
          <label className="block font-label text-[9px] tracking-[0.3em] uppercase text-orange mb-1.5">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full bg-cream/4 border border-cream/18 px-4 py-3 text-cream font-body text-[13px] outline-none focus:border-orange transition-colors"
            placeholder="you@email.com"
          />
        </div>
        <div>
          <label className="block font-label text-[9px] tracking-[0.3em] uppercase text-orange mb-1.5">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            className="w-full bg-cream/4 border border-cream/18 px-4 py-3 text-cream font-body text-[13px] outline-none focus:border-orange transition-colors"
            placeholder="(555) 555-5555"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <div>
          <label className="block font-label text-[9px] tracking-[0.3em] uppercase text-orange mb-1.5">
            Event Type
          </label>
          <select
            name="eventType"
            required
            className="w-full bg-cream/4 border border-cream/18 px-4 py-3 text-cream/70 font-body text-[13px] outline-none focus:border-orange transition-colors cursor-pointer"
          >
            <option value="">Select an event type</option>
            <option value="birthday">Birthday Party</option>
            <option value="listening-party">Listening Party</option>
            <option value="corporate">Corporate Event</option>
            <option value="anniversary">Anniversary</option>
            <option value="album-release">Album Release</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block font-label text-[9px] tracking-[0.3em] uppercase text-orange mb-1.5">
            Guest Count
          </label>
          <select
            name="guestCount"
            required
            className="w-full bg-cream/4 border border-cream/18 px-4 py-3 text-cream/70 font-body text-[13px] outline-none focus:border-orange transition-colors cursor-pointer"
          >
            <option value="">Estimated guests</option>
            <option value="1-10">1–10 guests</option>
            <option value="11-20">11–20 guests</option>
            <option value="21-30">21–30 guests</option>
            <option value="31-40">31–40 guests</option>
            <option value="40+">40+ guests</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <div>
          <label className="block font-label text-[9px] tracking-[0.3em] uppercase text-orange mb-1.5">
            Preferred Date
          </label>
          <input
            type="date"
            name="preferredDate"
            className="w-full bg-cream/4 border border-cream/18 px-4 py-3 text-cream font-body text-[13px] outline-none focus:border-orange transition-colors"
          />
        </div>
        <div>
          <label className="block font-label text-[9px] tracking-[0.3em] uppercase text-orange mb-1.5">
            Preferred Time
          </label>
          <select
            name="preferredTime"
            className="w-full bg-cream/4 border border-cream/18 px-4 py-3 text-cream/70 font-body text-[13px] outline-none focus:border-orange transition-colors cursor-pointer"
          >
            <option value="">Select a time</option>
            <option value="afternoon">Afternoon (12pm–4pm)</option>
            <option value="evening">Evening (5pm–9pm)</option>
            <option value="late">Late Night (9pm+)</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block font-label text-[9px] tracking-[0.3em] uppercase text-orange mb-1.5">
          Tell Us About Your Event
        </label>
        <textarea
          name="message"
          rows={4}
          className="w-full bg-cream/4 border border-cream/18 px-4 py-3 text-cream font-body text-[13px] outline-none focus:border-orange transition-colors resize-y"
          placeholder="What's the occasion? Any special requests?"
        />
      </div>

      <div className="mt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full font-label text-[11px] tracking-[0.3em] uppercase bg-orange text-cream px-8 py-4 hover:bg-spanish transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Submit Inquiry"}
        </button>
      </div>
    </form>
  )
}
