import { useMemo, useState } from 'react'
import './App.css'

const saveKey = 'showa-retro-route.saved'
const postKey = 'showa-retro-route.posts'
const items = [
  {
    "id": "showa-retro-route-1",
    "title": "名古屋 レトロ自販機 seed",
    "area": "名古屋",
    "category": "レトロ自販機",
    "score": 94,
    "summary": "昭和レトロスポット、現存/閉店オートレストラン、レトロ自販機、ゲームセンターを遠征ルート化する保存型メディア。 初期データとして、検索意図、UGC、送客導線を同じ画面で確認できるようにしています。",
    "tags": [
      "レトロ自販機",
      "名古屋",
      "UGC",
      "SEO/AIO"
    ],
    "routes": [
      "宿泊アフィリエイト",
      "ZINE/グッズ販売",
      "スポットスポンサー"
    ],
    "revenue": "宿泊アフィリエイト"
  },
  {
    "id": "showa-retro-route-2",
    "title": "東京 オートレストラン seed",
    "area": "東京",
    "category": "オートレストラン",
    "score": 90,
    "summary": "昭和レトロスポット、現存/閉店オートレストラン、レトロ自販機、ゲームセンターを遠征ルート化する保存型メディア。 初期データとして、検索意図、UGC、送客導線を同じ画面で確認できるようにしています。",
    "tags": [
      "オートレストラン",
      "東京",
      "UGC",
      "SEO/AIO"
    ],
    "routes": [
      "ZINE/グッズ販売",
      "スポットスポンサー",
      "動画企画協賛"
    ],
    "revenue": "ZINE/グッズ販売"
  },
  {
    "id": "showa-retro-route-3",
    "title": "大阪 レトロゲーム seed",
    "area": "大阪",
    "category": "レトロゲーム",
    "score": 86,
    "summary": "昭和レトロスポット、現存/閉店オートレストラン、レトロ自販機、ゲームセンターを遠征ルート化する保存型メディア。 初期データとして、検索意図、UGC、送客導線を同じ画面で確認できるようにしています。",
    "tags": [
      "レトロゲーム",
      "大阪",
      "UGC",
      "SEO/AIO"
    ],
    "routes": [
      "スポットスポンサー",
      "動画企画協賛",
      "保存活動支援"
    ],
    "revenue": "スポットスポンサー"
  },
  {
    "id": "showa-retro-route-4",
    "title": "静岡 閉店史 seed",
    "area": "静岡",
    "category": "閉店史",
    "score": 82,
    "summary": "昭和レトロスポット、現存/閉店オートレストラン、レトロ自販機、ゲームセンターを遠征ルート化する保存型メディア。 初期データとして、検索意図、UGC、送客導線を同じ画面で確認できるようにしています。",
    "tags": [
      "閉店史",
      "静岡",
      "UGC",
      "SEO/AIO"
    ],
    "routes": [
      "動画企画協賛",
      "保存活動支援",
      "宿泊アフィリエイト"
    ],
    "revenue": "動画企画協賛"
  }
]
const revenuePlans = [
  "宿泊アフィリエイト",
  "ZINE/グッズ販売",
  "スポットスポンサー",
  "動画企画協賛",
  "保存活動支援"
]
const buzzIdeas = [
  "UGC投稿キャンペーン",
  "Xで共有できるランキングカード",
  "LINE通知で再訪導線を作る",
  "地域/カテゴリ別LPを量産",
  "スポンサー専用ページ"
]
const faqs = [
  ['誰向けのサービスですか？', 'レトロ自販機・レトロゲーム・オートレストランに関心があり、検索後すぐに行動したいユーザー向けです。'],
  ['主な収益化は何ですか？', '宿泊アフィリエイト、ZINE/グッズ販売、スポットスポンサー、動画企画協賛、保存活動支援を初期導線にします。'],
  ['SEO/AIO/LLMOでは何を狙いますか？', '地域名、カテゴリ、条件、口コミ、通知、比較、FAQを組み合わせたロングテールページを狙います。'],
]

function readArray(key) {
  try { return JSON.parse(localStorage.getItem(key)) ?? [] } catch { return [] }
}

function App() {
  const [query, setQuery] = useState('名古屋')
  const [category, setCategory] = useState('すべて')
  const [saved, setSaved] = useState(() => readArray(saveKey))
  const [posts, setPosts] = useState(() => readArray(postKey))
  const [form, setForm] = useState({ title: '', target: 'レトロ自販機', memo: '' })
  const categories = ['すべて', ...new Set(items.map((item) => item.category))]

  const filtered = useMemo(() => items.filter((item) => {
    const text = [item.title, item.area, item.category, item.summary, item.tags.join(' ')].join(' ')
    return text.includes(query) && (category === 'すべて' || item.category === category)
  }), [query, category])

  function toggleSave(id) {
    const next = saved.includes(id) ? saved.filter((item) => item !== id) : [...saved, id]
    setSaved(next)
    localStorage.setItem(saveKey, JSON.stringify(next))
  }

  function addPost(event) {
    event.preventDefault()
    if (!form.title.trim() || !form.memo.trim()) return
    const next = [{ ...form, id: crypto.randomUUID(), date: new Date().toLocaleDateString('ja-JP') }, ...posts]
    setPosts(next)
    localStorage.setItem(postKey, JSON.stringify(next))
    setForm({ title: '', target: 'レトロ自販機', memo: '' })
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">レトロ自販機・レトロゲーム・オートレストラン</p>
          <h1>Showa Retro Route</h1>
          <p className="lead">昭和レトロスポット、現存/閉店オートレストラン、レトロ自販機、ゲームセンターを遠征ルート化する保存型メディア。</p>
        </div>
        <aside className="hero-panel">
          <span>showaroute.jp / showa-retro-route</span>
          <strong>検索、UGC、通知、送客を1つの収益導線にまとめる。</strong>
          <p>PDFアイデアの深掘り版として、初期状態からSEO/AIO/LLMO、UGC、収益導線を入れています。</p>
        </aside>
      </section>
      <section className="controls" aria-label="検索条件">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="地域・カテゴリ・条件で検索" />
        <select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select>
      </section>
      <section className="metrics">
        <article><span>Seed records</span><strong>{items.length}</strong></article>
        <article><span>Saved leads</span><strong>{saved.length}</strong></article>
        <article><span>UGC reports</span><strong>{posts.length}</strong></article>
      </section>
      <section className="card-grid">
        {filtered.map((item) => (
          <article className="data-card" key={item.id}>
            <div className="card-top"><span>{item.area} / {item.category}</span><b>{item.score}</b></div>
            <h2>{item.title}</h2>
            <p>{item.summary}</p>
            <div className="tag-row">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <div className="route-list">{item.routes.map((route) => <span key={route}>{route}</span>)}</div>
            <p className="revenue">収益導線: {item.revenue}</p>
            <button type="button" onClick={() => toggleSave(item.id)}>{saved.includes(item.id) ? '保存済み' : '送客候補に保存'}</button>
          </article>
        ))}
      </section>
      <section className="split">
        <div className="panel">
          <h2>技術選定</h2>
          <article><b>Frontend</b><p>Vite + React 19。静的サイトとして速く、GitHub Pagesへ載せやすい構成です。</p></article>
          <article><b>Data</b><p>MVPは静的seed + localStorage。運用段階でSupabaseまたはCloudflare D1へ移行します。</p></article>
          <article><b>Growth</b><p>地域LP、カテゴリLP、FAQ、llms.txt、UGC投稿、通知導線でロングテールを増やします。</p></article>
          <article><b>収益ルート</b><p>{revenuePlans.join(' / ')}</p></article>
          <article><b>バズ施策</b><p>{buzzIdeas.join(' / ')}</p></article>
        </div>
        <div className="panel">
          <h2>UGC投稿</h2>
          <p>口コミ、訂正、在庫、現地確認、閉店、レビュー、写真メモなどを投稿できる初期導線です。</p>
          <form className="ugc-form" onSubmit={addPost}>
            <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="投稿タイトル" />
            <input value={form.target} onChange={(event) => setForm({ ...form, target: event.target.value })} placeholder="対象カテゴリ" />
            <input value={form.memo} onChange={(event) => setForm({ ...form, memo: event.target.value })} placeholder="現地メモ・口コミ・訂正情報" />
            <button>投稿</button>
          </form>
          <div className="post-list">
            {posts.length === 0 && <p className="empty">公開後はUGCで鮮度を作ります。</p>}
            {posts.map((post) => <article key={post.id}><b>{post.title}</b><p>{post.memo}</p><small>{post.target} / {post.date}</small></article>)}
          </div>
        </div>
      </section>
      <section className="seo-section">
        <h2>SEO / AIO / LLMO</h2>
        <div className="seo-grid">
          <article><b>地域ページ</b><p>駅名、市区町村、周辺施設名でページを作ります。</p></article>
          <article><b>条件ページ</b><p>料金、営業時間、在庫、通知、口コミ、比較条件を組み合わせます。</p></article>
          <article><b>収益ページ</b><p>予約、掲載、クーポン、アフィリエイト、スポンサー枠へ接続します。</p></article>
        </div>
      </section>
      <section className="faq-section">
        <h2>FAQ</h2>
        <div className="faq-grid">{faqs.map(([q, a]) => <article key={q}><h3>{q}</h3><p>{a}</p></article>)}</div>
      </section>
    </main>
  )
}

export default App
