"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Stethoscope,
  Hospital,
  Microscope,
  HeartPulse,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { supabase } from "@/lib/supabase";

const facilityTypes = [
  { value: "hospital", label: "Hospital", icon: Hospital },
  { value: "clinic", label: "Clinic / Polyclinic", icon: Stethoscope },
  { value: "lab", label: "Diagnostic Lab", icon: Microscope },
  { value: "pharmacy", label: "Pharmacy", icon: HeartPulse },
  { value: "specialist", label: "Specialist Center", icon: Building2 },
  { value: "other", label: "Other", icon: Building2 },
];

interface FormData {
  facility_name: string;
  facility_type: string;
  contact_name: string;
  email: string;
  phone: string;
  region: string;
  address: string;
  message: string;
}

const GHANA_REGIONS = [
  "Greater Accra",
  "Ashanti",
  "Western",
  "Eastern",
  "Central",
  "Volta",
  "Northern",
  "Upper East",
  "Upper West",
  "Bono",
  "Ahafo",
  "Bono East",
  "Oti",
  "Savannah",
  "North East",
  "Western North",
];

export default function RegisterFacilityPage() {
  const [form, setForm] = useState<FormData>({
    facility_name: "",
    facility_type: "",
    contact_name: "",
    email: "",
    phone: "",
    region: "",
    address: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null);
  };

  const handleTypeSelect = (value: string) => {
    setForm((prev) => ({ ...prev, facility_type: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.facility_type) {
      setError("Please select a facility type.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const { error: dbError } = await supabase
        .from("facility_inquiries")
        .insert([
          {
            ...form,
            status: "pending",
          },
        ]);

      if (dbError) throw dbError;
      setSubmitted(true);
    } catch (err: unknown) {
      console.error("Submission error:", err);
      setError(
        "Something went wrong. Please try again or email us directly at hello@4ourlife.app"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 font-inter text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-400 transition-all duration-200 hover:border-slate-300";

  return (
    <main className="bg-white overflow-x-hidden min-h-screen">
      <Navbar />

      {/* Hero Banner */}
      <section className="pt-32 pb-16 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-emerald-500/8 rounded-full blur-[100px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection direction="up">
            <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-400/30 rounded-full px-4 py-2 mb-6">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300 text-xs font-inter font-semibold tracking-wide uppercase">
                Provider Registration
              </span>
            </div>
            <h1
              className="font-montserrat font-black text-white mb-5 leading-tight"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
            >
              Elevate Your{" "}
              <span className="gradient-text">Facility</span>
            </h1>
            <p className="text-slate-300 font-inter text-lg max-w-2xl mx-auto leading-relaxed">
              Join 500+ top-rated Ghanaian facilities on 4 Our Life. Fill in
              your details and our team will reach out within{" "}
              <span className="text-emerald-400 font-semibold">48 hours</span>.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {submitted ? (
              // Success State
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-emerald-lg">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <h2
                  className="font-montserrat font-black text-slate-900 mb-4"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}
                >
                  Inquiry Received! 🎉
                </h2>
                <p className="text-slate-500 font-inter text-lg mb-4 max-w-md mx-auto leading-relaxed">
                  Thank you,{" "}
                  <span className="text-emerald-600 font-semibold">
                    {form.contact_name}
                  </span>
                  . Your facility registration inquiry for{" "}
                  <span className="font-semibold text-slate-700">
                    {form.facility_name}
                  </span>{" "}
                  has been submitted.
                </p>
                <p className="text-slate-400 font-inter text-sm mb-10">
                  Our team will review your submission and contact you at{" "}
                  <span className="text-emerald-600">{form.email}</span> within
                  48 hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/"
                    className="inline-flex items-center gap-2 bg-emerald-500 text-white font-inter font-bold px-8 py-4 rounded-full hover:bg-emerald-600 transition-all duration-300 shadow-emerald"
                  >
                    Back to Home
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ) : (
              // Form
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Facility Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="facility_name"
                      className="block text-slate-700 font-inter font-semibold text-sm"
                    >
                      Facility Name *
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        id="facility_name"
                        name="facility_name"
                        type="text"
                        required
                        value={form.facility_name}
                        onChange={handleChange}
                        placeholder="e.g. Ridge Hospital"
                        className={`${inputBase} pl-11`}
                      />
                    </div>
                  </div>

                  {/* Facility Type */}
                  <div className="space-y-2">
                    <label className="block text-slate-700 font-inter font-semibold text-sm">
                      Facility Type *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {facilityTypes.map(({ value, label, icon: Icon }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => handleTypeSelect(value)}
                          className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 font-inter font-medium text-sm transition-all duration-200 ${
                            form.facility_type === value
                              ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                              : "border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:bg-emerald-50/50"
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 ${
                              form.facility_type === value
                                ? "text-emerald-600"
                                : "text-slate-400"
                            }`}
                          />
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-slate-100 my-2" />

                  {/* Contact Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="contact_name"
                      className="block text-slate-700 font-inter font-semibold text-sm"
                    >
                      Contact Person *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        id="contact_name"
                        name="contact_name"
                        type="text"
                        required
                        value={form.contact_name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={`${inputBase} pl-11`}
                      />
                    </div>
                  </div>

                  {/* Email + Phone (side by side) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-slate-700 font-inter font-semibold text-sm"
                      >
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@facility.com"
                          className={`${inputBase} pl-11`}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="block text-slate-700 font-inter font-semibold text-sm"
                      >
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+233 XX XXX XXXX"
                          className={`${inputBase} pl-11`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Region */}
                  <div className="space-y-2">
                    <label
                      htmlFor="region"
                      className="block text-slate-700 font-inter font-semibold text-sm"
                    >
                      Region *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
                      <select
                        id="region"
                        name="region"
                        required
                        value={form.region}
                        onChange={handleChange}
                        className={`${inputBase} pl-11 appearance-none cursor-pointer`}
                      >
                        <option value="" disabled>
                          Select region...
                        </option>
                        {GHANA_REGIONS.map((r) => (
                          <option key={r} value={r}>
                            {r} Region
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <label
                      htmlFor="address"
                      className="block text-slate-700 font-inter font-semibold text-sm"
                    >
                      Facility Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                      <textarea
                        id="address"
                        name="address"
                        rows={2}
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Street address or Ghana Post GPS code"
                        className={`${inputBase} pl-11 resize-none`}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="block text-slate-700 font-inter font-semibold text-sm"
                    >
                      Additional Information
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your facility — specializations, capacity, services offered, etc."
                        className={`${inputBase} pl-11 resize-none`}
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 rounded-2xl px-5 py-4 text-red-700 font-inter text-sm"
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    id="submit-facility-form"
                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-inter font-bold text-base py-4 rounded-2xl shadow-emerald hover:shadow-emerald-lg transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Registration Inquiry
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-slate-400 font-inter text-xs mt-4">
                    By submitting, you agree to our{" "}
                    <Link href="/terms-of-service" className="text-emerald-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" className="text-emerald-600 hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  );
}
