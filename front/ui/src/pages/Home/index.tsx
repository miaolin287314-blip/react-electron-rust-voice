import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppStore } from "../../stores/appStore";
import { useAuthStore } from "../../stores/authStore";

const rooms = [
    { name: "午后闲聊", category: "日常", members: 4, status: "正在交流" },
    { name: "一起听歌", category: "音乐", members: 2, status: "轻声播放" },
    { name: "专注自习", category: "专注", members: 6, status: "安静中" },
];

const people = [
    { name: "林间来信", role: "房间主持", color: "mint" },
    { name: "Mori", role: "正在聆听", color: "blue" },
    { name: "阿屿", role: "正在聆听", color: "coral" },
    { name: "Nana", role: "刚刚加入", color: "gold" },
];

interface AppInfo {
    name: string;
    version: string;
    isPackaged: boolean;
}

export default function HomePage() {
    const [appInfo, setAppInfo] = useState<AppInfo | null>(null);
    const selectedRoom = useAppStore((state) => state.selectedRoom);
    const isConnected = useAppStore((state) => state.isConnected);
    const isMuted = useAppStore((state) => state.isMuted);
    const isDeafened = useAppStore((state) => state.isDeafened);
    const selectRoom = useAppStore((state) => state.selectRoom);
    const toggleConnection = useAppStore((state) => state.toggleConnection);
    const toggleMuted = useAppStore((state) => state.toggleMuted);
    const toggleDeafened = useAppStore((state) => state.toggleDeafened);
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const logout = useAuthStore((state) => state.logout);

    useEffect(() => {
        let active = true;
        window.electron.invoke("app:getInfo").then((info) => {
            if (active) setAppInfo(info);
        }).catch(() => undefined);
        return () => {
            active = false;
        };
    }, []);

    return (
        <div className="home-page">
            <header className="page-header">
                <div>
                    <div className="eyebrow">VOICE CHANNELS <span>/{appInfo?.version ?? "LOCAL"}</span></div>
                    <h1>语音频道</h1>
                    <p>找个舒服的位置，和大家待一会儿。</p>
                </div>
                <div className="account-control">
                    <img src="/avatar.jpg" alt="用户头像" />
                    <div className="account-name">
                        <strong>{user?.username ?? "访客"}</strong>
                        <span>{isAuthenticated ? "已登录" : "尚未登录"}</span>
                    </div>
                    {isAuthenticated ? (
                        <button className="text-button" type="button" onClick={logout}>退出</button>
                    ) : (
                        <Link className="text-button" to="/login">登录</Link>
                    )}
                </div>
            </header>

            <div className="home-grid">
                <section className="room-stage" aria-label="频道详情">
                    <div className="stage-topline">
                        <span className="live-indicator"><i />{isConnected ? "语音已连接" : "频道开放中"}</span>
                        <span className="stage-date">{appInfo?.isPackaged ? "DESKTOP" : "DEVELOPMENT"}</span>
                    </div>

                    <div className="stage-copy">
                        <span className="stage-overline">当前频道 / {selectedRoom}</span>
                        <h2>让对话<br /><em>自然发生。</em></h2>
                        <p>不用急着找话题，进来听听也很好。</p>
                    </div>

                    <div className="stage-wave" aria-hidden="true">
                        {Array.from({ length: 35 }, (_, index) => (
                            <span key={index} style={{ "--bar": `${18 + ((index * 37) % 68)}%` } as React.CSSProperties} />
                        ))}
                    </div>

                    <div className="stage-controls">
                        <div className="control-group">
                            <button className={`control-button ${isMuted ? "is-active" : ""}`} type="button" disabled={!isConnected} onClick={toggleMuted}>
                                {isMuted ? "取消静音" : "麦克风"}
                            </button>
                            <button className={`control-button ${isDeafened ? "is-active" : ""}`} type="button" disabled={!isConnected} onClick={toggleDeafened}>
                                {isDeafened ? "恢复聆听" : "耳机"}
                            </button>
                        </div>
                        <button className={`join-button ${isConnected ? "is-connected" : ""}`} type="button" onClick={toggleConnection}>
                            <span className="join-button-dot" />
                            {isConnected ? "离开频道" : "加入语音"}
                        </button>
                    </div>
                </section>

                <aside className="room-panel" aria-label="频道成员">
                    <div className="panel-heading">
                        <div>
                            <span className="eyebrow">IN THIS ROOM</span>
                            <h2>房间成员</h2>
                        </div>
                        <span className="member-count">{people.length.toString().padStart(2, "0")}</span>
                    </div>

                    <div className="member-list">
                        {people.map((person, index) => (
                            <div className="member-row" key={person.name}>
                                <div className={`member-avatar avatar-${person.color}`}>
                                    {index === 0 ? <img src="/avatar.jpg" alt="" /> : person.name.slice(0, 1)}
                                    <span className="presence-dot" />
                                </div>
                                <div className="member-details">
                                    <strong>{person.name}</strong>
                                    <span>{person.role}</span>
                                </div>
                                {index === 0 && <span className="host-label">HOST</span>}
                            </div>
                        ))}
                    </div>

                    <div className="room-list-heading">
                        <span>其他频道</span>
                        <span>{rooms.length.toString().padStart(2, "0")}</span>
                    </div>
                    <div className="room-list">
                        {rooms.map((room) => (
                            <button
                                className={`room-row ${selectedRoom === room.name ? "selected" : ""}`}
                                key={room.name}
                                type="button"
                                onClick={() => selectRoom(room.name)}
                            >
                                <span className="room-category">{room.category.slice(0, 1)}</span>
                                <span className="room-row-copy"><strong>{room.name}</strong><small>{room.status}</small></span>
                                <span className="room-members">{room.members}</span>
                            </button>
                        ))}
                    </div>

                    <div className="panel-footer">
                        <span className="connection-dot" />
                        <span>{appInfo?.name ?? "声伴"} · {appInfo?.version ?? "0.0.1"}</span>
                    </div>
                </aside>
            </div>
        </div>
    );
}