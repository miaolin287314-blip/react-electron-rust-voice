import { NavLink, Outlet } from "react-router-dom";
import WindowTitleBar from "../components/WindowTitleBar";

export default function AppLayout() {
    return (
        <div className="app-shell">
            <WindowTitleBar />
            <div className="app-frame">
                <aside className="sidebar">
                    <div className="workspace-switcher">
                        <span className="brand-mark">声</span>
                        <div>
                            <strong>声伴</strong>
                            <span>VOICE SPACE</span>
                        </div>
                    </div>

                    <div className="sidebar-label">工作空间</div>
                    <nav className="sidebar-nav" aria-label="主导航">
                        <NavLink to="/" end className="sidebar-link">
                            <span className="nav-index">01</span>
                            <span>语音频道</span>
                        </NavLink>
                        <NavLink to="/login" className="sidebar-link">
                            <span className="nav-index">02</span>
                            <span>账号登录</span>
                        </NavLink>
                    </nav>

                    <div className="sidebar-bottom">
                        <span className="connection-dot" />
                        <span>桌面端已就绪</span>
                        <span className="sidebar-version">0.0.1</span>
                    </div>
                </aside>
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}