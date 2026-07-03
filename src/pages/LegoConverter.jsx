import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Upload, RefreshCw, Download, Layers, Grid } from 'lucide-react'
import BackButton from '../components/BackButton'

const LEGO_PALETTE = [
  { name: 'Brick Red', rgb: [227, 0, 11], hex: '#E3000B' },
  { name: 'LEGO Blue', rgb: [0, 85, 191], hex: '#0055BF' },
  { name: 'Bright Yellow', rgb: [255, 213, 0], hex: '#FFD500' },
  { name: 'Electric Green', rgb: [0, 204, 90], hex: '#00CC5A' },
  { name: 'Orange Juice', rgb: [255, 133, 0], hex: '#FF8500' },
  { name: 'Purple Stud', rgb: [147, 51, 234], hex: '#9333EA' },

  // 🌈 MODERN BRIGHT UI COLORS
  { name: 'Sky Cyan', rgb: [0, 209, 255], hex: '#00D1FF' },
  { name: 'Hot Pink', rgb: [255, 0, 128], hex: '#FF0080' },
  { name: 'Lime Pop', rgb: [166, 255, 0], hex: '#A6FF00' },
  { name: 'Sun Glow', rgb: [255, 179, 0], hex: '#FFB300' },
  { name: 'Coral Flash', rgb: [255, 87, 87], hex: '#FF5757' },
  { name: 'Mint Ice', rgb: [0, 255, 204], hex: '#00FFCC' },
  { name: 'Lavender Pop', rgb: [180, 120, 255], hex: '#B478FF' },

  // 🤍 NEUTRALS / SHADING (IMPORTANT FOR CONVERTER)
  { name: 'Pure White', rgb: [255, 255, 255], hex: '#FFFFFF' },
  { name: 'Light Gray', rgb: [200, 200, 200], hex: '#C8C8C8' },
  { name: 'Medium Gray', rgb: [120, 120, 120], hex: '#787878' },
  { name: 'Dark Gray', rgb: [60, 60, 60], hex: '#3C3C3C' },
  { name: 'Deep Black', rgb: [15, 23, 42], hex: '#0F172A' },

  { name: 'Fair Skin', rgb: [255, 224, 189], hex: '#FFE0BD' },
  { name: 'Light Skin', rgb: [241, 194, 125], hex: '#F1C27D' },
  { name: 'Warm Beige', rgb: [224, 172, 105], hex: '#E0AC69' },
  { name: 'Golden Tan', rgb: [198, 134, 66], hex: '#C68642' },
  { name: 'Medium Brown', rgb: [141, 85, 36], hex: '#8D5524' },
  { name: 'Deep Brown', rgb: [95, 58, 30], hex: '#5F3A1E' },

  { name: 'Hair Black', rgb: [20, 20, 20], hex: '#141414' },
  { name: 'Hair Brown', rgb: [90, 55, 30], hex: '#5A371E' },
  { name: 'Hair Blonde', rgb: [240, 210, 120], hex: '#F0D278' },
  { name: 'Hair Red', rgb: [170, 50, 30], hex: '#AA321E' }
];

export default function LegoConverter() {
  const [imageSrc, setImageSrc] = useState(null)
  const [resolution, setResolution] = useState(40) 
  const [brickMatrix, setBrickMatrix] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  
  const fileInputRef = useRef(null)
  const canvasRef = useRef(null)

  const findClosestLegoColor = (r, g, b) => {
    let minDistance = Infinity
    let closestColor = LEGO_PALETTE[0].hex

    for (const color of LEGO_PALETTE) {
      const distance = Math.sqrt(
        Math.pow(r - color.rgb[0], 2) +
        Math.pow(g - color.rgb[1], 2) +
        Math.pow(b - color.rgb[2], 2)
      )
      if (distance < minDistance) {
        minDistance = distance
        closestColor = color.hex
      }
    }
    return closestColor
  }

  const processImageToBricks = () => {
    if (!imageSrc) return
    setIsProcessing(true)

    const img = new window.Image()
    img.src = imageSrc
    img.onload = () => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      
      canvas.width = resolution
      canvas.height = resolution
      
      ctx.drawImage(img, 0, 0, resolution, resolution)
      
      const imgData = ctx.getImageData(0, 0, resolution, resolution).data
      const matrix = []

      for (let y = 0; y < resolution; y++) {
        const row = []
        for (let x = 0; x < resolution; x++) {
          const i = (y * resolution + x) * 4
          const r = imgData[i]
          const g = imgData[i + 1]
          const b = imgData[i + 2]
          
          const legoHex = findClosestLegoColor(r, g, b)
          row.push(legoHex)
        }
        matrix.push(row)
      }

      setBrickMatrix(matrix)
      setIsProcessing(false)
    }
  }

  useEffect(() => {
    if (imageSrc) processImageToBricks()
  }, [resolution, imageSrc])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setImageSrc(reader.result)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-zinc-800 p-8 font-sans relative overflow-hidden">
      <BackButton>Back</BackButton>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-70 pointer-events-none" />

      <canvas ref={canvasRef} className="hidden" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-md border-2 border-slate-200/80 gap-4">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#0055BF] font-black uppercase">B4K // STEM_STUDIO_LAB</span>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 mt-0.5">Image-To-Brick Generator</h1>
          </div>
          
          <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200 w-full md:w-auto">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500">
              <Grid className="w-4 h-4 text-[#0055BF]" /> Size: {resolution}x{resolution}
            </div>
            <input 
              type="range" min="16" max="64" step="4"
              value={resolution} 
              onChange={(e) => setResolution(Number(e.target.value))}
              className="accent-[#0055BF] cursor-pointer w-full md:w-32"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-4 bg-white border-2 border-slate-200/80 p-6 rounded-2xl shadow-xl space-y-6">
            <div>
              <h3 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">1. Upload Source Image</h3>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-200 hover:border-[#0055BF] bg-slate-50 hover:bg-slate-50/50 p-8 rounded-xl transition-all cursor-pointer text-center group flex flex-col items-center justify-center min-h-[180px]"
              >
                <Upload className="w-8 h-8 text-slate-400 group-hover:text-[#0055BF] transition-colors mb-2" />
                <span className="text-xs font-bold text-slate-600">Drag & drop portrait or click to browse</span>
                <span className="text-[10px] font-mono text-slate-400 mt-1">PNG, JPG formats supported</span>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </div>
            </div>

            {imageSrc && (
              <div>
                <h3 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">Original Reference</h3>
                <div className="w-full h-44 rounded-xl overflow-hidden border-2 border-slate-200 relative bg-slate-100">
                  <img src={imageSrc} alt="Reference source" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-8 bg-white border-2 border-slate-200/80 p-6 rounded-2xl shadow-xl min-h-[500px] flex flex-col justify-between items-center relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#E3000B] via-[#FFD500] to-[#0055BF]" />

            <div className="w-full flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
              <span className="text-xs font-mono font-black text-slate-400 tracking-widest">// LIVE_BRICK_MATRIX_PREVIEW</span>
              {imageSrc && (
                <button
                  onClick={processImageToBricks}
                  disabled={isProcessing}
                  className="p-2 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-all text-slate-600 text-xs font-bold flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-[#0055BF] ${isProcessing ? 'animate-spin' : ''}`} />
                  Re-Brick
                </button>
              )}
            </div>

            {brickMatrix.length > 0 ? (
              <div 
                className="bg-[#111622] p-5 rounded-2xl border-4 border-slate-950 shadow-[inset_0_4px_20px_rgba(0,0,0,0.6),0_10px_30px_rgba(0,0,0,0.15)] max-w-full overflow-auto flex items-center justify-center my-auto aspect-square w-[440px] sm:w-[480px]"
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${resolution}, minmax(0, 1fr))`,
                  gap: '0px'           }}
              >
                {brickMatrix.flatMap((row, y) => 
                  row.map((hexColor, x) => (
                    <div 
                      key={`${y}-${x}`}
                      style={{ 
                        backgroundColor: hexColor,
                        boxShadow: `
                          inset 1px 1px 1px rgba(255,255,255,0.25), 
                          inset -1px -1px 1px rgba(0,0,0,0.4),
                          0px 1px 2px rgba(0,0,0,0.3)
                        `
                      }}
                      className="w-full aspect-square relative rounded-[1px] flex items-center justify-center transition-all duration-200"
                    >
                      <div 
                        style={{
                          boxShadow: `
                            0 1px 1px rgba(0,0,0,0.25),
                            inset 1px 1px 1px rgba(255,255,255,0.35),
                            inset -1px -1px 1px rgba(0,0,0,0.3)
                          `
                        }}
                        className="w-[64%] h-[64%] rounded-full bg-inherit filter brightness-105 pointer-events-none flex items-center justify-center"
                      >
                        <div className="w-[80%] h-[80%] rounded-full bg-white/5 border border-white/10 pointer-events-none" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center my-auto p-12 text-slate-400">
                <Layers className="w-12 h-12 text-slate-300 stroke-[1.5] mb-3 animate-pulse" />
                <p className="text-sm font-bold text-slate-600">No Mosaic Generated Yet</p>
                <p className="text-xs text-slate-400 max-w-xs mt-1">Upload a person's photo on the left panel to immediately structure their profile into custom digital bricks!</p>
              </div>
            )}

            {brickMatrix.length > 0 && (
              <div className="w-full border-t border-slate-100 pt-4 mt-4 flex flex-wrap gap-3 justify-center">
                {LEGO_PALETTE.map((color) => (
                  <div key={color.hex} className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60 text-[10px] font-mono font-bold text-slate-600">
                    <div className="w-3 h-3 rounded-full border border-black/10 shadow-xs" style={{ backgroundColor: color.hex }} />
                    {color.name}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  )
}