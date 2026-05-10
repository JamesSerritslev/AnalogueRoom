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
            className="min-h-11 w-full border border-cream/18 bg-cream/4 px-4 py-3 font-body text-base text-cream outline-none transition-colors focus:border-orange sm:text-[13px]"
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
            className="min-h-11 w-full border border-cream/18 bg-cream/4 px-4 py-3 font-body text-base text-cream outline-none transition-colors focus:border-orange sm:text-[13px]"
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
            className="min-h-11 w-full border border-cream/18 bg-cream/4 px-4 py-3 font-body text-base text-cream outline-none transition-colors focus:border-orange sm:text-[13px]"
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
            className="min-h-11 w-full border border-cream/18 bg-cream/4 px-4 py-3 font-body text-base text-cream outline-none transition-colors focus:border-orange sm:text-[13px]"
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
            className="min-h-11 w-full cursor-pointer border border-cream/18 bg-cream/4 px-4 py-3 font-body text-base text-cream/70 outline-none transition-colors focus:border-orange sm:text-[13px]"
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
            className="min-h-11 w-full cursor-pointer border border-cream/18 bg-cream/4 px-4 py-3 font-body text-base text-cream/70 outline-none transition-colors focus:border-orange sm:text-[13px]"
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
            className="min-h-11 w-full border border-cream/18 bg-cream/4 px-4 py-3 font-body text-base text-cream outline-none transition-colors focus:border-orange sm:text-[13px]"
          />
        </div>
        <div>
          <label className="block font-label text-[9px] tracking-[0.3em] uppercase text-orange mb-1.5">
            Preferred Time
          </label>
          <select
            name="preferredTime"
            className="min-h-11 w-full cursor-pointer border border-cream/18 bg-cream/4 px-4 py-3 font-body text-base text-cream/70 outline-none transition-colors focus:border-orange sm:text-[13px]"
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
          className="min-h-[5.5rem] w-full resize-y border border-cream/18 bg-cream/4 px-4 py-3 font-body text-base text-cream outline-none transition-colors focus:border-orange sm:min-h-0 sm:text-[13px]"
          placeholder="What's the occasion? Any special requests?"
        />
      </div>

      <div className="mt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="min-h-12 w-full bg-orange px-8 py-4 font-label text-[11px] tracking-[0.28em] uppercase text-cream transition-colors hover:bg-spanish disabled:cursor-not-allowed disabled:opacity-50 sm:tracking-[0.3em]"
        >
          {isSubmitting ? "Sending..." : "Submit Inquiry"}
        </button>
      </div>
    </form>
  )
}
