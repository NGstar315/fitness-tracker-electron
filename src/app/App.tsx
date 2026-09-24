import { useEffect, useState } from 'react';
import type { AppHealth } from '../types/api';

const cards = [
  ['今日训练', 'Home Hypertrophy Base 8W', '开始训练'],
  ['营养', '蛋白质 0 / 115 g · 热量 0 kcal', '快速添加食物'],
  ['身体与恢复', '61.5 kg · 睡眠待记录', '记录晨间数据']
] as const;

export function App(): JSX.Element {
  const [health, setHealth] = useState<AppHealth>();
  useEffect(() => { void window.fitnessTracker.health.get().then(setHealth); }, []);
  return <main className="app-shell">
    <aside><p className="eyebrow">LOCAL-FIRST</p><h1>Fitness<br />Tracker</h1><nav aria-label="主导航"><a aria-current="page">首页</a><a>训练</a><a>饮食</a><a>身体</a><a>报告</a><a>AI 分析</a><a>设置</a></nav></aside>
    <section className="content"><header><div><p className="eyebrow">TODAY</p><h2>{new Intl.DateTimeFormat('zh-CN', { dateStyle: 'full' }).format(new Date())}</h2></div><span className="local-badge">数据仅保存在本机</span></header>
      <p className="notice">酸痛是恢复感受指标，不是增肌效果的直接测量。优先关注可重复的重量、次数、动作质量和长期趋势。</p>
      <div className="card-grid">{cards.map(([title, detail, action]) => <article className="card" key={title}><h3>{title}</h3><p>{detail}</p><button type="button">{action}</button></article>)}</div>
      <article className="status"><h3>Phase 1 已就绪</h3><p>安全 Electron 窗口、受限 preload API、SQLite WAL 数据库、迁移与首次默认档案已初始化。</p><dl><div><dt>数据库</dt><dd>{health ? `schema v${health.schemaVersion}` : '正在连接…'}</dd></div><div><dt>应用版本</dt><dd>{health?.appVersion ?? '—'}</dd></div></dl></article>
    </section>
  </main>;
}
