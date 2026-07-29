"use client";

import { useEffect, useState } from "react";

const SERVER_ADDRESS = "mc.five-plus-one.com";
type Status = { online: boolean; players?: { online: number; max: number }; version?: { name_clean?: string }; latency?: number };

export function ServerStatus({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://api.mcstatus.io/v2/status/java/${SERVER_ADDRESS}`, { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then(setStatus)
      .catch(() => setStatus({ online: false }));
    return () => controller.abort();
  }, []);

  const copyAddress = async () => {
    await navigator.clipboard.writeText(SERVER_ADDRESS);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  if (compact) {
    return (
      <button className="server-pill" onClick={copyAddress} aria-label="复制服务器地址">
        <i className={status?.online ? "online" : ""} />
        <span><small>{status === null ? "正在连接" : status.online ? `${status.players?.online ?? 0} 人在线` : "状态未知"}</small>{copied ? "已复制地址" : SERVER_ADDRESS}</span>
        <b>⧉</b>
      </button>
    );
  }

  return (
    <div className="status-console">
      <div className="console-top"><span>SERVER MONITOR</span><span>● ● ●</span></div>
      <div className="signal-row">
        <div className={`signal-dot ${status?.online ? "online" : ""}`} />
        <div><small>CURRENT STATUS</small><b>{status === null ? "信号接入中" : status.online ? "服务器在线" : "暂未取得状态"}</b></div>
      </div>
      <div className="status-stats">
        <div><small>在线玩家</small><strong>{status?.online ? status.players?.online ?? 0 : "—"}<em> / {status?.players?.max ?? "—"}</em></strong></div>
        <div><small>游戏版本</small><strong className="version">{status?.version?.name_clean ?? "Java"}</strong></div>
      </div>
      <button onClick={copyAddress} className="address-row">
        <span><small>SERVER ADDRESS</small><b>{copied ? "地址已复制，游戏里见！" : SERVER_ADDRESS}</b></span>
        <span>复制 ⧉</span>
      </button>
    </div>
  );
}
