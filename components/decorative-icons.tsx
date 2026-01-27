"use client"

export function DecorativeIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {/* Spiral - Top Left */}
      <div className="absolute top-[12%] left-[6%] rotate-12 w-[75px] h-[75px]">
        <img src="/icons/spiral_svg.svg" alt="" className="w-full h-full object-contain" />
      </div>
      
      {/* Atom - Top Right */}
      <div className="absolute top-[15%] right-[7%] -rotate-12 w-[65px] h-[65px]">
        <img src="/icons/atom_1.svg" alt="" className="w-full h-full object-contain" />
      </div>
      
      {/* Laptop - Top Center
      <div className="absolute top-[8%] left-[50%] -translate-x-1/2 rotate-6 w-[68px] h-[68px]">
        <img src="/icons/laptop_svg.svg" alt="" className="w-full h-full object-contain" />
      </div>
      */}
      
      {/* Compass - Middle Left
      <div className="absolute top-[50%] left-[4%] -translate-y-1/2 rotate-45 w-[85px] h-[85px]">
        <img src="/icons/compass.svg" alt="" className="w-full h-full object-contain" />
      </div>
       */}
      
      {/* Planet - Middle Right 
      <div className="absolute top-[50%] right-[6%] -translate-y-1/2 -rotate-30 w-[70px] h-[70px]">
        <img src="/icons/planet_1.svg" alt="" className="w-full h-full object-contain" />
      </div>
      */}
      
      {/* Brain - Bottom Left */}
      <div className="absolute bottom-[18%] left-[5%] rotate-20 w-[80px] h-[80px]">
        <img src="/icons/brain_1.svg" alt="" className="w-full h-full object-contain" />
      </div>
      
      {/* Idea - Bottom Right */}
      <div className="absolute bottom-[15%] right-[8%] -rotate-15 w-[72px] h-[72px]">
        <img src="/icons/idea_svg.svg" alt="" className="w-full h-full object-contain" />
      </div>
      
      {/* Person Phone - Bottom Center
      <div className="absolute bottom-[12%] left-[50%] -translate-x-1/2 -rotate-8 w-[78px] h-[78px]">
        <img src="/icons/person_phone.svg" alt="" className="w-full h-full object-contain" />
      </div>
      */}
    </div>
  )
}
