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