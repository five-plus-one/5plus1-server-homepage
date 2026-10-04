import { useEffect, useRef, useState } from "react";
type Status = { online: boolean; players?: { online: number } };
export function ServerStatus({
  address,
  name,
}: {
  address: string;
  name: string;
}) {
  const [status, setStatus] = useState<Status | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [copyState, setCopyState] = useState("复制地址");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timeout = window.setTimeout(() => controller.abort(), 10000);
    fetch(
      `https://api.mcstatus.io/v2/status/java/${encodeURIComponent(address)}`,
      { signal: controller.signal },
    )
      .then((response) => {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then((value: Status) => {
        if (typeof value.online !== "boolean") throw new Error();
        if (active) setStatus(value);
      })
      .catch(() => {
        if (active) setStatus(null);
      })
      .finally(() => {
        window.clearTimeout(timeout);
        if (active) setLoaded(true);
      });
    return () => {
      active = false;
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [address]);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(address);
      setCopyState("已复制 ✓");
    } catch {
      setCopyState("请选中地址复制");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopyState("复制地址"), 2500);
  }
  return (
    <div className="server-connection">
      <div
        className={`live-status ${status?.online ? "online" : ""}`}
        aria-live="polite"
      >
        <i aria-hidden="true" />
        {!loaded
          ? "正在查询状态"
          : status === null
            ? "暂未取得状态"
            : status.online
              ? `在线${typeof status.players?.online === "number" ? ` · ${status.players.online} 位玩家` : ""}`
              : "服务器暂时离线"}
      </div>
      <div className="address-box">
        <code>{address}</code>
        <button onClick={copyAddress} aria-label={`复制${name}地址`}>
          <span aria-live="polite">{copyState}</span>
          <span aria-hidden="true">⧉</span>
        </button>
      </div>
    </div>
  );
}
