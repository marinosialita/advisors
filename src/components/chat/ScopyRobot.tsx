/**
 * SCOPY — the SC Advisors robot.
 * Cute, modern, orange. The eyes carry the SC scribble mark
 * (the abstract strokes at the start of the logo).
 */

/** The original SC scribble mark — two strokes + two dots (one orange). */
export function ScMark({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 29" fill="none" className={className} style={style} aria-hidden="true">
      <path
        d="M23.2826 12.6386C24.9687 12.4012 26.858 11.8867 28.1784 10.007C29.5598 8.04817 29.5598 5.29787 28.1784 3.31923C26.9798 1.59782 25.1109 0.628292 22.9982 0.628292C21.373 0.628292 19.8291 1.24167 18.6509 2.3497C17.2491 3.67539 16.9851 5.35722 16.7413 6.95992C16.5991 7.87009 16.4569 8.80005 16.1115 9.67064C15.563 11.0755 14.6895 12.3616 13.5925 13.4103C11.947 14.9932 9.79367 15.9627 7.01057 16.3782C4.59313 16.7542 2.62261 17.1895 1.30216 19.0889C-0.0792354 21.0478 -0.0792354 23.7981 1.30216 25.7767C2.50072 27.4981 4.38998 28.4677 6.48239 28.4677C8.12787 28.4677 9.65147 27.8543 10.8094 26.7463C12.1908 25.4404 12.4549 23.7783 12.6987 22.1756C12.8409 21.3248 12.9831 20.4344 13.2878 19.6034C13.8363 18.1194 14.7301 16.7739 15.8677 15.6659C17.5742 14.0434 19.9307 12.9552 22.3075 12.7177C22.6325 12.6782 22.9576 12.6386 23.2623 12.599"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M41.2205 12.6386C42.9066 12.4012 44.7959 11.8867 46.1163 10.007C47.4977 8.04817 47.4977 5.29787 46.1163 3.31923C44.9178 1.59782 43.0488 0.628292 40.9564 0.628292C39.3313 0.628292 37.7873 1.24167 36.6091 2.3497C35.2074 3.67539 34.9433 5.35722 34.6995 6.95992C34.5573 7.87009 34.4151 8.80005 34.0698 9.67064C33.5213 11.0755 32.6477 12.3616 31.5508 13.4103C29.9053 14.9932 27.7519 15.9627 24.9688 16.3782C22.5514 16.7542 20.5809 17.1895 19.2604 19.0889C17.879 21.0478 17.879 23.7981 19.2604 25.7767C20.459 27.4981 22.3279 28.4677 24.4406 28.4677C26.0861 28.4677 27.6097 27.8543 28.788 26.7463C30.149 25.4404 30.4335 23.7783 30.6772 22.1756C30.8194 21.3248 30.9616 20.4344 31.2664 19.6034C31.8148 18.1194 32.7087 16.7739 33.8463 15.6659C35.5527 14.0434 37.9092 12.9552 40.286 12.7177C40.6111 12.6782 40.9361 12.6386 41.2408 12.599"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M41.4639 17.3082C40.0419 17.3082 38.6605 17.8226 37.6041 18.7724C35.268 20.8499 35.1054 24.3917 37.2385 26.6671C38.3152 27.8147 39.8591 28.4874 41.4842 28.4874C42.9063 28.4874 44.2876 27.973 45.344 27.0233C47.6802 24.9457 47.8427 21.4039 45.7097 19.1285C44.633 17.9809 43.0891 17.3082 41.4842 17.3082"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M6.09649 11.768C7.51851 11.768 8.8999 11.2536 9.95626 10.3038C12.2924 8.22624 12.455 4.68449 10.3219 2.40906C9.24525 1.24167 7.70134 0.588718 6.09649 0.588718C4.67446 0.588718 3.29307 1.10316 2.23671 2.05291C-0.0994745 4.13047 -0.261992 7.65244 1.87104 9.94765C2.94772 11.0953 4.49163 11.768 6.1168 11.768"
        fill="#FF824D"
      />
    </svg>
  );
}

/** One robot eye — white orb with the SC scribble mark glowing inside. */
function Eye({ blink }: { blink: boolean }) {
  return (
    <div
      className="flex items-center justify-center rounded-full bg-white transition-transform duration-150"
      style={{
        width: '34%',
        aspectRatio: '1',
        transform: blink ? 'scaleY(0.12)' : 'scaleY(1)',
        boxShadow: 'inset 0 -1px 2px rgba(0,0,0,0.15)',
      }}
    >
      <ScMark style={{ width: '72%', color: '#0A0A0A' }} />
    </div>
  );
}

/**
 * The robot face. `size` is the pixel width of the head.
 * `blink` drives the eye-blink animation.
 */
export function ScopyFace({ size = 56, blink = false }: { size?: number; blink?: boolean }) {
  return (
    <div className="relative" style={{ width: size, height: size }} aria-hidden="true">
      {/* antenna */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: '-14%', width: '6%', height: '16%', borderRadius: 99, background: 'linear-gradient(#FF824D,#E56A1E)' }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full bg-bronze"
        style={{
          top: '-26%',
          width: '18%',
          aspectRatio: '1',
          boxShadow: '0 0 8px rgba(255,130,77,0.9)',
        }}
      />
      {/* ears */}
      <div
        className="absolute top-[38%] rounded-full"
        style={{ left: '-7%', width: '12%', height: '24%', background: 'linear-gradient(#FF824D,#E56A1E)' }}
      />
      <div
        className="absolute top-[38%] rounded-full"
        style={{ right: '-7%', width: '12%', height: '24%', background: 'linear-gradient(#FF824D,#E56A1E)' }}
      />
      {/* head */}
      <div
        className="flex h-full w-full flex-col items-center justify-center"
        style={{
          borderRadius: '32%',
          background: 'linear-gradient(160deg, #FF9663 0%, #FF824D 45%, #E56A1E 100%)',
          boxShadow: '0 10px 24px rgba(229,106,30,0.45), inset 0 2px 4px rgba(255,255,255,0.35), inset 0 -3px 6px rgba(0,0,0,0.15)',
        }}
      >
        {/* eyes */}
        <div className="flex w-full items-center justify-center" style={{ gap: '14%' }}>
          <Eye blink={blink} />
          <Eye blink={blink} />
        </div>
        {/* smile */}
        <div
          style={{
            marginTop: '9%',
            width: '30%',
            height: '13%',
            borderBottomLeftRadius: 99,
            borderBottomRightRadius: 99,
            borderBottom: `${Math.max(2, size * 0.045)}px solid rgba(10,10,10,0.85)`,
          }}
        />
      </div>
    </div>
  );
}
