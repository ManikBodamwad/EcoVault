import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { Landmark, ShieldAlert, BadgeInfo } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A0F0D] text-slate-400 border-t border-emerald-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Info Column */}
        <div className="space-y-4">
          <Logo variant="full" light={true} />
          <p className="text-xs text-slate-500 leading-relaxed mt-2">
            EcoVault is India's trust, verification, and analytics layer for voluntary carbon trading. Accelerating the transition to net-zero by securing transactions, safeguarding certificates, and providing clear reference pricing.
          </p>
        </div>

        {/* Quick Links Column */}
        <div>
          <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase mb-4">Platform</h3>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/buyer/marketplace" className="hover:text-emerald-400 transition-colors">
                Explore Credits
              </Link>
            </li>
            <li>
              <Link href="/verification" className="hover:text-emerald-400 transition-colors">
                How Verification Works
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-emerald-400 transition-colors">
                About Our Brand
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-emerald-400 transition-colors">
                Mock Login Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* Escrow and Registry Trust Columns */}
        <div>
          <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase mb-4">Security Features</h3>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2">
              <Landmark className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>EcoVault Escrow:</strong> Safeguards buyer deposits until certificate transfer is validated.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Registry Cross-Checks:</strong> Instantly validates certificates against the Grid Controller of India registry.
              </span>
            </li>
          </ul>
        </div>

        {/* Regulatory Disclaimers */}
        <div>
          <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase mb-4">Market Status</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            EcoVault operates inside India's voluntary carbon framework. We are preparing support for CCTS and CBAM-exposed exporters as regulatory pathways mature in 2026/2027.
          </p>
          <div className="mt-4 flex items-center gap-1.5 px-3 py-1 bg-emerald-950/40 text-emerald-400 text-[10px] font-medium rounded border border-emerald-900/50 w-fit">
            <BadgeInfo className="w-3.5 h-3.5" />
            CCTS Roadmap 2026
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-900 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
        <p>© 2026 EcoVault India. All rights reserved.</p>
        <p className="font-semibold text-emerald-500/80 bg-emerald-950/30 px-3 py-1 rounded border border-emerald-900/40">
          Prototype built for Marketing Management — EcoVault, Group 8 (IIM Lucknow)
        </p>
      </div>
    </footer>
  );
}
