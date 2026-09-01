import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../lib/api.js';
import Layout from '../components/Layout.jsx';
import PageMeta from '../components/PageMeta.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import { useLegacyScripts } from '../hooks/useLegacyScripts.js';
import { SERVICE_CATEGORIES, getCategoryMeta } from '../lib/serviceCategories.js';
import './service-categories.css';

const ALL = 'All';

export default function Services() {
  const [services, setServices] = useState([]);
  const [ready, setReady] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    api.get('/services')
      .then((s) => setServices(s.data.data))
      .finally(() => setReady(true));
  }, []);

  // Which category tab is active — driven by the URL (?category=...) so links from the
  // home page's category tiles land here pre-filtered, and the filter state is shareable.
  const requestedCategory = searchParams.get('category');
  const activeCategory = requestedCategory && SERVICE_CATEGORIES.some((c) => c.value === requestedCategory)
    ? requestedCategory
    : ALL;

  const setActiveCategory = (value) => {
    if (value === ALL) {
      searchParams.delete('category');
    } else {
      searchParams.set('category', value);
    }
    setSearchParams(searchParams, { replace: true });
  };

  // Only show tabs for categories that actually have at least one service, so an empty
  // category doesn't clutter the filter bar — plus "All".
  const categoriesInUse = useMemo(
    () => SERVICE_CATEGORIES.filter((cat) => services.some((s) => (s.category || 'Cosmetic Surgery') === cat.value)),
    [services]
  );

  const filteredServices = activeCategory === ALL
    ? services
    : services.filter((s) => (s.category || 'Cosmetic Surgery') === activeCategory);

  useLegacyScripts(ready, [filteredServices]);

  const activeMeta = activeCategory !== ALL ? getCategoryMeta(activeCategory) : null;

  return (
    <Layout>
      <PageMeta pageKey="services" fallbackTitle="Services - Natural Cosmetic Surgery Centre" />
      <Breadcrumb title="Services" />

      <section className="services-area p-relative fix pt-150 pb-120 svc-cat-scope">
        <div className="container">
          {categoriesInUse.length > 1 && (
            <div className="svc-filter-bar">
              <button
                type="button"
                className={activeCategory === ALL ? 'active' : ''}
                onClick={() => setActiveCategory(ALL)}
              >
                All Services
              </button>
              {categoriesInUse.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  className={activeCategory === cat.value ? 'active' : ''}
                  onClick={() => setActiveCategory(cat.value)}
                >
                  {cat.shortLabel}
                </button>
              ))}
            </div>
          )}

          {activeMeta && (
            <p className="svc-filter-intro">
              <i className={activeMeta.icon} style={{ marginRight: 8, color: '#70028F' }}></i>
              {activeMeta.blurb}
            </p>
          )}

          <div className="row">
            {filteredServices.map((s) => (
              <div className="col-lg-4 col-md-6 col-sm-12" key={s._id}>
                <Link to={`/services/${s.slug}`} className="services-box mb-30 wow fadeInUp animated" data-animation="fadeInUp" data-delay=".4s">
                  <div className="services-icon">
                    <img src={s.image?.url || '/assets/img/bg/services-01.png'} alt={s.title} />
                  </div>
                  <div className="services-content">
                    <h4>{s.title}</h4>
                    <p>{s.shortDesc}</p>
                    <div className="sbtn">
                      <div className="chevron-button">
                        Read More <i className="fa-regular fa-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            {ready && filteredServices.length === 0 && (
              <div className="col-12 text-center" style={{ padding: '40px 0' }}>
                <p>No services in this category yet. Please check back soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>

    </Layout>
  );
}