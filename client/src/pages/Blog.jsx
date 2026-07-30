import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api.js';
import Layout from '../components/Layout.jsx';
import PageMeta from '../components/PageMeta.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import { useLegacyScripts } from '../hooks/useLegacyScripts.js';
import './blog-premium.css';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [ready, setReady] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    api
      .get('/posts')
      .then((res) => setPosts(res.data.data))
      .finally(() => setReady(true));
  }, []);

  useLegacyScripts(ready, [posts]);

  const categories = [...new Set(posts.map((p) => p.category).filter(Boolean))];
  const tags = [...new Set(posts.flatMap((p) => p.tags || []))];

  const filtered = posts.filter((p) => {
    const matchesSearch = search ? p.title.toLowerCase().includes(search.toLowerCase()) : true;
    const matchesCategory = activeCategory ? p.category === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <PageMeta pageKey="blog" fallbackTitle="Blog - Natural Cosmetic Surgery Centre" />
      <Breadcrumb title="Blog" />

      <section className="inner-blog blog-scope">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="blog-main-col">
                <div className="row">
                  {filtered.length === 0 && (
                    <div className="col-12">
                      <div className="blog-empty">No articles found. Try a different search or category.</div>
                    </div>
                  )}
                  {filtered.map((p) => (
                    <div className="col-md-6 mb-30" key={p._id}>
                      <Link to={`/blog/${p.slug}`} className="blog-card">
                        <div className="blog-card-img">
                          {p.coverImage?.url ? (
                            <img src={p.coverImage.url} alt={p.title} />
                          ) : (
                            <img src="/assets/img/blog/inner_b1.jpg" alt={p.title} />
                          )}
                          {p.category && <span className="blog-card-category">{p.category}</span>}
                        </div>
                        <div className="blog-card-body">
                          <h4>
                            <span>{p.title}</span>
                          </h4>
                          <p>{p.excerpt}</p>
                          <span className="blog-card-readmore">
                            Read More <i className="fa-regular fa-arrow-right"></i>
                          </span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <aside className="blog-sidebar">
                <section className="widget widget_search">
                  <h4>Search</h4>
                  <div className="search-box">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="button" aria-label="Search">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </div>
                </section>

                {categories.length > 0 && (
                  <section className="widget widget_categories">
                    <h4>Categories</h4>
                    <ul>
                      <li>
                        <button
                          type="button"
                          className={activeCategory === null ? 'active' : ''}
                          onClick={() => setActiveCategory(null)}
                        >
                          All Categories <i className="fa-solid fa-arrow-right"></i>
                        </button>
                      </li>
                      {categories.map((c) => (
                        <li key={c}>
                          <button
                            type="button"
                            className={activeCategory === c ? 'active' : ''}
                            onClick={() => setActiveCategory(activeCategory === c ? null : c)}
                          >
                            {c} <i className="fa-solid fa-arrow-right"></i>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {posts.length > 0 && (
                  <section className="widget widget_recent_entries">
                    <h4>Recent Posts</h4>
                    <ul>
                      {posts.slice(0, 4).map((p) => (
                        <li className="recent-post-item" key={p._id}>
                          <div className="recent-post-thumb">
                            <img src={p.coverImage?.url || '/assets/img/blog/inner_b1.jpg'} alt={p.title} />
                          </div>
                          <div className="recent-post-info">
                            <Link to={`/blog/${p.slug}`}>{p.title}</Link>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {tags.length > 0 && (
                  <section className="widget widget_tag_cloud">
                    <h4>Tags</h4>
                    <div className="tag-list">
                      {tags.map((t) => (
                        <a href="#" key={t} className="tag" onClick={(e) => e.preventDefault()}>
                          {t}
                        </a>
                      ))}
                    </div>
                  </section>
                )}
              </aside>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}