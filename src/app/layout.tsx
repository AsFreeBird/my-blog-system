import './globals.css'; // 👈 必须是相对路径，放在文件顶部


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <div className="flex items-center justify-between  w-full bg-red-50">
            <span className="bg-amber-500 text-red-400">📝 我的博客</span>
            <button>登录</button>
          </div>
        </header>
        <main>{children}</main>
        <div className='w-full bg-cyan-600 h-40'></div>
      </body>
    </html>
  );
}
