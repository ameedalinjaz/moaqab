// app/page.js
"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetchUser()
    fetchPosts()
  }, [])

  async function fetchUser() {
    const { data } = await supabase.auth.getUser()
    setUser(data?.user || null)
  }

  async function fetchPosts() {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
    setPosts(data || [])
  }

  function handleLogin() {
    router.push("/auth/login")
  }

  function handleLogout() {
    supabase.auth.signOut().then(() => setUser(null))
  }

  function handleNewPost() {
    router.push("/posts/new")
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">منصة المعقبين</h1>
        <div>
          {user ? (
            <>
              <span className="mr-4">مرحبًا، {user.email}</span>
              <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">تسجيل الخروج</button>
            </>
          ) : (
            <button onClick={handleLogin} className="bg-blue-600 text-white p-2 rounded">تسجيل الدخول</button>
          )}
        </div>
      </header>

      {user && (
        <div className="mb-6">
          <button onClick={handleNewPost} className="bg-green-600 text-white p-2 rounded">إنشاء منشور جديد</button>
        </div>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-4">أحدث المنشورات</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">لا توجد منشورات بعد.</p>
        ) : (
          posts.map(post => (
            <div key={post.id} className="border rounded shadow p-4 mb-4">
              <h3 className="font-bold">{post.title}</h3>
              <p>{post.description}</p>
              {post.image_url && <img src={post.image_url} alt={post.title} className="w-full h-48 object-cover rounded mt-2"/>}
              <p className="text-gray-500 text-sm mt-2">تم النشر في: {new Date(post.created_at).toLocaleDateString("ar-SA")}</p>
            </div>
          ))
        )}
      </section>
    </div>
  )
}
