import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api.js';
import Layout from '../components/Layout.jsx';
import PageMeta from '../components/PageMeta.jsx';
import { useLegacyScripts } from '../hooks/useLegacyScripts.js';
import './home-blog.css';
import './dr-hero.css';
import './dr-booking.css';

export default function Home() {
  const [data, setData] = useState({
    slides: [], homeAbout: null, services: [], bookingInfo: null,
    howItWork: [], bookingSection: null, testimonials: [],
    gallery: [], posts: [], settings: null, gallerySection: null,
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get('/slides?page=home'),
      api.get('/home-about-section'),
      api.get('/services'),
      api.get('/booking-info-section'),
      api.get('/how-it-work-steps'),
      api.get('/booking-section'),
      api.get('/testimonials'),
      api.get('/gallery-items?limit=6'),
      api.get('/posts'),
      api.get('/gallery-section'),
    ])
      .then(([slides, homeAbout, services, bookingInfo, how, booking, testi, gallery, posts, gallerySection]) => {
        setData({
          slides: slides.data.data,
          homeAbout: homeAbout.data.data,
          services: services.data.data,
          bookingInfo: bookingInfo.data.data,
          howItWork: how.data.data,
          bookingSection: booking.data.data,
          testimonials: testi.data.data,
          gallery: gallery.data.data,
          posts: posts.data.data,
          gallerySection: gallerySection.data.data,
        });
      })
      .finally(() => setReady(true));
  }, []);

  useLegacyScripts(ready, [data]);

  const slide = data.slides?.[0];

  return (
    <Layout>
      <PageMeta pageKey="home" fallbackTitle="Natural Cosmetic Surgery Centre" />

      {/* hero */}
      <section
        id="home"
        className="dr-hero p-relative fix"
        style={
          slide?.image?.url
            ? {
                backgroundImage: `linear-gradient(135deg, rgba(8,31,54,0.88) 0%, rgba(13,58,92,0.85) 55%, rgba(11,95,165,0.8) 130%), url(${slide.image.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : undefined
        }
      >
        <div className="dr-hero-glow" aria-hidden="true"></div>
        <div className="dr-hero-dots" aria-hidden="true"></div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className="fade-slide bottom">
                <span className="dr-hero-eyebrow">
                  <i className="fa-solid fa-sparkles"></i> {slide?.eyebrowText || 'Best In Town'}
                </span>
                <h1 className="dr-hero-title">{slide?.headline || 'Transforming Looks, Restoring Confidence'}</h1>
                <p className="dr-hero-subtitle">
                  {slide?.subheading ||
                    'Plastic surgery is a specialized medical field that focuses on enhancing and restoring function through surgical and non-surgical techniques.'}
                </p>

                <div className="dr-hero-actions">
                  <Link to={slide?.ctaLink || '/contact'} className="dr-hero-btn">
                    {slide?.ctaText || 'Get Appointment'} <i className="fa-light fa-arrow-right-long"></i>
                  </Link>
                </div>

                <div className="dr-hero-stats">
                  <div className="dr-hero-stat">
                    <h3>{slide?.counter1Value || '50k+'}</h3>
                    <p>{slide?.counter1Label || 'Clients Review'}</p>
                  </div>
                  <div className="dr-hero-stat">
                    <h3>{slide?.counter2Value || '100+'}</h3>
                    <p>{slide?.counter2Label || 'Expert Surgeon'}</p>
                  </div>
                  <div className="dr-hero-stat">
                    <h3>{slide?.counter3Value || '20+'}</h3>
                    <p>{slide?.counter3Label || 'Award Winner'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="dr-hero-visual fade-slide right">
                <div className="dr-hero-blob" aria-hidden="true"></div>
                <div className="dr-hero-photo-wrap">
                  <img src={slide?.heroImage?.url || '/assets/img/slider/header-img.png'} alt={slide?.headline || 'Dr. Aakansh Jain'} />
                </div>

                <div className="dr-hero-float-card">
                  <img src={slide?.clientAvatarsImage?.url || '/assets/img/slider/h-client-img.png'} alt="Happy clients" />
                  <div>
                    <strong>{slide?.happyClientsCount || '2,000+'}</strong>
                    <span>{slide?.happyClientsLabel || 'Happy Clients'}</span>
                  </div>
                </div>

                <div className="dr-hero-badge">
                  <i className="fa-solid fa-award"></i>
                  <span>
                    Award-Winning
                    <br />
                    Cosmetic Care
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* about (home-only, independent from /about page content) */}
      <section id="about" className="about-area about-p pt-150 pb-150 p-relative fix">
        <div className="animations-02">
          <img src="/assets/img/features/ab-ani.png" alt="an-img-01" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12 col-sm-12">
              <div className="s-about-box fix p-relative wow fadeInLeft animated" data-animation="fadeInLeft" data-delay=".4s">
                <div className="img">
                  <img src={data.homeAbout?.primaryImage?.url || '/assets/img/features/about-img-01.png'} alt="img" />
                </div>
                <div className="cartifact-box">
                  <div className="icon">
                    <div>
                      <img src="/assets/img/features/ab-cartficat-icon.svg" alt="img" />
                    </div>
                  </div>
                  <div className="text">
                    <h3>{data.homeAbout?.badgeText || 'Best Awarded Company'}</h3>
                  </div>
                </div>
                <div className="animations-01">
                  <img src="/assets/img/features/lef-ani-abou.png" alt="an-img-01" />
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-12 col-sm-12">
              <div className="about-content s-about-content pl-20 wow fadeInRight animated" data-animation="fadeInRight" data-delay=".4s">
                <div className="row">
                  <div className="col-lg-11">
                    <div className="about-title second-title pb-25">
                      <h5>
                        <span className="line">
                          <img src="/assets/img/bg/h-icon.svg" alt="img" />
                        </span>{' '}
                        {data.homeAbout?.subheading || 'About Us'}
                      </h5>
                      <h2 className="text-anime-style-3">{data.homeAbout?.heading || 'Transform Your Look With Precision'}</h2>
                    </div>
                    <p className="pline">
                      {data.homeAbout?.description ||
                        'Plastic surgery is a specialized branch of medicine that focuses on restoring, enhancing, or reshaping the body for both medical and aesthetic purposes. It helps people improve their appearance.'}
                    </p>
                  </div>
                </div>

                <div className="about-content2 mt-20">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="img">
                        <img
                          src={data.homeAbout?.secondaryImage?.url || '/assets/img/features/about-img-02.png'}
                          alt="img"
                        />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="about-btn pl-20">
                        <div>
                          <Link to={data.homeAbout?.primaryButton?.link || '/services'}>
                            <img src="/assets/img/features/ab-icon-01.svg" alt="img" />{' '}
                            {data.homeAbout?.primaryButton?.text || 'Transfer Surgery'}
                          </Link>
                        </div>
                        <div>
                          <Link to={data.homeAbout?.secondaryButton?.link || '/contact'}>
                            <img src="/assets/img/features/ab-icon-02.svg" alt="img" />{' '}
                            {data.homeAbout?.secondaryButton?.text || 'Support 24/7'}
                          </Link>
                        </div>
                      </div>

                      <ul className="pl-20">
                        {(data.homeAbout?.featurePoints?.length
                          ? data.homeAbout.featurePoints
                          : [{ text: 'Shaping Confidence Through Expert Surgery' }, { text: 'Discover Beauty Beyond Your Imagination' }]
                        ).map((p, i) => (
                          <li key={i}>
                            <i className="fa-regular fa-arrow-right"></i> {p.text}
                          </li>
                        ))}
                      </ul>

                      <div className="about-outer-btn pl-20">
                        <div>
                          <Link to={data.homeAbout?.ctaLink || '/about'} className="btn mr-15">
                            {data.homeAbout?.ctaText || 'Read More'} <i className="fa-light fa-arrow-right-long"></i>
                          </Link>
                        </div>
                        <div className="review">
                          <div className="icon">
                            <img src="/assets/img/features/ab-icon-03.svg" alt="shape" />
                          </div>
                          <div className="text">
                            <div className="star">
                              {data.homeAbout?.ratingValue || '4.9'}/ <img src="/assets/img/features/start-s.png" alt="shape" />
                            </div>
                            <p>{data.homeAbout?.ratingText || '100+ 5star'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* services */}
      <section className="services-area p-relative fix">
        <div
          className="container-box pt-60 pb-150"
          style={{ backgroundColor: '#EAF2FA' }}
        >
          <div className="container">
            <div className="row justify-content-center mb-20">
              <div className="col-lg-7 col-md-12">
                <div className="section-title text-center wow fadeInDown animated" data-animation="fadeInDown" data-delay=".4s">
                  <h5>
                    <span className="line">
                      <img src="/assets/img/bg/h-icon.svg" alt="img" />
                    </span>{' '}
                    Our Services
                  </h5>
                  <h2 className="text-anime-style-3">Excellence In Cosmetic Surgical Care</h2>
                </div>
              </div>
            </div>
            <div className="row">
              {(data.services?.length ? data.services.slice(0, 3) : Array(3).fill(null)).map((s, i) => (
                <div className="col-lg-4 col-md-6 col-sm-12" key={s?._id || i}>
                  <Link to={s ? `/services/${s.slug}` : '/services'} className="services-box wow fadeInUp animated" data-animation="fadeInUp" data-delay=".4s">
                    <div className="services-icon">
                      <img src={s?.image?.url || `/assets/img/bg/services-0${(i % 3) + 1}.png`} alt="icon" />
                    </div>
                    <div className="services-content">
                      <div className="row">
                        <div className="col-lg-10">
                          <h4>{s?.title || 'Facelift Rejuvenation Surgery'}</h4>
                          <div className="sbtn">
                            <div className="chevron-button">
                              Read More <i className="fa-regular fa-arrow-right"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="animations-01">
                        <img src="/assets/img/bg/left-ani-02.png" alt="an-img-01" />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div className="text-center mt-40">
              <Link to="/services" className="btn btn2">
                View All Services <i className="fa-light fa-arrow-right-long"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* how to book: offline, online, contact form */}
      <section className="who-area p-relative fix">
        <div className="container-box pt-150 pb-150">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div className="section-title text-center wow fadeInDown animated mb-50" data-animation="fadeInDown" data-delay=".4s">
                  <h5>
                    <span className="line">
                      <img src="/assets/img/bg/h-icon.svg" alt="img" />
                    </span>{' '}
                    {data.bookingInfo?.eyebrow || 'Booking Made Easy'}
                  </h5>
                  <h2 className="text-anime-style-3">{data.bookingInfo?.heading || 'How To Book Your Appointment'}</h2>
                  {data.bookingInfo?.description && <p className="mt-15">{data.bookingInfo.description}</p>}
                </div>
              </div>
            </div>
            <div className="row align-items-stretch">
              <div className="col-lg-4 col-md-6 col-sm-12 d-flex">
                <div
                  className="how-it-work-box wow fadeInUp animated"
                  data-animation="fadeInUp"
                  data-delay=".2s"
                  style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
                >
                  <div className="no">
                    <i className="fa-solid fa-hospital"></i>
                  </div>
                  <h3>{data.bookingInfo?.offlineHeading || 'Book Offline'}</h3>
                  <div style={{ flexGrow: 1 }}>
                    <p className="mt-10">
                      {data.bookingInfo?.offlineDescription ||
                        'Prefer speaking to someone directly? Call our clinic or walk in to schedule your in-person appointment.'}
                    </p>
                    {data.bookingInfo?.offlineAddress && (
                      <p className="mt-10">
                        <i className="fa-solid fa-location-dot"></i> {data.bookingInfo.offlineAddress}
                      </p>
                    )}
                  </div>
                  <div className="sbtn mt-15" style={{ marginTop: 'auto' }}>
                    <a href={data.bookingInfo?.offlineButtonLink || 'tel:+919278479456'} className="chevron-button">
                      {data.bookingInfo?.offlineButtonText || 'Call Us'} <i className="fa-regular fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 d-flex">
                <div
                  className="how-it-work-box wow fadeInUp animated"
                  data-animation="fadeInUp"
                  data-delay=".4s"
                  style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
                >
                  <div className="no">
                    <i className="fa-solid fa-calendar-check"></i>
                  </div>
                  <h3>{data.bookingInfo?.onlineHeading || 'Book Online'}</h3>
                  <div style={{ flexGrow: 1 }}>
                    <p className="mt-10">
                      {data.bookingInfo?.onlineDescription ||
                        'Book from anywhere, anytime. Fill in a few quick details and our team will confirm your slot.'}
                    </p>
                  </div>
                  <div className="sbtn mt-15" style={{ marginTop: 'auto' }}>
                    <Link to={data.bookingInfo?.onlineButtonLink || '/contact'} className="chevron-button">
                      {data.bookingInfo?.onlineButtonText || 'Book Appointment'} <i className="fa-regular fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 d-flex">
                <div
                  className="how-it-work-box wow fadeInUp animated"
                  data-animation="fadeInUp"
                  data-delay=".6s"
                  style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
                >
                  <div className="no">
                    <i className="fa-solid fa-comment-medical"></i>
                  </div>
                  <h3>{data.bookingInfo?.contactFormHeading || 'Have Questions First?'}</h3>
                  <div style={{ flexGrow: 1 }}>
                    <p className="mt-10">
                      {data.bookingInfo?.contactFormDescription ||
                        'Send us your questions through our contact form and our team will get back to you shortly.'}
                    </p>
                  </div>
                  <div className="sbtn mt-15" style={{ marginTop: 'auto' }}>
                    <Link to={data.bookingInfo?.contactFormButtonLink || '/contact'} className="chevron-button">
                      {data.bookingInfo?.contactFormButtonText || 'Contact Us'} <i className="fa-regular fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* how it work */}
      <section className="how-it-work-area p-relative fix">
        <div className="container-box pt-150">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <div className="section-title text-center wow fadeInDown animated mb-80" data-animation="fadeInDown" data-delay=".4s">
                  <h5>
                    <span className="line">
                      <img src="/assets/img/bg/h-icon.svg" alt="img" />
                    </span>{' '}
                    how it works{' '}
                    <span className="line-2">
                      <img src="/assets/img/bg/h-icon.svg" alt="img" />
                    </span>
                  </h5>
                  <h2 className="text-anime-style-3">Achieve Perfect Shape With Surgery</h2>
                </div>
              </div>
            </div>
            <div className="row">
              {(data.howItWork?.length
                ? data.howItWork
                : [
                    { stepNumber: '01', title: 'Consultation & Assessment' },
                    { stepNumber: '02', title: 'Personalized Treatment Planning' },
                    { stepNumber: '03', title: 'Safe Surgery Procedure' },
                    { stepNumber: '04', title: 'Recovery & Follow-Up' },
                  ]
              ).map((step, i) => (
                <div className="col-lg-3 col-md-6 col-sm-12" key={step._id || i}>
                  <div className="how-it-work-box wow fadeInUp animated" data-animation="fadeInUp" data-delay=".4s">
                    <div className="no">{step.stepNumber || String(i + 1).padStart(2, '0')}</div>
                    <h3>{step.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* booking */}
      <section className="p-relative fix pt-150 pb-150">
        <div className="container">
          <div className="dr-booking">
            <div className="dr-booking-row">
              <div className="dr-booking-content">
                <span className="dr-booking-eyebrow">
                  <i className="fa-solid fa-calendar-check"></i> Book A Visit
                </span>
                <h2 className="dr-booking-title text-anime-style-3">{data.bookingSection?.heading || 'Get an Appoinment'}</h2>
                {data.bookingSection?.description && <p className="dr-booking-subtitle">{data.bookingSection.description}</p>}
                <BookingForm />
              </div>
              <div className="dr-booking-visual">
                <div className="dr-booking-blob" aria-hidden="true"></div>
                <div className="dr-booking-photo-wrap">
                  <img src={data.bookingSection?.image?.url || '/assets/img/bg/booking-img.png'} alt="img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* testimonials */}
      <section className="testimonial-area pt-150 pb-120 p-relative fix">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title text-center wow fadeInDown animated mb-50" data-animation="fadeInDown" data-delay=".4s">
                <h5>
                  <span className="line">
                    <img src="/assets/img/bg/h-icon.svg" alt="img" />
                  </span>{' '}
                  Testimonials
                </h5>
                <h2 className="text-anime-style-3">What Our Client's Say</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {(data.testimonials?.length ? data.testimonials : []).map((t) => (
              <div className="col-lg-4 col-md-6" key={t._id}>
                <div className="testimonial-box mb-30">
                  <div className="qt-icon">
                    <img src="/assets/img/testimonial/qt-icon.png" alt="quote" />
                  </div>
                  <p>{t.quote}</p>
                  <div className="testi-author d-flex align-items-center mt-20">
                    <img src={t.photo?.url || '/assets/img/testimonial/testi_avatar.png'} alt={t.name} style={{ width: 50, borderRadius: '50%', marginRight: 15 }} />
                    <div>
                      <h5 className="mb-0">{t.name}</h5>
                      <span>{t.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* gallery */}
      <section className="gallery-area pb-120 fix">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className="section-title section-title-2 center-align p-relative">
                <h5>
                  <span className="line">
                    <img src="/assets/img/bg/h-icon.svg" alt="img" />
                  </span>{' '}
                  {data.gallerySection?.eyebrow || 'Gallery'}
                </h5>
                <h2 className="text-anime-style-3">{data.gallerySection?.heading || 'Sculpting Dreams Into Stunning Reality'}</h2>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 p-relative text-right d-none d-lg-block">
              <Link to={data.gallerySection?.buttonLink || '/projects'} className="btn btn2">
                {data.gallerySection?.buttonText || 'View All Gallery'} <i className="fa-light fa-arrow-right-long"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {(data.gallery?.length ? data.gallery : []).map((g) => (
              <div className="col-lg-4 col-md-6" key={g._id}>
                <div className="gallery-box mb-30">
                  <img src={g.image?.url} alt={g.category || 'gallery'} style={{ width: '100%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* services ticker / scrollbox */}
      <div className="section-ticker-area fix pt-150 pb-180">
        <div className="section-ticker">
          <div className="ticker">
            <div className="ticker__run">
              <div><span><img src="/assets/img/bg/scrollbox-icon-2.png" alt="img" /> Facelift Surgery</span></div>
              <div><span><img src="/assets/img/bg/scrollbox-icon-2.png" alt="img" /> Breast Augmentation</span></div>
              <div><span><img src="/assets/img/bg/scrollbox-icon-2.png" alt="img" /> Lip Enhancement</span></div>
              <div><span><img src="/assets/img/bg/scrollbox-icon-2.png" alt="img" /> Jawline Contouring</span></div>
            </div>
          </div>
        </div>
        <div className="section-ticker section-ticker-arbic">
          <div className="ticker arabic">
            <div className="ticker__run">
              <div><span><img src="/assets/img/bg/scrollbox-icon.png" alt="img" /> Facelift Surgery</span></div>
              <div><span><img src="/assets/img/bg/scrollbox-icon.png" alt="img" /> Breast Augmentation</span></div>
              <div><span><img src="/assets/img/bg/scrollbox-icon.png" alt="img" /> Lip Enhancement</span></div>
              <div><span><img src="/assets/img/bg/scrollbox-icon.png" alt="img" /> Jawline Contouring</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* blog teaser */}
      <section id="blog" className="blog-area p-relative fix pb-120 home-blog-scope">
        <div className="container">
          <div className="row align-items-center mb-50">
            <div className="col-lg-6 col-md-12">
              <div className="section-title wow fadeInDown animated" data-animation="fadeInDown" data-delay=".4s">
                <h5>
                  <span className="line">
                    <img src="/assets/img/bg/h-icon.svg" alt="img" />
                  </span>{' '}
                  Our Blog
                </h5>
                <h2 className="text-anime-style-3">Latest News &amp; Articles</h2>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 text-right d-none d-lg-block">
              <Link to="/blog" className="btn btn2">
                View All Articles <i className="fa-light fa-arrow-right-long"></i>
              </Link>
            </div>
          </div>

          <div className="home-blog-carousel-wrap">
            {data.posts?.length ? (
              <div className="home-blog-active">
                {data.posts.map((p) => (
                  <div key={p._id}>
                    <Link to={`/blog/${p.slug}`} className="home-blog-card">
                      <div className="home-blog-card-img">
                        {p.coverImage?.url ? (
                          <img src={p.coverImage.url} alt={p.title} />
                        ) : (
                          <img src="/assets/img/blog/inner_b1.jpg" alt={p.title} />
                        )}
                        {p.category && <span className="home-blog-card-category">{p.category}</span>}
                      </div>
                      <div className="home-blog-card-body">
                        <h4>
                          <span>{p.title}</span>
                        </h4>
                        <p>{p.excerpt}</p>
                        <span className="home-blog-card-readmore">
                          Read More <i className="fa-regular fa-arrow-right"></i>
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="text-center mt-30 d-lg-none">
            <Link to="/blog" className="btn btn2">
              View All Articles <i className="fa-light fa-arrow-right-long"></i>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function BookingForm() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [status, setStatus] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.post('/submissions/booking', form);
      setStatus('success');
      setForm({ name: '', email: '', service: '', message: '' });
    } catch (err) {
      setStatus(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={submit} className="dr-booking-form">
      <div className="dr-booking-form-row">
        <div className="dr-field">
          <input type="text" placeholder="First Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="dr-field">
          <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
      </div>
      <div className="dr-field">
        <input type="text" placeholder="Service" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} />
      </div>
      <div className="dr-field">
        <textarea placeholder="Write comments" rows="6" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}></textarea>
      </div>
      <button className="dr-booking-submit" type="submit" disabled={status === 'loading'}>
        <span>{status === 'loading' ? 'Sending...' : 'Submit Now'}</span> <i className="fa-light fa-arrow-right-long"></i>
      </button>
      {status === 'success' && <p className="dr-booking-status success">Thanks! We'll be in touch shortly.</p>}
      {status && status !== 'loading' && status !== 'success' && <p className="dr-booking-status error">{status}</p>}
    </form>
  );
}