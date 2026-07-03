import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Logo from "../assets/bricks-4-kidz-logo-1.svg"
import { QRCodeSVG } from 'qrcode.react'
import { LayoutGrid, Layers, Cpu, Shield, Zap, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import BackButton from "../components/BackButton"

const b4kThemes = {
  admin: {
    bg: 'bg-gradient-to-br from-[#FF1E27] via-[#E3000B] to-[#FF4D55]',
    accent: 'bg-white/20 text-white border-white/40',
    glow: 'shadow-red-500/40', stud: 'bg-white/25', darkText: false,
    lanyard: 'from-red-600 to-red-800'
  },
  owner: {
    bg: 'bg-gradient-to-br from-[#0066FF] via-[#0055BF] to-[#3385FF]',
    accent: 'bg-white/20 text-white border-white/40',
    glow: 'shadow-blue-500/40', stud: 'bg-white/25', darkText: false,
    lanyard: 'from-blue-600 to-blue-800'
  },
  teacher: {
    bg: 'bg-gradient-to-br from-[#00CC5A] via-[#00AF4D] to-[#33FF88]',
    accent: 'bg-white/20 text-white border-white/40',
    glow: 'shadow-emerald-500/40', stud: 'bg-white/25', darkText: false,
    lanyard: 'from-emerald-600 to-emerald-800'
  },
  student: {
    bg: 'bg-gradient-to-br from-[#FFD500] via-[#FFE033] to-[#FFEA80]',
    accent: 'bg-black/10 text-zinc-900 border-black/10',
    glow: 'shadow-yellow-400/50', stud: 'bg-black/10', darkText: true,
    lanyard: 'from-yellow-400 to-yellow-500'
  }
}

export default function ModrenCard() {
  const [formData, setFormData] = useState({
    name: 'RAYYAN ABDURREHMAN',
    number: 'B4K-2026-9941',
    email: 'rayyan@bricks4kidz.com',
    role: 'admin',
    territory: 'DUBAI, UAE'
  })

  const [activeStyle, setActiveStyle] = useState('classic')
  const [ribbonStyle, setRibbonStyle] = useState('solid') 
  const [submittedData, setSubmittedData] = useState({ ...formData, style: 'classic' })
  const [isDragging, setIsDragging] = useState(false) // Track user interaction

  const cardRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Drag position values used to distort the ribbon when pulled
  const dragX = useMotionValue(0)
  const dragY = useMotionValue(0)

  const springConfig = { stiffness: 160, damping: 22 }
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [18, -18]), springConfig)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-18, 12]), springConfig)

  // Ribbon physics dynamics linked to mouse hovering OR physical drag offsets
  const ribbonX = useSpring(
    useTransform(() => isDragging ? dragX.get() * 0.45 : x.get() * 24),
    { stiffness: 120, damping: 14 }
  )
  const ribbonSkew = useSpring(
    useTransform(() => isDragging ? dragX.get() * -0.12 : x.get() * -8),
    { stiffness: 120, damping: 14 }
  )
  const ribbonScaleY = useSpring(
    useTransform(() => isDragging ? 1 + Math.abs(dragY.get()) * 0.0025 : 1),
    { stiffness: 150, damping: 15 }
  )

  const handleMouseMove = (event) => {
    if (!cardRef.current || isDragging) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set((event.clientX - rect.left - rect.width / 2) / rect.width)
    y.set((event.clientY - rect.top - rect.height / 2) / rect.height)
  }

  const qrPayload = JSON.stringify({
    name: submittedData.name.toUpperCase(),
    number: submittedData.number,
    email: submittedData.email,
    role: submittedData.role,
    territory: submittedData.territory.toUpperCase()
  })

  const currentTheme = b4kThemes[submittedData.role] || b4kThemes.admin

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-zinc-800 p-6 flex flex-col gap-30 font-sans relative overflow-hidden">
      <BackButton>Back</BackButton>
      
      <div className='flex items-center justify-center'>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-70 pointer-events-none" />
        
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <div className="lg:col-span-5 bg-white border-2 border-slate-200/80 p-8 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#E3000B] via-[#FFD500] to-[#0055BF]" />
            
            <div className="mb-6">
              <span className="text-[11px] font-mono tracking-widest text-[#0055BF] font-black uppercase">B4K // IDENTITY_PORTAL</span>
              <h2 className="text-2xl font-black tracking-tight text-slate-900 mt-0.5">Badge Generator</h2>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setSubmittedData({ ...formData, style: activeStyle }) }} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-slate-200 focus:border-[#0055BF] focus:bg-white rounded-xl px-4 py-2.5 text-sm text-slate-800 outline-none transition-all uppercase font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1">ID Number</label>
                  <input
                    type="text"
                    name="number"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-[#0055BF] focus:bg-white rounded-xl px-4 py-2 text-sm text-slate-800 outline-none transition-all font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1">Territory</label>
                  <input
                    type="text"
                    name="territory"
                    value={formData.territory}
                    onChange={(e) => setFormData({ ...formData, territory: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-[#0055BF] focus:bg-white rounded-xl px-4 py-2 text-sm text-slate-800 outline-none transition-all uppercase font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1">Assigned Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-slate-200 focus:border-[#0055BF] focus:bg-white rounded-xl px-4 py-2 text-sm text-slate-800 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1">Franchise Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-slate-200 focus:border-[#0055BF] focus:bg-white rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none transition-all font-bold"
                >
                  <option value="admin">Master Admin</option>
                  <option value="owner">Franchise Owner</option>
                  <option value="teacher">STEM Coach</option>
                  <option value="student">Junior Builder</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#0055BF] text-white font-extrabold py-3.5 px-4 rounded-xl text-sm hover:bg-[#003F91] active:scale-[0.99] transition-all shadow-md"
              >
                Update Badge System
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 flex flex-col space-y-5 items-center">
            
            <div className="w-full max-w-[440px] bg-white border-2 border-slate-200/80 p-2 rounded-xl shadow-sm grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => { setActiveStyle('classic'); setSubmittedData(p => ({ ...p, style: 'classic' })) }}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg border font-mono text-[10px] font-bold transition-all ${activeStyle === 'classic' ? 'bg-[#0055BF] text-white border-[#0055BF] shadow-sm' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
              >
                <LayoutGrid className="w-3.5 h-3.5" /> Classic
              </button>
              <button
                type="button"
                onClick={() => { setActiveStyle('minimal'); setSubmittedData(p => ({ ...p, style: 'minimal' })) }}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg border font-mono text-[10px] font-bold transition-all ${activeStyle === 'minimal' ? 'bg-[#0055BF] text-white border-[#0055BF] shadow-sm' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
              >
                <Layers className="w-3.5 h-3.5" /> Sleek
              </button>
              <button
                type="button"
                onClick={() => { setActiveStyle('hologram'); setSubmittedData(p => ({ ...p, style: 'hologram' })) }}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg border font-mono text-[10px] font-bold transition-all ${activeStyle === 'hologram' ? 'bg-[#0055BF] text-white border-[#0055BF] shadow-sm' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
              >
                <Cpu className="w-3.5 h-3.5" /> Tech HUD
              </button>
            </div>

            <div className="w-full max-w-[440px] bg-white border-2 border-slate-200/80 p-2 rounded-xl shadow-sm grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRibbonStyle('solid')}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg border font-mono text-[10px] font-bold transition-all ${ribbonStyle === 'solid' ? 'bg-slate-800 text-white border-slate-800 shadow-sm' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
              >
                <Shield className="w-3.5 h-3.5" /> Solid Fabric
              </button>
              <button
                type="button"
                onClick={() => setRibbonStyle('stripe')}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg border font-mono text-[10px] font-bold transition-all ${ribbonStyle === 'stripe' ? 'bg-slate-800 text-white border-slate-800 shadow-sm' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
              >
                <Zap className="w-3.5 h-3.5" /> Sport Stripe
              </button>
              <button
                type="button"
                onClick={() => setRibbonStyle('grid')}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg border font-mono text-[10px] font-bold transition-all ${ribbonStyle === 'grid' ? 'bg-slate-800 text-white border-slate-800 shadow-sm' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
              >
                <Sparkles className="w-3.5 h-3.5" /> Matrix Grid
              </button>
            </div>

            {/* Canvas Outer Boundary Box */}
            <div className="perspective-1000 pt-28 pb-8 w-full flex flex-col justify-center items-center relative">
              
              {/* RIBBON COMPONENT */}
              <motion.div 
                style={{ 
                  x: ribbonX, 
                  skewX: ribbonSkew, 
                  scaleY: ribbonScaleY,
                  originX: 0.5, 
                  originY: 0 
                }}
                className="absolute -top-4 bottom-1/2 left-1/2 -translate-x-1/2 w-10 flex flex-col items-center pointer-events-none z-0"
              >
                <div className={`w-full h-24 bg-gradient-to-b ${currentTheme.lanyard} rounded-t-xs shadow-inner opacity-95 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.12)_50%,transparent_50%)] bg-[size:100%_4px]" />
                  
                  {ribbonStyle === 'stripe' && (
                    <div className="absolute inset-y-0 left-1/3 right-1/3 bg-white backdrop-blur-[1px] border-x border-black/10" />
                  )}
                  {ribbonStyle === 'grid' && (
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.15)_1px,transparent_1px)] bg-[size:4px_6px]" />
                  )}
                </div>

                <div className="w-6 h-6 bg-gradient-to-b from-slate-200 via-slate-400 to-slate-500 rounded-xs shadow-md -mt-1 flex items-center justify-center border-t border-white/30 z-10">
                  <div className="w-1.5 h-3.5 bg-slate-700/60 rounded-full" />
                </div>
                <div className="w-3 h-4 bg-slate-700 rounded-b-md shadow-sm -mt-0.5" />
              </motion.div>

              {/* DYNAMIC SWAYING + DRAGGABLE BADGE PLATFORM */}
              <motion.div
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.65}
                dragTransition={{ bounceStiffness: 240, bounceDamping: 15 }} // Rebound elasticity setup
                dragValues={{ x: dragX, y: dragY }}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => {
                  setIsDragging(false)
                  x.set(0)
                  y.set(0)
                }}
                animate={isDragging ? {} : { y: [0, -10, 0], rotate: [1, 0.8, 1] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => { if (!isDragging) { x.set(0); y.set(0) } }}
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                className={`w-[440px] h-[268px] rounded-2xl ${currentTheme.bg} p-6 pt-11 shadow-2xl ${currentTheme.glow} flex flex-col justify-between border-2 border-white/30 relative overflow-hidden group cursor-grab active:cursor-grabbing select-none z-10`}
              >
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-11 h-2 bg-slate-950/50 rounded-full border border-white/15 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.7)] z-30" />

                {submittedData.style === 'classic' && (
                  <div className="absolute inset-0 grid grid-cols-6 gap-y-8 p-6 pt-12 opacity-25 pointer-events-none z-0">
                    {Array.from({ length: 18 }).map((_, i) => (
                      <div key={i} className={`w-5 h-5 rounded-full ${currentTheme.stud} shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] mx-auto`} />
                    ))}
                  </div>
                )}
                
                {submittedData.style === 'hologram' && (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.2)_100%)] bg-[size:10px_10px] [mask-image:linear-gradient(to_bottom,#000,transparent)] opacity-40 z-0 pointer-events-none" />
                )}

                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-in-out pointer-events-none" />
                
                {submittedData.style === 'classic' && (
                  <>
                    <div className="flex justify-between items-start z-10" style={{ transform: 'translateZ(35px)' }}>
                      <span className={`text-[10px] font-mono font-black px-3 py-1 rounded-lg uppercase tracking-widest bg-white/20 shadow-sm border border-white/20 backdrop-blur-xs transition-all ${currentTheme.accent}`}>
                        {submittedData.role}
                      </span>
                      <div className={`text-right font-mono text-[10px] font-black tracking-widest ${currentTheme.darkText ? 'text-black/60' : 'text-white/80'}`}>BRICKS 4 KIDZ ®</div>
                    </div>

                    <div className="my-1 flex items-center justify-between z-10" style={{ transform: 'translateZ(55px)' }}>
                      <div className="w-16 h-16 relative bg-white/10 rounded-xl border border-white/20 p-2 flex items-center justify-center backdrop-blur-xs">
                        <img src={Logo} alt='Logo' className='w-full h-full object-contain' />
                      </div>
                      <div className={`p-2 rounded-xl ${currentTheme.bg} ${currentTheme.glow} shadow-xl border border-slate-200/50 flex items-center justify-center`}>
                        <QRCodeSVG value={qrPayload} size={58} level="H" className={`${currentTheme.bg}`} />
                      </div>
                    </div>
                  </>
                )}

                {submittedData.style === 'minimal' && (
                  <div className="grid grid-cols-12 gap-4 h-full items-center z-10" style={{ transform: 'translateZ(40px)' }}>
                    <div className="col-span-8 flex flex-col justify-between h-full py-2">
                      <div className="w-20 h-10 relative">
                        <img src={Logo} alt='Logo' className='w-full h-full object-contain' />
                      </div>
                      <span className={`text-[9px] w-max font-mono font-black px-2 py-0.5 rounded uppercase bg-black/10 text-current border text-white border-current/10`}>
                        // TYPE_{submittedData.role.toUpperCase()}
                      </span>
                    </div>
                    <div className="col-span-4 flex justify-end">
                      <div className="bg-white p-2 rounded-xl shadow-lg border border-white/20">
                        <QRCodeSVG value={qrPayload} size={76} level="H" bgColor="#FFFFFF" fgColor="#0F172A" />
                      </div>
                    </div>
                  </div>
                )}

                {submittedData.style === 'hologram' && (
                  <div className="flex flex-col items-center justify-center h-full space-y-3 z-10" style={{ transform: 'translateZ(50px)' }}>
                    <div className="text-[10px] text-white font-mono tracking-widest opacity-80 uppercase border-b border-white/20 pb-1 w-full text-center">
                      🔐 System Token Verification Node
                    </div>
                    <div className="bg-white p-3 rounded-2xl shadow-2xl border-4 border-[#0055BF]/30">
                      <QRCodeSVG value={qrPayload} size={70} level="H" bgColor="#FFFFFF" fgColor="#0F172A" />
                    </div>
                  </div>
                )}

                {submittedData.style !== 'hologram' && (
                  <div className={`space-y-3 z-10 ${currentTheme.darkText ? 'text-zinc-900' : 'text-white'}`} style={{ transform: 'translateZ(45px)' }}>
                    <div className="font-mono text-xl font-black tracking-widest drop-shadow-md">
                      {submittedData.number || 'B4K-XXXX-XXXX'}
                    </div>

                    <div className={`flex justify-between items-end border-t ${currentTheme.darkText ? 'border-black/10' : 'border-white/20'} pt-2`}>
                      <div className="max-w-[70%]">
                        <div className={`text-[8px] font-mono uppercase tracking-wider font-extrabold ${currentTheme.darkText ? 'text-black/50' : 'text-white/70'}`}>Verified Identity</div>
                        <div className="text-sm font-black tracking-wide font-mono truncate uppercase">{submittedData.name || 'GUEST MEMBER'}</div>
                      </div>

                      <div className="text-right">
                        <div className={`text-[8px] font-mono uppercase tracking-wider font-extrabold ${currentTheme.darkText ? 'text-black/50' : 'text-white/70'}`}>Territory</div>
                        <div className="text-xs font-black tracking-wider font-mono uppercase">{submittedData.territory || 'GLOBAL HQ'}</div>
                      </div>
                    </div>
                  </div>
                )}

                {submittedData.style === 'hologram' && (
                  <div className="text-center font-mono text-[10px] tracking-wider font-bold z-10 text-white/90" style={{ transform: 'translateZ(30px)' }}>
                    {submittedData.name} // {submittedData.number}
                  </div>
                )}

              </motion.div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}