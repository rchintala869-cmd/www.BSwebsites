import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Palette, 
  Headphones, 
  CheckCircle, 
  MessageSquare, 
  Sparkles,
  Zap,
  Users,
  Eye,
  X,
  PhoneCall,
  ExternalLink
} from 'lucide-react';
import { TeamMember } from '../types';
import { DISPLAY_PHONE, createQuickChatWhatsAppUrl, openWhatsAppLink } from '../utils/whatsapp';

interface TeamSectionProps {
  team: TeamMember[];
  bhargavPhoto?: string;
  bhaveshPhoto?: string;
  sivaPhoto?: string;
  onBookAppointment: (memberName?: string) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({
  team,
  bhargavPhoto,
  bhaveshPhoto,
  sivaPhoto,
  onBookAppointment,
}) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Close lightbox modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedMember(null);
      }
    };
    if (selectedMember) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMember]);

  const getRoleIcon = (role: string) => {
    if (role.toLowerCase().includes('developer')) {
      return <Code2 className="w-5 h-5 text-blue-400" />;
    }
    if (role.toLowerCase().includes('designer')) {
      return <Palette className="w-5 h-5 text-purple-400" />;
    }
    return <Headphones className="w-5 h-5 text-emerald-400" />;
  };

  const getGradientBorder = (index: number) => {
    switch (index) {
      case 0:
        return 'border-blue-500/30 hover:border-blue-500/60 shadow-blue-500/10';
      case 1:
        return 'border-purple-500/30 hover:border-purple-500/60 shadow-purple-500/10';
      case 2:
      default:
        return 'border-emerald-500/30 hover:border-emerald-500/60 shadow-emerald-500/10';
    }
  };

  const getMemberAvatar = (member: TeamMember) => {
    if (member.id === 'bhargav' && bhargavPhoto) return bhargavPhoto;
    if (member.id === 'bhavesh' && bhaveshPhoto) return bhaveshPhoto;
    if (member.id === 'siva' && sivaPhoto) return sivaPhoto;
    return member.avatar;
  };

  const handleMemberWhatsApp = (member: TeamMember) => {
    const text = `Hi BS Websites! I would like to connect with ${member.name} (${member.role}) regarding a new website project.`;
    const url = `https://wa.me/919703281549?text=${encodeURIComponent(text)}`;
    openWhatsAppLink(url);
  };

  return (
    <section id="team" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Users className="w-3.5 h-3.5" />
            Direct Team Collaboration
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Meet The Minds Behind BS Websites
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            No middleman agencies or disconnected ticket queues. You work directly with Bhargav for engineering, Bhavesh for design, and Siva for clear requirements and WhatsApp updates. Click any photo to inspect full profile.
          </p>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div
              key={member.id}
              className={`rounded-3xl bg-gray-900/60 backdrop-blur-md border ${getGradientBorder(
                idx
              )} p-8 flex flex-col justify-between hover:shadow-2xl transition duration-300 relative group overflow-hidden`}
            >
              {/* Subtle top ambient glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>

              <div>
                {/* Avatar & Role Header (Clickable Avatar for Lightbox Modal) */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setSelectedMember(member)}
                      className="relative block rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer group/avatar"
                      title={`Click to view full photo of ${member.name}`}
                    >
                      <img
                        src={getMemberAvatar(member)}
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-700 group-hover:border-indigo-500 transition duration-300 shadow-md group-hover/avatar:scale-105"
                        onError={(e) => {
                          if (member.id === 'bhargav') e.currentTarget.src = '/bhargav.jpg';
                          if (member.id === 'bhavesh') e.currentTarget.src = '/bhavesh.jpg';
                        }}
                      />
                      {/* Hover Overlay Hint */}
                      <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover/avatar:opacity-100 flex items-center justify-center transition duration-200">
                        <Eye className="w-5 h-5 text-white drop-shadow" />
                      </div>
                    </button>
                    
                    <div className="absolute -bottom-1 -right-1 p-1 rounded-lg bg-gray-900 border border-gray-700 shadow pointer-events-none">
                      {getRoleIcon(member.role)}
                    </div>
                  </div>

                  <div>
                    <h3 
                      onClick={() => setSelectedMember(member)}
                      className="text-xl font-bold text-white group-hover:text-indigo-300 transition cursor-pointer flex items-center gap-1.5"
                      title="Click to view full profile photo"
                    >
                      <span>{member.name}</span>
                    </h3>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 mt-0.5">
                      <span>{member.role}</span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                  {member.bio}
                </p>

                {/* Core Skills Chips */}
                <div className="mb-6">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                    Core Specializations:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {member.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs px-2.5 py-1 rounded-lg bg-gray-800/90 text-gray-300 border border-gray-700/80 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Direct Connect Action */}
              <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                <button
                  onClick={() => setSelectedMember(member)}
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Photo</span>
                </button>
                <button
                  onClick={() => onBookAppointment(`Consultation with ${member.name} (${member.role})`)}
                  className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition cursor-pointer"
                >
                  <span>Book 1-on-1 Call</span>
                  <Zap className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Why BS Websites Bento Panel */}
        <div id="why-us" className="mt-20 rounded-3xl bg-gradient-to-r from-gray-900/90 via-indigo-950/30 to-gray-900/90 border border-gray-800 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-1">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Why Work With Us
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-4">
                The BS Websites Advantage
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Most agencies charge ₹40,000+ for basic templates. We provide hand-crafted codebases starting at ₹10,000 with real-time WhatsApp updates from Day 1 to Launch.
              </p>
              <button
                onClick={() => {
                  const url = createQuickChatWhatsAppUrl();
                  openWhatsAppLink(url);
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat directly on WhatsApp ({DISPLAY_PHONE})</span>
              </button>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-gray-900/80 border border-gray-800">
                <div className="text-emerald-400 font-black text-2xl mb-1">99.8%</div>
                <h4 className="text-white font-bold text-sm mb-1">On-Time Delivery Rate</h4>
                <p className="text-gray-400 text-xs">
                  Strict milestones with clear check-ins so your business never waits.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-gray-900/80 border border-gray-800">
                <div className="text-blue-400 font-black text-2xl mb-1">100%</div>
                <h4 className="text-white font-bold text-sm mb-1">Clean Source Code Ownership</h4>
                <p className="text-gray-400 text-xs">
                  Full ownership of HTML/React files with no proprietary vendor lock-in.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-gray-900/80 border border-gray-800">
                <div className="text-purple-400 font-black text-2xl mb-1">₹0</div>
                <h4 className="text-white font-bold text-sm mb-1">Hidden Maintenance Surprises</h4>
                <p className="text-gray-400 text-xs">
                  Transparent upfront pricing including initial hosting and SSL guidance.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-gray-900/80 border border-gray-800">
                <div className="text-amber-400 font-black text-2xl mb-1">24/7</div>
                <h4 className="text-white font-bold text-sm mb-1">Direct WhatsApp Support</h4>
                <p className="text-gray-400 text-xs">
                  Ping Siva or Bhargav on WhatsApp anytime for questions, tweaks, or scaling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX / MODAL FOR FULL-SIZED PROFILE PHOTO */}
      {selectedMember && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedMember(null)}
        >
          <div 
            className="relative max-w-lg w-full rounded-3xl bg-gradient-to-b from-gray-900 to-gray-950 border border-indigo-500/40 p-6 sm:p-8 shadow-2xl shadow-indigo-950/80 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition z-10 cursor-pointer"
              title="Close"
              aria-label="Close Profile Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex flex-col items-center text-center space-y-4">
              {/* Full-Sized Photo Frame */}
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-4 border-indigo-500/50 shadow-2xl shadow-indigo-500/20 bg-gray-900">
                <img
                  src={getMemberAvatar(selectedMember)}
                  alt={selectedMember.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    if (selectedMember.id === 'bhargav') e.currentTarget.src = '/bhargav.jpg';
                    if (selectedMember.id === 'bhavesh') e.currentTarget.src = '/bhavesh.jpg';
                  }}
                />
              </div>

              {/* Name & Role */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {selectedMember.name}
                </h3>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold uppercase tracking-wider mt-2">
                  {getRoleIcon(selectedMember.role)}
                  <span>{selectedMember.role}</span>
                </div>
              </div>

              {/* Bio Summary */}
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-md">
                {selectedMember.bio}
              </p>

              {/* Skills Badges */}
              <div className="flex flex-wrap justify-center gap-1.5 max-w-md pt-1">
                {selectedMember.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-gray-800 text-gray-300 border border-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="w-full pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    handleMemberWhatsApp(selectedMember);
                    setSelectedMember(null);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </button>

                <button
                  onClick={() => {
                    onBookAppointment(`Consultation with ${selectedMember.name}`);
                    setSelectedMember(null);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-gray-700 transition cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-indigo-400" />
                  <span>Book 1-on-1 Call</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
