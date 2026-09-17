import React from 'react';

interface WarrantyCardProps {
  clientName?: string;
  projectName?: string;
  issueDate?: string;
  expiryDate?: string;
  coveragePeriod?: string;
  supportContact?: string;
  certId?: string;
  isSample?: boolean;
  id?: string;
}

export const WarrantyCard: React.FC<WarrantyCardProps> = ({
  clientName = '[ Client / Business Name ]',
  projectName = '[ Project Name / URL ]',
  issueDate = 'September 14, 2026',
  expiryDate = 'March 14, 2027',
  coveragePeriod = '6 Months Full Protection',
  supportContact = '+91 9703281549',
  certId = 'BSW-2026-W8941',
  isSample = false,
  id = 'warranty-card-element',
}) => {
  return (
    <div
      id={id}
      className="relative rounded-2xl sm:rounded-3xl bg-[#07101f] border-2 border-[#2dd4bf]/40 p-5 sm:p-7 md:p-9 shadow-2xl text-white overflow-hidden select-none font-sans"
      style={{
        boxShadow: '0 25px 50px -12px rgba(6, 182, 212, 0.15), 0 0 0 1px rgba(45, 212, 191, 0.25)',
      }}
    >
      {/* Inner double-line frame styling matching reference image */}
      <div className="absolute inset-2 sm:inset-3 rounded-xl sm:rounded-2xl border border-[#2dd4bf]/20 pointer-events-none"></div>

      {/* TOP HEADER: Branding & Certificate ID */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#2dd4bf]/20">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#2dd4bf] tracking-wider leading-none">
            BS WEBSITES
          </h2>
          <p className="text-[9px] sm:text-[11px] font-semibold tracking-wider text-slate-400 uppercase mt-1.5">
            HIGH-PERFORMANCE WEB DESIGN & DEVELOPMENT SERVICES
          </p>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1">
          <div className="px-3.5 py-1 rounded-full border border-[#2dd4bf]/60 bg-[#2dd4bf]/10 text-[#2dd4bf] text-[10px] sm:text-[11px] font-bold tracking-wider uppercase">
            {isSample ? 'SAMPLE 6-MONTH WARRANTY' : 'OFFICIAL WARRANTY CERTIFICATE'}
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 tracking-wider">
            {isSample ? 'SAMPLE TEMPLATE' : `ID: ${certId}`}
          </span>
        </div>
      </div>

      {/* CENTERED MAIN HEADING */}
      <div className="relative z-10 text-center my-4 sm:my-6">
        <h3 className="text-lg sm:text-2xl md:text-3xl font-black text-white tracking-wide uppercase leading-tight">
          {isSample ? 'SAMPLE 6-MONTH WARRANTY CERTIFICATE' : '6-MONTH WEBSITE PERFORMANCE WARRANTY'}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 font-light mt-1">
          Guaranteed Quality, Speed & Operational Integrity
        </p>
      </div>

      {/* TWO-COLUMN CONTENT GRID */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 my-2 sm:my-4">
        {/* LEFT COLUMN: CERTIFICATE DETAILS OR STANDARD SAMPLE GUARANTEE */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          {isSample ? (
            /* Generic Sample View for Customer Portal - Specific customer details omitted */
            <div className="space-y-3">
              <h4 className="text-xs sm:text-sm font-black text-[#2dd4bf] tracking-wider uppercase mb-1">
                6-MONTH COVERAGE GUARANTEE
              </h4>

              <div className="rounded-xl sm:rounded-2xl bg-[#0c1933]/80 border border-[#2dd4bf]/25 p-4 sm:p-5 space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between pb-2 border-b border-[#2dd4bf]/15">
                  <span className="text-slate-400 font-medium text-[11px] sm:text-xs">
                    PROTECTION TERM:
                  </span>
                  <span className="font-bold text-[#2dd4bf] text-[11px] sm:text-xs">
                    180 Days Full Technical Coverage
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-[#2dd4bf]/15">
                  <span className="text-slate-400 font-medium text-[11px] sm:text-xs">
                    APPLICABLE PACKAGES:
                  </span>
                  <span className="font-semibold text-slate-200 text-[11px] sm:text-xs">
                    Basic, Business, E-Commerce & AI
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-[#2dd4bf]/15">
                  <span className="text-slate-400 font-medium text-[11px] sm:text-xs">
                    VERIFIED DELIVERABLES:
                  </span>
                  <span className="font-semibold text-white text-[11px] sm:text-xs">
                    Speed • Clean Code • Mobile UI
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium text-[11px] sm:text-xs">
                    DIRECT SUPPORT HOTLINE:
                  </span>
                  <span className="font-mono font-bold text-[#2dd4bf] text-[11px] sm:text-xs">
                    {supportContact} (Siva)
                  </span>
                </div>
              </div>

              {/* Sample Information Notice */}
              <div className="rounded-xl bg-[#07192f]/60 border border-[#2dd4bf]/20 p-3 text-[11px] text-slate-300 leading-relaxed">
                <span className="text-[#2dd4bf] font-bold">Standard Client Guarantee: </span>
                Every website created by BS Websites receives this official 180-day warranty certificate issued directly upon project handover.
              </div>
            </div>
          ) : (
            /* Restricted Owner Generated View - Personalized customer & project details */
            <div>
              <h4 className="text-xs sm:text-sm font-black text-[#2dd4bf] tracking-wider uppercase mb-2.5">
                CERTIFICATE DETAILS
              </h4>

              <div className="rounded-xl sm:rounded-2xl bg-[#0c1933]/80 border border-[#2dd4bf]/25 p-4 sm:p-5 space-y-2.5 text-xs sm:text-sm">
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-5 text-slate-400 font-medium text-[11px] sm:text-xs">
                    CLIENT NAME:
                  </span>
                  <span className="col-span-7 font-bold text-white truncate text-[11px] sm:text-xs">
                    {clientName}
                  </span>
                </div>

                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-5 text-slate-400 font-medium text-[11px] sm:text-xs">
                    WEBSITE PROJECT:
                  </span>
                  <span className="col-span-7 font-semibold text-slate-200 truncate text-[11px] sm:text-xs">
                    {projectName}
                  </span>
                </div>

                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-5 text-slate-400 font-medium text-[11px] sm:text-xs">
                    ISSUE DATE:
                  </span>
                  <span className="col-span-7 font-semibold text-slate-200 text-[11px] sm:text-xs">
                    {issueDate}
                  </span>
                </div>

                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-5 text-slate-400 font-medium text-[11px] sm:text-xs">
                    EXPIRY DATE:
                  </span>
                  <span className="col-span-7 font-bold text-[#2dd4bf] text-[11px] sm:text-xs">
                    {expiryDate}
                  </span>
                </div>

                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-5 text-slate-400 font-medium text-[11px] sm:text-xs">
                    COVERAGE PERIOD:
                  </span>
                  <span className="col-span-7 font-semibold text-slate-200 text-[11px] sm:text-xs">
                    {coveragePeriod}
                  </span>
                </div>

                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-5 text-slate-400 font-medium text-[11px] sm:text-xs">
                    SUPPORT CONTACT:
                  </span>
                  <span className="col-span-7 font-mono font-bold text-[#2dd4bf] text-[11px] sm:text-xs">
                    {supportContact}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 6 MONTHS COMPLETE GUARANTEE BOX */}
          <div className="rounded-xl border border-dashed border-[#2dd4bf]/40 bg-[#2dd4bf]/10 p-3 sm:p-3.5 text-center">
            <h5 className="text-xs sm:text-sm font-black text-[#2dd4bf] tracking-wide">
              6 MONTHS COMPLETE GUARANTEE
            </h5>
            <p className="text-[10px] sm:text-[11px] text-slate-300 mt-0.5">
              Covering Technical Bugs, Loading Speed & Responsive Layout Integrity
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: SCOPE OF COVERAGE & EXCLUSIONS */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          {/* SCOPE OF COVERAGE */}
          <div>
            <h4 className="text-xs sm:text-sm font-black text-[#2dd4bf] tracking-wider uppercase mb-2.5">
              SCOPE OF COVERAGE
            </h4>
            <div className="space-y-1.5 text-[11px] sm:text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <span className="text-[#2dd4bf] font-bold flex-shrink-0">✓</span>
                <p>
                  <strong className="text-white font-semibold">Performance & Speed:</strong> Fixing unexpected site slowdowns or script errors.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-[#2dd4bf] font-bold flex-shrink-0">✓</span>
                <p>
                  <strong className="text-white font-semibold">Bug Fixes:</strong> Free resolution of layout glitches, link breaks, or code faults.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-[#2dd4bf] font-bold flex-shrink-0">✓</span>
                <p>
                  <strong className="text-white font-semibold">Responsive UI:</strong> Adjustments for cross-device display (Mobile, Tablet, Desktop).
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-[#2dd4bf] font-bold flex-shrink-0">✓</span>
                <p>
                  <strong className="text-white font-semibold">Cross-Browser Support:</strong> Ensuring smooth function on Chrome, Safari, and Edge.
                </p>
              </div>
            </div>
          </div>

          {/* EXCLUSIONS & LIMITATIONS */}
          <div>
            <h4 className="text-xs sm:text-sm font-black text-rose-400 tracking-wider uppercase mb-2">
              EXCLUSIONS & LIMITATIONS
            </h4>
            <div className="space-y-1.5 text-[11px] sm:text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <span className="text-rose-400 font-bold flex-shrink-0">✗</span>
                <p>Damage caused by customer code edits or third-party modifications.</p>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-rose-400 font-bold flex-shrink-0">✗</span>
                <p>External hosting, server downtime, or third-party API service outages.</p>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-rose-400 font-bold flex-shrink-0">✗</span>
                <p>New feature additions or content design changes post-delivery.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TEAM SIGNATURE BLOCKS (Bhargav, Bhavesh, Sivamani Kanta) */}
      <div className="relative z-10 border-t border-[#2dd4bf]/20 pt-5 mt-5">
        <div className="grid grid-cols-3 gap-2 sm:gap-6 text-center">
          {/* Signee 1: Bhargav */}
          <div className="flex flex-col items-center">
            <div 
              className="text-base sm:text-xl text-[#38bdf8] tracking-wider italic select-none"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Bhargav
            </div>
            <div className="w-full max-w-[140px] border-b border-slate-700 my-1"></div>
            <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
              Bhargav
            </span>
            <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              WEB DEVELOPER
            </span>
          </div>

          {/* Signee 2: Bhavesh */}
          <div className="flex flex-col items-center">
            <div 
              className="text-base sm:text-xl text-[#38bdf8] tracking-wider italic select-none"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Bhavesh
            </div>
            <div className="w-full max-w-[140px] border-b border-slate-700 my-1"></div>
            <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
              Bhavesh
            </span>
            <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              WEB DESIGNER
            </span>
          </div>

          {/* Signee 3: Sivamani Kanta */}
          <div className="flex flex-col items-center">
            <div 
              className="text-base sm:text-xl text-[#38bdf8] tracking-wider italic select-none"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Sivamani Kanta
            </div>
            <div className="w-full max-w-[140px] border-b border-slate-700 my-1"></div>
            <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
              Sivamani Kanta
            </span>
            <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              SALES MENTOR
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
