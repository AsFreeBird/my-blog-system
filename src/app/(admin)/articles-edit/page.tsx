import './../../globals.css'

export default function ArticleEdit(){

    return(
        <html>
            <body className='bg-gray-100 py-8 px-52'>
                <div className="flex flex-col rounded-xl bg-white">
                    <h1 className='title text-center'>文章编辑</h1>
                    <h3 className='px-9 font-bold text-base mt-6'>文章标题</h3>
                    <input className='input mx-9 w-auto mt-3'/>
                    <h3 className='px-9 font-bold text-base mt-6'>文章分类</h3>
                    <input className='input mx-9 w-auto mt-3'/>
                </div>
            </body>
        </html>
    );    
}