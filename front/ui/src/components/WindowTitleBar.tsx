export default function WindowTitleBar() {
    return (
        <header className="window-titlebar">
            <div className="window-title">
                <span className="brand-mark brand-mark-small">声</span>
                <span>声伴</span>
                <span className="title-divider" />
                <span className="title-context">语音空间</span>
            </div>
            <div className="window-actions">
                <button
                    type="button"
                    title="最小化窗口"
                    aria-label="最小化窗口"
                    onClick={() => window.electron.send("window:minimize")}
                >
                    最小化
                </button>
                <button
                    type="button"
                    title="最大化或还原窗口"
                    aria-label="最大化或还原窗口"
                    onClick={() => window.electron.send("window:maximize")}
                >
                    最大化
                </button>
            </div>
        </header>
    );
}