import { LoginForm } from "@/components/login-form"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="w-full max-w-md p-6 space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-bold">AutoGest</h1>
          <p className="text-muted-foreground">Sistema para Oficinas Mecânicas</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
