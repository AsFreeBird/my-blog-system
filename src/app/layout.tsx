import "./globals.css"; // 👈 必须是相对路径，放在文件顶部

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <div className="flex items-center justify-between  w-full pt-4 pb-4">
            <h1 className="text-3xl font-bold ml-8">📝 我的博客</h1>
            <div>
              <button className="btn">管理后台</button>
              <button className="btn ml-4 mr-8">登录</button>
            </div>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
