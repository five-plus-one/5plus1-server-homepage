import ReactMarkdown from "react-markdown";
import { ServerStatus } from "./ServerStatus";
import guide from "../content/guide.md?raw";
import covenant from "../content/covenant.md?raw";
import { siteConfig } from "../site.config";

const features = [
  ["01", "慢一点，也很好", "没有赛季冲刺，没有强制打卡。建筑、探索、养老，照自己的节奏来。"],
  ["02", "原味，但不乏味", "以生存体验为核心，只加入真正改善联机生活的内容。"],
  ["03", "一起留下痕迹", "每一条铁路、每一座聚落，都会成为 5plus1 世界编年史的一页。"],
];

const guideContent = guide
  .split("{{MODPACK_DOWNLOAD_URL}}")
  .join(siteConfig.modpack.downloadUrl);

export default function App() {
  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#top" aria-label="回到首页">
          <span className="brand-mark">5+1</span>
          <span>SERVER</span>
        </a>
        <div className="nav-links">
          <a href="#story">关于</a>
          <a href="#join">入服</a>
          <a href="#covenant">公约</a>
          <a href="#download">整合包</a>
        </div>
        <a className="nav-skin" href={siteConfig.skinSiteUrl} target="_blank" rel="noreferrer">
          皮肤站 ↗
        </a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orbit orbit-a" aria-hidden="true">◆</div>
        <div className="hero-orbit orbit-b" aria-hidden="true">✦</div>
        <div className="eyebrow"><span /> 第 5 个世界之外，还有 1 种可能</div>
        <h1>
          把方块垒成<br />
          <em>我们共同的世界。</em>
        </h1>
        <p className="hero-copy">
          5plus1 Server 是一座长期开放的 Minecraft 生存服务器。
          不追赶版本的喧嚣，只认真收藏每一次相遇。
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#join">开始入服 <span>↘</span></a>
          <ServerStatus compact />
        </div>
        <div className="hero-foot">
          <span>JAVA EDITION</span>
          <span>MULTIPLAYER · SURVIVAL</span>
          <span>向下探索 ↓</span>
        </div>
      </section>

      <section className="manifesto" id="story">
        <div className="section-kicker">/ OUR WORLD</div>
        <div className="manifesto-head">
          <h2>这不是另一个<br />“快餐服”。</h2>
          <p>我们想造一座可以偶尔离开、也随时愿意回来的世界。规则足够清楚，关系足够松弛，时间足够长。</p>
        </div>
        <div className="feature-grid">
          {features.map(([number, title, copy]) => (
            <article className="feature-card" key={number}>
              <span className="feature-number">{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
              <span className="corner">⌟</span>
            </article>
          ))}
        </div>
      </section>

      <section className="status-section">
        <div>
          <div className="section-kicker light">/ LIVE SIGNAL</div>
          <h2>世界信号<br />正在抵达。</h2>
          <p>状态由公开查询服务直接读取；即使查询暂时失败，也不影响你复制地址进入服务器。</p>
        </div>
        <ServerStatus />
      </section>

      <section className="guide-section" id="join">
        <div className="guide-aside">
          <div className="section-kicker">/ FIELD GUIDE</div>
          <h2>第一次<br />抵达这里？</h2>
          <p>从账号准备到首次进服，照着路线走，不会迷路。</p>
          <a className="skin-card" href={siteConfig.skinSiteUrl} target="_blank" rel="noreferrer">
            <span className="skin-icon">◫</span>
            <span><b>没有正版账号？</b><small>前往 5plus1 皮肤站注册 ↗</small></span>
          </a>
        </div>
        <article className="markdown guide-markdown">
          <ReactMarkdown>{guideContent}</ReactMarkdown>
        </article>
      </section>

      <section className="download-section" id="download">
        <div className="download-art" aria-hidden="true">
          <div className="cube cube-one">5</div>
          <div className="cube cube-two">+</div>
          <div className="cube cube-three">1</div>
        </div>
        <div className="download-copy">
          <div className="section-kicker light">/ READY TO PLAY</div>
          <h2>一包到位，<br />直接出发。</h2>
          <p>预装推荐模组、光影与服务器地址。解压后按说明启动，无需自己逐项配置。</p>
          <div className="pack-meta">
            <span><b>整合包版本</b> {siteConfig.modpack.version}</span>
            <span><b>平台</b> Windows</span>
            <span><b>更新</b> 随服务器同步</span>
          </div>
          <a
            className="button download-button"
            href={siteConfig.modpack.downloadUrl}
            rel="noreferrer"
          >
            下载入服整合包 <span>↓</span>
          </a>
          <small className="file-note">由 files.mc.five-plus-one.com CDN 提供下载 · {siteConfig.modpack.fileName}</small>
        </div>
      </section>

      <section className="covenant-section" id="covenant">
        <div className="covenant-title">
          <div className="section-kicker">/ COVENANT</div>
          <h2>在自由之前，<br />我们先彼此尊重。</h2>
          <p>公约不是用来限制创造，而是保护每个人创造的意义。</p>
        </div>
        <article className="markdown covenant-markdown">
          <ReactMarkdown>{covenant}</ReactMarkdown>
        </article>
      </section>

      <footer>
        <div className="footer-brand">5+1</div>
        <p>留一点余地，给世界多一种可能。</p>
        <div className="footer-links">
          <a href="#top">回到顶部 ↑</a>
          <a href={siteConfig.skinSiteUrl} target="_blank" rel="noreferrer">皮肤站</a>
          <a href="mailto:admin@five-plus-one.com">联系我们</a>
        </div>
        <small>© 2026 5plus1 Server · Not affiliated with Mojang Studios.</small>
      </footer>
    </main>
  );
}
