import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ServerStatus } from "./ServerStatus";
import { WorldArt } from "./WorldArt";
import covenant from "../content/covenant.md?raw";
import { siteConfig, type Server } from "../site.config";
export default function App() {
  const [selected, setSelected] = useState<Server>(siteConfig.servers[0]);
  const [motionPaused, setMotionPaused] = useState(false);
  const shell = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = shell.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    root
      .querySelectorAll(
        ".world-card, .step, .community-section, .section-heading",
      )
      .forEach((element) => {
        element.setAttribute("data-reveal", "");
        observer.observe(element);
      });
    root.classList.add("motion-ready");
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={shell}
      className={`site-experience ${motionPaused ? "motion-paused" : ""}`}
    >
      <a className="skip-link" href="#worlds">
        选择服务器
      </a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="5plus1 首页">
          <span className="brand-mark">5+1</span>
          <span>
            方块之间<small>5PLUS1 SERVER</small>
          </span>
        </a>
        <nav aria-label="主导航">
          <a href="#worlds">选择世界</a>
          <a href="#join">入服指南</a>
          <a href="#covenant">服务器公约</a>
          <a href={siteConfig.statusUrl} target="_blank" rel="noreferrer">
            状态监控 ↗
          </a>
        </nav>
        <a
          className="skin-link"
          href={siteConfig.skinSiteUrl}
          target="_blank"
          rel="noreferrer"
        >
          皮肤站 <span>↗</span>
        </a>
      </header>
      <main id="top">
        <section className="hero page-width">
          <div className="ambient-blocks" aria-hidden="true">
            {Array.from({ length: 8 }, (_, i) => (
              <span key={i} style={{ "--i": i } as React.CSSProperties} />
            ))}
          </div>
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="tiny-square" /> MINECRAFT JAVA · 5PLUS1
            </p>
            <h1>
              两个世界。
              <br />
              <span>一种归属。</span>
            </h1>
            <p className="hero-description">
              从生存的第一晚，到创造的每一个灵感。
              <br />
              在这里，和朋友一起把日子过成风景。
            </p>
            <a className="button primary" href="#worlds">
              选一个世界，出发 <span>↘</span>
            </a>
            <div className="hero-note">
              <span>生存探索</span>
              <i />
              <span>自由建造</span>
              <i />
              <span>共同创造</span>
            </div>
          </div>
          <div
            className="hero-art"
            onPointerMove={(event) => {
              if (
                motionPaused ||
                !window.matchMedia(
                  "(hover: hover) and (prefers-reduced-motion: no-preference)",
                ).matches
              )
                return;
              const rect = event.currentTarget.getBoundingClientRect();
              event.currentTarget.style.setProperty(
                "--pointer-x",
                `${((event.clientX - rect.left) / rect.width - 0.5) * 12}deg`,
              );
              event.currentTarget.style.setProperty(
                "--pointer-y",
                `${((event.clientY - rect.top) / rect.height - 0.5) * -10}deg`,
              );
            }}
            onPointerLeave={(event) => {
              event.currentTarget.style.setProperty("--pointer-x", "0deg");
              event.currentTarget.style.setProperty("--pointer-y", "0deg");
            }}
          >
            <div className="art-caption">
              <span>OUR LITTLE CORNER OF THE WORLD</span>
              <span>01 / 02</span>
            </div>
            <div className="hero-world">
              <WorldArt />
              <span className="world-label">01 — 生存世界</span>
            </div>
            <div className="hero-world creative">
              <WorldArt creative />
              <span className="world-label">02 — 创造世界</span>
            </div>
            <div className="art-stamp">
              一起
              <br />
              造点什么<span>✦</span>
            </div>
            <button
              className="motion-control"
              aria-pressed={motionPaused}
              onClick={() => setMotionPaused((value) => !value)}
            >
              {motionPaused ? "▶ 播放场景动画" : "Ⅱ 暂停场景动画"}
            </button>
          </div>
        </section>
        <div className="welcome-band">
          <div className="page-width">
            <span>每一种玩法，都有自己的天地。</span>
            <p>
              同一个社区，两种不同的冒险。
              <a
                href={siteConfig.community.qqJoinUrl}
                target="_blank"
                rel="noreferrer"
              >
                来群里打个招呼 ↗
              </a>
            </p>
          </div>
        </div>
        <section className="worlds-section page-width" id="worlds">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / FIND YOUR WORLD</p>
              <h2>今天，想怎么玩？</h2>
            </div>
            <p>
              想探索，就带上行囊。
              <br />
              想建造，就带上想象力。
            </p>
          </div>
          <div className="world-grid" id="download">
            {siteConfig.servers.map((server, index) => (
              <article className={`world-card ${server.id}`} key={server.id}>
                <div className="card-art">
                  <WorldArt creative={server.id === "creative"} />
                  <span className="edition-label">
                    JAVA EDITION · {server.gameVersion}
                  </span>
                </div>
                <div className="card-body">
                  <div className="card-title">
                    <div>
                      <p className="eyebrow">
                        {server.englishName} / 0{index + 1}
                      </p>
                      <h3>{server.name}</h3>
                    </div>
                    <span className="card-symbol" aria-hidden="true">
                      {server.id === "survival" ? "⌂" : "✦"}
                    </span>
                  </div>
                  <h4>{server.tagline}</h4>
                  <p className="card-description">{server.description}</p>
                  <div className="tags">
                    {server.features.map((feature) => (
                      <span key={feature}>{feature}</span>
                    ))}
                  </div>
                  <ServerStatus address={server.address} name={server.name} />
                  <div className="card-actions">
                    <a className="button primary" href={server.downloadUrl}>
                      下载{server.name}客户端 <span>↓</span>
                    </a>
                    <a
                      className="guide-link"
                      href="#join"
                      onClick={() => setSelected(server)}
                    >
                      入服指南 ↗
                    </a>
                  </div>
                  <p className="download-note">
                    Windows · HMCL 启动 · 整合包自动更新
                  </p>
                </div>
              </article>
            ))}
          </div>
          <a
            className="status-monitor-link"
            href={siteConfig.statusUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span className="monitor-icon" aria-hidden="true">
              ▥
            </span>
            <span>
              <b>服务器状态监控</b>
              <small>查看服务可用情况与历史状态</small>
            </span>
            <span aria-hidden="true">↗</span>
          </a>
          <div className="pack-note">
            <span aria-hidden="true">↻</span>
            <div>
              <b>下载一次，让出发更轻松。</b>
              <p>
                首次启动会下载游戏与模组，后续启动时检查整合包更新。两个客户端请分别解压到独立文件夹。
              </p>
            </div>
          </div>
        </section>
        <section className="join-section" id="join">
          <div className="page-width join-layout">
            <div className="join-intro">
              <p className="eyebrow">02 / YOUR FIRST VISIT</p>
              <h2>
                第一次来？
                <br />
                从这里开始。
              </h2>
              <p>
                准备好账号，选好世界。
                <br />
                剩下的，跟着这四步走。
              </p>
              <p className="switch-prompt">
                先选择你要加入的服务器 <span aria-hidden="true">↓</span>
              </p>
              <div
                className="server-switch"
                role="group"
                aria-label="选择入服教程"
              >
                {siteConfig.servers.map((server) => (
                  <button
                    key={server.id}
                    aria-pressed={selected.id === server.id}
                    className={`server-choice ${server.id} ${selected.id === server.id ? "active" : ""}`}
                    onClick={() => setSelected(server)}
                  >
                    <span className="choice-art">
                      <WorldArt creative={server.id === "creative"} />
                    </span>
                    <span className="choice-copy">
                      <b>{server.name}</b>
                      <small>
                        {server.id === "survival"
                          ? "探索 · 采集 · 聚落"
                          : "建筑 · 家具 · 灵感"}
                      </small>
                      <em>Minecraft {server.gameVersion}</em>
                    </span>
                    <span className="choice-check" aria-hidden="true">
                      {selected.id === server.id ? "✓" : ""}
                    </span>
                  </button>
                ))}
              </div>
              <div className="selected-summary" aria-live="polite">
                <span>你将前往</span>
                <b>{selected.name}</b>
                <p>
                  Minecraft {selected.gameVersion} · Java {selected.javaVersion}
                </p>
              </div>
            </div>
            <div className="steps" key={selected.id}>
              <article className="step">
                <span className="step-number">01</span>
                <div>
                  <h3>准备你的游戏账号</h3>
                  <p>
                    无论是否拥有正版账号，都请先在 5plus1
                    皮肤站注册，并创建游戏角色、设置皮肤。
                  </p>
                  <a
                    href={siteConfig.skinSiteUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    前往皮肤站注册 ↗
                  </a>
                </div>
              </article>
              <article className="step">
                <span className="step-number">02</span>
                <div>
                  <h3>下载并解压{selected.name}客户端</h3>
                  <p>
                    完整解压到独立文件夹，打开 <code>HMCL.exe</code>
                    。首次启动需要联网下载文件，请预留下载时间。
                  </p>
                  <a href={selected.downloadUrl}>下载{selected.name}客户端 ↓</a>
                </div>
              </article>
              <article className="step">
                <span className="step-number">03</span>
                <div>
                  <h3>登录账号，启动游戏</h3>
                  <p>
                    在启动器账号管理中添加 5plus1 Skin
                    账号，使用皮肤站的账号和密码登录，然后启动游戏。游戏需要
                    Java {selected.javaVersion}
                    ，可按启动器提示安装，或选择已安装的对应版本。
                  </p>
                  <details>
                    <summary>账号添加参考图</summary>
                    <img
                      src="https://img.assets.five-plus-one.com/img/2026/07/a5fc431db635b37334f984683b91f41a.png"
                      alt="HMCL 中添加 5plus1 Skin 账号的操作示意"
                      loading="lazy"
                    />
                  </details>
                </div>
              </article>
              <article className="step">
                <span className="step-number">04</span>
                <div>
                  <h3>进入多人游戏，和大家见面</h3>
                  <p>
                    进入游戏后，打开「多人游戏 →
                    添加服务器」，名称可以随意填写，地址为：
                  </p>
                  <code className="join-address">{selected.address}</code>
                  <p>
                    {selected.id === "survival"
                      ? "进入生存服后，可用 /warps 查看传送点。"
                      : "创造服的 WorldEdit 指令与投影批量粘贴需要对应权限，使用前请向管理员确认。"}
                    连接前请阅读下方公约。
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>
        <section className="covenant-section page-width" id="covenant">
          <div>
            <p className="eyebrow">03 / BUILD WITH RESPECT</p>
            <h2>
              世界很大。
              <br />
              彼此照顾。
            </h2>
            <p className="section-description">
              尊重每一份作品，也尊重每一位玩家。
              <br />
              这份约定，属于两个世界里的所有人。
            </p>
            <span className="covenant-art" aria-hidden="true">
              5<span>+</span>1
            </span>
          </div>
          <article className="markdown">
            <ReactMarkdown>{covenant}</ReactMarkdown>
          </article>
        </section>
        <section className="community-section page-width">
          <div>
            <p className="eyebrow">THE WORLD IS BETTER WITH YOU</p>
            <h2>方块之外，也有朋友。</h2>
            <p>找搭子、分享建筑，或问问第一次入服的小问题。</p>
          </div>
          <a
            className="button"
            href={siteConfig.community.qqJoinUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span>
              加入 QQ 群 <small>{siteConfig.community.qqGroupNumber}</small>
            </span>
            <span>↗</span>
          </a>
        </section>
      </main>
      <footer className="page-width">
        <div className="footer-top">
          <a className="brand" href="#top">
            <span className="brand-mark">5+1</span>
            <span>
              把方块垒成
              <br />
              我们共同的世界。
            </span>
          </a>
          <div className="footer-links">
            <a href={siteConfig.statusUrl} target="_blank" rel="noreferrer">
              状态监控 ↗
            </a>
            <a href={siteConfig.skinSiteUrl} target="_blank" rel="noreferrer">
              皮肤站 ↗
            </a>
            <a
              href={siteConfig.community.ownerContactUrl}
              target="_blank"
              rel="noreferrer"
            >
              联系腐竹 ↗
            </a>
            <a
              href={siteConfig.friendLinks.fivePlusOneHome}
              target="_blank"
              rel="noreferrer"
            >
              五加一的星空 ↗
            </a>
            <a href="#top">回到顶部 ↑</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 5plus1 Server</span>
          <span>Not affiliated with Mojang Studios.</span>
          <span>MADE OF BLOCKS & GOOD COMPANY</span>
        </div>
      </footer>
    </div>
  );
}
