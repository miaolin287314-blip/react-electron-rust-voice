import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WindowTitleBar from "../../components/WindowTitleBar";
import { useAuthStore } from "../../stores/authStore";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setIsSubmitting(true);
        try {
            await login(username.trim(), password);
            navigate("/");
        } catch {
            setError("登录暂时不可用，请检查连接后重试。");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="login-shell">
            <WindowTitleBar />
            <main className="login-content">
                <section className="login-form-panel">
                    <Link className="back-link" to="/">返回频道</Link>
                    <div className="login-brand">
                        <span className="brand-mark">声</span>
                        <span>声伴 / ACCOUNT</span>
                    </div>
                    <h1>欢迎回来。</h1>
                    <p className="login-lead">登录后继续你的语音空间。</p>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <label htmlFor="username">用户名</label>
                        <input
                            autoComplete="username"
                            id="username"
                            name="username"
                            onChange={(event) => setUsername(event.target.value)}
                            placeholder="输入用户名"
                            required
                            value={username}
                        />
                        <label htmlFor="password">密码</label>
                        <input
                            autoComplete="current-password"
                            id="password"
                            name="password"
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="输入密码"
                            required
                            type="password"
                            value={password}
                        />
                        {error && <p className="form-error" role="alert">{error}</p>}
                        <button className="login-submit" disabled={isSubmitting} type="submit">
                            {isSubmitting ? "正在登录" : "登录账号"}
                        </button>
                    </form>
                    <div className="login-footnote"><span /> 连接由安全的桌面桥接处理</div>
                </section>
                <aside className="login-art" aria-label="语音空间">
                    <div className="art-orbit orbit-one" />
                    <div className="art-orbit orbit-two" />
                    <div className="art-center"><span>声</span></div>
                    <div className="art-caption"><span>VOICE / 01</span><strong>把声音，留给此刻。</strong></div>
                </aside>
            </main>
        </div>
    );
}