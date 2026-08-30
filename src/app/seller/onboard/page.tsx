"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InteractiveGlobe from "@/components/InteractiveGlobe";
import { 
  ShieldCheck, 
  ArrowRight, 
  FileText, 
  Upload, 
  UserCheck, 
  Database, 
  MapPin, 
  Loader2, 
  PartyPopper 
} from "lucide-react";

export default function SellerOnboarding() {
  const router = useRouter();
  const { switchPersona } = useApp();
  
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [pan, setPan] = useState("");
  const [company, setCompany] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  
  // Validation status
  const [validating, setValidating] = useState(false);
  const [validationStage, setValidationStage] = useState<number>(0);
  const [validationSuccess, setValidationSuccess] = useState(false);

  // Map coordinates state
  const [coordinates, setCoordinates] = useState({ lat: 20.27, lng: 85.84, state: "Odisha" });

  const handleSendOtp = () => {
    if (!pan || !company) return;
    setIsOtpSent(true);
  };

  const handleVerifyOtp = () => {
    if (otp.length >= 4) {
      setStep(2); // Next step: Upload
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setUploadedFile("GCI-CERTIFICATE-2026-PB-902.pdf");
  };

  const handleManualUpload = () => {
    setUploadedFile("GCI-CERTIFICATE-2026-PB-902.pdf");
  };

  const startRegistryVerification = () => {
    setStep(3);
    setValidating(true);
    setValidationStage(0);

    const intervals = [
      () => setValidationStage(1),
      () => setValidationStage(2),
      () => setValidationStage(3),
      () => {
        setValidating(false);
        setValidationSuccess(true);
      }
    ];

    intervals.forEach((fn, idx) => {
      setTimeout(fn, (idx + 1) * 1500);
    });
  };

  const handleCompleteOnboarding = () => {
    switchPersona("seller");
    router.push("/seller/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent font-sans">
      <Navbar />

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Step Indicator Header (Enhanced look) */}
        <div className="flex justify-between items-center mb-10 max-w-xl mx-auto select-none">
          <div className="flex flex-col items-center">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              step >= 1 ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20" : "bg-slate-200 text-slate-500"
            }`}>1</span>
            <span className="text-[9px] font-bold text-slate-500 mt-1 uppercase tracking-wider">Corporate KYC</span>
          </div>
          <div className={`w-12 h-0.5 transition-colors duration-300 ${step >= 2 ? "bg-emerald-600" : "bg-slate-200"}`}></div>
          <div className="flex flex-col items-center">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              step >= 2 ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20" : "bg-slate-200 text-slate-500"
            }`}>2</span>
            <span className="text-[9px] font-bold text-slate-500 mt-1 uppercase tracking-wider">Upload Certs</span>
          </div>
          <div className={`w-12 h-0.5 transition-colors duration-300 ${step >= 3 ? "bg-emerald-600" : "bg-slate-200"}`}></div>
          <div className="flex flex-col items-center">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              step >= 3 ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20" : "bg-slate-200 text-slate-500"
            }`}>3</span>
            <span className="text-[9px] font-bold text-slate-500 mt-1 uppercase tracking-wider">Registry Audit</span>
          </div>
          <div className={`w-12 h-0.5 transition-colors duration-300 ${step >= 4 ? "bg-emerald-600" : "bg-slate-200"}`}></div>
          <div className="flex flex-col items-center">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              step >= 4 ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20" : "bg-slate-200 text-slate-500"
            }`}>4</span>
            <span className="text-[9px] font-bold text-slate-500 mt-1 uppercase tracking-wider">Coordinates</span>
          </div>
        </div>

        {/* Wizard Forms Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-md max-w-xl mx-auto space-y-6">
          
          {/* STEP 1: Corporate eKYC */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-center space-y-2">
                <UserCheck className="w-10 h-10 text-emerald-600 mx-auto" />
                <h2 className="text-xl font-bold text-slate-800">Corporate Identity eKYC</h2>
                <p className="text-xs text-slate-500">Provide legal developer registration parameters. Details are cross-verified against corporate registers.</p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Company / Entity Name</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Mahanadi Forestry Developers"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">PAN / GCI Reference Hash</label>
                  <input
                    type="text"
                    value={pan}
                    onChange={(e) => setPan(e.target.value)}
                    placeholder="e.g. AAACM4802E"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 uppercase focus:outline-none focus:ring-1 focus:ring-emerald-500 font-semibold"
                  />
                </div>

                {isOtpSent ? (
                  <div className="space-y-3 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 mt-4 animate-slideDown">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">OTP Code (Sent to registered phone)</label>
                      <input
                        type="text"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter 6-digit mock OTP"
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 bg-white font-mono font-bold"
                      />
                    </div>
                    <button
                      onClick={handleVerifyOtp}
                      disabled={otp.length < 4}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors text-xs"
                    >
                      Verify and Continue
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleSendOtp}
                    disabled={!pan || !company}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl transition-colors shadow flex items-center justify-center gap-1 mt-4 text-xs"
                  >
                    Send OTP Verification
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: Certificate Upload */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-center space-y-2">
                <FileText className="w-10 h-10 text-emerald-600 mx-auto" />
                <h2 className="text-xl font-bold text-slate-800">Deposit Carbon Certificates</h2>
                <p className="text-xs text-slate-500">Upload your government-issued GCI or clean-development project certificates to escrow custody.</p>
              </div>

              <div 
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleManualUpload}
                className="border-2 border-dashed border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/20 py-12 rounded-2xl text-center cursor-pointer transition-colors space-y-3"
              >
                <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                <div className="text-xs text-slate-500 font-medium">
                  {uploadedFile ? (
                    <span className="text-emerald-600 font-bold">Attached: {uploadedFile}</span>
                  ) : (
                    <span>Drag and drop certificate PDF here or click to upload</span>
                  )}
                </div>
                <span className="text-[9px] text-slate-400 block">Supports GCI XML/PDF formats up to 10MB</span>
              </div>

              {uploadedFile && (
                <button
                  onClick={startRegistryVerification}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors shadow flex items-center justify-center gap-1 mt-4 text-xs"
                >
                  Cross-verify with GCI Registry
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* STEP 3: Registry Audits Checker */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center space-y-2">
                <Database className="w-10 h-10 text-[#06B6D4] mx-auto animate-pulse" />
                <h2 className="text-xl font-bold text-slate-800">Registry Verification Audit</h2>
                <p className="text-xs text-slate-500">EcoVault is executing real-time API verification checks against the Grid Controller of India registry.</p>
              </div>

              {/* Status timeline */}
              <div className="space-y-4 text-xs max-w-sm mx-auto">
                <div className="flex gap-3 items-center">
                  <span className={`w-5 h-5 rounded-full font-bold flex items-center justify-center text-[9px] ${
                    validationStage >= 1 ? "bg-emerald-600 text-white shadow-sm shadow-emerald-500/25" : "bg-slate-100 text-slate-400"
                  }`}>
                    {validationStage >= 1 ? "✓" : "⌛"}
                  </span>
                  <span className={validationStage >= 1 ? "text-slate-800 font-bold" : "text-slate-400"}>
                    Verify corporate PAN entity signature
                  </span>
                </div>

                <div className="flex gap-3 items-center border-t border-slate-100 pt-3">
                  <span className={`w-5 h-5 rounded-full font-bold flex items-center justify-center text-[9px] ${
                    validationStage >= 2 ? "bg-emerald-600 text-white shadow-sm shadow-emerald-500/25" : "bg-slate-100 text-slate-400"
                  }`}>
                    {validationStage >= 2 ? "✓" : "⌛"}
                  </span>
                  <span className={validationStage >= 2 ? "text-slate-800 font-bold" : "text-slate-400"}>
                    Check registry certificate serial hash match
                  </span>
                </div>

                <div className="flex gap-3 items-center border-t border-slate-100 pt-3">
                  <span className={`w-5 h-5 rounded-full font-bold flex items-center justify-center text-[9px] ${
                    validationStage >= 3 ? "bg-emerald-600 text-white shadow-sm shadow-emerald-500/25" : "bg-slate-100 text-slate-400"
                  }`}>
                    {validationStage >= 3 ? "✓" : "⌛"}
                  </span>
                  <span className={validationStage >= 3 ? "text-slate-800 font-bold" : "text-slate-400"}>
                    Validate double-allocation / retirement clear
                  </span>
                </div>
              </div>

              {validating ? (
                <div className="flex items-center justify-center gap-2 text-slate-400 text-xs py-4">
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                  <span>Auditing registry data packets...</span>
                </div>
              ) : validationSuccess ? (
                <div className="space-y-4 animate-slideDown">
                  <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-100 text-xs text-center font-bold">
                    ✅ GCI Match Confirmed! Certificate serial is valid and unlocked for marketplace.
                  </div>
                  <button
                    onClick={() => setStep(4)}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors shadow flex items-center justify-center gap-1 text-xs"
                  >
                    Locate Coordinates
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : null}
            </div>
          )}

          {/* STEP 4: Pick Map Coordinates */}
          {step === 4 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-center space-y-2">
                <MapPin className="w-10 h-10 text-emerald-600 mx-auto" />
                <h2 className="text-xl font-bold text-slate-800">Pin Project Location</h2>
                <p className="text-xs text-slate-500">Provide GPS coordinates representing your project boundaries. Used by buyers for satellite MRV audits.</p>
              </div>

              {/* Coordinates Pick Inputs */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Latitude</label>
                  <input
                    type="number"
                    value={coordinates.lat}
                    onChange={(e) => setCoordinates(prev => ({ ...prev, lat: parseFloat(e.target.value) || 20 }))}
                    className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50 font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Longitude</label>
                  <input
                    type="number"
                    value={coordinates.lng}
                    onChange={(e) => setCoordinates(prev => ({ ...prev, lng: parseFloat(e.target.value) || 85 }))}
                    className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50 font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">State Location</label>
                  <input
                    type="text"
                    value={coordinates.state}
                    onChange={(e) => setCoordinates(prev => ({ ...prev, state: e.target.value }))}
                    className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50 font-bold"
                  />
                </div>
              </div>

              {/* Embedded Mini Globe */}
              <div className="w-full h-56 bg-[#030704] rounded-2xl overflow-hidden border border-emerald-950/20 relative">
                <InteractiveGlobe mini={true} interactive={false} />
                <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[8px] text-slate-300">
                  Odisha Centered coordinates
                </div>
              </div>

              <button
                onClick={handleCompleteOnboarding}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold rounded-xl text-xs transition-colors shadow flex items-center justify-center gap-1.5"
              >
                <PartyPopper className="w-4 h-4" />
                Complete Verification & Unlock Portal
              </button>
            </div>
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
}
