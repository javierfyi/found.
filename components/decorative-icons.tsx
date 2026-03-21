"use client";

export function DecorativeIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
      {/* Top Left - Spiral */}
      <div className="absolute top-[14%] left-[8%] rotate-12 w-[60px] h-[60px] opacity-40">
        <img
          src="/icons/spiral_svg.svg"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* Top Right - Atom */}
      <div className="absolute top-[16%] right-[9%] -rotate-12 w-[55px] h-[55px] opacity-40">
        <img
          src="/icons/atom_1.svg"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* Top Center Left - Laptop */}
      <div className="absolute top-[10%] left-[28%] rotate-6 w-[48px] h-[48px] opacity-30">
        <img
          src="/icons/laptop_svg.svg"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* Top Center Right - Planet */}
      <div className="absolute top-[12%] right-[26%] -rotate-6 w-[50px] h-[50px] opacity-30">
        <img
          src="/icons/planet_1.svg"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* Middle Left - Compass */}
      <div className="absolute top-[48%] left-[5%] -translate-y-1/2 rotate-[25deg] w-[56px] h-[56px] opacity-40">
        <img
          src="/icons/compass.svg"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* Middle Right - Person Phone */}
      <div className="absolute top-[46%] right-[6%] -translate-y-1/2 -rotate-[15deg] w-[54px] h-[54px] opacity-40">
        <img
          src="/icons/person_phone.svg"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* Bottom Left - Brain */}
      <div className="absolute bottom-[16%] left-[10%] rotate-[20deg] w-[58px] h-[58px] opacity-40">
        <img
          src="/icons/brain_1.svg"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* Bottom Right - Idea */}
      <div className="absolute bottom-[18%] right-[10%] -rotate-[10deg] w-[54px] h-[54px] opacity-40">
        <img
          src="/icons/idea_svg.svg"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
