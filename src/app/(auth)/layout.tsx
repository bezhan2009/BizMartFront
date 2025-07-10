import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">{children}</div>
      </div>
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1516321497487-e288fb19713f"
          alt="Abstract background"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-primary/10 to-transparent">
          <h1 className="text-4xl font-bold text-primary-foreground">BizMart</h1>
          <p className="mt-2 text-lg text-primary-foreground/80">
            Connect, Collaborate, Create.
          </p>
        </div>
      </div>
    </div>
  );
}
