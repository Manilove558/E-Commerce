import { RegisterForm } from "@/components/auth/register-form"
import { SiteHeader } from "@/components/site-header"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center py-12">
        <RegisterForm />
      </main>
    </div>
  )
}

