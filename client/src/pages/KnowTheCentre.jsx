import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api.js';
import Layout from '../components/Layout.jsx';
import PageMeta from '../components/PageMeta.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import './know-the-centre.css';

// Used only if the API can't be reached. Mirrors the defaults in server/src/models/CentrePage.js;
// once the page loads normally, everything shown comes from the admin panel.
const FALLBACK = {
  welcomeHeading: 'Welcome To Natural Cosmetic Surgery Centre',
  welcomeText: '',
  images: [],
  aimHeading: 'Aim',
  aimText: 'We at natural Cosmetic Surgery Center have a aim to deliver.',
  missionHeading: 'Mission',
  missionText: 'Best Quality at affordable Price so everyone can afford best facility',
  visionHeading: 'Vision',
  visionText: 'Establish Jhansi on the world map of plastic surgery as a centre of excellence for plastic & aesthetic surgeries.',
  buttonText: 'Connect With Us',
  buttonLink: '/contact',
  valuesHeading: 'Our Values',
  valuesIntro: '',
  values: [],
};

const isExternal = (url) => /^(https?:|mailto:|tel:)/i.test(url || '');

export default function KnowTheCentre() {
  const [data, setData] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    api
      .get('/centre-page')
      .then((res) => setData(res.data.data))
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  const c = data || FALLBACK;
  const images = (c.images || []).filter((i) => i?.url);
  const paragraphs = (c.welcomeText || '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const blocks = [
    { heading: c.aimHeading, text: c.aimText },
    { heading: c.missionHeading, text: c.missionText },
    { heading: c.visionHeading, text: c.visionText },
  ].filter((b) => b.heading || b.text);
  const values = (c.values || []).filter((v) => v && (v.icon || v.label));
  const buttonLink = c.buttonLink || '/contact';

  return (
    <Layout>
      <PageMeta pageKey="centre" fallbackTitle="Know The Centre - Natural Cosmetic Surgery Centre" />
      <Breadcrumb title="Know The Centre" />

      {!ready ? (
        <div className="container py-5 text-center"><p>Loading...</p></div>
      ) : (
        <div className="ktc-scope">
          {/* Welcome */}
          {(c.welcomeHeading || paragraphs.length > 0) && (
            <section className="ktc-welcome">
              <div className="container">
                <div className="row align-items-start">
                  <div className={paragraphs.length ? 'col-lg-4 col-md-12' : 'col-12 text-center'}>
                    {c.welcomeHeading && <h2>{c.welcomeHeading}</h2>}
                  </div>
                  {paragraphs.length > 0 && (
                    <div className="col-lg-8 col-md-12">
                      {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Photos + Aim / Mission / Vision */}
          <section className="ktc-band">
            <div className="container">
              <div className="ktc-card">
                <div className="row g-0">
                  {images.length > 0 && (
                    <div className="col-lg-5 col-md-12">
                      <div className="ktc-photos">
                        {images.map((img, i) => (
                          <img src={img.url} alt={`Our centre ${i + 1}`} key={img._id || img.url || i} />
                        ))}
                      </div>
                    </div>
                  )}
                  <div className={images.length > 0 ? 'col-lg-7 col-md-12' : 'col-12'}>
                    <div className={`ktc-content${images.length > 0 ? '' : ' ktc-content--full'}`}>
                      {blocks.map((b, i) => (
                        <div className="ktc-block" key={i}>
                          {b.heading && <h4>{b.heading}</h4>}
                          {b.text && <p>{b.text}</p>}
                        </div>
                      ))}
                      {c.buttonText && (
                        isExternal(buttonLink)
                          ? <a href={buttonLink} className="btn ktc-btn">{c.buttonText} <i className="fa-light fa-arrow-right-long"></i></a>
                          : <Link to={buttonLink} className="btn ktc-btn">{c.buttonText} <i className="fa-light fa-arrow-right-long"></i></Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Values (hidden until values are added in the admin panel) */}
          {values.length > 0 && (
            <section className="ktc-values">
              <div className="container text-center">
                {c.valuesHeading && <h3>{c.valuesHeading}</h3>}
                {c.valuesIntro && <p className="ktc-values-intro">{c.valuesIntro}</p>}
                <div className="ktc-values-row">
                  {values.map((v, i) => (
                    <div className="ktc-value" key={i}>
                      <span className="ktc-value-icon">{v.icon && <i className={v.icon}></i>}</span>
                      {v.label && <span className="ktc-value-label">{v.label}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      )}
    </Layout>
  );
}