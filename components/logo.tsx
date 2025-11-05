export default function Logo() {
    return (
        <div
  className="logo-font text-black transition-transform duration-300 cursor-pointer flex items-baseline text-[clamp(1.5rem,4vw,2.5rem)] sm:text-lg md:text-xl lg:text-2xl"
  style={{
    letterSpacing: '-0.02em',
    textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 2px',
    color: 'rgb(0, 182, 127)',
  }}
>
  <span className="font-pacifico text-[clamp(1.5rem,4vw,2.5rem)]">se</span>
  <span
    className="font-poppins font-extrabold tracking-[-0.1em]"
    style={{
      fontSize: 'clamp(1rem, 3vw, 1.7rem)',
    }}
  >
    W
    <span
      className="font-poppins italic"
    >
      N
    </span>
  </span>
  <span
    className="font-poppins"
    style={{
      fontWeight: 450,
      letterSpacing: '-0.02em',
      fontSize: 'clamp(1.3rem, 3.5vw, 2.2rem)',
    }}
  >
    a.
  </span>
</div>

    );
}