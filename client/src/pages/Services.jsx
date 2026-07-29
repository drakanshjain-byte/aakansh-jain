import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api.js';
import Layout from '../components/Layout.jsx';
import PageMeta from '../components/PageMeta.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import { useLegacyScripts } from '../hooks/useLegacyScripts.js';

export default function Services() {
  const [services, setServices] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    api.get('/services')
      .then((s) => setServices(s.data.data))
      .finally(() => setReady(true));
  }, []);

  useLegacyScripts(ready, [services]);

  return (
    <Layout>
      <PageMeta pageKey="services" fallbackTitle="Services - Natural Cosmetic Surgery Centre" />
      <Breadcrumb title="Services" />

      <section className="services-area p-relative fix pt-150 pb-120">
        <div className="container">
          <div className="row">
            {services.map((s) => (
              <div className="col-lg-4 col-md-6 col-sm-12" key={s._id}>
                <div className="services-box mb-30 wow fadeInUp animated" data-animation="fadeInUp" data-delay=".4s">
                  <div className="services-icon">
                    <img src={s.image?.url || '/assets/img/bg/services-01.png'} alt={s.title} />
                  </div>
                  <div className="services-content">
                    <div className="icon">
                      <img src={s.icon || '/assets/img/icon/sr-icon-01.png'} alt="icon" />
                    </div>
                    <h4>
                      <Link to={`/services/${s.slug}`}>{s.title}</Link>
                    </h4>
                    <p>{s.shortDesc}</p>
                    <div className="sbtn">
                      <Link to={`/services/${s.slug}`} className="chevron-button">
                        Read More <i className="fa-regular fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  );
}