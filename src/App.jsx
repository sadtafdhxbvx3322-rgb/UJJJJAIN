const time = this.clock.getElapsedTime();

    this.scrollProgress += (this.targetScrollProgress - this.scrollProgress) * dt * 2.5;
    this.mouse.lerp(this.targetMouse, dt * 5.0);

    const introEased = 1.0 - Math.pow(1.0 - this.introProgress, 3.0);

    const theta = this.mouse.x * 0.4 + this.scrollProgress * Math.PI * 2.5;
    const phi = (this.mouse.y * 0.3) + 0.3 - (this.scrollProgress * 0.8);

    let radius = 7.5;
    if (this.scrollProgress < 0.25) {
      radius = 7.5 - (this.scrollProgress * 4.0);
    } else if (this.scrollProgress < 0.5) {
      radius = 6.5 + Math.sin((this.scrollProgress - 0.25) * Math.PI * 4) * 1.5;
    } else {
      radius = 5.0 + (this.scrollProgress - 0.5) * 5.0;
    }
    
    radius -= introEased * 1.2;

    this.cameraRig.posVel.x = Math.sin(theta) * radius;
    this.cameraRig.posVel.y = Math.max(0.1, phi * 5.0 + 0.2);
    this.cameraRig.posVel.z = Math.cos(theta) * radius;

    this.cameraRig.pos.lerp(this.cameraRig.posVel, dt * 2.5);
    this.camera.position.copy(this.cameraRig.pos);

    const targetY = 0.2 + this.scrollProgress * 1.5;
    this.cameraRig.lookVel.set(this.mouse.x * 0.5, targetY, this.mouse.y * 0.5);
    this.cameraRig.lookAt.lerp(this.cameraRig.lookVel, dt * 3.0);
    this.camera.lookAt(this.cameraRig.lookAt);

    if (this.deity) {
      this.deity.material.uniforms.uTime.value = time;
      this.deity.material.uniforms.uCameraPos.value.copy(this.camera.position);
      this.deity.material.uniforms.uIntensity.value = introEased + this.scrollProgress * 0.5;
      this.deity.rotation.y = time * 0.05 + this.scrollProgress;
    }

    if (this.aura) {
      this.aura.material.uniforms.uTime.value = time;
      this.aura.material.uniforms.uCameraPos.value.copy(this.camera.position);
      const auraScale = 1.0 + Math.sin(this.scrollProgress * Math.PI) * 0.3;
      this.aura.scale.set(auraScale, auraScale, auraScale);
    }

    if (this.ground) {
      this.ground.material.uniforms.uTime.value = time;
    }

    if (this.particles) {
      this.particles.material.uniforms.uTime.value = time;
      const vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.5);
      vector.unproject(this.camera);
      const dir = vector.sub(this.camera.position).normalize();
      const distance = -this.camera.position.z / dir.z;
      const pos = this.camera.position.clone().add(dir.multiplyScalar(distance));
      
      this.particles.material.uniforms.uMouse.value.lerp(pos, dt * 4.0);
      this.particles.rotation.y = time * 0.02;
    }

    this.keyLight.position.x = this._keyBasePos.x + this.mouse.x * 3.0;
    this.keyLight.position.y = this._keyBasePos.y + this.mouse.y * 2.0;
    this.fillPoint.intensity = 3.5 + Math.sin(time * 2.0) * 0.5 + introEased * 2.0;

    const colorDeep = new THREE.Color(0x0c0704).lerp(new THREE.Color(0x1a0b05), this.scrollProgress);
    this.deity.material.uniforms.uColorDeep.value = colorDeep;

    this.renderer.setRenderTarget(this.rtScene);
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);

    this.brightMat.uniforms.uScene.value = this.rtScene.texture;
    this._renderPass(this.brightMat, this.rtBright);

    this.blurMat.uniforms.uTex.value = this.rtBright.texture;
    this.blurMat.uniforms.uDirection.value.set(1.5, 0);
    this._renderPass(this.blurMat, this.rtBlurA);

    this.blurMat.uniforms.uTex.value = this.rtBlurA.texture;
    this.blurMat.uniforms.uDirection.value.set(0, 1.5);
    this._renderPass(this.blurMat, this.rtBlurB);

    this.compositeMat.uniforms.uScene.value = this.rtScene.texture;
    this.compositeMat.uniforms.uBloom.value = this.rtBlurB.texture;
    this.compositeMat.uniforms.uTime.value = time;
    
    const scrollVelocity = Math.abs(this.targetScrollProgress - this.scrollProgress);
    this.compositeMat.uniforms.uAberration.value = 0.8 + scrollVelocity * 15.0;
    this.compositeMat.uniforms.uBloomStrength.value = 0.85 + introEased * 0.4;
    
    this.renderer.setRenderTarget(null);
    this._renderPass(this.compositeMat, null);

    this.req = requestAnimationFrame(this.render.bind(this));
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.req);
    this.renderer.dispose();
    this.rtScene.dispose();
    this.rtBright.dispose();
    this.rtBlurA.dispose();
    this.rtBlurB.dispose();
    window.removeEventListener("resize", this._resize);
  }
}

/* ============================================================================
   UJJAIN BRAHMAN — Brand & UI Layer (VIP Luxury Pilgrimage)
   ========================================================================== */

const INJECTED_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Montserrat:wght@100;200;300;400;500&family=Noto+Serif+Devanagari:wght@200;300;400&display=swap');

  :root {
    --gold: #d4af6a;
    --gold-dim: rgba(212, 175, 106, 0.35);
    --gold-glow: rgba(255, 184, 77, 0.4);
    --dark: #030201;
    --glass-bg: rgba(7, 5, 4, 0.45);
    --glass-border: rgba(212, 175, 106, 0.25);
    --glass-highlight: rgba(255, 255, 255, 0.08);
    --sanskrit-color: rgba(255, 255, 255, 0.015);
  }

  * { box-sizing: border-box; cursor: none; }
  
  body, html {
    margin: 0; padding: 0;
    width: 100%; height: 100%;
    background: var(--dark);
    color: white;
    font-family: 'Montserrat', sans-serif;
    overflow-x: hidden;
    overscroll-behavior: none;
    -webkit-font-smoothing: antialiased;
  }

  /* Architectural Grid Lines */
  .grid-overlay {
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    pointer-events: none; z-index: 1;
    background-image: 
      linear-gradient(to right, rgba(212, 175, 106, 0.02) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(212, 175, 106, 0.02) 1px, transparent 1px);
    background-size: 12vw 12vh;
    mask-image: radial-gradient(circle at center, black 25%, transparent 100%);
    -webkit-mask-image: radial-gradient(circle at center, black 25%, transparent 100%);
  }

  /* Custom Cursor */
  .custom-cursor {
    position: fixed; top: 0; left: 0; width: 30px; height: 30px;
    border: 1px solid var(--gold); border-radius: 50%;
    transform: translate(-50%, -50%); pointer-events: none; z-index: 10000;
    transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s;
    display: flex; justify-content: center; align-items: center;
    mix-blend-mode: difference;
  }
  .custom-cursor::after {
    content: ''; width: 4px; height: 4px; background: var(--gold); border-radius: 50%;
  }
  .custom-cursor.hover {
    width: 75px; height: 75px; background: rgba(212, 175, 106, 0.08); backdrop-filter: blur(1px);
    border-color: rgba(212, 175, 106, 0.5);
  }

  ::-webkit-scrollbar { display: none; }

  .font-cinzel { font-family: 'Cinzel', serif; }
  .font-sanskrit { font-family: 'Noto Serif Devanagari', serif; }
  
  /* Ultra-Premium Glassmorphism */
  .glass-panel {
    background: var(--glass-bg);
    backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px);
    border: 1px solid var(--glass-border);
    box-shadow: 0 40px 80px rgba(0,0,0,0.8), inset 0 1px 0 var(--glass-highlight);
    position: relative; overflow: hidden;
    border-radius: 6px;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease, background 0.6s ease;
  }
  .glass-panel:hover {
    background: rgba(12, 8, 6, 0.6);
    box-shadow: 0 50px 100px rgba(0,0,0,0.95), inset 0 1px 0 rgba(212, 175, 106, 0.5);
  }
  .glass-panel::after {
    content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
    background: radial-gradient(circle at center, var(--gold-dim) 0%, transparent 45%);
    opacity: 0; pointer-events: none; transition: opacity 0.6s ease;
  }
  .glass-panel:hover::after { opacity: 0.12; }

  .text-glow { text-shadow: 0 0 45px var(--gold-glow); }
  
  /* Magnetic CTA Button */
  .magnetic-btn {
    position: relative; display: inline-flex; align-items: center; justify-content: center;
    padding: 22px 55px; background: rgba(0,0,0,0.5); color: var(--gold);
    border: 1px solid var(--gold); backdrop-filter: blur(12px);
    font-family: 'Cinzel', serif; font-size: 0.8rem; font-weight: 500;
    letter-spacing: 5px; text-transform: uppercase; overflow: hidden; 
    transition: all 0.6s cubic-bezier(0.7, 0, 0.2, 1);
    border-radius: 2px;
  }
  .magnetic-btn::before {
    content: ''; position: absolute; top: 100%; left: 0; width: 100%; height: 100%;
    background: var(--gold); transition: transform 0.6s cubic-bezier(0.7, 0, 0.2, 1); z-index: -1;
  }
  .magnetic-btn:hover { color: var(--dark); box-shadow: 0 0 35px var(--gold-glow); border-color: transparent; }
  .magnetic-btn:hover::before { transform: translateY(-100%); }

  /* WhatsApp FAB */
  .wa-fab {
    position: fixed; bottom: 45px; right: 45px; width: 65px; height: 65px;
    background: rgba(37, 211, 102, 0.15); border: 1px solid rgba(37, 211, 102, 0.4);
    border-radius: 50%; display: flex; justify-content: center; align-items: center;
    z-index: 999; backdrop-filter: blur(15px); box-shadow: 0 0 25px rgba(37, 211, 102, 0.15);
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); text-decoration: none; color: #25d366;
  }
  .wa-fab:hover { background: #25d366; color: white; transform: scale(1.08); box-shadow: 0 0 40px rgba(37, 211, 102, 0.5); border-color: #25d366; }

  /* Watermarks & Animations */
  .sanskrit-watermark {
    position: absolute; top: 0; font-size: 20vw; line-height: 1;
    color: var(--sanskrit-color); writing-mode: vertical-rl; text-orientation: upright;
    user-select: none; pointer-events: none; white-space: nowrap; z-index: -1;
  }
  .fade-in { opacity: 1; transform: translateY(0); transition: all 1.8s cubic-bezier(0.16, 1, 0.3, 1); }
  .fade-out { opacity: 0; transform: translateY(60px); transition: all 1.8s cubic-bezier(0.16, 1, 0.3, 1); }

  /* Trust Badges */
  .trust-badges { display: flex; gap: 3rem; align-items: center; margin-top: 3.5rem; opacity: 0.85; }
  .trust-badge { display: flex; align-items: center; gap: 12px; font-size: 0.65rem; font-weight: 500; letter-spacing: 3px; text-transform: uppercase; color: #b3b3b3; }
  
  /* Services Grid */
  .service-item { display: flex; align-items: center; gap: 20px; padding: 20px 0; border-bottom: 1px solid rgba(212, 175, 106, 0.15); transition: background 0.3s; }
  .service-item:hover { background: linear-gradient(90deg, rgba(212, 175, 106, 0.05), transparent); }
  .service-icon { width: 45px; height: 45px; border: 1px solid var(--gold-dim); border-radius: 50%; display: flex; justify-content: center; align-items: center; color: var(--gold); box-shadow: inset 0 0 10px rgba(212,175,106,0.1); }

  /* Elegant Divider */
  .luxury-divider {
    width: 100%; height: 1px; background: linear-gradient(90deg, transparent, var(--gold-dim), transparent); margin: 2rem 0;
  }

  /* Form Inputs */
  .luxury-input {
    width: 100%; background: transparent; border: none; border-bottom: 1px solid var(--glass-border);
    padding: 15px 0; color: white; font-family: 'Montserrat', sans-serif; font-size: 0.85rem; font-weight: 300;
    outline: none; letter-spacing: 2px; transition: border-color 0.4s;
  }
  .luxury-input:focus { border-bottom-color: var(--gold); }
  .luxury-input::placeholder { color: rgba(255,255,255,0.3); }

  /* Mobile Responsiveness */
  @media (max-width: 1024px) {
    .glass-panel { padding: 3.5rem 2.5rem !important; }
    .hero-title { font-size: 9vw !important; }
    .packages-container { flex-direction: column; gap: 2.5rem; }
    .sanskrit-watermark { display: none; }
    nav { padding: 1.5rem 6vw !important; }
    .trust-badges { flex-wrap: wrap; justify-content: center; margin-top: 2.5rem; gap: 1.5rem; }
    .hero-content { left: 5vw !important; text-align: center; right: 5vw !important; transform: translateY(-40%) !important; align-items: center; display: flex; flex-direction: column; }
    .hero-content p { text-align: center; margin-left: auto; margin-right: auto; }
    .about-content, .booking-content { position: relative !important; right: 0 !important; left: 0 !important; width: 92% !important; margin: 0 auto; top: 50% !important; transform: translateY(-50%) !important; }
    .gallery-container { flex-direction: column; height: auto !important; }
    .gallery-card { height: 250px; }
  }
`;

// Advanced Cursor Component
const CustomCursor = () => {
  const cursorRef = useRef(null);
  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) cursorRef.current.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
    };
    const handleHover = (e) => {
      if (['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) || e.target.closest('.magnetic-btn, .service-item, .glass-panel, .gallery-card')) {
        cursorRef.current?.classList.add('hover');
      } else {
        cursorRef.current?.classList.remove('hover');
      }
    };
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);
    return () => { window.removeEventListener('mousemove', moveCursor); window.removeEventListener('mouseover', handleHover); };
  }, []);
  return <div ref={cursorRef} className="custom-cursor" />;
};

const MagneticButton = ({ children, onClick, className = "", style = {} }) => {
  const btnRef = useRef(null);
  const handleMouseMove = (e) => {
    const btn = btnRef.current; if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
  };
  const handleMouseLeave = () => { if (btnRef.current) btnRef.current.style.transform = `translate(0px, 0px)`; };
  return (
    <button ref={btnRef} className={`magnetic-btn ${className}`} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={onClick} style={style}>
      {children}
    </button>
  );
};

const Loader = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 2800);
    const t3 = setTimeout(() => { setPhase(3); setTimeout(onComplete, 1800); }, 5500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--dark)', zIndex: 9999,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      opacity: phase === 3 ? 0 : 1, transition: 'opacity 1.8s cubic-bezier(0.16, 1, 0.3, 1)', pointerEvents: 'none'
    }}>
      <div style={{ opacity: phase >= 1 ? 1 : 0, transform: phase >= 1 ? 'scale(1)' : 'scale(0.85)', transition: 'all 2.2s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <div className="font-sanskrit text-glow" style={{ fontSize: '6.5rem', color: 'var(--gold)', fontWeight: 300 }}>ॐ</div>
      </div>
      <div style={{ marginTop: '2.5rem', opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? 'translateY(0)' : 'translateY(25px)', transition: 'all 1.8s cubic-bezier(0.16, 1, 0.3, 1)', textAlign: 'center' }}>
        <h1 className="font-cinzel" style={{ color: '#fff', letterSpacing: '10px', fontSize: '1.3rem', margin: 0, fontWeight: 500 }}>UJJAIN BRAHMAN</h1>
        <div style={{ height: '1px', width: '30px', background: 'var(--gold)', margin: '1rem auto' }} />
        <p style={{ color: 'var(--gold)', letterSpacing: '4px', fontSize: '0.65rem', textTransform: 'uppercase', marginTop: '10px', fontWeight: 400 }}>Luxury Spiritual Experiences</p>
      </div>
    </div>
  );
};

const Navbar = ({ scrollProgress }) => {
  const isScrolled = scrollProgress > 0.02;
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: isScrolled ? '1.8rem 5vw' : '2.8rem 6vw',
      transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: isScrolled ? 'rgba(7, 5, 4, 0.85)' : 'transparent', backdropFilter: isScrolled ? 'blur(25px)' : 'none',
      borderBottom: isScrolled ? '1px solid rgba(212, 175, 106, 0.15)' : '1px solid transparent'
    }}>
      <div className="font-cinzel" style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
        <span style={{ color: 'white', fontSize: '1.2rem', letterSpacing: '5px', fontWeight: 700 }}>UJJAIN BRAHMAN</span>
      </div>
      <div style={{ display: 'flex', gap: '3.5rem', fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 500 }} className="nav-links">
        {['Experiences', 'Curations', 'Reservations'].map(item => (
          <span key={item} style={{ color: '#d9d9d9', transition: 'color 0.4s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'} onMouseLeave={e => e.currentTarget.style.color = '#d9d9d9'}>{item}</span>
        ))}
      </div>
      <MagneticButton style={{ padding: '12px 28px', fontSize: '0.65rem', letterSpacing: '3px' }}>Enquire Now</MagneticButton>
    </nav>
  );
};

export default function UjjainBrahmanExperience() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (!document.getElementById('uba-styles')) {
      const styleSheet = document.createElement("style"); styleSheet.id = 'uba-styles'; styleSheet.innerText = INJECTED_CSS; document.head.appendChild(styleSheet);
    }
    const scene = new CinematicScene(canvasRef.current); scene.render(); sceneRef.current = scene;

    const handleScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
      setScrollProgress(progress); scene.setScroll(progress);
    };
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1; const y = -(e.clientY / window.innerHeight) * 2 + 1;
      scene.setMouse(x, y);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    return () => { window.removeEventListener('scroll', handleScroll); window.removeEventListener('mousemove', handleMouseMove); scene.dispose(); };
  }, []);

  useEffect(() => {
    if (!loading && sceneRef.current) {
      let introVal = 0; let req;
      const animateIntro = () => { introVal += 0.004; if (introVal > 1) introVal = 1; sceneRef.current.setIntro(introVal); if (introVal < 1) req = requestAnimationFrame(animateIntro); };
      req = requestAnimationFrame(animateIntro); return () => cancelAnimationFrame(req);
    }
  }, [loading]);

  const getSectionClass = (start, end) => (scrollProgress >= start && scrollProgress < end) ? 'fade-in' : 'fade-out';

  return (
    <>
      <CustomCursor />
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      {/* Background WebGL Engine */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
        <canvas ref={canvasRef} style={{ display: 'block' }} />
      </div>

      <div className="grid-overlay" />
      <Navbar scrollProgress={scrollProgress} />
      
      {/* WhatsApp Floating Action Button */}
      <a href="https://wa.me/" target="_blank" rel="noreferrer" className="wa-fab">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
      </a>

      {/* Scrollable Container (5 Sections = 500vh) */}
      <div style={{ position: 'relative', height: '500vh', zIndex: 10 }}>
        
        {/* 1. HERO SECTION */}
        <section style={{ height: '100vh', position: 'relative' }}>
          <div className="sanskrit-watermark font-sanskrit" style={{ right: '4vw', top: '15vh', opacity: 0.8 }}>महाकाल</div>
          <div className={`hero-content ${getSectionClass(0, 0.15)}`} style={{
            position: 'absolute', top: '50%', left: '10vw', transform: 'translateY(-50%)', maxWidth: '850px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '2rem' }}>
              <div style={{ width: '50px', height: '1px', background: 'var(--gold)' }} />
              <span style={{ color: 'var(--gold)', letterSpacing: '6px', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Luxury Spiritual Experiences</span>
            </div>
            <h2 className="font-cinzel text-glow hero-title" style={{ fontSize: '4.8vw', margin: 0, lineHeight: 1.15, color: 'white', fontWeight: 800 }}>
              THE DIVINE ENCOUNTER <br/><span style={{ color: 'var(--gold)' }}>PERFECTED.</span>
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 2.1, color: '#e6e6e6', margin: '3rem 0', fontWeight: 300, maxWidth: '80%' }}>
              Experience the eternal city of Ujjain with absolute privilege. From guaranteed Bhasma Aarti access to five-star hospitality, we orchestrate your spiritual journey with flawless precision and deep reverence.
            </p>
            <MagneticButton>Reserve Your Journey</MagneticButton>
            
            <div className="trust-badges">
              <div className="trust-badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--gold)"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
                5000+ Journeys Crafted
              </div>
              <div className="trust-badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--gold)"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                Authorized Local Pandits
              </div>
              <div className="trust-badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--gold)"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>
                Premium Chauffeur Fleet
              </div>
            </div>
          </div>
        </section>

        {/* 2. SERVICES SECTION */}
        <section style={{ height: '100vh', position: 'relative' }}>
          <div className="sanskrit-watermark font-sanskrit" style={{ left: '4vw', top: '20vh', opacity: 0.8 }}>दर्शन</div>
          <div className={`about-content ${getSectionClass(0.15, 0.35)}`} style={{
            position: 'absolute', top: '50%', right: '10vw', transform: 'translateY(-50%)', width: '550px'
          }}>
            <div className="glass-panel" style={{ padding: '4.5rem', borderTop: '2px solid var(--gold)' }}>
              <div className="font-sanskrit" style={{ color: 'var(--gold)', fontSize: '1.4rem', marginBottom: '0.8rem' }}>सेवा</div>
              <div className="font-cinzel text-glow" style={{ color: 'white', fontSize: '2.2rem', marginBottom: '1.5rem', fontWeight: 600 }}>THE SANCTUM ACCESS</div>
              <p style={{ color: '#cccccc', fontSize: '0.9rem', lineHeight: 1.9, marginBottom: '2.5rem', fontWeight: 300 }}>
                We eliminate the friction of pilgrimage. Our concierge secures your presence before the deity while flawlessly managing every tier of luxury logistics.
              </p>
              
              <div className="luxury-divider" />
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div className="service-item">
                  <div className="service-icon"><span className="font-cinzel">I</span></div>
                  <div><div style={{ color: 'white', fontSize: '0.95rem', fontWeight: 500, letterSpacing: '2px' }}>VIP Mahakal Darshan</div><div style={{ color: '#999', fontSize: '0.75rem', marginTop: '4px', fontWeight: 300 }}>Expedited access and ceremonial entry.</div></div>
                </div>
                <div className="service-item">
                  <div className="service-icon"><span className="font-cinzel">II</span></div>
                  <div><div style={{ color: 'white', fontSize: '0.95rem', fontWeight: 500, letterSpacing: '2px' }}>Bhasma Aarti Access</div><div style={{ color: '#999', fontSize: '0.75rem', marginTop: '4px', fontWeight: 300 }}>Confirmed placement for the sacred morning rituals.</div></div>
                </div>
                <div className="service-item">
                  <div className="service-icon"><span className="font-cinzel">III</span></div>
                  <div><div style={{ color: 'white', fontSize: '0.95rem', fontWeight: 500, letterSpacing: '2px' }}>Luxury Accommodations</div><div style={{ color: '#999', fontSize: '0.75rem', marginTop: '4px', fontWeight: 300 }}>Curated stays at Ujjain's most prestigious properties.</div></div>
                </div>
                <div className="service-item" style={{ border: 'none', paddingBottom: 0 }}>
                  <div className="service-icon"><span className="font-cinzel">IV</span></div>
                  <div><div style={{ color: 'white', fontSize: '0.95rem', fontWeight: 500, letterSpacing: '2px' }}>Dedicated Pandit Assistance</div><div style={{ color: '#999', fontSize: '0.75rem', marginTop: '4px', fontWeight: 300 }}>Personalized spiritual guidance and private poojas.</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. PACKAGES SECTION */}
        <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className={getSectionClass(0.35, 0.6)} style={{ width: '100%', padding: '0 6vw', zIndex: 2 }}>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <div className="font-sanskrit" style={{ color: 'var(--gold)', fontSize: '1.6rem', marginBottom: '1.2rem' }}>यात्रा</div>
              <h3 className="font-cinzel text-glow" style={{ color: 'white', fontSize: '3.2rem', margin: 0, fontWeight: 700 }}>CURATED JOURNEYS</h3>
            </div>
            
            <div className="packages-container" style={{ display: 'flex', gap: '3rem', justifyContent: 'center' }}>
              {[
                { title: 'The Devotee', subtitle: 'Essential Luxury', desc: 'VIP Mahakal Darshan, private local temple tour including Kaal Bhairav, and premium sedan transfers from Indore.', price: 'Enquire' },
                { title: 'The Signature', subtitle: 'Premium Access', desc: 'Guaranteed Bhasma Aarti, VIP Darshan, luxurious 4-Star accommodations, and a dedicated chauffeur for 2 days.', price: 'Reserve', highlight: true },
                { title: 'The Absolute', subtitle: 'Bespoke Devotion', desc: 'Exclusive VIP Darshan, 5-Star Suite, personal Pandit for private ceremonies, and total luxury itinerary management.', price: 'Bespoke' }
              ].map((pkg, i) => (
                <div key={i} className="glass-panel" style={{
                  flex: 1, padding: '4.5rem 3.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                  borderTop: pkg.highlight ? '2px solid var(--gold)' : '1px solid var(--glass-border)',
                  transform: pkg.highlight ? 'scale(1.05)' : 'scale(1)', zIndex: pkg.highlight ? 10 : 1
                }}>
                  {pkg.highlight && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(90deg, #b8860b, #d4af6a, #b8860b)', color: 'black', padding: '6px 24px', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '3px', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px' }}>RECOMMENDED</div>}
                  <div className="font-cinzel" style={{ color: 'var(--gold)', fontSize: '2rem', marginBottom: '0.8rem', fontWeight: 600, marginTop: pkg.highlight ? '1.5rem' : '0' }}>{pkg.title}</div>
                  <div style={{ color: '#b3b3b3', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '5px', marginBottom: '3rem', fontWeight: 500 }}>{pkg.subtitle}</div>
                  <p style={{ color: '#cccccc', fontSize: '0.9rem', lineHeight: 1.9, marginBottom: 'auto', fontWeight: 300 }}>{pkg.desc}</p>
                  <div className="luxury-divider" style={{ width: '50%' }} />
                  <MagneticButton style={{ width: '100%', marginTop: '1.5rem', padding: '18px 0', fontSize: '0.75rem' }}>{pkg.price}</MagneticButton>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* 4. GALLERY / AESTHETIC PREVIEW */}
        <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className={getSectionClass(0.6, 0.8)} style={{ width: '100%', padding: '0 6vw' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
               <div>
                 <div className="font-sanskrit" style={{ color: 'var(--gold)', fontSize: '1.4rem', marginBottom: '0.8rem' }}>अनुभव</div>
                 <h3 className="font-cinzel text-glow" style={{ color: 'white', fontSize: '2.8rem', margin: 0, fontWeight: 700 }}>THE AESTHETIC</h3>
               </div>
               <div style={{ color: '#999', fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 500 }}>Immersive Splendor</div>
             </div>
             
             <div className="gallery-container" style={{ display: 'flex', gap: '2.5rem', height: '45vh' }}>
               {[
                 { label: 'Mahakaleshwar Jyotirlinga', desc: 'The eternal presence of time itself.', grad: 'linear-gradient(to top, rgba(7,5,4,1), rgba(7,5,4,0.1))' },
                 { label: 'Five-Star Hospitality', desc: 'Uncompromised luxury and restful serenity.', grad: 'linear-gradient(to top, rgba(7,5,4,1), rgba(7,5,4,0.1))' },
                 { label: 'Chauffeur Fleet', desc: 'Seamless, premium travel across the holy city.', grad: 'linear-gradient(to top, rgba(7,5,4,1), rgba(7,5,4,0.1))' }
               ].map((item, i) => (
                 <div key={i} className="glass-panel gallery-card" style={{
                   flex: 1, borderRadius: '6px', position: 'relative', overflow: 'hidden', cursor: 'pointer',
                   background: `rgba(15, 10, 8, 0.3)`, border: '1px solid rgba(212, 175, 106, 0.15)'
                 }}>
                    <div style={{ position: 'absolute', inset: 0, background: item.grad, zIndex: 1 }} />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, opacity: 0.05, width: '60%' }}>
                        <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" stroke="var(--gold)" strokeWidth="2" fill="none"/></svg>
                    </div>
                    <div style={{ position: 'absolute', bottom: '30px', left: '30px', right: '30px', zIndex: 2 }}>
                      <div className="font-cinzel" style={{ color: 'white', fontSize: '1.4rem', fontWeight: 600, marginBottom: '8px' }}>{item.label}</div>
                      <div style={{ color: '#aaa', fontSize: '0.8rem', fontWeight: 300, lineHeight: 1.5, marginBottom: '15px' }}>{item.desc}</div>
                      <div style={{ display: 'inline-block', color: 'var(--gold)', fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase', borderBottom: '1px solid var(--gold)', paddingBottom: '3px' }}>Discover</div>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* 5. BOOKING & FOOTER */}
        <section style={{ height: '100vh', position: 'relative', display: 'flex', flexDirection: 'column', justify-content: 'flex-end' }}>
          <div className={`booking-content ${getSectionClass(0.8, 1.1)}`} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            <div className="glass-panel" style={{ width: '100%', maxWidth: '650px', padding: '5rem', textAlign: 'center', marginBottom: '10vh', borderRadius: '6px' }}>
              <div className="font-sanskrit" style={{ color: 'var(--gold)', fontSize: '2rem', marginBottom: '0.8rem' }}>आवाहन</div>
              <h2 className="font-cinzel text-glow" style={{ color: 'white', fontSize: '2.8rem', margin: '0 0 1.5rem 0', fontWeight: 700 }}>SECURE YOUR DARSHAN</h2>
              <p style={{ color: '#cccccc', fontSize: '0.95rem', marginBottom: '4rem', fontWeight: 300, letterSpacing: '1px', lineHeight: 1.8 }}>Connect with our luxury concierges to curate your bespoke spiritual itinerary.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <div style={{ display: 'flex', gap: '3rem' }}>
                  <input type="text" placeholder="NAME" className="luxury-input" />
                  <input type="text" placeholder="PHONE" className="luxury-input" />
                </div>
                <div style={{ position: 'relative' }}>
                  <select className="luxury-input" style={{ appearance: 'none', cursor: 'pointer', color: '#fff' }}>
                    <option value="" disabled selected style={{ color: '#333' }}>SELECT EXPERIENCE</option>
                    <option value="vip" style={{ color: '#333' }}>VIP Darshan & Stay</option>
                    <option value="bhasma" style={{ color: '#333' }}>Bhasma Aarti Guarantee</option>
                    <option value="full" style={{ color: '#333' }}>Complete Luxury Pilgrimage</option>
                  </select>
                  <div style={{ position: 'absolute', right: '10px', top: '15px', color: 'var(--gold)', pointerEvents: 'none' }}>▼</div>
                </div>
                <MagneticButton style={{ marginTop: '2rem', width: '100%' }}>Request Consultation</MagneticButton>
              </div>
            </div>

            {/* Premium Footer */}
            <div style={{ width: '100%', borderTop: '1px solid rgba(212, 175, 106, 0.2)', padding: '4rem 6vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(to top, rgba(3,2,1,0.95), rgba(3,2,1,0))' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className="font-cinzel" style={{ color: 'var(--gold)', letterSpacing: '6px', fontSize: '1.2rem', fontWeight: 700 }}>UJJAIN BRAHMAN</div>
                <div style={{ color: '#999', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 500 }}>Luxury Spiritual Experiences</div>
                <div style={{ color: '#666', fontSize: '0.65rem', letterSpacing: '2px', marginTop: '15px' }}>Mahakaleshwar Temple Marg, Ujjain, Madhya Pradesh</div>
              </div>
              <div className="font-sanskrit text-glow" style={{ color: 'var(--gold-dim)', fontSize: '4.5rem', opacity: 0.4 }}>ॐ</div>
              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ color: '#e6e6e6', fontSize: '0.85rem', letterSpacing: '3px', fontWeight: 500 }}>+91 99999 00000</div>
                <div style={{ color: '#999', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase' }}>concierge@ujjainbrahman.com</div>
                <div style={{ color: '#555', fontSize: '0.6rem', letterSpacing: '3px', marginTop: '15px', textTransform: 'uppercase' }}>© 2026 Ujjain Brahman. All Rights Reserved.</div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
      </a>

      {/* Scrollable Container (5 Sections = 500vh) */}
      <div style={{ position: 'relative', height: '500vh', zIndex: 10 }}>
        
        {/* 1. HERO SECTION */}
        <section style={{ height: '100vh', position: 'relative' }}>
          <div className="sanskrit-watermark font-sanskrit" style={{ right: '4vw', top: '15vh', opacity: 0.8 }}>महाकाल</div>
          <div className={`hero-content ${getSectionClass(0, 0.15)}`} style={{
            position: 'absolute', top: '50%', left: '10vw', transform: 'translateY(-50%)', maxWidth: '850px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '2rem' }}>
              <div style={{ width: '50px', height: '1px', background: 'var(--gold)' }} />
              <span style={{ color: 'var(--gold)', letterSpacing: '6px', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Luxury Spiritual Experiences</span>
            </div>
            <h2 className="font-cinzel text-glow hero-title" style={{ fontSize: '4.8vw', margin: 0, lineHeight: 1.15, color: 'white', fontWeight: 800 }}>
              THE DIVINE ENCOUNTER <br/><span style={{ color: 'var(--gold)' }}>PERFECTED.</span>
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 2.1, color: '#e6e6e6', margin: '3rem 0', fontWeight: 300, maxWidth: '80%' }}>
              Experience the eternal city of Ujjain with absolute privilege. From guaranteed Bhasma Aarti access to five-star hospitality, we orchestrate your spiritual journey with flawless precision and deep reverence.
            </p>
            <MagneticButton>Reserve Your Journey</MagneticButton>
            
            <div className="trust-badges">
              <div className="trust-badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--gold)"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
                5000+ Journeys Crafted
              </div>
              <div className="trust-badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--gold)"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                Authorized Local Pandits
              </div>
              <div className="trust-badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--gold)"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>
                Premium Chauffeur Fleet
              </div>
            </div>
          </div>
        </section>

        {/* 2. SERVICES SECTION */}
        <section style={{ height: '100vh', position: 'relative' }}>
          <div className="sanskrit-watermark font-sanskrit" style={{ left: '4vw', top: '20vh', opacity: 0.8 }}>दर्शन</div>
          <div className={`about-content ${getSectionClass(0.15, 0.35)}`} style={{
            position: 'absolute', top: '50%', right: '10vw', transform: 'translateY(-50%)', width: '550px'
          }}>
            <div className="glass-panel" style={{ padding: '4.5rem', borderTop: '2px solid var(--gold)' }}>
              <div className="font-sanskrit" style={{ color: 'var(--gold)', fontSize: '1.4rem', marginBottom: '0.8rem' }}>सेवा</div>
              <div className="font-cinzel text-glow" style={{ color: 'white', fontSize: '2.2rem', marginBottom: '1.5rem', fontWeight: 600 }}>THE SANCTUM ACCESS</div>
              <p style={{ color: '#cccccc', fontSize: '0.9rem', lineHeight: 1.9, marginBottom: '2.5rem', fontWeight: 300 }}>
                We eliminate the friction of pilgrimage. Our concierge secures your presence before the deity while flawlessly managing every tier of luxury logistics.
              </p>
              
              <div className="luxury-divider" />
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div className="service-item">
                  <div className="service-icon"><span className="font-cinzel">I</span></div>
                  <div><div style={{ color: 'white', fontSize: '0.95rem', fontWeight: 500, letterSpacing: '2px' }}>VIP Mahakal Darshan</div><div style={{ color: '#999', fontSize: '0.75rem', marginTop: '4px', fontWeight: 300 }}>Expedited access and ceremonial entry.</div></div>
                </div>
                <div className="service-item">
                  <div className="service-icon"><span className="font-cinzel">II</span></div>
                  <div><div style={{ color: 'white', fontSize: '0.95rem', fontWeight: 500, letterSpacing: '2px' }}>Bhasma Aarti Access</div><div style={{ color: '#999', fontSize: '0.75rem', marginTop: '4px', fontWeight: 300 }}>Confirmed placement for the sacred morning rituals.</div></div>
                </div>
                <div className="service-item">
                  <div className="service-icon"><span className="font-cinzel">III</span></div>
                  <div><div style={{ color: 'white', fontSize: '0.95rem', fontWeight: 500, letterSpacing: '2px' }}>Luxury Accommodations</div><div style={{ color: '#999', fontSize: '0.75rem', marginTop: '4px', fontWeight: 300 }}>Curated stays at Ujjain's most prestigious properties.</div></div>
                </div>
                <div className="service-item" style={{ border: 'none', paddingBottom: 0 }}>
                  <div className="service-icon"><span className="font-cinzel">IV</span></div>
                  <div><div style={{ color: 'white', fontSize: '0.95rem', fontWeight: 500, letterSpacing: '2px' }}>Dedicated Pandit Assistance</div><div style={{ color: '#999', fontSize: '0.75rem', marginTop: '4px', fontWeight: 300 }}>Personalized spiritual guidance and private poojas.</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. PACKAGES SECTION */}
        <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className={getSectionClass(0.35, 0.6)} style={{ width: '100%', padding: '0 6vw', zIndex: 2 }}>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <div className="font-sanskrit" style={{ color: 'var(--gold)', fontSize: '1.6rem', marginBottom: '1.2rem' }}>यात्रा</div>
              <h3 className="font-cinzel text-glow" style={{ color: 'white', fontSize: '3.2rem', margin: 0, fontWeight: 700 }}>CURATED JOURNEYS</h3>
            </div>
            
            <div className="packages-container" style={{ display: 'flex', gap: '3rem', justifyContent: 'center' }}>
              {[
                { title: 'The Devotee', subtitle: 'Essential Luxury', desc: 'VIP Mahakal Darshan, private local temple tour including Kaal Bhairav, and premium sedan transfers from Indore.', price: 'Enquire' },
                { title: 'The Signature', subtitle: 'Premium Access', desc: 'Guaranteed Bhasma Aarti, VIP Darshan, luxurious 4-Star accommodations, and a dedicated chauffeur for 2 days.', price: 'Reserve', highlight: true },
                { title: 'The Absolute', subtitle: 'Bespoke Devotion', desc: 'Exclusive VIP Darshan, 5-Star Suite, personal Pandit for private ceremonies, and total luxury itinerary management.', price: 'Bespoke' }
              ].map((pkg, i) => (
                <div key={i} className="glass-panel" style={{
                  flex: 1, padding: '4.5rem 3.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                  borderTop: pkg.highlight ? '2px solid var(--gold)' : '1px solid var(--glass-border)',
                  transform: pkg.highlight ? 'scale(1.05)' : 'scale(1)', zIndex: pkg.highlight ? 10 : 1
                }}>
                  {pkg.highlight && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(90deg, #b8860b, #d4af6a, #b8860b)', color: 'black', padding: '6px 24px', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '3px', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px' }}>RECOMMENDED</div>}
                  <div className="font-cinzel" style={{ color: 'var(--gold)', fontSize: '2rem', marginBottom: '0.8rem', fontWeight: 600, marginTop: pkg.highlight ? '1.5rem' : '0' }}>{pkg.title}</div>
                  <div style={{ color: '#b3b3b3', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '5px', marginBottom: '3rem', fontWeight: 500 }}>{pkg.subtitle}</div>
                  <p style={{ color: '#cccccc', fontSize: '0.9rem', lineHeight: 1.9, marginBottom: 'auto', fontWeight: 300 }}>{pkg.desc}</p>
                  <div className="luxury-divider" style={{ width: '50%' }} />
                  <MagneticButton style={{ width: '100%', marginTop: '1.5rem', padding: '18px 0', fontSize: '0.75rem' }}>{pkg.price}</MagneticButton>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* 4. GALLERY / AESTHETIC PREVIEW */}
        <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className={getSectionClass(0.6, 0.8)} style={{ width: '100%', padding: '0 6vw' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
               <div>
                 <div className="font-sanskrit" style={{ color: 'var(--gold)', fontSize: '1.4rem', marginBottom: '0.8rem' }}>अनुभव</div>
                 <h3 className="font-cinzel text-glow" style={{ color: 'white', fontSize: '2.8rem', margin: 0, fontWeight: 700 }}>THE AESTHETIC</h3>
               </div>
               <div style={{ color: '#999', fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 500 }}>Immersive Splendor</div>
             </div>
             
             <div className="gallery-container" style={{ display: 'flex', gap: '2.5rem', height: '45vh' }}>
               {[
                 { label: 'Mahakaleshwar Jyotirlinga', desc: 'The eternal presence of time itself.', grad: 'linear-gradient(to top, rgba(7,5,4,1), rgba(7,5,4,0.1))' },
                 { label: 'Five-Star Hospitality', desc: 'Uncompromised luxury and restful serenity.', grad: 'linear-gradient(to top, rgba(7,5,4,1), rgba(7,5,4,0.1))' },
                 { label: 'Chauffeur Fleet', desc: 'Seamless, premium travel across the holy city.', grad: 'linear-gradient(to top, rgba(7,5,4,1), rgba(7,5,4,0.1))' }
               ].map((item, i) => (
                 <div key={i} className="glass-panel gallery-card" style={{
                   flex: 1, borderRadius: '6px', position: 'relative', overflow: 'hidden', cursor: 'pointer',
                   background: `rgba(15, 10, 8, 0.3)`, border: '1px solid rgba(212, 175, 106, 0.15)'
                 }}>
                    <div style={{ position: 'absolute', inset: 0, background: item.grad, zIndex: 1 }} />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, opacity: 0.05, width: '60%' }}>
                        <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" stroke="var(--gold)" strokeWidth="2" fill="none"/></svg>
                    </div>
                    <div style={{ position: 'absolute', bottom: '30px', left: '30px', right: '30px', zIndex: 2 }}>
                      <div className="font-cinzel" style={{ color: 'white', fontSize: '1.4rem', fontWeight: 600, marginBottom: '8px' }}>{item.label}</div>
                      <div style={{ color: '#aaa', fontSize: '0.8rem', fontWeight: 300, lineHeight: 1.5, marginBottom: '15px' }}>{item.desc}</div>
                      <div style={{ display: 'inline-block', color: 'var(--gold)', fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase', borderBottom: '1px solid var(--gold)', paddingBottom: '3px' }}>Discover</div>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* 5. BOOKING & FOOTER */}
        <section style={{ height: '100vh', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div className={`booking-content ${getSectionClass(0.8, 1.1)}`} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            <div className="glass-panel" style={{ width: '100%', maxWidth: '650px', padding: '5rem', textAlign: 'center', marginBottom: '10vh', borderRadius: '6px' }}>
              <div className="font-sanskrit" style={{ color: 'var(--gold)', fontSize: '2rem', marginBottom: '0.8rem' }}>आवाहन</div>
              <h2 className="font-cinzel text-glow" style={{ color: 'white', fontSize: '2.8rem', margin: '0 0 1.5rem 0', fontWeight: 700 }}>SECURE YOUR DARSHAN</h2>
              <p style={{ color: '#cccccc', fontSize: '0.95rem', marginBottom: '4rem', fontWeight: 300, letterSpacing: '1px', lineHeight: 1.8 }}>Connect with our luxury concierges to curate your bespoke spiritual itinerary.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <div style={{ display: 'flex', gap: '3rem' }}>
                  <input type="text" placeholder="NAME" className="luxury-input" />
                  <input type="text" placeholder="PHONE" className="luxury-input" />
                </div>
                <div style={{ position: 'relative' }}>
                  <select className="luxury-input" style={{ appearance: 'none', cursor: 'pointer', color: '#fff' }}>
                    <option value="" disabled selected style={{ color: '#333' }}>SELECT EXPERIENCE</option>
                    <option value="vip" style={{ color: '#333' }}>VIP Darshan & Stay</option>
                    <option value="bhasma" style={{ color: '#333' }}>Bhasma Aarti Guarantee</option>
                    <option value="full" style={{ color: '#333' }}>Complete Luxury Pilgrimage</option>
                  </select>
                  <div style={{ position: 'absolute', right: '10px', top: '15px', color: 'var(--gold)', pointerEvents: 'none' }}>▼</div>
                </div>
                <MagneticButton style={{ marginTop: '2rem', width: '100%' }}>Request Consultation</MagneticButton>
              </div>
            </div>

            {/* Premium Footer */}
            <div style={{ width: '100%', borderTop: '1px solid rgba(212, 175, 106, 0.2)', padding: '4rem 6vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(to top, rgba(3,2,1,0.95), rgba(3,2,1,0))' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className="font-cinzel" style={{ color: 'var(--gold)', letterSpacing: '6px', fontSize: '1.2rem', fontWeight: 700 }}>UJJAIN BRAHMAN</div>
                <div style={{ color: '#999', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 500 }}>Luxury Spiritual Experiences</div>
                <div style={{ color: '#666', fontSize: '0.65rem', letterSpacing: '2px', marginTop: '15px' }}>Mahakaleshwar Temple Marg, Ujjain, Madhya Pradesh</div>
              </div>
              <div className="font-sanskrit text-glow" style={{ color: 'var(--gold-dim)', fontSize: '4.5rem', opacity: 0.4 }}>ॐ</div>
              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ color: '#e6e6e6', fontSize: '0.85rem', letterSpacing: '3px', fontWeight: 500 }}>+91 99999 00000</div>
                <div style={{ color: '#999', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase' }}>concierge@ujjainbrahman.com</div>
                <div style={{ color: '#555', fontSize: '0.6rem', letterSpacing: '3px', marginTop: '15px', textTransform: 'uppercase' }}>© 2026 Ujjain Brahman. All Rights Reserved.</div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
}
