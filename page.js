// /app/test/page.js
export default function TestPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">صفحة تجريبية</h1>
      <p className="text-lg text-gray-700">هذه صفحة تجريبية بدون أي اتصال بقاعدة البيانات.</p>
      <div className="mt-6 p-4 bg-white rounded shadow">
        <p>يمكنك إضافة أي محتوى هنا، مثل منشورات ثابتة أو أزرار.</p>
      </div>
    </main>
  )
}
